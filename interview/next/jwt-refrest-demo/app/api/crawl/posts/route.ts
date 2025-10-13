import {
    NextRequest,
    NextResponse
}from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { prisma} from '@/lib/db'
export async function GET(req: NextRequest) {
    try{
      const dataPath = path.join(process.cwd(),'data','posts.json')
      const fileCOntent  = await fs.readFile(dataPath,'utf-8')
      const data = JSON.parse(fileCOntent)
      if(!data.posts || !Array.isArray(data.posts)){
        return NextResponse.json({
          error :'invalid data format'
        },{
            status:400
        })
      }

      const posts = data.posts 
      for(const post of posts){
        const createPost = await prisma.post.create({
          data:{
            title:post.title,
            content:post.content,
            published: true,
            authorId: 1
          }
        })
      }
      return NextResponse.json({
        message:'Posts import completed',
        total:posts.length
      })
    }catch(err){
        console.log(err)
    }
}
