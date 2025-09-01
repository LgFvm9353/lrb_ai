import OpenAI from 'openai'

import {
    config
} from 'dotenv'

config()

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
})
let summary = '用户的基本信息'
const messages = [] 

async function smartChart(userInput)
{
    if(messages.length > 10)
    {
        const sumRes = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: '请你总结一下对话的关键信息'
                },
                ...messages
            ]
        })
        summary += sumRes.choices[0].message.content
        messages.splice(0, messages.length) // 清空原会话
    }
     messages.push({
        role: 'user',
        content: userInput
    })

    const res = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `你是一个助教，这是目前的对话总结： ${summary}`
            },
            ...messages
        ]
    })
    const reply = res.choices[0].message.content
    messages.push({
        role: 'assistant',
        content: reply
    })
    console.log('AI回复', reply)
}
