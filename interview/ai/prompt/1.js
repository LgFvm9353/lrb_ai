class PromptTemplate{
    constructor(template){
        this.template = template
    }
    format(variables)
    {
        let result = this.template
        for (const [key,value] of Object.entries(variables)) {
            result = result.replace(new RegExp(`{${key}}`,'g'),value)
        }
        return result
    }
}
 
const tourismTemplate = new PromptTemplate(`
    你是一名专业的旅游顾问。
    请你帮用户规划{city}的{days}天旅游行程。
    要求：突出{preference},并给出每天的详细安排
`)
const userInput = {
    city: '北京',
    days: 3,
    preference: '历史景点'
}
const finalPrompt = tourismTemplate.format(userInput)
console.log(finalPrompt)