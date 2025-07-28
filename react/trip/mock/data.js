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
    }
]