export type HashWorkerIn = {
    type: 'HASH',
    file: File,
    chunkSize: number,
}

export type HashWorkerOut = {
    type:  'DONE',
    hash: string,
} | {
    type: 'PROGRESS',
    progress: number,
}

async function sha256ArrayBuffer(buf: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', buf);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

self.onmessage = async (e: MessageEvent<HashWorkerIn>) => {
    const msg = e.data
    if(msg.type === 'HASH')
    {
        const { file, chunkSize } = msg
        const total = Math.ceil(file.size / chunkSize)
        // 二进制处理
        // ArrayBuffer 是 JavaScript 中用于表示通用、固定长度的原始二进制数据缓冲区
        // 的一种对象，常用于处理文件、网络数据等底层二进制信息。
        const chunks: ArrayBuffer[] = []

        for(let i = 0; i < total; i++){
            const start = i * chunkSize
            const end = Math.min(start + chunkSize, file.size)
            const chunk = await file.slice(start, end).arrayBuffer()
            chunks.push(chunk)
             // 发送进度
             self.postMessage({
                type: 'PROGRESS',
                progress: (i + 1) / total,
            }as HashWorkerOut)
        }
        
        const whole = new Blob(chunks)
        // whole.arrayBuffer() 会返回一个 Promise
        // 该 Promise 在解析后返回包含 Blob 全部数据的、只读的 ArrayBuffer。
        const hash = await sha256ArrayBuffer(await whole.arrayBuffer())
        self.postMessage({
            type: 'DONE',
            hash,
        }as HashWorkerOut)
    }
}