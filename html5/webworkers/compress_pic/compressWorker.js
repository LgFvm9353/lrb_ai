

self.onmessage = async function(e){
    const {imgData,quality=0.8} = e.data
    try {
       // 转成位图  base64 -> bitmap
       // blob 二进制
       // console.log(await fetch(imgData))  // 返回Promise 解析为Response对象
       // console.log(await (await fetch(imgData)).blob()) // 解析为Blob对象

       const imgBitmap = await createImageBitmap(await (await fetch(imgData)).blob())
       
       // html5 canvas 画布 位图时少取一些像素

       const canvas = new OffscreenCanvas(imgBitmap.width,imgBitmap.height)
       // 在画之前，得到画画的句柄 2d
       const ctx = canvas.getContext('2d')
       // 从左上角开始画出来
       ctx.drawImage(imgBitmap,0,0)
       // 压缩  canvas -> blob
       const compressedBlob = await canvas.convertToBlob({
            type: 'image/jpeg',
            quality: quality
       })
       const reader = new FileReader()
       reader.readAsDataURL(compressedBlob)
       reader.onloadend = ()=>{
        // console.log(reader.result)
        // resolve(reader.result)
        self.postMessage({
            success: true,
            data: reader.result
        })
       }
      
    }catch(err)
    {
        self.postMessage({
            success: false,
            error: err
        })

    }
}