const fs = require('fs')   // fs读取文件
const path = require('path')

const {OpenAI} = require('openai')
require('dotenv').config()
// 模型ollama
// 给它喂私有知识库，不怕私有数据被大模型训练了
// 处理一下安全问题
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
})


const testQuestion = '有多少门课程？';

function readCourseInfo(){
    try{
       const filePath = path.join(__dirname,"lession.txt")
       return fs.readFileSync(filePath,'utf-8')
    }catch(err)
    {
        console.log('读取课程信息文件失败',err)
        return ''
    }
}

async function answerQuestion(question)
{
    // 检索
    const courseInfo = readCourseInfo();
    if(!courseInfo)
    {
        return '无法读取课程信息，请确保lession.txt文件存在且有内容'
    }

    try{
       const prompt = `
          你是一个课程助手，请根据一下课程信息回答问题。
          只回答与课程相关的内容。如果内容与课程无关，请礼貌地说明你只能回答与课程相关的问题。
          课程信息：${courseInfo}

          问题：${testQuestion}
       `

       const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: "你是一个专业的课程助手，请根据课程信息回答问题"
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.1,
        max_tokens: 1000,
       })
       return response.choices[0].message.content
    }catch(err)
    {
       console.log('调用OpenAI API 失败',err)
       return '抱歉，处理你的问题时出现错误'
    }
}

answerQuestion(testQuestion)
     .then(answer => {
        console.log('问题：',testQuestion)
        console.log('回答：',answer)
     })
