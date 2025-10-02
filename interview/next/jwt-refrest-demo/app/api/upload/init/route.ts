import{
    NextRequest,
    NextResponse,
} from 'next/server'
import { 
    ensureUploadDirs,
    readMeta,
    listUploadedChunks,
    fileAlreadyExist,
    writeMeta,
} from '@/lib/upload-server'

export async function POST(req: NextRequest) {
    const {fileHash,fileName,fileSize,chunkSize,totalChunks} = await req.json()

    ensureUploadDirs(fileHash)

    if(fileAlreadyExist(fileHash,fileName)){
        return NextResponse.json({
            complete: true,
            uploaded: [],
            message: '秒传,文件已存在'
        })
    }

    // 端点续传

    const existed = readMeta(fileHash);
    const upLoaded = listUploadedChunks(fileHash);
    const meta = {
        fileName,
        fileSize,
        chunkSize,
        totalChunks,
        uploadedChunks: upLoaded,
        complete: false,
    }
    writeMeta(fileHash, {...(existed || {}),...meta});
    
    return NextResponse.json({
        complete: false,
        uploaded: upLoaded,
        message: '初始化成功'
    })

}