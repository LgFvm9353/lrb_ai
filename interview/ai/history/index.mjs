import OpenAI from 'openai'

import {
    config
} from 'dotenv'

config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
})
// LLM 聊天  也和 HTTP 一样是无状态的
// LLM 聊天历史需要我们自己管理
const messages = [
    {
        role: 'system',
        content: '你是一个友好助教。'
    }
] 
async function withMemoryChat(userInput){
    messages.push({
        role: 'user',
        content: userInput
    })
    const res = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages
    })

    const reply = res.choices[0].message.content
    messages.push({
        role: 'assistant',
        content: reply
    })
    return reply
}
async function demo(){
    const reply1 = await withMemoryChat('我的名字是归于尽')
    const reply2 = await withMemoryChat('你知道我吗')
    console.log(reply1)
    console.log(reply2)
}
demo()
