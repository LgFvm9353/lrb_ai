import Mock from 'mockjs'
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
     },
    // {
    //    url:"/api/detail/:id",
    //    method:"GET",
    //    timeout:1000,
    //    response: (req,res) => {
    //     // const id = req.params?.id;
    //     return {
    //       code: 0,
    //       message:'success',
    //       data: Mock.mock({
    //         // id,
    //         title: '@ctitle(5,10)',
    //         price: '@integer(60,100)',
    //         desc: '@cparagraph(10-30)',
    //         'images|5': [
    //           {
    //             url: '@image(300x200.@color,#fff,图片)',
    //             alt: '@ctitle(5,10)'
    //           }
    //         ]
    //       })
    //     }
    //   }
    // }
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
    }
]