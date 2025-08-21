const sleep = ms=> new Promise(r => setTimeout(r, ms))

async function fetchData() {
    const seq = [
        {color: 'red',ms: 1000},
        {color: 'yellow',ms: 3000},
        {color: 'green',ms: 2000}
    ]

    while(true)
    {
        for(const item of seq)
        {
            console.log(item.color)
            await sleep(item.ms)
        }
    }
}

fetchData()

