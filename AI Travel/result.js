// 结果页面JavaScript
let currentTravelPlan = null;

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    loadTravelPlan();
    setupTabNavigation();
    setupEventListeners();
});

// 加载旅行计划
function loadTravelPlan() {
    currentTravelPlan = getTravelPlan();
    
    if (!currentTravelPlan) {
        showNotification('未找到旅行计划数据，请重新规划', 'error');
        setTimeout(() => {
            window.location.href = 'planning.html';
        }, 2000);
        return;
    }
    
    displayTravelPlan();
}

// 显示旅行计划
function displayTravelPlan() {
    const plan = currentTravelPlan;
    
    // 更新页面标题
    document.getElementById('planTitle').textContent = `${plan.overview.destination} ${plan.overview.duration}旅行计划`;
    
    // 更新概览信息
    updateOverview(plan.overview);
    
    // 显示详细内容
    displayItinerary(plan.itinerary);
    displayBudgetAnalysis(plan.budget);
    displayRecommendations(plan.recommendations);
    displayTips(plan.tips);
}

// 更新概览信息
function updateOverview(overview) {
    document.getElementById('overviewDestination').textContent = overview.destination;
    document.getElementById('overviewDates').textContent = overview.dates;
    document.getElementById('overviewDuration').textContent = overview.duration;
    document.getElementById('overviewBudget').textContent = formatCurrency(overview.totalBudget);
    document.getElementById('overviewWeather').textContent = overview.weather;
}

// 显示详细行程
function displayItinerary(itinerary) {
    const container = document.getElementById('itineraryContent');
    container.innerHTML = '';
    
    itinerary.forEach(day => {
        const dayElement = createDayElement(day);
        container.appendChild(dayElement);
    });
}

// 创建每日行程元素
function createDayElement(day) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-item';
    
    dayDiv.innerHTML = `
        <div class="day-marker">${day.day}</div>
        <div class="day-content">
            <div class="day-header">
                <h3 class="day-title">${day.title}</h3>
                <div class="day-weather">
                    <i class="fas fa-cloud-sun"></i>
                    <span>${day.weather}</span>
                </div>
            </div>
            <div class="day-date">
                <i class="fas fa-calendar-alt"></i>
                ${formatDate(day.date)}
            </div>
            <ul class="activities-list">
                ${day.activities.map(activity => `
                    <li class="activity-item">
                        <div class="activity-time">${activity.time}</div>
                        <div class="activity-details">
                            <div class="activity-name">${activity.name}</div>
                            <div class="activity-description">${activity.description}</div>
                        </div>
                        <div class="activity-cost">${activity.cost}</div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
    
    return dayDiv;
}

// 显示预算分析
function displayBudgetAnalysis(budget) {
    const container = document.getElementById('budgetBreakdown');
    container.innerHTML = '';
    
    // 创建预算分解列表
    const breakdownList = document.createElement('div');
    breakdownList.className = 'budget-list';
    
    budget.breakdown.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'budget-item';
        itemDiv.innerHTML = `
            <div class="budget-item-header">
                <span class="budget-category">${item.category}</span>
                <span class="budget-amount">${formatCurrency(item.amount)}</span>
            </div>
            <div class="budget-bar">
                <div class="budget-fill" style="width: ${item.percentage}%"></div>
            </div>
            <div class="budget-percentage">${item.percentage}%</div>
        `;
        breakdownList.appendChild(itemDiv);
    });
    
    container.appendChild(breakdownList);
    
    // 创建饼图
    createBudgetChart(budget.breakdown);
}

// 创建预算饼图
function createBudgetChart(budgetData) {
    const canvas = document.getElementById('budgetChart');
    const ctx = canvas.getContext('2d');
    
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    const colors = [
        '#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'
    ];
    
    let currentAngle = -Math.PI / 2; // 从顶部开始
    
    budgetData.forEach((item, index) => {
        const sliceAngle = (item.percentage / 100) * 2 * Math.PI;
        
        // 绘制扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        
        // 绘制标签
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.percentage}%`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

// 显示推荐景点
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendationsContent');
    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const recDiv = document.createElement('div');
        recDiv.className = 'recommendation-card';
        recDiv.innerHTML = `
            <div class="rec-image">
                <img src="${rec.image}" alt="${rec.name}" loading="lazy">
                <div class="rec-rating">
                    <i class="fas fa-star"></i>
                    <span>${rec.rating}</span>
                </div>
            </div>
            <div class="rec-content">
                <h3 class="rec-name">${rec.name}</h3>
                <p class="rec-description">${rec.description}</p>
                <div class="rec-price">门票：${rec.price}</div>
                <div class="rec-highlights">
                    ${rec.highlights.map(highlight => `
                        <span class="highlight-tag">${highlight}</span>
                    `).join('')}
                </div>
            </div>
        `;
        container.appendChild(recDiv);
    });
}

// 显示旅行贴士
function displayTips(tips) {
    const container = document.getElementById('tipsContent');
    container.innerHTML = '';
    
    Object.values(tips).forEach(tip => {
        const tipDiv = document.createElement('div');
        tipDiv.className = 'tip-item';
        tipDiv.innerHTML = `
            <div class="tip-header">
                <h3 class="tip-title">${tip.title}</h3>
            </div>
            <div class="tip-content">
                <p>${tip.content}</p>
            </div>
        `;
        container.appendChild(tipDiv);
    });
}

// 设置标签导航
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // 更新按钮状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 更新面板显示
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
            
            // 如果是预算分析标签，重新绘制图表
            if (targetTab === 'budget' && currentTravelPlan) {
                setTimeout(() => {
                    createBudgetChart(currentTravelPlan.budget.breakdown);
                }, 100);
            }
        });
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 导出计划
    window.exportPlan = function() {
        if (!currentTravelPlan) {
            showNotification('没有可导出的计划', 'error');
            return;
        }
        
        const planText = generatePlanText(currentTravelPlan);
        downloadTextFile(planText, `${currentTravelPlan.overview.destination}旅行计划.txt`);
        showNotification('计划已导出', 'success');
    };
    
    // 分享计划
    window.sharePlan = function() {
        if (!currentTravelPlan) {
            showNotification('没有可分享的计划', 'error');
            return;
        }
        
        if (navigator.share) {
            navigator.share({
                title: `${currentTravelPlan.overview.destination}旅行计划`,
                text: `我用AI生成了一个${currentTravelPlan.overview.destination}的旅行计划，快来看看吧！`,
                url: window.location.href
            }).catch(err => {
                console.log('分享失败:', err);
                copyToClipboard(window.location.href);
                showNotification('链接已复制到剪贴板', 'success');
            });
        } else {
            copyToClipboard(window.location.href);
            showNotification('链接已复制到剪贴板', 'success');
        }
    };
}

// 生成计划文本
function generatePlanText(plan) {
    let text = `${plan.overview.destination}旅行计划\n`;
    text += `出行时间：${plan.overview.dates}\n`;
    text += `行程天数：${plan.overview.duration}\n`;
    text += `预算：${formatCurrency(plan.overview.totalBudget)}\n\n`;
    
    text += '详细行程：\n';
    plan.itinerary.forEach(day => {
        text += `\n第${day.day}天 - ${day.title} (${formatDate(day.date)})\n`;
        text += `天气：${day.weather}\n`;
        day.activities.forEach(activity => {
            text += `${activity.time} ${activity.name} - ${activity.description} (${activity.cost})\n`;
        });
    });
    
    text += '\n预算分析：\n';
    plan.budget.breakdown.forEach(item => {
        text += `${item.category}：${formatCurrency(item.amount)} (${item.percentage}%)\n`;
    });
    
    text += '\n推荐景点：\n';
    plan.recommendations.forEach(rec => {
        text += `${rec.name} - ${rec.description} (评分：${rec.rating}，门票：${rec.price})\n`;
    });
    
    text += '\n旅行贴士：\n';
    Object.values(plan.tips).forEach(tip => {
        text += `${tip.title}：${tip.content}\n`;
    });
    
    text += `\n计划生成时间：${new Date(plan.generatedAt).toLocaleString('zh-CN')}\n`;
    text += '由AI智能旅游规划师生成';
    
    return text;
}

// 下载文本文件
function downloadTextFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

