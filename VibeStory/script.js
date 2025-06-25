// VibeStory - 关键词驱动的互动小说平台
// 优化版本 - 简洁大方的界面设计

// ==================== 配置常量 ====================
const API_CONFIG = {
    url: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: 'sk-77a11aba20914bddb5294cc2d2d3a14d', 
    maxRetries: 3,
    retryDelay: 1000,
    requestTimeout: 30000
};

const STORY_CONFIG = {
    TOTAL_SEGMENTS: 12,
    MIN_CONTENT_LENGTH: 300,
    MAX_CONTENT_LENGTH: 600,
    CHOICES_COUNT: 3
};

const UI_CONFIG = {
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000
};

// ==================== 全局状态 ====================
let currentStory = {
    keywords: '',
    genre: '',
    difficulty: 1,
    segments: [],
    currentSegment: 0,
    isComplete: false,
    characters: new Map(),
    storyTree: {}
};

let isGenerating = false;

// ==================== 工具函数 ====================
class Utils {
    static showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, UI_CONFIG.TOAST_DURATION);
    }
    
    static formatText(text) {
        return text.trim()
            .replace(/\n{3,}/g, '\n\n')
            .replace(/\s{2,}/g, ' ');
    }
    
    static validateKeywords(keywords) {
        if (!keywords || keywords.trim().length === 0) {
            return { valid: false, message: '请输入关键词' };
        }
        
        const keywordArray = keywords.split('+').filter(k => k.trim());
        if (keywordArray.length < 1) {
            return { valid: false, message: '请至少输入一个关键词' };
        }
        
        if (keywordArray.length > 5) {
            return { valid: false, message: '关键词数量不能超过5个' };
        }
        
        return { valid: true, keywords: keywordArray };
    }
    
    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ==================== API管理器 ====================
class APIManager {
    constructor() {
        this.cache = new Map();
        this.requestQueue = [];
        this.isProcessing = false;
    }
    
    async callAPI(prompt, segment = 1) {
        const cacheKey = this.generateCacheKey(prompt, segment);
        
        // 检查缓存
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        // 添加到请求队列
        return new Promise((resolve, reject) => {
            this.requestQueue.push({
                prompt,
                segment,
                cacheKey,
                resolve,
                reject
            });
            
            this.processQueue();
        });
    }
    
    async processQueue() {
        if (this.isProcessing || this.requestQueue.length === 0) {
            return;
        }
        
        this.isProcessing = true;
        
        while (this.requestQueue.length > 0) {
            const request = this.requestQueue.shift();
            
            try {
                const response = await this.makeRequest(request.prompt, request.segment);
                this.cache.set(request.cacheKey, response);
                request.resolve(response);
            } catch (error) {
                request.reject(error);
            }
            
            // 避免API限流
            await Utils.sleep(500);
        }
        
        this.isProcessing = false;
    }
    
    async makeRequest(prompt, segment) {
        const requestData = {
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content: `你是一个专业的互动小说作家。请根据用户的关键词和选择生成引人入胜的故事内容。

要求：
1. 这是第${segment}段，总共12段的故事
2. 每段内容300-600字
3. 内容要生动有趣，符合故事风格
4. 在段落结尾提供3个不同的选择方向
5. 确保故事连贯性和逻辑性

请严格按照以下JSON格式返回：
{
    "content": "故事内容...",
    "choices": [
        "选择1的描述",
        "选择2的描述", 
        "选择3的描述"
    ]
}`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8,
            max_tokens: 1500
        };
        
        let lastError;
        
        for (let attempt = 0; attempt < API_CONFIG.maxRetries; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.requestTimeout);
                
                const response = await fetch(API_CONFIG.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_CONFIG.apiKey}`
                    },
                    body: JSON.stringify(requestData),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                    throw new Error('API返回数据格式错误');
                }
                
                const content = data.choices[0].message.content.trim();
                
                try {
                    const parsed = JSON.parse(content);
                    if (!parsed.content || !parsed.choices || !Array.isArray(parsed.choices)) {
                        throw new Error('返回内容格式不正确');
                    }
                    return parsed;
                } catch (parseError) {
                    // 如果JSON解析失败，尝试提取内容
                    return this.parseNonJSONResponse(content);
                }
                
            } catch (error) {
                lastError = error;
                console.warn(`API调用失败 (尝试 ${attempt + 1}/${API_CONFIG.maxRetries}):`, error);
                
                if (attempt < API_CONFIG.maxRetries - 1) {
                    await Utils.sleep(API_CONFIG.retryDelay * (attempt + 1));
                }
            }
        }
        
        throw new Error(`API调用失败: ${lastError.message}`);
    }
    
    parseNonJSONResponse(content) {
        // 简单的内容解析逻辑
        const lines = content.split('\n').filter(line => line.trim());
        const storyContent = lines.slice(0, -3).join('\n');
        const choices = lines.slice(-3);
        
        return {
            content: storyContent || content,
            choices: choices.length === 3 ? choices : [
                "继续当前的故事线",
                "选择不同的发展方向", 
                "探索新的可能性"
            ]
        };
    }
    
    generateCacheKey(prompt, segment) {
        return `${segment}_${prompt.substring(0, 100)}`;
    }
}

// ==================== 故事生成器 ====================
class StoryGenerator {
    constructor(apiManager) {
        this.apiManager = apiManager;
    }
    
    generateStoryPrompt(keywords, genre, segment, previousContent = '', userChoice = '') {
        const keywordStr = keywords.join('+');
        const genreDescriptions = {
            'adventure': '冒险探索，充满刺激和未知',
            'scifi': '科幻未来，科技与想象结合',
            'fantasy': '奇幻魔法，神秘超自然世界',
            'mystery': '悬疑推理，谜团与真相',
            'romance': '浪漫情感，温馨感人',
            'horror': '恐怖惊悚，紧张刺激',
            'historical': '历史穿越，跨越时空'
        };
        
        let prompt = `关键词: ${keywordStr}\n故事风格: ${genreDescriptions[genre] || '冒险探索'}\n`;
        
        if (segment === 1) {
            prompt += `请创作一个12段故事的第1段开头，要求：
1. 根据关键词"${keywordStr}"设定故事背景和主要角色
2. 风格为${genreDescriptions[genre] || '冒险探索'}
3. 内容300-600字，生动有趣
4. 在结尾提供3个不同的发展选择
5. 为后续11段故事奠定基础`;
        } else {
            const storyPhases = {
                1: '开头引入', 2: '背景展开', 3: '角色发展', 4: '情节推进',
                5: '冲突出现', 6: '矛盾加剧', 7: '高潮前奏', 8: '故事高潮',
                9: '高潮解决', 10: '情节收尾', 11: '结局准备', 12: '完美结局'
            };
            
            prompt += `这是第${segment}段（${storyPhases[segment]}），共12段故事。
            
前情回顾：
${previousContent}

用户选择：${userChoice}

请继续故事发展，要求：
1. 承接前面的情节，保持连贯性
2. 根据用户选择推进故事
3. 内容300-600字
4. ${segment < 12 ? '在结尾提供3个选择' : '给出完整结局，无需选择'}
5. 符合${genreDescriptions[genre]}的风格`;
        }
        
        return prompt;
    }
    
    async generateSegment(keywords, genre, difficulty, segment, previousContent = '', userChoice = '') {
        const prompt = this.generateStoryPrompt(keywords, genre, segment, previousContent, userChoice);
        
        try {
            const response = await this.apiManager.callAPI(prompt, segment);
            
            // 分析角色信息
            this.analyzeCharacters(response.content);
            
            return {
                segment,
                content: Utils.formatText(response.content),
                choices: response.choices || [],
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            throw new Error(`第${segment}段生成失败: ${error.message}`);
        }
    }
    
    analyzeCharacters(content) {
        // 简单的角色分析逻辑
        const characterPatterns = [
            /([A-Za-z\u4e00-\u9fa5]{2,8})(说|道|想|做|走|来|去|看|听)/g,
            /主角|主人公|他|她|我/g
        ];
        
        characterPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const name = match[1] || match[0];
                if (name && name.length > 1) {
                    if (!currentStory.characters.has(name)) {
                        currentStory.characters.set(name, {
                            name,
                            appearances: 0,
                            relationships: new Set()
                        });
                    }
                    currentStory.characters.get(name).appearances++;
                }
            }
        });
    }
}

// ==================== UI管理器 ====================
class UIManager {
    constructor() {
        this.currentPage = 'setup';
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // 导航事件
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = e.target.dataset.page;
                this.switchPage(pageId);
            });
        });
        
        // 开始故事按钮
        document.getElementById('submit').addEventListener('click', () => {
            this.startStory();
        });
        
        // 返回设置按钮
        document.getElementById('back-to-setup').addEventListener('click', () => {
            this.switchPage('setup');
        });
        
        // 返回主页按钮
        document.getElementById('back-to-home').addEventListener('click', () => {
            this.switchPage('setup');
        });
        
        // 信息面板按钮
        document.getElementById('story-structure-btn').addEventListener('click', () => {
            this.showStoryStructure();
        });
        
        document.getElementById('character-relations-btn').addEventListener('click', () => {
            this.showCharacterRelations();
        });
        
        document.getElementById('export-story').addEventListener('click', () => {
            this.exportStory();
        });
        
        // 关闭面板
        document.getElementById('close-panel').addEventListener('click', () => {
            this.hideInfoPanel();
        });
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (this.currentPage === 'game' && !isGenerating) {
                if (e.key >= '1' && e.key <= '3') {
                    const choiceIndex = parseInt(e.key) - 1;
                    const choiceButtons = document.querySelectorAll('.choice-btn');
                    if (choiceButtons[choiceIndex]) {
                        choiceButtons[choiceIndex].click();
                    }
                }
            }
        });
    }
    
    switchPage(pageId) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // 显示目标页面
        document.getElementById(`${pageId}-page`).classList.add('active');
        
        // 更新导航状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
        
        this.currentPage = pageId;
        
        // 如果切换到游戏页面且有故事内容，显示控制按钮
        if (pageId === 'game' && currentStory.segments.length > 0) {
            this.showGameControls();
        }
    }
    
    async startStory() {
        const keywords = document.getElementById('keywords').value.trim();
        const genre = document.getElementById('genre-select').value;
        const difficulty = parseInt(document.getElementById('difficulty-select').value);
        
        // 验证输入
        const validation = Utils.validateKeywords(keywords);
        if (!validation.valid) {
            Utils.showToast(validation.message, 'error');
            return;
        }
        
        // 重置故事状态
        currentStory = {
            keywords: validation.keywords,
            genre,
            difficulty,
            segments: [],
            currentSegment: 0,
            isComplete: false,
            characters: new Map(),
            storyTree: {}
        };
        
        // 切换到游戏页面
        this.switchPage('game');
        
        // 开始生成第一段
        await this.generateNextSegment();
    }
    
    async generateNextSegment(userChoice = '') {
        if (isGenerating || currentStory.isComplete) {
            return;
        }
        
        isGenerating = true;
        const nextSegment = currentStory.currentSegment + 1;
        
        try {
            // 显示加载状态
            this.showLoadingStatus(nextSegment);
            
            // 获取前面的故事内容
            const previousContent = currentStory.segments
                .map(s => s.content)
                .join('\n\n');
            
            // 生成故事段落
            const segment = await storyGenerator.generateSegment(
                currentStory.keywords,
                currentStory.genre,
                currentStory.difficulty,
                nextSegment,
                previousContent,
                userChoice
            );
            
            // 添加到故事中
            currentStory.segments.push(segment);
            currentStory.currentSegment = nextSegment;
            
            // 检查是否完成
            if (nextSegment >= STORY_CONFIG.TOTAL_SEGMENTS) {
                currentStory.isComplete = true;
            }
            
            // 更新UI
            this.hideLoadingStatus();
            this.updateStoryContent(segment);
            
            if (!currentStory.isComplete) {
                this.showChoices(segment.choices);
            } else {
                this.showStoryComplete();
            }
            
            // 显示控制按钮
            this.showGameControls();
            
        } catch (error) {
            console.error('故事生成失败:', error);
            this.hideLoadingStatus();
            Utils.showToast(`故事生成失败: ${error.message}`, 'error');
        } finally {
            isGenerating = false;
        }
    }
    
    showLoadingStatus(segment) {
        const loadingStatus = document.getElementById('loading-status');
        const currentSegmentSpan = loadingStatus.querySelector('.current-segment');
        const totalSegmentsSpan = loadingStatus.querySelector('.total-segments');
        
        currentSegmentSpan.textContent = `第${segment}段`;
        totalSegmentsSpan.textContent = `共${STORY_CONFIG.TOTAL_SEGMENTS}段`;
        
        loadingStatus.classList.remove('hidden');
        document.getElementById('choices-container').innerHTML = '';
    }
    
    hideLoadingStatus() {
        document.getElementById('loading-status').classList.add('hidden');
    }
    
    updateStoryContent(segment) {
        const storyContent = document.getElementById('story-content');
        storyContent.innerHTML = `
            
            <div class="segment-content">
                ${segment.content.replace(/\n/g, '<br>')}
            </div>
        `;
        storyContent.classList.add('has-content');
    }
    
    showChoices(choices) {
        const choicesContainer = document.getElementById('choices-container');
        
        choicesContainer.innerHTML = choices.map((choice, index) => `
            <button class="choice-btn" data-choice="${index}">
                <span class="choice-number">${index + 1}.</span>
                <span class="choice-text">${choice}</span>
            </button>
        `).join('');
        
        // 添加选择事件监听
        choicesContainer.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const choiceIndex = parseInt(e.currentTarget.dataset.choice);
                const choiceText = choices[choiceIndex];
                this.makeChoice(choiceText);
            });
        });
    }
    
    async makeChoice(choiceText) {
        if (isGenerating) return;
        
        // 禁用所有选择按钮
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        // 生成下一段
        await this.generateNextSegment(choiceText);
    }
    
    showStoryComplete() {
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = `
            <div class="story-complete">
                <h3>🎉 故事完成！</h3>
                <p>恭喜你完成了这个精彩的12段互动故事！</p>
                <div class="complete-actions">
                    <button id="restart-story" class="primary-btn">开始新故事</button>
                    <button id="export-complete-story" class="secondary-btn">导出完整故事</button>
                </div>
            </div>
        `;
        
        // 添加事件监听
        document.getElementById('restart-story').addEventListener('click', () => {
            this.switchPage('setup');
        });
        
        document.getElementById('export-complete-story').addEventListener('click', () => {
            this.exportStory();
        });
        
        Utils.showToast('故事已完成！', 'success');
    }
    
    showGameControls() {
        document.querySelectorAll('.info-btn').forEach(btn => {
            btn.classList.remove('hidden');
        });
    }
    
    showStoryStructure() {
        const content = this.generateStoryStructureHTML();
        this.showInfoPanel('故事结构', content);
    }
    
    showCharacterRelations() {
        const content = this.generateCharacterRelationsHTML();
        this.showInfoPanel('角色关系', content);
    }
    
    showInfoPanel(title, content) {
        const panel = document.getElementById('info-panel');
        const panelTitle = document.getElementById('panel-title');
        const panelContent = document.getElementById('panel-content');
        
        panelTitle.textContent = title;
        panelContent.innerHTML = content;
        panel.classList.remove('hidden');
    }
    
    hideInfoPanel() {
        document.getElementById('info-panel').classList.add('hidden');
    }
    
    generateStoryStructureHTML() {
        if (currentStory.segments.length === 0) {
            return '<p>暂无故事内容</p>';
        }
        
        const timeline = currentStory.segments.map((segment, index) => {
            const isActive = index === currentStory.segments.length - 1;
            return `
                <div class="timeline-item ${isActive ? 'active' : ''}">
                    <div class="timeline-marker">${segment.segment}</div>
                    <div class="timeline-content">
                        <h4>第${segment.segment}段</h4>
                        <p>${segment.content.substring(0, 100)}...</p>
                        <small>${new Date(segment.timestamp).toLocaleString()}</small>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="story-timeline">
                ${timeline}
            </div>
            <style>
                .story-timeline { margin: 20px 0; }
                .timeline-item { 
                    display: flex; 
                    margin-bottom: 20px; 
                    padding: 15px;
                    border-radius: 8px;
                    background: #f8fafc;
                    border-left: 4px solid #e2e8f0;
                }
                .timeline-item.active { 
                    background: #eff6ff; 
                    border-left-color: #2563eb;
                }
                .timeline-marker { 
                    width: 40px; 
                    height: 40px; 
                    background: #2563eb; 
                    color: white; 
                    border-radius: 50%; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-weight: bold;
                    margin-right: 15px;
                    flex-shrink: 0;
                }
                .timeline-content h4 { 
                    margin: 0 0 8px 0; 
                    color: #1e293b;
                }
                .timeline-content p { 
                    margin: 0 0 8px 0; 
                    color: #475569;
                    line-height: 1.5;
                }
                .timeline-content small { 
                    color: #64748b; 
                }
            </style>
        `;
    }
    
    generateCharacterRelationsHTML() {
        if (currentStory.characters.size === 0) {
            return '<p>暂无角色信息</p>';
        }
        
        const characterList = Array.from(currentStory.characters.entries())
            .map(([name, info]) => `
                <div class="character-card">
                    <h4>${name}</h4>
                    <p>出现次数: ${info.appearances}</p>
                </div>
            `).join('');
        
        return `
            <div class="characters-grid">
                ${characterList}
            </div>
            <style>
                .characters-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
                    gap: 15px; 
                    margin: 20px 0; 
                }
                .character-card { 
                    background: #f8fafc; 
                    padding: 15px; 
                    border-radius: 8px; 
                    border: 1px solid #e2e8f0;
                }
                .character-card h4 { 
                    margin: 0 0 8px 0; 
                    color: #1e293b; 
                }
                .character-card p { 
                    margin: 0; 
                    color: #64748b; 
                    font-size: 0.9rem; 
                }
            </style>
        `;
    }
    
    exportStory() {
        if (currentStory.segments.length === 0) {
            Utils.showToast('暂无故事内容可导出', 'warning');
            return;
        }
        
        const storyText = this.generateExportContent();
        const blob = new Blob([storyText], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `VibeStory-${currentStory.keywords.join('+')}-${new Date().toISOString().split('T')[0]}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        Utils.showToast('故事导出成功！', 'success');
    }
    
    generateExportContent() {
        const keywordsStr = currentStory.keywords.join('+');
        const genreNames = {
            'adventure': '冒险',
            'scifi': '科幻',
            'fantasy': '奇幻',
            'mystery': '悬疑',
            'romance': '浪漫',
            'horror': '恐怖',
            'historical': '历史'
        };
        
        let content = `# VibeStory 互动小说\n\n`;
        content += `**关键词**: ${keywordsStr}\n`;
        content += `**风格**: ${genreNames[currentStory.genre] || currentStory.genre}\n`;
        content += `**复杂度**: ${currentStory.difficulty}\n`;
        content += `**生成时间**: ${new Date().toLocaleString()}\n\n`;
        content += `---\n\n`;
        
        currentStory.segments.forEach((segment, index) => {
            content += `## 第${segment.segment}段\n\n`;
            content += `${segment.content}\n\n`;
            
            if (segment.choices && segment.choices.length > 0 && index < currentStory.segments.length - 1) {
                content += `**选择选项**:\n`;
                segment.choices.forEach((choice, i) => {
                    content += `${i + 1}. ${choice}\n`;
                });
                content += `\n`;
            }
            
            content += `---\n\n`;
        });
        
        // 添加角色信息
        if (currentStory.characters.size > 0) {
            content += `## 角色信息\n\n`;
            Array.from(currentStory.characters.entries()).forEach(([name, info]) => {
                content += `- **${name}**: 出现 ${info.appearances} 次\n`;
            });
            content += `\n`;
        }
        
        content += `---\n\n`;
        content += `*由 VibeStory 生成 - 关键词驱动的互动小说平台*\n`;
        
        return content;
    }
}

// ==================== 初始化 ====================
let apiManager, storyGenerator, uiManager;

document.addEventListener('DOMContentLoaded', () => {
    // 初始化管理器
    apiManager = new APIManager();
    storyGenerator = new StoryGenerator(apiManager);
    uiManager = new UIManager();
    
    // 检查API配置
    if (API_CONFIG.apiKey === 'sk-your-deepseek-api-key-here') {
        Utils.showToast('请在代码中配置您的DeepSeek API密钥', 'warning');
    }
    
    console.log('VibeStory 初始化完成');
});

// ==================== 错误处理 ====================
window.addEventListener('error', (event) => {
    console.error('全局错误:', event.error);
    Utils.showToast('发生了一个错误，请刷新页面重试', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('未处理的Promise拒绝:', event.reason);
    Utils.showToast('请求处理失败，请重试', 'error');
});

