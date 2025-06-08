// 旅行规划页面JavaScript
let currentStep = 1;
const totalSteps = 4;

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePlanningForm();
    setupEventListeners();
    updateProgress();
});

// 初始化表单
function initializePlanningForm() {
    // 设置默认日期
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const nextMonth = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    document.getElementById('startDate').value = nextWeek.toISOString().split('T')[0];
    document.getElementById('endDate').value = nextMonth.toISOString().split('T')[0];
    
    // 初始化预算滑块
    updateBudgetDisplay();
}

// 设置事件监听器
function setupEventListeners() {
    // 预算滑块事件
    const budgetRange = document.getElementById('budgetRange');
    budgetRange.addEventListener('input', updateBudgetDisplay);
    
    // 预算预设按钮事件
    document.querySelectorAll('.budget-preset').forEach(button => {
        button.addEventListener('click', function() {
            const budget = parseInt(this.dataset.budget);
            budgetRange.value = budget;
            updateBudgetDisplay();
            
            // 更新按钮状态
            document.querySelectorAll('.budget-preset').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 表单提交事件
    document.getElementById('planningForm').addEventListener('submit', handleFormSubmit);
    
    // 日期验证
    document.getElementById('startDate').addEventListener('change', validateDates);
    document.getElementById('endDate').addEventListener('change', validateDates);
}

// 更新预算显示
function updateBudgetDisplay() {
    const budgetRange = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');
    const value = parseInt(budgetRange.value);
    
    budgetValue.textContent = formatCurrency(value);
    
    // 更新预设按钮状态
    document.querySelectorAll('.budget-preset').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.budget) === value) {
            btn.classList.add('active');
        }
    });
}

// 验证日期
function validateDates() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (startDate < today) {
        showNotification('出发日期不能早于今天', 'error');
        document.getElementById('startDate').value = today.toISOString().split('T')[0];
        return false;
    }
    
    if (endDate <= startDate) {
        showNotification('返回日期必须晚于出发日期', 'error');
        const nextDay = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
        document.getElementById('endDate').value = nextDay.toISOString().split('T')[0];
        return false;
    }
    
    return true;
}

// 下一步
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    }
}

// 上一步
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
    }
}

// 显示指定步骤
function showStep(step) {
    // 隐藏所有步骤
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // 显示当前步骤
    const currentStepEl = document.querySelector(`[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }
    
    // 更新进度指示器
    document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
        stepEl.classList.remove('active', 'completed');
        if (index + 1 < step) {
            stepEl.classList.add('completed');
        } else if (index + 1 === step) {
            stepEl.classList.add('active');
        }
    });
}

// 更新进度条
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const percentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${percentage}%`;
}

// 验证当前步骤
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return validateStep4();
        default:
            return true;
    }
}

// 验证第一步：目的地信息
function validateStep1() {
    const destination = document.getElementById('destination').value.trim();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!destination) {
        showNotification('请输入目的地', 'error');
        document.getElementById('destination').focus();
        return false;
    }
    
    if (!startDate || !endDate) {
        showNotification('请选择出行日期', 'error');
        return false;
    }
    
    return validateDates();
}

// 验证第二步：预算设置
function validateStep2() {
    const travelers = document.getElementById('travelers').value;
    
    if (!travelers) {
        showNotification('请选择出行人数', 'error');
        document.getElementById('travelers').focus();
        return false;
    }
    
    return true;
}

// 验证第三步：兴趣偏好
function validateStep3() {
    const interests = document.querySelectorAll('input[name="interests"]:checked');
    const travelStyle = document.getElementById('travelStyle').value;
    
    if (interests.length === 0) {
        showNotification('请至少选择一个兴趣偏好', 'error');
        return false;
    }
    
    if (!travelStyle) {
        showNotification('请选择旅行风格', 'error');
        document.getElementById('travelStyle').focus();
        return false;
    }
    
    return true;
}

// 验证第四步：特殊需求
function validateStep4() {
    const accommodation = document.getElementById('accommodation').value;
    const transportation = document.getElementById('transportation').value;
    
    if (!accommodation) {
        showNotification('请选择住宿偏好', 'error');
        document.getElementById('accommodation').focus();
        return false;
    }
    
    if (!transportation) {
        showNotification('请选择交通偏好', 'error');
        document.getElementById('transportation').focus();
        return false;
    }
    
    return true;
}

// 处理表单提交
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateCurrentStep()) {
        return;
    }
    
    // 收集表单数据
    const formData = collectFormData();
    
    // 显示加载状态
    showLoading('AI正在为您精心规划旅程...');
    
    try {
        // 生成旅行计划
        const travelPlan = await generateTravelPlan(formData);
        
        // 保存计划数据
        saveTravelPlan(travelPlan);
        
        // 跳转到结果页面
        window.location.href = 'result.html';
        
    } catch (error) {
        console.error('生成旅行计划失败:', error);
        hideLoading();
        showNotification('生成旅行计划失败，请稍后重试', 'error');
    }
}

// 收集表单数据
function collectFormData() {
    const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
        .map(input => input.value);
    
    return {
        destination: document.getElementById('destination').value.trim(),
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        budget: parseInt(document.getElementById('budgetRange').value),
        travelers: document.getElementById('travelers').value,
        interests: interests,
        travelStyle: document.getElementById('travelStyle').value,
        accommodation: document.getElementById('accommodation').value,
        transportation: document.getElementById('transportation').value,
        specialRequests: document.getElementById('specialRequests').value.trim()
    };
}

// 生成旅行计划
async function generateTravelPlan(formData) {
    // 构建AI提示词
    const prompt = buildPrompt(formData);
    
    try {
        // 尝试调用DeepSeek API
        const aiResponse = await callDeepSeekAPI(prompt);
        return parseAIResponse(aiResponse, formData);
    } catch (error) {
        console.warn('AI API调用失败，使用模拟数据:', error);
        // 降级到模拟数据
        return generateMockTravelPlan(formData);
    }
}

// 构建AI提示词
function buildPrompt(formData) {
    const days = calculateDays(formData.startDate, formData.endDate);
    
    return `请为以下旅行需求生成详细的旅行计划：

目的地：${formData.destination}
出行时间：${formData.startDate} 至 ${formData.endDate}（共${days}天）
预算：${formatCurrency(formData.budget)}
出行人数：${formData.travelers}
兴趣偏好：${formData.interests.join('、')}
旅行风格：${formData.travelStyle}
住宿偏好：${formData.accommodation}
交通偏好：${formData.transportation}
特殊要求：${formData.specialRequests || '无'}

请生成包含以下内容的旅行计划：
1. 每日详细行程安排（包括时间、地点、活动、费用）
2. 预算分析（住宿、交通、餐饮、景点、购物等分类）
3. 推荐景点列表（包括评分、特色、门票价格）
4. 实用旅行贴士（天气、交通、美食、注意事项等）

请以结构化的方式组织信息，确保内容详细且实用。`;
}

// 解析AI响应
function parseAIResponse(aiResponse, formData) {
    try {
        // 尝试解析JSON响应
        const parsed = JSON.parse(aiResponse);
        return {
            ...parsed,
            formData: formData,
            generatedAt: new Date().toISOString()
        };
    } catch (error) {
        // 如果不是JSON格式，使用文本解析
        return parseTextResponse(aiResponse, formData);
    }
}

// 解析文本响应
function parseTextResponse(textResponse, formData) {
    // 这里可以添加更复杂的文本解析逻辑
    // 目前返回模拟数据作为降级方案
    return generateMockTravelPlan(formData);
}

// 生成模拟旅行计划
function generateMockTravelPlan(formData) {
    const days = calculateDays(formData.startDate, formData.endDate);
    const dailyBudget = Math.floor(formData.budget / days);
    
    // 生成每日行程
    const itinerary = [];
    for (let i = 0; i < days; i++) {
        const date = new Date(formData.startDate);
        date.setDate(date.getDate() + i);
        
        itinerary.push({
            day: i + 1,
            date: date.toISOString().split('T')[0],
            title: i === 0 ? '抵达与初探' : i === days - 1 ? '告别之旅' : `第${i + 1}天探索`,
            weather: '晴天，20-25°C',
            activities: generateDayActivities(formData, i + 1, dailyBudget)
        });
    }
    
    // 生成预算分析
    const budget = generateBudgetAnalysis(formData.budget);
    
    // 生成推荐景点
    const recommendations = generateRecommendations(formData);
    
    // 生成旅行贴士
    const tips = generateTravelTips(formData);
    
    return {
        formData: formData,
        overview: {
            destination: formData.destination,
            duration: `${days}天${days - 1}夜`,
            dates: `${formatDate(formData.startDate)} - ${formatDate(formData.endDate)}`,
            totalBudget: formData.budget,
            weather: '晴天为主，20-25°C'
        },
        itinerary: itinerary,
        budget: budget,
        recommendations: recommendations,
        tips: tips,
        generatedAt: new Date().toISOString()
    };
}

// 生成每日活动
function generateDayActivities(formData, day, dailyBudget) {
    const activities = [
        {
            time: '09:00',
            name: day === 1 ? '抵达目的地' : '游览西湖',
            description: day === 1 ? '抵达机场/车站，前往酒店办理入住' : '探索西湖的魅力，感受江南水乡的韵味',
            cost: day === 1 ? '¥0' : '¥85'
        },
        {
            time: '14:00',
            name: day === 1 ? '参观灵隐寺' : '品尝当地美食',
            description: day === 1 ? '感受千年古刹的宁静与庄严' : '体验正宗的杭州菜，品味当地特色小吃',
            cost: '¥146'
        },
        {
            time: '18:00',
            name: '漫步千岛湖',
            description: '欣赏湖光山色，享受宁静的黄昏时光',
            cost: '¥168'
        }
    ];
    
    return activities;
}

// 生成预算分析
function generateBudgetAnalysis(totalBudget) {
    return {
        total: totalBudget,
        breakdown: [
            { category: '住宿', amount: Math.floor(totalBudget * 0.35), percentage: 35 },
            { category: '交通', amount: Math.floor(totalBudget * 0.25), percentage: 25 },
            { category: '餐饮', amount: Math.floor(totalBudget * 0.20), percentage: 20 },
            { category: '景点门票', amount: Math.floor(totalBudget * 0.15), percentage: 15 },
            { category: '购物娱乐', amount: Math.floor(totalBudget * 0.05), percentage: 5 }
        ]
    };
}

// 生成推荐景点
function generateRecommendations(formData) {
    return [
        {
            name: '西湖',
            rating: 4.8,
            description: '杭州最著名的景点，被誉为"人间天堂"',
            price: '免费',
            image: 'https://via.placeholder.com/300x200?text=西湖',
            highlights: ['断桥残雪', '雷峰塔', '三潭印月']
        },
        {
            name: '灵隐寺',
            rating: 4.6,
            description: '千年古刹，佛教文化圣地',
            price: '¥45',
            image: 'https://via.placeholder.com/300x200?text=灵隐寺',
            highlights: ['飞来峰', '大雄宝殿', '五百罗汉']
        },
        {
            name: '千岛湖',
            rating: 4.7,
            description: '山清水秀的人工湖泊，有"天下第一秀水"之称',
            price: '¥150',
            image: 'https://via.placeholder.com/300x200?text=千岛湖',
            highlights: ['游船观光', '森林氧吧', '水上运动']
        }
    ];
}

// 生成旅行贴士
function generateTravelTips(formData) {
    return {
        weather: {
            title: '天气提醒',
            content: '当地气候温和，建议携带轻便外套。雨季注意携带雨具。'
        },
        transportation: {
            title: '交通指南',
            content: '建议使用公共交通工具，地铁和公交车都很便利。打车软件在当地也很普及。'
        },
        food: {
            title: '美食推荐',
            content: '不要错过当地特色菜肴，如西湖醋鱼、龙井虾仁、叫化鸡等。'
        },
        culture: {
            title: '文化礼仪',
            content: '尊重当地文化和习俗，在寺庙等宗教场所保持安静。'
        },
        safety: {
            title: '安全提醒',
            content: '保管好个人财物，避免在人群密集的地方展示贵重物品。'
        },
        shopping: {
            title: '购物建议',
            content: '可以购买当地特产如龙井茶、丝绸制品等作为纪念品。'
        }
    };
}

