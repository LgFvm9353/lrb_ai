import OpenAI from 'openai'

const client = new OpenAI({
    apiKey: 'sk-BL1KR0dYru4uBjaQ9WCR20BrWd1KAWq8Lx5iq2yOl8tOXrbq',
    baseURL: 'https://api.302.ai/v1',
})
const getWeather = async(city)=>{
    return {
        city,
        temp: '28',
        condition: 'Sunny',
    }
}
async function main() {
    const resp = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: "今天抚州天气怎么样?"
            }
        ],
        // LLM 使用的工具
        tools: [
            {
                type: 'function',
                function: {
                    name: "getWeather",
                    description: "获取某个城市的天气",
                    parameters: {
                        type: "object",
                        properties: {
                            city: {
                                type: "string"
                            }
                        },
                        required: ["city"]
                    }
                }
            }
        ]
    });

    const toolCall = resp.choices[0].message.tool_calls?.[0];
    // console.log("大模型想调用", toolCall);
    if(toolCall?.function.name === 'getWeather'){
        const args = JSON.parse(toolCall.function.arguments);
        const weather = await getWeather(args.city);

        const secondResp = await client.chat.completions.create({
             model: 'gpt-4o',
             messages:[
                {
                    role: 'user',
                    content: `城市${args.city}的天气`
                },
                resp.choices[0].message,
                {
                    role: 'tool',
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(weather)
                }

             ],
        });
        console.log(secondResp.choices[0].message.content);

    }

}


main()