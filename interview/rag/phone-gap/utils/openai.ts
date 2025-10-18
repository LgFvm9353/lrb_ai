import { createOpenAI } from '@ai-sdk/openai'
import "dotenv/config"

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
})

export default openai