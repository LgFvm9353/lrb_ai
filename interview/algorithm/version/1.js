// 版本号问题

function compareVersion(v1,v2) {
    const v1Arr = v1.split('.').map(Number)
    const v2Arr = v2.split('.').map(Number)
    const len = Math.max(v1Arr.length,v2Arr.length)
    for(let i = 0;i<len;i++)
    {
        const v1Num = v1Arr[i] || 0
        const v2Num = v2Arr[i] || 0
        if(v1Num > v2Num)
        {
            return 1
        }else if(v1Num < v2Num)
        {
            return -1
        }
    }
    return 0
}
console.log(compareVersion('1.0.1','1.0.1.0'))