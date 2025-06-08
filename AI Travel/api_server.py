#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI旅游规划师后端API服务
提供天气查询、景点推荐等功能
"""

import sys
import json
import random
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS

# 添加API客户端路径
sys.path.append('/opt/.manus/.sandbox-runtime')

try:
    from data_api import ApiClient
    api_client = ApiClient()
    API_AVAILABLE = True
except ImportError:
    print("Warning: API client not available, using mock data")
    API_AVAILABLE = False

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 模拟景点数据
MOCK_ATTRACTIONS = {
    "北京": [
        {"name": "故宫", "type": "历史文化", "rating": 4.8, "price": 60, "description": "明清两朝的皇家宫殿"},
        {"name": "天安门广场", "type": "历史文化", "rating": 4.7, "price": 0, "description": "世界最大的城市广场"},
        {"name": "长城", "type": "历史文化", "rating": 4.9, "price": 45, "description": "世界文化遗产，中华民族的象征"},
        {"name": "颐和园", "type": "园林景观", "rating": 4.6, "price": 30, "description": "中国古典园林的典范"}
    ],
    "上海": [
        {"name": "外滩", "type": "城市景观", "rating": 4.7, "price": 0, "description": "上海的标志性景观"},
        {"name": "东方明珠", "type": "现代建筑", "rating": 4.5, "price": 180, "description": "上海的地标性建筑"},
        {"name": "豫园", "type": "园林景观", "rating": 4.4, "price": 40, "description": "明代私人花园"},
        {"name": "南京路", "type": "购物娱乐", "rating": 4.3, "price": 0, "description": "中华商业第一街"}
    ],
    "杭州": [
        {"name": "西湖", "type": "自然景观", "rating": 4.8, "price": 0, "description": "人间天堂，世界文化遗产"},
        {"name": "灵隐寺", "type": "宗教文化", "rating": 4.6, "price": 45, "description": "江南著名古刹"},
        {"name": "千岛湖", "type": "自然景观", "rating": 4.7, "price": 150, "description": "秀水千岛，绿色生态"},
        {"name": "宋城", "type": "主题公园", "rating": 4.5, "price": 300, "description": "给我一天，还你千年"}
    ],
    "成都": [
        {"name": "大熊猫基地", "type": "动物园", "rating": 4.8, "price": 58, "description": "国宝大熊猫的家园"},
        {"name": "宽窄巷子", "type": "历史街区", "rating": 4.5, "price": 0, "description": "成都的历史文化名片"},
        {"name": "锦里", "type": "历史街区", "rating": 4.4, "price": 0, "description": "西蜀历史上最古老的街道"},
        {"name": "都江堰", "type": "历史文化", "rating": 4.7, "price": 90, "description": "世界文化遗产，古代水利工程"}
    ]
}

# 模拟天气数据
MOCK_WEATHER = {
    "北京": {"condition": "晴朗", "temperature": "25-30°C", "humidity": "45%", "wind": "东南风2级"},
    "上海": {"condition": "多云", "temperature": "22-28°C", "humidity": "65%", "wind": "东风3级"},
    "杭州": {"condition": "小雨", "temperature": "20-25°C", "humidity": "80%", "wind": "南风2级"},
    "成都": {"condition": "阴天", "temperature": "18-24°C", "humidity": "70%", "wind": "无风"}
}

@app.route('/api/weather', methods=['GET'])
def get_weather():
    """获取天气信息"""
    location = request.args.get('location', '北京')
    
    try:
        if API_AVAILABLE:
            # 尝试使用真实API
            weather_data = api_client.call_api('WeatherBank/get_weather', query={'location': location})
            return jsonify({
                'success': True,
                'data': weather_data,
                'source': 'api'
            })
        else:
            # 使用模拟数据
            weather_data = MOCK_WEATHER.get(location, MOCK_WEATHER["北京"])
            return jsonify({
                'success': True,
                'data': weather_data,
                'source': 'mock'
            })
    except Exception as e:
        # 出错时返回模拟数据
        weather_data = MOCK_WEATHER.get(location, MOCK_WEATHER["北京"])
        return jsonify({
            'success': True,
            'data': weather_data,
            'source': 'mock',
            'note': f'API error: {str(e)}'
        })

@app.route('/api/attractions', methods=['GET'])
def get_attractions():
    """获取景点推荐"""
    location = request.args.get('location', '北京')
    attraction_type = request.args.get('type', '')
    limit = int(request.args.get('limit', 10))
    
    try:
        # 获取景点数据
        attractions = MOCK_ATTRACTIONS.get(location, MOCK_ATTRACTIONS["北京"])
        
        # 按类型筛选
        if attraction_type:
            attractions = [attr for attr in attractions if attraction_type in attr['type']]
        
        # 限制数量
        attractions = attractions[:limit]
        
        # 添加随机推荐分数
        for attraction in attractions:
            attraction['recommendation_score'] = round(random.uniform(0.8, 1.0), 2)
            attraction['estimated_time'] = random.choice(['2-3小时', '3-4小时', '半天', '一天'])
            attraction['best_time'] = random.choice(['上午', '下午', '傍晚', '全天'])
        
        return jsonify({
            'success': True,
            'data': attractions,
            'total': len(attractions),
            'location': location
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/travel-plan', methods=['POST'])
def generate_travel_plan():
    """生成旅行计划"""
    try:
        data = request.get_json()
        destination = data.get('destination', '北京')
        days = int(data.get('days', 3))
        budget = int(data.get('budget', 3000))
        interests = data.get('interests', [])
        
        # 获取景点数据
        attractions = MOCK_ATTRACTIONS.get(destination, MOCK_ATTRACTIONS["北京"])
        
        # 根据兴趣筛选景点
        if interests:
            filtered_attractions = []
            for attraction in attractions:
                for interest in interests:
                    if interest in attraction['type']:
                        filtered_attractions.append(attraction)
                        break
            if filtered_attractions:
                attractions = filtered_attractions
        
        # 生成行程计划
        plan = generate_detailed_plan(destination, days, budget, attractions)
        
        return jsonify({
            'success': True,
            'data': plan
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

def generate_detailed_plan(destination, days, budget, attractions):
    """生成详细的旅行计划"""
    plan = {
        'destination': destination,
        'duration': days,
        'budget': {
            'total': budget,
            'breakdown': {
                'transportation': int(budget * 0.3),
                'accommodation': int(budget * 0.35),
                'food': int(budget * 0.25),
                'activities': int(budget * 0.1)
            }
        },
        'itinerary': []
    }
    
    # 为每一天生成行程
    for day in range(1, days + 1):
        day_plan = {
            'day': day,
            'date': (datetime.now() + timedelta(days=day-1)).strftime('%Y-%m-%d'),
            'theme': get_day_theme(day, days),
            'activities': [],
            'weather': get_weather_for_day(destination),
            'totalCost': 0
        }
        
        # 为每天选择2-4个景点
        daily_attractions = random.sample(attractions, min(random.randint(2, 4), len(attractions)))
        
        times = ['09:00', '14:00', '18:00', '20:00']
        for i, attraction in enumerate(daily_attractions):
            if i < len(times):
                activity = {
                    'time': times[i],
                    'activity': f"游览{attraction['name']}",
                    'location': attraction['name'],
                    'duration': attraction.get('estimated_time', '2-3小时'),
                    'cost': attraction['price'] + random.randint(50, 200),
                    'description': attraction['description']
                }
                day_plan['activities'].append(activity)
                day_plan['totalCost'] += activity['cost']
        
        plan['itinerary'].append(day_plan)
    
    # 添加实用贴士
    plan['tips'] = [
        f"建议提前预订{destination}的热门景点门票",
        "随身携带身份证件和现金",
        "关注天气变化，准备相应的衣物",
        "尊重当地文化习俗，保护环境",
        "购买旅游保险，确保旅途安全"
    ]
    
    plan['recommendations'] = {
        'bestTime': f"春秋季节是{destination}的最佳旅游时间",
        'clothing': "建议穿着舒适的运动鞋和轻便服装",
        'transportation': "建议选择高铁或飞机出行",
        'accommodation': "推荐选择市中心或景区附近的酒店"
    }
    
    return plan

def get_day_theme(day, total_days):
    """获取每天的主题"""
    themes = [
        "抵达与初探",
        "文化探索",
        "自然风光",
        "休闲体验",
        "深度游览",
        "购物美食",
        "告别之旅"
    ]
    
    if day == 1:
        return "抵达与初探"
    elif day == total_days:
        return "告别之旅"
    else:
        return themes[day % len(themes)]

def get_weather_for_day(destination):
    """获取某天的天气信息"""
    weather = MOCK_WEATHER.get(destination, MOCK_WEATHER["北京"])
    conditions = ["晴朗", "多云", "小雨", "阴天"]
    weather['condition'] = random.choice(conditions)
    
    suggestions = {
        "晴朗": "适合户外活动，注意防晒",
        "多云": "适合游览，天气舒适",
        "小雨": "建议携带雨具，室内活动为主",
        "阴天": "适合参观博物馆等室内景点"
    }
    weather['suggestion'] = suggestions[weather['condition']]
    
    return weather

@app.route('/api/destinations', methods=['GET'])
def get_popular_destinations():
    """获取热门目的地"""
    destinations = [
        {"name": "北京", "type": "历史文化", "rating": 4.8, "image": "beijing.jpg"},
        {"name": "上海", "type": "现代都市", "rating": 4.7, "image": "shanghai.jpg"},
        {"name": "杭州", "type": "自然风光", "rating": 4.8, "image": "hangzhou.jpg"},
        {"name": "成都", "type": "美食文化", "rating": 4.6, "image": "chengdu.jpg"},
        {"name": "西安", "type": "历史古都", "rating": 4.7, "image": "xian.jpg"},
        {"name": "三亚", "type": "海滨度假", "rating": 4.5, "image": "sanya.jpg"}
    ]
    
    return jsonify({
        'success': True,
        'data': destinations
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'api_available': API_AVAILABLE
    })

@app.route('/', methods=['GET'])
def index():
    """API根路径"""
    return jsonify({
        'message': 'AI旅游规划师API服务',
        'version': '1.0.0',
        'endpoints': [
            '/api/weather',
            '/api/attractions',
            '/api/travel-plan',
            '/api/destinations',
            '/api/health'
        ]
    })

if __name__ == '__main__':
    print("启动AI旅游规划师API服务...")
    print("API服务地址: http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5001, debug=True)

