// 增强版JavaScript - 添加更多动画效果和交互体验
// API配置
const API_BASE_URL = 'http://localhost:5001/api';

// 全局变量
let currentTravelPlan = null;
let isGenerating = false;
let particleAnimation = null;

// API调用函数
async function callAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`API调用失败: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API调用错误:', error);
        throw error;
    }
}

// 获取天气信息
async function getWeatherInfo(location) {
    try {
        const result = await callAPI(`/weather?location=${encodeURIComponent(location)}`);
        return result.data;
    } catch (error) {
        console.error('获取天气信息失败:', error);
        return null;
    }
}

// 获取景点推荐
async function getAttractions(location, type = '', limit = 10) {
    try {
        const params = new URLSearchParams({
            location,
            limit: limit.toString()
        });
        if (type) params.append('type', type);
        
        const result = await callAPI(`/attractions?${params}`);
        return result.data;
    } catch (error) {
        console.error('获取景点推荐失败:', error);
        return [];
    }
}

// 获取热门目的地
async function getPopularDestinations() {
    try {
        const result = await callAPI('/destinations');
        return result.data;
    } catch (error) {
        console.error('获取热门目的地失败:', error);
        return [];
    }
}

// 生成旅行计划（使用API）
async function generateTravelPlanAPI(destination, days, budget, interests) {
    try {
        const result = await callAPI('/travel-plan', {
            method: 'POST',
            body: JSON.stringify({
                destination,
                days,
                budget,
                interests
            })
        });
        return result.data;
    } catch (error) {
        console.error('生成旅行计划失败:', error);
        throw error;
    }
}

// 页面切换功能（增强版）
function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.opacity = '0';
        page.style.transform = 'translateY(20px)';
    });
    
    // 显示目标页面（带动画）
    setTimeout(() => {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }
    }, 150);
    
    // 更新导航状态
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // 添加页面切换音效（模拟）
    playSound('page-switch');
}

// 标签页切换功能（增强版）
function showTab(tabId) {
    // 隐藏所有标签内容
    const tabContents = document.querySelectorAll('.tab-pane');
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.opacity = '0';
        content.style.transform = 'translateX(20px)';
    });
    
    // 显示目标标签内容（带动画）
    setTimeout(() => {
        const targetContent = document.getElementById(tabId + 'Content');
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.opacity = '1';
            targetContent.style.transform = 'translateX(0)';
        }
    }, 100);
    
    // 更新标签按钮状态
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });
}

// 模态框控制（增强版）
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);
        
        document.body.style.overflow = 'hidden';
        playSound('modal-open');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
        
        playSound('modal-close');
    }
}

// 通知系统（增强版）
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加进入动画
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    document.body.appendChild(notification);
    
    // 触发进入动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // 自动移除通知
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, duration);
    
    playSound('notification');
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// 主题切换（增强版）
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    // 添加切换动画
    body.style.transition = 'all 0.3s ease';
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeToggle.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
        showNotification('已切换到浅色主题', 'info');
    } else {
        body.classList.add('dark-theme');
        themeToggle.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
        showNotification('已切换到深色主题', 'info');
    }
    
    playSound('theme-switch');
}

// 音效播放（模拟）
function playSound(soundType) {
    // 在实际项目中，这里可以播放真实的音效文件
    console.log(`播放音效: ${soundType}`);
}

// 粒子动画系统
function initParticleAnimation() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            ctx.fill();
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // 初始化粒子
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    resizeCanvas();
    animate();
    
    window.addEventListener('resize', resizeCanvas);
}

// 鼠标跟随效果
function initMouseFollowEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // 鼠标悬停效果
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches('button, a, .clickable')) {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(99, 102, 241, 0.6)';
        }
    });
    
    document.addEventListener('mouseleave', (e) => {
        if (e.target.matches('button, a, .clickable')) {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(99, 102, 241, 0.3)';
        }
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.feature-card, .step-item, .team-member, .value-item');
    animateElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
}

// 打字机效果
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 数字计数动画
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    function updateCounter() {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// 模拟AI响应生成旅行计划（增强版）
function generateMockTravelPlan(userInput) {
    const destinations = ['九寨沟', '张家界', '桂林', '厦门', '三亚', '丽江', '西安', '成都'];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
    
    return {
        destination: randomDestination,
        duration: 5,
        budget: {
            total: 5500,
            breakdown: {
                transportation: 1500,
                accommodation: 2000,
                food: 1200,
                activities: 800
            }
        },
        itinerary: [
            {
                day: 1,
                date: "2025-07-15",
                theme: "抵达与初探",
                activities: [
                    {
                        time: "09:00",
                        activity: "抵达" + randomDestination,
                        location: randomDestination + "机场",
                        duration: "1小时",
                        cost: 0,
                        description: "从出发地抵达" + randomDestination + "，办理入住手续，稍作休息"
                    },
                    {
                        time: "14:00",
                        activity: "市区观光",
                        location: randomDestination + "市中心",
                        duration: "3小时",
                        cost: 150,
                        description: "漫步市中心，感受当地文化氛围，品尝特色小吃"
                    },
                    {
                        time: "18:00",
                        activity: "特色晚餐",
                        location: "当地特色餐厅",
                        duration: "1.5小时",
                        cost: 200,
                        description: "品尝正宗的当地美食，体验地道风味"
                    }
                ],
                weather: {
                    condition: "晴朗",
                    temperature: "25-30°C",
                    suggestion: "适合户外活动，建议穿轻便服装"
                },
                totalCost: 350
            },
            {
                day: 2,
                date: "2025-07-16",
                theme: "自然风光探索",
                activities: [
                    {
                        time: "08:00",
                        activity: "早餐",
                        location: "酒店餐厅",
                        duration: "1小时",
                        cost: 80,
                        description: "享用丰盛的早餐，为一天的行程做准备"
                    },
                    {
                        time: "09:30",
                        activity: "主要景点游览",
                        location: randomDestination + "核心景区",
                        duration: "6小时",
                        cost: 280,
                        description: "深度游览" + randomDestination + "最著名的自然景观，拍照留念"
                    },
                    {
                        time: "17:00",
                        activity: "观景台日落",
                        location: "最佳观景点",
                        duration: "2小时",
                        cost: 50,
                        description: "在最佳位置欣赏壮丽的日落景色"
                    }
                ],
                weather: {
                    condition: "多云",
                    temperature: "22-28°C",
                    suggestion: "适合登山徒步，建议穿运动鞋"
                },
                totalCost: 410
            },
            {
                day: 3,
                date: "2025-07-17",
                theme: "文化体验日",
                activities: [
                    {
                        time: "09:00",
                        activity: "文化景点参观",
                        location: "当地博物馆/古迹",
                        duration: "3小时",
                        cost: 120,
                        description: "了解当地历史文化，参观重要文物古迹"
                    },
                    {
                        time: "14:00",
                        activity: "手工艺体验",
                        location: "传统工艺坊",
                        duration: "2小时",
                        cost: 180,
                        description: "亲手制作当地特色手工艺品，体验传统技艺"
                    },
                    {
                        time: "19:00",
                        activity: "民俗表演",
                        location: "文化广场",
                        duration: "1.5小时",
                        cost: 100,
                        description: "观看精彩的民族歌舞表演，感受浓郁民俗风情"
                    }
                ],
                weather: {
                    condition: "小雨",
                    temperature: "20-25°C",
                    suggestion: "室内活动为主，记得带雨具"
                },
                totalCost: 400
            },
            {
                day: 4,
                date: "2025-07-18",
                theme: "休闲购物日",
                activities: [
                    {
                        time: "10:00",
                        activity: "特产购物",
                        location: "当地特产市场",
                        duration: "3小时",
                        cost: 500,
                        description: "购买当地特色产品和纪念品，为亲友带回礼物"
                    },
                    {
                        time: "15:00",
                        activity: "温泉/SPA",
                        location: "度假村温泉中心",
                        duration: "3小时",
                        cost: 300,
                        description: "享受放松的温泉浴，缓解旅途疲劳"
                    },
                    {
                        time: "19:30",
                        activity: "告别晚餐",
                        location: "高档餐厅",
                        duration: "2小时",
                        cost: 350,
                        description: "在精致餐厅享用告别晚餐，回味美好旅程"
                    }
                ],
                weather: {
                    condition: "晴朗",
                    temperature: "24-29°C",
                    suggestion: "适合各种活动，心情愉悦"
                },
                totalCost: 1150
            },
            {
                day: 5,
                date: "2025-07-19",
                theme: "返程日",
                activities: [
                    {
                        time: "09:00",
                        activity: "酒店退房",
                        location: "酒店大堂",
                        duration: "0.5小时",
                        cost: 0,
                        description: "整理行李，办理退房手续"
                    },
                    {
                        time: "10:00",
                        activity: "最后一次市区游览",
                        location: "市区景点",
                        duration: "2小时",
                        cost: 100,
                        description: "利用剩余时间再次游览喜欢的地方，拍照留念"
                    },
                    {
                        time: "14:00",
                        activity: "前往机场",
                        location: randomDestination + "机场",
                        duration: "1小时",
                        cost: 80,
                        description: "乘坐交通工具前往机场，准备返程"
                    }
                ],
                weather: {
                    condition: "晴朗",
                    temperature: "26-31°C",
                    suggestion: "适合出行，注意防晒"
                },
                totalCost: 180
            }
        ],
        tips: [
            "建议提前预订酒店和景点门票，避免旺季涨价",
            "随身携带身份证件和现金，部分地方可能不支持移动支付",
            "关注天气变化，准备相应的衣物和雨具",
            "尊重当地文化习俗，保护环境，做文明游客",
            "购买旅游保险，确保旅途安全"
        ],
        recommendations: {
            bestTime: "7-8月是" + randomDestination + "的最佳旅游季节",
            clothing: "建议穿着轻便透气的夏装，准备一件薄外套",
            transportation: "建议选择飞机出行，省时便捷",
            accommodation: "推荐选择市中心或景区附近的酒店"
        }
    };
}

// 生成旅行计划（增强版）
async function generateTravelPlan() {
    if (isGenerating) return;
    
    isGenerating = true;
    
    try {
        // 显示加载状态
        showPage('resultPage');
        showLoadingState('AI正在为您精心规划旅程...');
        
        // 尝试使用API生成计划
        let travelPlan;
        try {
            travelPlan = await generateTravelPlanAPI('北京', 5, 5500, ['历史文化', '自然景观']);
            showNotification('已使用真实API生成旅行计划！', 'success');
        } catch (apiError) {
            console.log('API调用失败，使用模拟数据:', apiError);
            // API失败时使用模拟数据
            await new Promise(resolve => setTimeout(resolve, 2000));
            travelPlan = generateMockTravelPlan('用户输入');
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

// 庆祝动画效果
function createCelebrationEffect() {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                z-index: 10000;
                border-radius: 50%;
                pointer-events: none;
                animation: confetti-fall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// 显示旅行计划（增强版）
function displayTravelPlan(plan) {
    // 显示概览信息
    displayOverview(plan);
    
    // 显示详细行程
    displayItinerary(plan.itinerary);
    
    // 显示预算分解
    displayBudget(plan.budget);
    
    // 显示实用贴士
    displayTips(plan.tips, plan.recommendations);
    
    // 默认显示概览标签
    showTab('overview');
    
    // 显示结果内容
    const resultContent = document.getElementById('resultContent');
    if (resultContent) {
        resultContent.style.display = 'block';
        resultContent.style.opacity = '0';
        resultContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultContent.style.opacity = '1';
            resultContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

// 显示概览信息（增强版）
function displayOverview(plan) {
    const overviewContent = document.getElementById('overviewContent');
    if (!overviewContent) return;
    
    overviewContent.innerHTML = `
        <div class="plan-overview">
            <div class="destination-card">
                <div class="destination-header">
                    <h2><i class="fas fa-map-marker-alt"></i> ${plan.destination}</h2>
                    <span class="duration">${plan.duration}天${plan.duration - 1}夜</span>
                </div>
                <div class="destination-info">
                    <div class="info-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>出行时间：${plan.itinerary[0].date} - ${plan.itinerary[plan.itinerary.length - 1].date}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-yen-sign"></i>
                        <span>预计总费用：¥<span class="counter" data-target="${plan.budget.total}">${plan.budget.total}</span></span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-thermometer-half"></i>
                        <span>天气：${plan.itinerary[0].weather.condition}，${plan.itinerary[0].weather.temperature}</span>
                    </div>
                </div>
            </div>
            
            <div class="highlights-section">
                <h3><i class="fas fa-star"></i> 行程亮点</h3>
                <div class="highlights-grid">
                    ${plan.itinerary.map((day, index) => `
                        <div class="highlight-card" style="animation-delay: ${index * 0.1}s">
                            <div class="day-number">第${day.day}天</div>
                            <div class="day-theme">${day.theme}</div>
                            <div class="day-activities">${day.activities.length}个活动</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="quick-actions">
                <button class="action-btn" onclick="showTab('itinerary')">
                    <i class="fas fa-route"></i>
                    查看详细行程
                </button>
                <button class="action-btn" onclick="showTab('budget')">
                    <i class="fas fa-chart-pie"></i>
                    预算分析
                </button>
                <button class="action-btn" onclick="exportToMarkdown()">
                    <i class="fas fa-download"></i>
                    导出计划
                </button>
            </div>
        </div>
    `;
    
    // 启动数字计数动画
    const counter = overviewContent.querySelector('.counter');
    if (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
    }
}

// 显示详细行程（增强版）
function displayItinerary(itinerary) {
    const itineraryContent = document.getElementById('itineraryContent');
    if (!itineraryContent) return;
    
    itineraryContent.innerHTML = `
        <div class="itinerary-timeline">
            ${itinerary.map((day, dayIndex) => `
                <div class="day-card" style="animation-delay: ${dayIndex * 0.2}s">
                    <div class="day-header">
                        <div class="day-info">
                            <h3>第${day.day}天 - ${day.theme}</h3>
                            <p class="day-date">${day.date}</p>
                        </div>
                        <div class="day-weather">
                            <i class="fas fa-${getWeatherIcon(day.weather.condition)}"></i>
                            <span>${day.weather.condition} ${day.weather.temperature}</span>
                        </div>
                        <div class="day-cost">
                            <span class="cost-label">当日花费</span>
                            <span class="cost-amount">¥${day.totalCost}</span>
                        </div>
                    </div>
                    
                    <div class="activities-list">
                        ${day.activities.map((activity, actIndex) => `
                            <div class="activity-item" style="animation-delay: ${(dayIndex * 0.2) + (actIndex * 0.1)}s">
                                <div class="activity-time">
                                    <i class="fas fa-clock"></i>
                                    ${activity.time}
                                </div>
                                <div class="activity-content">
                                    <div class="activity-header">
                                        <h4>${activity.activity}</h4>
                                        <span class="activity-cost">¥${activity.cost}</span>
                                    </div>
                                    <div class="activity-details">
                                        <p><i class="fas fa-map-marker-alt"></i> ${activity.location}</p>
                                        <p><i class="fas fa-hourglass-half"></i> 预计用时：${activity.duration}</p>
                                        <p class="activity-description">${activity.description}</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="day-suggestion">
                        <i class="fas fa-lightbulb"></i>
                        <span>${day.weather.suggestion}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 显示预算分解（增强版）
function displayBudget(budget) {
    const budgetContent = document.getElementById('budgetContent');
    if (!budgetContent) return;
    
    const breakdown = budget.breakdown;
    const total = budget.total;
    
    budgetContent.innerHTML = `
        <div class="budget-analysis">
            <div class="budget-summary">
                <h3>预算总览</h3>
                <div class="total-budget">
                    <span class="currency">¥</span>
                    <span class="amount counter" data-target="${total}">${total}</span>
                </div>
            </div>
            
            <div class="budget-breakdown">
                <h4>费用分解</h4>
                <div class="breakdown-items">
                    <div class="breakdown-item" style="animation-delay: 0.1s">
                        <div class="item-info">
                            <i class="fas fa-plane"></i>
                            <span>交通费用</span>
                        </div>
                        <div class="item-amount">¥${breakdown.transportation}</div>
                        <div class="item-percentage">${Math.round(breakdown.transportation / total * 100)}%</div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%; animation: progressFill 1s ease-out 0.5s forwards; --target-width: ${breakdown.transportation / total * 100}%"></div>
                        </div>
                    </div>
                    <div class="breakdown-item" style="animation-delay: 0.2s">
                        <div class="item-info">
                            <i class="fas fa-bed"></i>
                            <span>住宿费用</span>
                        </div>
                        <div class="item-amount">¥${breakdown.accommodation}</div>
                        <div class="item-percentage">${Math.round(breakdown.accommodation / total * 100)}%</div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%; animation: progressFill 1s ease-out 0.7s forwards; --target-width: ${breakdown.accommodation / total * 100}%"></div>
                        </div>
                    </div>
                    <div class="breakdown-item" style="animation-delay: 0.3s">
                        <div class="item-info">
                            <i class="fas fa-utensils"></i>
                            <span>餐饮费用</span>
                        </div>
                        <div class="item-amount">¥${breakdown.food}</div>
                        <div class="item-percentage">${Math.round(breakdown.food / total * 100)}%</div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%; animation: progressFill 1s ease-out 0.9s forwards; --target-width: ${breakdown.food / total * 100}%"></div>
                        </div>
                    </div>
                    <div class="breakdown-item" style="animation-delay: 0.4s">
                        <div class="item-info">
                            <i class="fas fa-ticket-alt"></i>
                            <span>活动费用</span>
                        </div>
                        <div class="item-amount">¥${breakdown.activities}</div>
                        <div class="item-percentage">${Math.round(breakdown.activities / total * 100)}%</div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 0%; animation: progressFill 1s ease-out 1.1s forwards; --target-width: ${breakdown.activities / total * 100}%"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="budget-tips">
                <h4>省钱小贴士</h4>
                <ul>
                    <li>提前预订机票和酒店可享受早鸟优惠</li>
                    <li>选择当地特色小吃，既经济又能体验文化</li>
                    <li>购买景点联票通常比单独购票更划算</li>
                    <li>关注各大平台的旅游促销活动</li>
                </ul>
            </div>
        </div>
    `;
    
    // 启动数字计数动画
    const counter = budgetContent.querySelector('.counter');
    if (counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
    }
}

// 显示实用贴士（增强版）
function displayTips(tips, recommendations) {
    const tipsContent = document.getElementById('tipsContent');
    if (!tipsContent) return;
    
    tipsContent.innerHTML = `
        <div class="tips-section">
            <div class="travel-tips">
                <h3><i class="fas fa-lightbulb"></i> 实用贴士</h3>
                <div class="tips-list">
                    ${tips.map((tip, index) => `
                        <div class="tip-item" style="animation-delay: ${index * 0.1}s">
                            <i class="fas fa-check-circle"></i>
                            <span>${tip}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="recommendations">
                <h3><i class="fas fa-star"></i> 专业建议</h3>
                <div class="recommendation-cards">
                    <div class="rec-card" style="animation-delay: 0.1s">
                        <i class="fas fa-calendar-check"></i>
                        <h4>最佳时间</h4>
                        <p>${recommendations.bestTime}</p>
                    </div>
                    <div class="rec-card" style="animation-delay: 0.2s">
                        <i class="fas fa-tshirt"></i>
                        <h4>穿搭建议</h4>
                        <p>${recommendations.clothing}</p>
                    </div>
                    <div class="rec-card" style="animation-delay: 0.3s">
                        <i class="fas fa-route"></i>
                        <h4>交通方式</h4>
                        <p>${recommendations.transportation}</p>
                    </div>
                    <div class="rec-card" style="animation-delay: 0.4s">
                        <i class="fas fa-hotel"></i>
                        <h4>住宿推荐</h4>
                        <p>${recommendations.accommodation}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 获取天气图标
function getWeatherIcon(condition) {
    const iconMap = {
        '晴朗': 'sun',
        '多云': 'cloud-sun',
        '阴天': 'cloud',
        '小雨': 'cloud-rain',
        '大雨': 'cloud-showers-heavy',
        '雪': 'snowflake'
    };
    return iconMap[condition] || 'sun';
}

// 显示加载状态（增强版）
function showLoadingState(message = '正在生成中...') {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
        loadingState.style.display = 'block';
        const loadingTip = document.getElementById('loadingTip');
        if (loadingTip) {
            loadingTip.textContent = message;
        }
        
        // 模拟进度条
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress > 90) progress = 90;
                
                progressFill.style.width = progress + '%';
                progressText.textContent = Math.round(progress) + '%';
                
                if (progress >= 90) {
                    clearInterval(interval);
                }
            }, 200);
        }
    }
}

// 隐藏加载状态
function hideLoadingState() {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
        loadingState.style.display = 'none';
    }
}

// 导出功能（增强版）
function exportToMarkdown() {
    if (!currentTravelPlan) {
        showNotification('请先生成旅行计划', 'warning');
        return;
    }
    
    const markdown = generateMarkdownContent(currentTravelPlan);
    downloadFile(markdown, `${currentTravelPlan.destination}旅行计划.md`, 'text/markdown');
    showNotification('旅行计划已导出', 'success');
    
    // 添加下载动画效果
    const exportBtn = event.target;
    exportBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        exportBtn.style.transform = 'scale(1)';
    }, 150);
}

// 生成Markdown内容
function generateMarkdownContent(plan) {
    let markdown = `# ${plan.destination}旅行计划\n\n`;
    markdown += `**旅行时间：** ${plan.itinerary[0].date} - ${plan.itinerary[plan.itinerary.length - 1].date}\n`;
    markdown += `**旅行天数：** ${plan.duration}天${plan.duration - 1}夜\n`;
    markdown += `**预计费用：** ¥${plan.budget.total}\n\n`;
    
    markdown += `## 详细行程\n\n`;
    plan.itinerary.forEach(day => {
        markdown += `### 第${day.day}天 - ${day.theme} (${day.date})\n\n`;
        markdown += `**天气：** ${day.weather.condition} ${day.weather.temperature}\n`;
        markdown += `**当日花费：** ¥${day.totalCost}\n\n`;
        
        day.activities.forEach(activity => {
            markdown += `**${activity.time}** - ${activity.activity}\n`;
            markdown += `- 地点：${activity.location}\n`;
            markdown += `- 用时：${activity.duration}\n`;
            markdown += `- 费用：¥${activity.cost}\n`;
            markdown += `- 说明：${activity.description}\n\n`;
        });
        
        markdown += `💡 **建议：** ${day.weather.suggestion}\n\n`;
    });
    
    markdown += `## 预算分解\n\n`;
    markdown += `- 交通费用：¥${plan.budget.breakdown.transportation}\n`;
    markdown += `- 住宿费用：¥${plan.budget.breakdown.accommodation}\n`;
    markdown += `- 餐饮费用：¥${plan.budget.breakdown.food}\n`;
    markdown += `- 活动费用：¥${plan.budget.breakdown.activities}\n`;
    markdown += `- **总计：¥${plan.budget.total}**\n\n`;
    
    markdown += `## 实用贴士\n\n`;
    plan.tips.forEach(tip => {
        markdown += `- ${tip}\n`;
    });
    
    return markdown;
}

// 下载文件
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 页面加载完成后的初始化（增强版）
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI旅游规划师已加载 - 增强版');
    
    // 初始化主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeToggle = document.querySelector('.theme-toggle i');
        if (themeToggle) {
            themeToggle.className = 'fas fa-sun';
        }
    }
    
    // 初始化动画效果
    initParticleAnimation();
    initMouseFollowEffect();
    initScrollAnimations();
    
    // 绑定导航事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // 绑定开始规划按钮
    const startPlanningBtn = document.getElementById('startPlanningBtn');
    if (startPlanningBtn) {
        startPlanningBtn.addEventListener('click', function() {
            generateTravelPlan();
        });
    }
    
    // 绑定标签切换事件
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
    
    // 绑定模态框关闭事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            hideModal(modalId);
        }
    });
    
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // 关闭所有模态框
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    hideModal(modal.id);
                }
            });
        }
    });
    
    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('页面隐藏');
        } else {
            console.log('页面显示');
        }
    });
    
    // 欢迎消息
    setTimeout(() => {
        showNotification('欢迎使用AI智能旅游规划师！', 'info', 3000);
    }, 1000);
});

// 导出函数供全局使用
window.showPage = showPage;
window.showTab = showTab;
window.showModal = showModal;
window.hideModal = hideModal;
window.toggleTheme = toggleTheme;
window.generateTravelPlan = generateTravelPlan;
window.exportToMarkdown = exportToMarkdown;

