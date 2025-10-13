import { config } from 'dotenv' 
import { join } from 'path'
import { createCrawl, createCrawlOpenAI } from 'x-crawl'
import {
    writeFile
} from 'fs/promises'
config() // 加载 .env 文件中的环境变量

const crawlApp = createCrawl({
    maxRequest: 3,
    intervalTime:{
        min: 1000,
        max: 2000,
    }
})

const crawlOpenAI = createCrawlOpenAI({
    clientOptions: {
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_API_BASE_URL,
    },
    defaultModel:{
        chatModel: 'gpt-4o',
    }
})
const writeJSONToFile = async (data, fileName) => {
    const filePath = join(process.cwd(),fileName)
    try{
        await writeFile(filePath,JSON.stringify(data,null,2))
    }catch(err)
    {
        console.log('写入文件发生错误')
    }
}
crawlApp.crawlPage('https://www.cnblogs.com/')
    .then(async(res)=>{
       const {
         page,
         browser
       } = res.data 
       const targetSelector = '#post_list'
       await page.waitForSelector(targetSelector)
       const highlyHTML = await page.$eval(targetSelector, el => el.outerHTML)
       console.log(highlyHTML)

       const result = await crawlOpenAI.parseElements(
        highlyHTML,
        `获取每一个 .post-item 元素里面的.post-item-title标题,.post-item-summary里的纯文本摘要,以JSON的格式返回。如：
       [
        {
         "title": "找到合适的PHP异步方案",
         "content": "RegExp"
         }
        ]`
       )
       await browser.close()

       await writeJSONToFile(result,'data/posts.json')
    })
