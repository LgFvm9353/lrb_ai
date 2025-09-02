import {
    client,
    cosineSimilarity
} from './llm.mjs'

import fs from 'fs/promises'

const inputFilePath = './data/posts_with_embedding.json'

const data = await fs.readFile(inputFilePath, 'utf-8')
const posts = JSON.parse(data)

// 怎么做检索，还是向量的概念 cosine函数  文本语义化 
// LIKE 文本 的检索 
const response  = await client.embeddings.create({
    model: 'text-embedding-ada-002',
    input: `react,tailwindcss`
})

const {
    embedding
} = response.data[0]

const results = posts.map(item => ({
    ...item,
    similarity: cosineSimilarity(embedding,item.embedding)
}))
 .sort((a, b) => b.similarity - a.similarity)
 .slice(0,3)
 .map((item,index) => `${index+1}.${item.title},${item.category}`)
 .join('\n')
console.log(results)



