// supabase 去做 向量化的知识库数据 

// langchain loader 是RAG 的基础功能
// 加载网页内容
import {
    PuppeteerWebBaseLoader
} from '@langchain/community/document_loaders/web/puppeteer'
import { embed } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'



import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
})
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,  //切割的长度 512 个 字符串 包含一个比较独立的语义
  chunkOverlap: 100, // 重叠的长度 100 个子符
})
const scrapePage = async(url:string): Promise<string>=>{
   const loader = new PuppeteerWebBaseLoader(url,{
      launchOptions: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 使用系统Chrome
        headless: true,
      },
      gotoOptions: {
        waitUntil: "networkidle0",
      },
      evaluate:async(pageXOffset,browser)=>{
        const result = await pageXOffset.evaluate(()=>{
          return document.body.innerText
        })
        await browser.close()
        return result
      }
   })

   // ^ 在[] 里面表示 不是 > 的字符
   return (await loader.scrape()).replace(/<[^>]*>?/gm,'')
}
const loadData = async(webpages:string[])=>{
    for(const url of webpages)
    {
        const content = await scrapePage(url)
        const chunks = await textSplitter.splitText(content)
        console.log(chunks,"-----")
        for(let chunk of chunks)
        {
            const {embedding} = await embed({
                model: openai.embedding("text-embedding-3-small"),
                value: chunk[0],
            })
            console.log(embedding,"-----")
        }
    }
}

// 知识库的来源，可配置
loadData([
  "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25",
//   "https://en.wikipedia.org/wiki/Samsung_Galaxy_S24",
//   "https://en.wikipedia.org/wiki/IPhone_16",
//   "https://en.wikipedia.org/wiki/IPhone_16_Pro",
//   "https://en.wikipedia.org/wiki/IPhone_15",
//   "https://en.wikipedia.org/wiki/IPhone_15_Pro",
]);