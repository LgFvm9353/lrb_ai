"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { 
    type HashWorkerIn,
    type HashWorkerOut 
} from '../hash.worker';

const CHUNK_SIZE = 1024 * 1024 * 5;  // 5M 一片
const MAX_CONCURRENCY = 4 // 最大并发数

const Upload = () => {
  const [hash,setHash] = useState<string>('');
  const [file,setFile] = useState<File | null>(null);
  const [status,setStatus] = useState<string>('');
  const workerRef = useRef<Worker | null>(null);

  const totalChunks = useMemo(()=>{
    return file ? Math.ceil(file.size / CHUNK_SIZE) : 0
  },[file])
  
  useEffect(()=>{
    const worker = new Worker(new URL('../hash.worker.ts', import.meta.url));
    workerRef.current = worker;
    worker.onmessage = (e: MessageEvent<HashWorkerOut>) => {
        const msg = e.data 
        if(msg.type === 'PROGRESS'){
            setStatus(`计算哈希中... ${(msg.progress * 100).toFixed(2)}%`)
        }
        if(msg.type === 'DONE'){
            setHash(msg.hash)
            setStatus(`哈希值：${msg.hash}`)
        }
    }
    return ()=>{
        workerRef.current?.terminate();
        workerRef.current = null;
    }
  },[])
  
  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setStatus('计算哈希中...');
    workerRef.current?.postMessage({
      type: 'HASH',
      file: f,
      chunkSize: CHUNK_SIZE,
    } as HashWorkerIn)
    setStatus('上传中...');
  },[])

  // 点击文件后，触发文件读取
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if(f){
       handleFile(f)
    }
  }


  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">大文件上传</h1> 
        <label className="block">
          <span className="text-sm text-gray-600">选择文件</span>
          <input 
            type="file" 
            className="mt-2 block w-full cursor-pointer rounded-lg border p-2"
            onChange={onFileChange}
          />  
        </label> 
        {
        file && (
            <div className='rounded-xl border bg-white p-4 shadow'>
                <div className='text-sm text-gray-700'>
                    文件：{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
                {/* <div className='text-sm text-gray-700'>
                    分片大小：{CHUNK_SIZE / (1024 * 1024)} MB
                </div> */}
                <div className='text-sm text-gray-600 mt-2'>
                  {status}
                </div>
            </div>
        )
      }
      </div>
    </main>
  )
}

export default Upload