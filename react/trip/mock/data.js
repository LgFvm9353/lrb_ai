import Mock from 'mockjs'

// 每页 10 张
const getImages = (page = 1, pageSize = 10) => {

    // index是Array.from 方法自动提供的索引，不需要手动初始化，从0开始
    return Array.from({ length: pageSize }, (_, index) => ({
        // 
        id: (page - 1) * pageSize + index + 1,
        height: Mock.Random.integer(300,600),
        url: Mock.Random.image('300x400', Mock.Random.color(), '#fff', 'img')
    }))
}
export default [
    {
        url: '/api/search',
        method: 'GET',
        timeout:1000,
        response: (req,res) => {
            const keyword = req.query.keyword
            return {
                code: 0,
                message: 'success',
                data: {
                    list: Mock.mock({
                        'list|10': [{
                            'title': `${keyword}@ctitle`
                        }]
                    }).list
                }
            }
        }
    },{
        url: '/api/hotList',
        method: 'GET',
        timeout:1000,
        response: (req,res) => {
                return {
                    code: 0,
                    message:'success',
                    data: {
                        list: Mock.mock({
                            'list|5': [{
                                'id|+1': 1,
                                'city': '@city'
                            }]
                        }).list
                    }
                }
        }
     }
    ,{
        url: '/api/detail/:id',
        method: 'get',
        timeout: 1000,
        response: (req, res) => {
            const randomData = Mock.mock({
                title: '@ctitle(5, 10)',
                price: '@integer(60, 100)',
                desc: '@cparagraph(10,30)',
                images: [
                    {
                        url: 'https://img.36krcdn.com/hsossms/20250729/v2_17dc4793268c46558e68355c5b25a55d@000000@ai_oswg369871oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp',
                        alt: '@ctitle(5, 10)'
                    },
                    {
                        url: 'https://img.36krcdn.com/hsossms/20250729/v2_17dc4793268c46558e68355c5b25a55d@000000@ai_oswg369871oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp',
                        alt: '@ctitle(5, 10)'
                    },
                    {
                        url: 'https://img.36krcdn.com/hsossms/20250729/v2_17dc4793268c46558e68355c5b25a55d@000000@ai_oswg369871oswg1536oswg722_img_000~tplv-1marlgjv7f-ai-v3:600:400:600:400:q70.jpg?x-oss-process=image/format,webp',
                        alt: '@ctitle(5, 10)'
                    },
                ]
            })
    
            return {
                code: 0,
                message: 'success',
                data: randomData
            }
        }
    },
    {
        // ?page=1&pageSize=10
        url: '/api/images',
        method: 'GET',
        timeout: 1000,
        response: ({query}) => {
           const page = Number(query.page) || 1; // 当前页码，默认为1
           const pageSize = Number(query.pageSize) || 10; // 每页显示的数量，默认为10
           return {
               code: 0,
               message: 'success',
               data: getImages(page,pageSize)
           }

        }
    }
]