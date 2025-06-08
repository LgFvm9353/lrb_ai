// AI旅游规划师 - 纯前端实现
// DeepSeek API配置
const DEEPSEEK_API_KEY = 'sk-f7b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6b6'; // 请替换为实际的API密钥
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 全局变量
let currentTravelPlan = null;
let isGenerating = false;
let particleAnimation = null;
let currentFormStep = 1;

// 显示旅行规划表单
function showPlanningForm() {
    showModal('planningFormModal');
    resetForm();
}

// 显示模态框
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // 添加显示动画
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

// 隐藏模态框
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// 重置表单
function resetForm() {
    currentFormStep = 1;
    const form = document.getElementById('planningForm');
    if (form) {
        form.reset();
        
        // 重置步骤显示
        const steps = form.querySelectorAll('.form-step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === 0);
        });
        
        // 重置进度条
        updateFormProgress();
        
        // 设置默认日期
        setDefaultDates();
        
        // 初始化预算滑块
        initBudgetSlider();
    }
}

// 设置默认日期
function setDefaultDates() {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const weekAfter = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    document.getElementById('startDate').value = nextWeek.toISOString().split('T')[0];
    document.getElementById('endDate').value = weekAfter.toISOString().split('T')[0];
}

// 初始化预算滑块
function initBudgetSlider() {
    const budgetRange = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');
    
    if (budgetRange && budgetValue) {
        budgetRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            budgetValue.textContent = `¥${value.toLocaleString()}`;
        });
        
        // 预算预设按钮
        const presetButtons = document.querySelectorAll('.budget-preset');
        presetButtons.forEach(button => {
            button.addEventListener('click', function() {
                const budget = parseInt(this.dataset.budget);
                budgetRange.value = budget;
                budgetValue.textContent = `¥${budget.toLocaleString()}`;
                
                // 更新按钮状态
                presetButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// 下一步
function nextFormStep() {
    if (validateCurrentStep()) {
        if (currentFormStep < 4) {
            // 隐藏当前步骤
            document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.remove('active');
            
            // 显示下一步
            currentFormStep++;
            document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.add('active');
            
            // 更新进度
            updateFormProgress();
        }
    }
}

// 上一步
function prevFormStep() {
    if (currentFormStep > 1) {
        // 隐藏当前步骤
        document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.remove('active');
        
        // 显示上一步
        currentFormStep--;
        document.querySelector(`.form-step[data-step="${currentFormStep}"]`).classList.add('active');
        
        // 更新进度
        updateFormProgress();
    }
}

// 验证当前步骤
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentFormStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            showNotification(`请填写${field.previousElementSibling.textContent}`, 'error');
            return false;
        }
    }
    
    // 特殊验证
    if (currentFormStep === 1) {
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);
        
        if (startDate >= endDate) {
            showNotification('结束日期必须晚于开始日期', 'error');
            return false;
        }
        
        if (startDate < new Date()) {
            showNotification('开始日期不能早于今天', 'error');
            return false;
        }
    }
    
    if (currentFormStep === 3) {
        const checkedInterests = currentStepElement.querySelectorAll('input[name="interests"]:checked');
        if (checkedInterests.length === 0) {
            showNotification('请至少选择一个兴趣偏好', 'error');
            return false;
        }
    }
    
    return true;
}

// 更新表单进度
function updateFormProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    if (progressFill) {
        const progress = (currentFormStep / 4) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    progressSteps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentFormStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentFormStep) {
            step.classList.add('active');
        }
    });
}

// 收集表单数据
function collectFormData() {
    const formData = {
        destination: document.getElementById('destination').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        budget: parseInt(document.getElementById('budgetRange').value),
        travelers: document.getElementById('travelers').value,
        interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value),
        travelStyle: document.getElementById('travelStyle').value,
        accommodation: document.getElementById('accommodation').value,
        transportation: document.getElementById('transportation').value,
        specialRequests: document.getElementById('specialRequests').value
    };
    
    // 计算旅行天数
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    formData.days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return formData;
}

// DeepSeek API调用函数
async function callDeepSeekAPI(messages) {
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.7,
                max_tokens: 2000
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API调用失败: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API调用错误:', error);
        throw error;
    }
}

// 使用DeepSeek生成旅行计划
async function generateTravelPlanWithAI(formData) {
    const prompt = `请为我制定一个详细的旅行计划，要求如下：
目的地：${formData.destination}
旅行天数：${formData.days}天
出行时间：${formData.startDate} 至 ${formData.endDate}
预算：${formData.budget}元
出行人数：${formData.travelers}
兴趣偏好：${formData.interests.join('、')}
旅行风格：${formData.travelStyle}
住宿偏好：${formData.accommodation}
交通偏好：${formData.transportation}
特殊要求：${formData.specialRequests || '无'}

请按照以下JSON格式返回详细的旅行计划：
{
  "destination": "${formData.destination}",
  "duration": ${formData.days},
  "startDate": "${formData.startDate}",
  "endDate": "${formData.endDate}",
  "travelers": "${formData.travelers}",
  "budget": {
    "total": ${formData.budget},
    "breakdown": {
      "transportation": 交通费用,
      "accommodation": 住宿费用,
      "food": 餐饮费用,
      "activities": 活动费用
    }
  },
  "itinerary": [
    {
      "day": 1,
      "date": "${formData.startDate}",
      "theme": "抵达与初探",
      "activities": [
        {
          "time": "09:00",
          "activity": "具体活动",
          "location": "地点",
          "duration": "时长",
          "cost": 费用,
          "description": "详细描述"
        }
      ],
      "weather": {
        "condition": "天气状况",
        "temperature": "温度",
        "suggestion": "建议"
      },
      "totalCost": 当日总费用
    }
  ],
  "tips": ["实用贴士1", "实用贴士2"],
  "recommendations": {
    "bestTime": "最佳旅游时间",
    "clothing": "着装建议",
    "transportation": "交通建议",
    "accommodation": "住宿建议"
  }
}

请确保返回的是有效的JSON格式，包含具体的景点、活动、时间安排和费用预算。`;

    const messages = [
        {
            role: 'system',
            content: '你是一个专业的旅游规划师，擅长制定详细的旅行计划。请根据用户需求生成实用的旅行方案。'
        },
        {
            role: 'user',
            content: prompt
        }
    ];

    try {
        const response = await callDeepSeekAPI(messages);
        // 尝试解析JSON响应
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('AI返回的不是有效的JSON格式');
        }
    } catch (error) {
        console.error('AI生成旅行计划失败:', error);
        // 返回模拟数据作为降级方案
        return generateMockTravelPlan(formData);
    }
}

// 模拟数据生成函数（降级方案）
function generateMockTravelPlan(formData) {
    const { destination, days, budget, startDate, endDate, travelers, interests } = formData;
    
    const mockAttractions = {
        "北京": ["故宫", "天安门广场", "长城", "颐和园", "天坛"],
        "上海": ["外滩", "东方明珠", "豫园", "南京路", "田子坊"],
        "杭州": ["西湖", "灵隐寺", "千岛湖", "宋城", "雷峰塔"],
        "成都": ["大熊猫基地", "宽窄巷子", "锦里", "都江堰", "青城山"]
    };

    const attractions = mockAttractions[destination] || mockAttractions["北京"];
    
    return {
        destination: destination,
        duration: days,
        startDate: startDate,
        endDate: endDate,
        travelers: travelers,
        budget: {
            total: budget,
            breakdown: {
                transportation: Math.floor(budget * 0.3),
                accommodation: Math.floor(budget * 0.35),
                food: Math.floor(budget * 0.25),
                activities: Math.floor(budget * 0.1)
            }
        },
        itinerary: Array.from({length: days}, (_, i) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);
            
            return {
                day: i + 1,
                date: currentDate.toISOString().split('T')[0],
                theme: i === 0 ? "抵达与初探" : i === days - 1 ? "告别之旅" : `第${i + 1}天探索`,
                activities: [
                    {
                        time: "09:00",
                        activity: `游览${attractions[i % attractions.length]}`,
                        location: attractions[i % attractions.length],
                        duration: "2-3小时",
                        cost: 50 + Math.floor(Math.random() * 100),
                        description: `探索${attractions[i % attractions.length]}的魅力`
                    },
                    {
                        time: "14:00",
                        activity: `参观${attractions[(i + 1) % attractions.length]}`,
                        location: attractions[(i + 1) % attractions.length],
                        duration: "2-3小时",
                        cost: 60 + Math.floor(Math.random() * 120),
                        description: `深度体验${attractions[(i + 1) % attractions.length]}`
                    }
                ],
                weather: {
                    condition: ["晴朗", "多云", "小雨"][Math.floor(Math.random() * 3)],
                    temperature: "20-25°C",
                    suggestion: "适合户外活动"
                },
                totalCost: Math.floor(budget / days)
            };
        }),
        tips: [
            `建议提前预订${destination}的热门景点门票`,
            "随身携带身份证件和现金",
            "关注天气变化，准备相应的衣物",
            "尊重当地文化习俗，保护环境"
        ],
        recommendations: {
            bestTime: `春秋季节是${destination}的最佳旅游时间`,
            clothing: "建议穿着舒适的运动鞋和轻便服装",
            transportation: "建议选择高铁或飞机出行",
            accommodation: "推荐选择市中心或景区附近的酒店"
        }
    };
}

// 页面切换功能
function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        
        // 添加页面切换动画
        targetPage.style.opacity = '0';
        targetPage.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetPage.style.transition = 'all 0.3s ease';
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 10);
    }
    
    // 更新导航状态
    updateNavigation(pageId);
}

// 更新导航状态
function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(activePageId)) {
            link.classList.add('active');
        }
    });
}

// 生成旅行计划（主函数）
async function generateTravelPlan() {
    if (isGenerating) return;
    
    // 验证表单
    if (!validateCurrentStep()) {
        return;
    }
    
    isGenerating = true;
    
    try {
        // 收集表单数据
        const formData = collectFormData();
        
        // 隐藏表单模态框
        hideModal('planningFormModal');
        
        // 显示结果页面
        showPage('resultPage');
        showLoadingState('AI正在为您精心规划旅程...');
        
        // 尝试使用DeepSeek AI生成计划
        let travelPlan;
        try {
            travelPlan = await generateTravelPlanWithAI(formData);
            showNotification('已使用AI生成专属旅行计划！', 'success');
        } catch (aiError) {
            console.log('AI生成失败，使用模拟数据:', aiError);
            travelPlan = generateMockTravelPlan(formData);
            showNotification('使用模拟数据生成旅行计划', 'info');
        }
        
        currentTravelPlan = travelPlan;
        
        // 隐藏加载状态
        hideLoadingState();
        
        // 显示结果
        displayTravelPlan(travelPlan);
        
        // 添加庆祝动画
        createCelebrationEffect();
        
    } catch (error) {
        console.error('生成旅行计划失败:', error);
        hideLoadingState();
        showNotification('生成旅行计划失败，请稍后重试', 'error');
    } finally {
        isGenerating = false;
    }
}

// 显示加载状态
function showLoadingState(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingState';
    loadingDiv.className = 'loading-state';
    loadingDiv.innerHTML = `
        <div class="loading-spinner"></div>
        <p class="loading-message">${message}</p>
        <div class="loading-progress">
            <div class="progress-bar"></div>
        </div>
    `;
    
    const resultPage = document.getElementById('resultPage');
    if (resultPage) {
        resultPage.innerHTML = '';
        resultPage.appendChild(loadingDiv);
        
        // 启动进度条动画
        setTimeout(() => {
            const progressBar = loadingDiv.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = '100%';
            }
        }, 100);
    }
}

// 隐藏加载状态
function hideLoadingState() {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
        loadingState.remove();
    }
}

// 显示旅行计划
function displayTravelPlan(plan) {
    const resultPage = document.getElementById('resultPage');
    if (!resultPage || !plan) return;
    
    resultPage.innerHTML = `
        <div class="travel-plan-container">
            <div class="plan-header">
                <h2>您的专属旅行计划</h2>
                <div class="plan-actions">
                    <button class="action-btn ai-btn" onclick="showAIChat()">
                        <i class="icon">🤖</i> AI助手
                    </button>
                    <button class="action-btn export-btn" onclick="exportPlan()">
                        <i class="icon">📥</i> 导出计划
                    </button>
                    <button class="action-btn new-btn" onclick="showPage('homePage')">
                        <i class="icon">➕</i> 新计划
                    </button>
                </div>
            </div>
            
            <div class="plan-tabs">
                <button class="tab-btn active" onclick="showPlanTab('overview')">
                    <i class="icon">👁️</i> 概览
                </button>
                <button class="tab-btn" onclick="showPlanTab('itinerary')">
                    <i class="icon">📅</i> 行程
                </button>
                <button class="tab-btn" onclick="showPlanTab('budget')">
                    <i class="icon">💰</i> 预算
                </button>
                <button class="tab-btn" onclick="showPlanTab('tips')">
                    <i class="icon">💡</i> 贴士
                </button>
            </div>
            
            <div class="plan-content">
                <div id="overview-tab" class="tab-content active">
                    ${generateOverviewHTML(plan)}
                </div>
                <div id="itinerary-tab" class="tab-content">
                    ${generateItineraryHTML(plan)}
                </div>
                <div id="budget-tab" class="tab-content">
                    ${generateBudgetHTML(plan)}
                </div>
                <div id="tips-tab" class="tab-content">
                    ${generateTipsHTML(plan)}
                </div>
            </div>
        </div>
    `;
}

// 生成概览HTML
function generateOverviewHTML(plan) {
    return `
        <div class="overview-section">
            <div class="destination-card">
                <div class="destination-icon">📍</div>
                <div class="destination-info">
                    <h3>${plan.destination}</h3>
                    <p>${plan.duration}天${plan.duration - 1}夜</p>
                </div>
            </div>
            
            <div class="overview-stats">
                <div class="stat-item">
                    <div class="stat-icon">📅</div>
                    <div class="stat-info">
                        <span class="stat-label">出行时间</span>
                        <span class="stat-value">${plan.itinerary[0]?.date} - ${plan.itinerary[plan.itinerary.length - 1]?.date}</span>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">💰</div>
                    <div class="stat-info">
                        <span class="stat-label">预计总费用</span>
                        <span class="stat-value">¥${plan.budget.total.toLocaleString()}</span>
                    </div>
                </div>
                <div class="stat-item">
                    <div class="stat-icon">🌤️</div>
                    <div class="stat-info">
                        <span class="stat-label">天气</span>
                        <span class="stat-value">${plan.itinerary[0]?.weather?.condition || '晴朗'}, ${plan.itinerary[0]?.weather?.temperature || '25-30°C'}</span>
                    </div>
                </div>
            </div>
            
            <div class="highlights-section">
                <h4>⭐ 行程亮点</h4>
                <div class="highlights-grid">
                    ${plan.itinerary.slice(0, 5).map((day, index) => `
                        <div class="highlight-item">
                            <div class="highlight-day">第${day.day}天</div>
                            <div class="highlight-theme">${day.theme}</div>
                            <div class="highlight-activities">${day.activities.length}个活动</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="quick-actions">
                <button class="quick-action-btn" onclick="showPlanTab('itinerary')">
                    <i class="icon">📋</i> 查看详细行程
                </button>
                <button class="quick-action-btn" onclick="showPlanTab('budget')">
                    <i class="icon">💳</i> 预算分析
                </button>
            </div>
        </div>
    `;
}

// 生成行程HTML
function generateItineraryHTML(plan) {
    return `
        <div class="itinerary-section">
            ${plan.itinerary.map(day => `
                <div class="day-card">
                    <div class="day-header">
                        <h3>第${day.day}天 - ${day.theme}</h3>
                        <div class="day-meta">
                            <span class="day-date">${day.date}</span>
                            <span class="day-weather">
                                <i class="weather-icon">🌤️</i>
                                ${day.weather?.condition || '晴朗'} ${day.weather?.temperature || '25-30°C'}
                            </span>
                            <span class="day-cost">当日花费 ¥${day.totalCost || Math.floor(plan.budget.total / plan.duration)}</span>
                        </div>
                    </div>
                    
                    <div class="activities-timeline">
                        ${day.activities.map(activity => `
                            <div class="activity-item">
                                <div class="activity-time">
                                    <i class="time-icon">🕘</i>
                                    ${activity.time}
                                </div>
                                <div class="activity-content">
                                    <h4>${activity.activity}</h4>
                                    <div class="activity-details">
                                        <span class="activity-location">
                                            <i class="location-icon">📍</i>
                                            ${activity.location}
                                        </span>
                                        <span class="activity-duration">
                                            <i class="duration-icon">⏱️</i>
                                            预计用时: ${activity.duration}
                                        </span>
                                        <span class="activity-cost">¥${activity.cost}</span>
                                    </div>
                                    <p class="activity-description">${activity.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    ${day.weather?.suggestion ? `
                        <div class="day-suggestion">
                            <i class="suggestion-icon">💡</i>
                            <span>${day.weather.suggestion}</span>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    `;
}

// 生成预算HTML
function generateBudgetHTML(plan) {
    const budget = plan.budget;
    return `
        <div class="budget-section">
            <div class="budget-overview">
                <h3>预算总览</h3>
                <div class="total-budget">¥${budget.total.toLocaleString()}</div>
            </div>
            
            <div class="budget-breakdown">
                <h4>费用分解</h4>
                <div class="budget-items">
                    <div class="budget-item">
                        <div class="budget-category">
                            <i class="category-icon">✈️</i>
                            <span>交通费用</span>
                        </div>
                        <div class="budget-amount">¥${budget.breakdown.transportation}</div>
                        <div class="budget-percentage">${Math.round(budget.breakdown.transportation / budget.total * 100)}%</div>
                        <div class="budget-bar">
                            <div class="budget-progress" style="width: ${budget.breakdown.transportation / budget.total * 100}%"></div>
                        </div>
                    </div>
                    
                    <div class="budget-item">
                        <div class="budget-category">
                            <i class="category-icon">🏨</i>
                            <span>住宿费用</span>
                        </div>
                        <div class="budget-amount">¥${budget.breakdown.accommodation}</div>
                        <div class="budget-percentage">${Math.round(budget.breakdown.accommodation / budget.total * 100)}%</div>
                        <div class="budget-bar">
                            <div class="budget-progress" style="width: ${budget.breakdown.accommodation / budget.total * 100}%"></div>
                        </div>
                    </div>
                    
                    <div class="budget-item">
                        <div class="budget-category">
                            <i class="category-icon">🍽️</i>
                            <span>餐饮费用</span>
                        </div>
                        <div class="budget-amount">¥${budget.breakdown.food}</div>
                        <div class="budget-percentage">${Math.round(budget.breakdown.food / budget.total * 100)}%</div>
                        <div class="budget-bar">
                            <div class="budget-progress" style="width: ${budget.breakdown.food / budget.total * 100}%"></div>
                        </div>
                    </div>
                    
                    <div class="budget-item">
                        <div class="budget-category">
                            <i class="category-icon">🎭</i>
                            <span>活动费用</span>
                        </div>
                        <div class="budget-amount">¥${budget.breakdown.activities}</div>
                        <div class="budget-percentage">${Math.round(budget.breakdown.activities / budget.total * 100)}%</div>
                        <div class="budget-bar">
                            <div class="budget-progress" style="width: ${budget.breakdown.activities / budget.total * 100}%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="budget-tips">
                <h4>省钱小贴士</h4>
                <ul class="tips-list">
                    <li>提前预订机票和酒店可享受早鸟优惠</li>
                    <li>选择当地特色小吃，既经济又体验文化</li>
                    <li>购买景点联票通常比单独购票更划算</li>
                    <li>关注各大平台的旅游促销活动</li>
                </ul>
            </div>
        </div>
    `;
}

// 生成贴士HTML
function generateTipsHTML(plan) {
    return `
        <div class="tips-section">
            <div class="practical-tips">
                <h4>实用贴士</h4>
                <ul class="tips-list">
                    ${plan.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recommendations">
                <h4>推荐建议</h4>
                <div class="recommendation-cards">
                    <div class="recommendation-card">
                        <div class="rec-icon">🌟</div>
                        <div class="rec-content">
                            <h5>最佳时间</h5>
                            <p>${plan.recommendations.bestTime}</p>
                        </div>
                    </div>
                    
                    <div class="recommendation-card">
                        <div class="rec-icon">👕</div>
                        <div class="rec-content">
                            <h5>着装建议</h5>
                            <p>${plan.recommendations.clothing}</p>
                        </div>
                    </div>
                    
                    <div class="recommendation-card">
                        <div class="rec-icon">🚗</div>
                        <div class="rec-content">
                            <h5>交通建议</h5>
                            <p>${plan.recommendations.transportation}</p>
                        </div>
                    </div>
                    
                    <div class="recommendation-card">
                        <div class="rec-icon">🏠</div>
                        <div class="rec-content">
                            <h5>住宿建议</h5>
                            <p>${plan.recommendations.accommodation}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 切换计划标签
function showPlanTab(tabName) {
    // 隐藏所有标签内容
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 移除所有标签按钮的激活状态
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示目标标签内容
    const targetContent = document.getElementById(`${tabName}-tab`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    // 激活对应的标签按钮
    const targetBtn = document.querySelector(`.tab-btn[onclick="showPlanTab('${tabName}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
}

// 显示通知
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建新通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</i>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 自动移除通知
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// 庆祝动画效果
function createCelebrationEffect() {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// 主题切换功能
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        showNotification('已切换到浅色主题', 'info');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        showNotification('已切换到深色主题', 'info');
    }
}

// AI聊天功能（占位符）
function showAIChat() {
    showNotification('AI聊天功能开发中...', 'info');
}

// 导出计划功能
function exportPlan() {
    if (!currentTravelPlan) {
        showNotification('没有可导出的旅行计划', 'error');
        return;
    }
    
    const planText = `
AI智能旅游规划师 - 旅行计划

目的地：${currentTravelPlan.destination}
旅行天数：${currentTravelPlan.duration}天
预算总计：¥${currentTravelPlan.budget.total}

详细行程：
${currentTravelPlan.itinerary.map(day => `
第${day.day}天 - ${day.theme} (${day.date})
${day.activities.map(activity => `  ${activity.time} ${activity.activity} - ${activity.location}`).join('\n')}
当日费用：¥${day.totalCost || Math.floor(currentTravelPlan.budget.total / currentTravelPlan.duration)}
`).join('\n')}

实用贴士：
${currentTravelPlan.tips.map(tip => `• ${tip}`).join('\n')}
    `.trim();
    
    const blob = new Blob([planText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTravelPlan.destination}旅行计划.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('旅行计划已导出', 'success');
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 恢复主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // 显示首页
    showPage('homePage');
    
    // 显示欢迎通知
    setTimeout(() => {
        showNotification('欢迎使用AI智能旅游规划师！', 'success');
    }, 1000);
    
    // 绑定导航事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                const pageId = href.replace('#', '') + 'Page';
                showPage(pageId);
            }
        });
    });
    
    // 绑定主题切换按钮
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 绑定表单提交事件
    const planningForm = document.getElementById('planningForm');
    if (planningForm) {
        planningForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateTravelPlan();
        });
    }
    
    // 点击模态框背景关闭
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            hideModal(modalId);
        }
    });
});

// 导出全局函数供HTML调用
window.showPage = showPage;
window.generateTravelPlan = generateTravelPlan;
window.showPlanTab = showPlanTab;
window.toggleTheme = toggleTheme;
window.showAIChat = showAIChat;
window.exportPlan = exportPlan;
window.showPlanningForm = showPlanningForm;
window.showModal = showModal;
window.hideModal = hideModal;
window.nextFormStep = nextFormStep;
window.prevFormStep = prevFormStep;

