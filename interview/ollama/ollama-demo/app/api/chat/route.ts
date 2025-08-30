import type {NextResponse,NextRequest} from 'next/server'

import {
    Message,
    ChatRequest,
    ChatResponse
} from '@/types/chat'

const OLLAMA_API_URL = 'http://localhost:11434/api/chat'
const MODEL_NAME = 'deepseek-r1:1.5b'

export async function POST(request:NextRequest) {
   try{
      const body:{messages:Message[]} = await request.json()
        
      const ollamaReeurstBody:ChatRequest = {
        model:MODEL_NAME,
        messages:body.messages,
        stream:false 
      }

      const response  = await fetch(OLLAMA_API_URL,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(ollamaReeurstBody)
      })

      if(!response.ok)
      {
        const errorText = await response.text()
        return Response.json(
            {error:errorText},
            {status:response.status}
        )
      }

      const ollamaData:ChatResponse = await response.json()
      return Response.json(ollamaData)
   }catch(err)
   {
     console.log('Chat API Error',err)
     return Response.json(
        {error:'Chat API Error'},
        {status:500}
     )
   }
}
