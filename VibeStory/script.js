// VibeStory - 关键词驱动的互动小说平台
// 性能优化版本 - 故事内容流式显示

// ==================== 配置常量 ====================
const API_CONFIG = {
    url: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: 'sk-77a11aba20914bddb5294cc2d2d3a14d', // 用户需要设置API密钥
    maxRetries: 3,
    retryDelay: 1000,
    requestTimeout: 45000,
    streamTimeout: 60000
};

const STORY_CONFIG = {
    TOTAL_SEGMENTS: 12,
    MIN_CONTENT_LENGTH: 300,
    MAX_CONTENT_LENGTH: 400, 
    CHOICES_COUNT: 3,
    TYPING_SPEED: 30, // 打字机效果速度(ms)
    CHUNK_SIZE: 3 // 每次显示的字符数
};

const UI_CONFIG = {
    ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    FADE_DURATION: 200
};

// ==================== 全局状态管理 ====================
class GameState {
    constructor() {
        this.currentSegment = 0;
        this.storyHistory = [];
        this.characters = new Map();
        this.storyStructure = [];
        this.memoryFragments = [];
        this.isGenerating = false;
        this.currentChoice = null;
        this.gameSettings = {
            keywords: '',
            style: '冒险',
            complexity: '普通'
        };
    }

    reset() {
        this.currentSegment = 0;
        this.storyHistory = [];
        this.characters.clear();
        this.storyStructure = [];
        this.memoryFragments = [];
        this.isGenerating = false;
        this.currentChoice = null;
    }

    addSegment(segment) {
        this.storyHistory.push(segment);
        this.currentSegment++;
        this.updateStoryStructure(segment);
        this.extractCharacters(segment);
        this.extractMemoryFragments(segment);
    }

    updateStoryStructure(segment) {
        this.storyStructure.push({
            id: this.currentSegment,
            title: `第${this.currentSegment}段`,
            content: segment.content.substring(0, 100) + '...', // 摘要
            timestamp: new Date().toLocaleTimeString(),
            choices: segment.choices || []
        });
    }

    extractCharacters(segment) {
        // 简单的角色提取逻辑
        const content = segment.content;
        const namePattern = /([A-Za-z\u4e00-\u9fa5]{2,4})(说|道|想|看|走|跑|笑|哭|叫)/g;
        let match;
        while ((match = namePattern.exec(content)) !== null) {
            const name = match[1];
            if (!this.characters.has(name)) {
                this.characters.set(name, {
                    name: name,
                    appearances: 1,
                    traits: [],
                    relationships: []
                });
            } else {
                this.characters.get(name).appearances++;
            }
        }
    }

    extractMemoryFragments(segment) {
        // 提取重要信息片段
        const sentences = segment.content.split(/[。！？]/);
        sentences.forEach(sentence => {
            if (sentence.length > 20 && sentence.length < 100) {
                this.memoryFragments.push({
                    content: sentence.trim(),
                    segment: this.currentSegment,
                    timestamp: new Date().toLocaleTimeString()
                });
            }
        });
    }

    isComplete() {
        return this.currentSegment >= STORY_CONFIG.TOTAL_SEGMENTS;
    }
}

// ==================== API管理器 ====================
class APIManager {
    constructor() {
        this.requestQueue = [];
        this.isProcessing = false;
        this.abortController = null;
    }

    async generateStorySegment(gameState, choice = null) {
        if (!API_CONFIG.apiKey) {
            throw new Error('请先设置DeepSeek API密钥');
        }

        const prompt = this.buildPrompt(gameState, choice);
        
        try {
            this.abortController = new AbortController();
            
            const response = await fetch(API_CONFIG.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_CONFIG.apiKey}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 1000,
                    temperature: 0.8,
                    stream: false 
                }),
                signal: this.abortController.signal,
                timeout: API_CONFIG.requestTimeout
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;
            
            return this.parseStoryResponse(content, gameState.currentSegment + 1);
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('用户取消了生成');
            }
            throw error;
        }
    }

    buildPrompt(gameState, choice) {
        const segment = gameState.currentSegment + 1;
        const isFirst = segment === 1;
        const isLast = segment === STORY_CONFIG.TOTAL_SEGMENTS;
        
        let prompt = '';
        let storyStructureHint = '';
        let endingTypeHint = '';

        // Story Structure Hints
        if (segment >= 1 && segment <= 3) {
            storyStructureHint = "这是故事的第1-3段，需要快速引入主角、核心目标和初始冲突。";
        } else if (segment >= 4 && segment <= 6) {
            storyStructureHint = "这是故事的第4-6段，需要引入第一个转折（如盟友背叛或关键线索出现）。";
        } else if (segment >= 7 && segment <= 9) {
            storyStructureHint = "这是故事的第7-9段，需要为高潮铺垫，揭露禁忌真相。所有伏笔必须在本段前埋好，禁止在第12段引入新设定。";
        } else if (segment === 10) {
            storyStructureHint = "这是故事的第10段，主角将面临终极选择（牺牲/背叛/觉醒）。";
        } else if (segment === 11) {
            storyStructureHint = "这是故事的第11段，需要解决冲突的关键动作（如完成仪式）。";
        } else if (segment === 12) {
            storyStructureHint = "这是故事的第12段，是故事的最终结局，需要给出象征性闭环结局，并包含一个强烈的情感或哲学冲击。用1-2个细节强化结局合理性。";
            // Randomly select an ending type for the final segment
            const endingTypes = [
                "结局场景与开头形成镜像（如开头发现诅咒，结尾成为新诅咒载体）。",
                "暗示未来可能（如门后传来脚步声，但不明说是谁）。",
                "用环境/物品象征结局（如家族徽章碎裂，但新芽从裂缝中长出）。"
            ];
            endingTypeHint = `结局类型提示：${endingTypes[Math.floor(Math.random() * endingTypes.length)]}`;
        }

        if (isFirst) {
            prompt = `请根据以下设定创作一个互动小说的第${segment}段（共${STORY_CONFIG.TOTAL_SEGMENTS}段）：

关键词：${gameState.gameSettings.keywords}
风格：${gameState.gameSettings.style}
复杂度：${gameState.gameSettings.complexity}

要求：
1. ${storyStructureHint}
2. 内容长度：${STORY_CONFIG.MIN_CONTENT_LENGTH}-${STORY_CONFIG.MAX_CONTENT_LENGTH}字
3. 确保故事内容紧密贴合关键词、风格和复杂度。
4. 结尾提供${STORY_CONFIG.CHOICES_COUNT}个不同的选择，每个选择都应包含"选项内容（解释）"的形式，解释应明确指出选择的后果或意义，例如："坚持追问诅咒（弗朗西斯明显在隐瞒什么，必须弄清"霍华德家族的秘密"与自己有何关联）"
5. 选择要有明确的后果预期

请按以下格式输出：
【故事内容】
（这里是故事正文）

【选择】
1. （选择一的描述）
2. （选择二的描述）
3. （选择三的描述）`;
        } else if (isLast) {
            prompt = `请继续这个互动小说的第${segment}段（最终段）：

之前的故事发展：
${this.getStoryHistory(gameState)}

用户选择：${choice}

要求：
1. ${storyStructureHint}
2. ${endingTypeHint}
3. 内容长度：${STORY_CONFIG.MIN_CONTENT_LENGTH}-${STORY_CONFIG.MAX_CONTENT_LENGTH}字
4. 确保故事内容紧密贴合之前的关键词、风格和复杂度，并解决所有主要情节线
5. 不需要提供选择

请按以下格式输出：
【故事内容】
（这里是故事正文）

【结局】
故事完结`;
        } else {
            prompt = `请继续这个互动小说的第${segment}段（共${STORY_CONFIG.TOTAL_SEGMENTS}段）：

之前的故事发展：
${this.getStoryHistory(gameState)}

用户选择：${choice}

要求：
1. 根据用户选择继续故事发展
2. ${storyStructureHint}
3. 内容长度：${STORY_CONFIG.MIN_CONTENT_LENGTH}-${STORY_CONFIG.MAX_CONTENT_LENGTH}字
4. 确保故事内容紧密贴合之前的关键词、风格和复杂度，并保持故事连贯性和逻辑性
5. 结尾提供${STORY_CONFIG.CHOICES_COUNT}个不同的选择，每个选择都应包含"选项内容（解释）"的形式，解释应明确指出选择的后果或意义，例如："坚持追问诅咒（弗朗西斯明显在隐瞒什么，必须弄清"霍华德家族的秘密"与自己有何关联）"

请按以下格式输出：
【故事内容】
（这里是故事正文）

【选择】
1. （选择一的描述）
2. （选择二的描述）
3. （选择三的描述）`;
        }
        
        return prompt;
    }

    getStoryHistory(gameState) {
        // 仅提供最近的2段故事历史，避免过长
        return gameState.storyHistory.slice(-2).map((segment, index) => 
            `第${gameState.currentSegment - 1 + index}段：${segment.content.substring(0, 200)}...`
        ).join('\n');
    }

    parseStoryResponse(content, segmentNumber) {
        const storyMatch = content.match(/【故事内容】\s*([\s\S]*?)(?=【选择】|【结局】|$)/);
        const choicesMatch = content.match(/【选择】\s*([\s\S]*?)(?=【结局】|$)/);
        const endingMatch = content.match(/【结局】\s*([\s\S]*?)$/);
        

        const storyContent = storyMatch ? storyMatch[1].trim() : content;
        let choices = [];

        if (choicesMatch && !endingMatch) {
            const choiceLines = choicesMatch[1].trim().split('\n');
            choices = choiceLines
                .filter(line => line.match(/^\d+\./))
                .map(line => {
                    let cleanedLine = line.replace(/^\d+\.\s*/, '').trim();
                    // 移除选项内容前后的双星号
                    if (cleanedLine.startsWith('**') && cleanedLine.endsWith('**')) {
                        cleanedLine = cleanedLine.substring(2, cleanedLine.length - 2);
                    }
                    // 移除括号及其内容（支持中英文括号）
                    cleanedLine = cleanedLine.replace(/[（(].*?[）)]/g, '').trim();
                    return cleanedLine;
                })
                .slice(0, STORY_CONFIG.CHOICES_COUNT); // 确保只取指定数量的选择
        }

        return {
            segment: segmentNumber,
            content: storyContent,
            choices: choices,
            isEnding: !!endingMatch,
            timestamp: new Date().toISOString()
        };
    }

    cancelGeneration() {
        apiManager.cancelGeneration();
        gameState.isGenerating = false;
        this.hideLoadingStatus();
        // 移除页面上所有非toast的提示（如有）
        // 只保留toast提示
        // 清理可能的旧提示
        const oldNotices = document.querySelectorAll('.generation-cancel-notice, .generation-fail-notice');
        oldNotices.forEach(el => el.remove());
        this.showToast('生成已取消', 'info');
        // 如果取消时是中间段落，需要重新显示之前的选项
        if (gameState.currentSegment > 0 && !gameState.isComplete()) {
            const lastSegment = gameState.storyHistory[gameState.storyHistory.length - 1];
            if (lastSegment && lastSegment.choices && lastSegment.choices.length > 0) {
                this.showChoices(lastSegment.choices);
            }
        }
    }
}

// ==================== UI管理器 ====================
class UIManager {
    constructor() {
        this.currentPage = 'create';
        this.isTyping = false;
        this.typingController = null;
    }

    init() {
        this.bindEvents();
        this.showPage('setup'); // 初始显示创建故事页面
        this.checkAPIKey();
    }

    bindEvents() {
        // 导航事件
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.showPage(page);
            });
        });

        // 开始故事按钮 (ID: submit)
        const startBtn = document.getElementById('submit');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startStory());
        }

        // 返回设置按钮 (ID: back-to-setup)
        const backBtn = document.getElementById('back-to-setup');
        if (backBtn) {
            backBtn.addEventListener('click', () => this.showPage('setup'));
        }

        // 关于页面的返回主页按钮 (ID: back-to-home)
        const backToHomeBtn = document.getElementById('back-to-home');
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', () => this.showPage('setup'));
        }

        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && gameState.isGenerating) {
                this.cancelGeneration();
            } else if (e.key >= '1' && e.key <= '3' && !gameState.isGenerating) {
                const choiceIndex = parseInt(e.key) - 1;
                const choiceButtons = document.querySelectorAll('.choice-btn');
                if (choiceButtons[choiceIndex]) {
                    choiceButtons[choiceIndex].click();
                }
            } else if (e.key === 'Escape') {
                // 关闭模态框
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (!modal.classList.contains('hidden')) {
                        modal.classList.add('hidden');
                    }
                });
            }
        });

        // 点击模态框背景关闭
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.add('hidden');
            }
        });

        // 控制按钮事件
        this.bindControlButtons();
    }

    bindControlButtons() {
        const buttons = {
            'export-story': () => this.exportStory(),
            'story-structure-btn': () => this.showStoryStructure(), 
            'character-relations-btn': () => this.showCharacterRelations(), 
            
        };

        Object.entries(buttons).forEach(([id, handler]) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', handler);
            }
        });
    }

    showPage(pageId) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // 显示目标页面
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // 更新导航状态
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        this.currentPage = pageId;

        // 移动端横向滑动切换页面
        const wrapper = document.querySelector('.pages-wrapper');
        if (wrapper && window.innerWidth <= 768) {
            const children = Array.from(wrapper.children);
            const index = children.findIndex(child => child.id === `${pageId}-page`);
            if (index !== -1) {
                wrapper.scrollTo({
                    left: index * wrapper.offsetWidth,
                    behavior: 'smooth'
                });
            }
        }
    }

    checkAPIKey() {
        if (!API_CONFIG.apiKey || API_CONFIG.apiKey === 'YOUR_API_KEY_HERE') { 
            this.showToast('请在代码中配置您的DeepSeek API密钥', 'warning');
        }
    }

    async startStory() {
        const keywordsInput = document.getElementById('keywords');
        const keywords = keywordsInput.value.trim();
        const style = document.getElementById('genre-select').value; 
        const complexity = document.getElementById('difficulty-select').value; 

        // 先移除旧的错误提示和红色边框
        const oldHint = document.querySelector('.error-hint');
        if (oldHint) oldHint.remove();
        keywordsInput.classList.remove('input-error');

        if (!keywords) {
            // 在输入框下方插入红色小字提示
            const hint = document.createElement('div');
            hint.className = 'error-hint';
            hint.textContent = '请输入关键词';
            hint.style.color = '#ef4444';
            hint.style.fontSize = '0.9em';
            hint.style.marginTop = '4px';
            keywordsInput.classList.add('input-error');
            keywordsInput.parentNode.appendChild(hint);
            // 监听输入自动移除提示
            keywordsInput.addEventListener('input', function clearHint() {
                keywordsInput.classList.remove('input-error');
                const h = document.querySelector('.error-hint');
                if (h) h.remove();
                keywordsInput.removeEventListener('input', clearHint);
            });
            return;
        }

        if (!API_CONFIG.apiKey || API_CONFIG.apiKey === 'YOUR_API_KEY_HERE') {
            this.showToast('请先配置DeepSeek API密钥', 'error');
            return;
        }

        // 保存设置
        gameState.gameSettings = { keywords, style, complexity };
        gameState.reset();

        // 清空故事内容区域
        const storyContentContainer = document.getElementById('story-content');
        if (storyContentContainer) {
            storyContentContainer.innerHTML = ''; 
            storyContentContainer.classList.remove('has-content'); 
        }

        // 切换到游戏界面
        this.showPage('game');
        
        // 开始生成第一段
        await this.generateNextSegment();
    }

    async generateNextSegment(choice = null) {
        if (gameState.isGenerating) return;

        gameState.isGenerating = true;
        this.showLoadingStatus();
        this.hideChoices(); // 隐藏旧选项

        try {
            const segment = await apiManager.generateStorySegment(gameState, choice);
            gameState.addSegment(segment);
            
            // 使用打字机效果显示故事内容，每次只显示最新段落
            await this.displayStoryWithTypingEffect(segment, true); 
            
            this.hideLoadingStatus();
            
            if (segment.isEnding || gameState.isComplete()) {
                this.showStoryComplete();
            } else {
                this.showChoices(segment.choices);
            }
            
        } catch (error) {
            console.error('生成故事失败:', error);
            this.hideLoadingStatus();
            this.showToast(`生成失败: ${error.message}`, 'error');
        } finally {
            gameState.isGenerating = false;
        }
    }

    async displayStoryWithTypingEffect(segment, clearPrevious = false) {
        const container = document.getElementById('story-content');
        
        if (clearPrevious) {
            container.innerHTML = ''; 
        }

        // 创建新的段落容器
        const segmentDiv = document.createElement('div');
        segmentDiv.className = 'story-segment';
        segmentDiv.innerHTML = `
            <div class="segment-content" id="segment-content-${segment.segment}"></div>
        `;
        
        container.appendChild(segmentDiv);
        container.classList.add('has-content');
        
        // 滚动到新内容
        segmentDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // 打字机效果显示内容
        const contentDiv = document.getElementById(`segment-content-${segment.segment}`);
        await this.typewriterEffect(contentDiv, segment.content);
    }

    async typewriterEffect(element, text) {
        return new Promise((resolve) => {
            this.isTyping = true;
            this.typingController = new AbortController();
            
            let index = 0;
            element.textContent = '';
            
            const typeChar = () => {
                if (this.typingController.signal.aborted) {
                    element.textContent = text; 
                    resolve();
                    return;
                }
                
                if (index < text.length) {
                    const char = text[index];
                    element.textContent += char;
                    index++;
                    
                    // 根据字符类型调整速度
                    let delay = STORY_CONFIG.TYPING_SPEED;
                    if (char === '。' || char === '！' || char === '？') {
                        delay *= 3; // 句号停顿更长
                    } else if (char === '，' || char === '、') {
                        delay *= 2; // 逗号停顿稍长
                    }
                    
                    setTimeout(typeChar, delay);
                } else {
                    this.isTyping = false;
                    resolve();
                }
            };
            
            typeChar();
        });
    }

    skipTyping() {
        if (this.isTyping && this.typingController) {
            this.typingController.abort();
        }
    }

    showLoadingStatus() {
        const loadingDiv = document.getElementById('loading-status');
        
        if (loadingDiv) {
            loadingDiv.classList.remove('hidden');
            loadingDiv.innerHTML = `
                <div class="loading-text">正在生成第${gameState.currentSegment + 1}段故事...</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(gameState.currentSegment / STORY_CONFIG.TOTAL_SEGMENTS) * 100}%"></div>
                </div>
            `;
        }
    }

    hideLoadingStatus() {
        const loadingDiv = document.getElementById('loading-status');
        if (loadingDiv) {
            loadingDiv.classList.add('hidden');
        }
    }

    showChoices(choices) {
        const choicesContainer = document.getElementById('choices-container');
        if (!choicesContainer) return;

        choicesContainer.innerHTML = ''; // 清空旧选项
        choicesContainer.classList.remove('hidden');

        choices.forEach((choiceText, index) => {
           
            const button = document.createElement('button');
            button.className = 'choice-btn btn btn-primary';
            button.textContent = `${index + 1}. ${choiceText}`;
            button.addEventListener('click', () => this.handleChoice(choiceText));
            choicesContainer.appendChild(button);
        });
    }

    hideChoices() {
        const choicesContainer = document.getElementById('choices-container');
        if (choicesContainer) {
            choicesContainer.innerHTML = ''; // 清空选项
            choicesContainer.classList.add('hidden');
        }
    }

    handleChoice(choiceText) {
        if (gameState.isGenerating) return; // 避免重复点击
        gameState.currentChoice = choiceText;
        this.hideChoices(); // 隐藏当前选项
        this.generateNextSegment(choiceText);
    }

    showStoryComplete() {
        // this.showToast('故事已完结！', 'success');
        this.hideChoices();
        
        // 显示控制按钮
        const storyStructureBtn = document.getElementById('story-structure-btn');
        const characterRelationsBtn = document.getElementById('character-relations-btn');
        const exportStoryBtn = document.getElementById('export-story');
        
        if (storyStructureBtn) storyStructureBtn.classList.remove('hidden');
        if (characterRelationsBtn) characterRelationsBtn.classList.remove('hidden');
        if (exportStoryBtn) exportStoryBtn.classList.remove('hidden');
        
        // 可以添加更多完结后的UI处理，例如显示"重新开始"按钮
        const restartBtn = document.createElement('button');
        restartBtn.className = 'btn btn-success mt-3';
        restartBtn.textContent = '重新开始';
        restartBtn.onclick = () => this.showPage('setup');
        document.getElementById('choices-container').appendChild(restartBtn);
        document.getElementById('choices-container').classList.remove('hidden');
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            toast.addEventListener('transitionend', () => toast.remove());
        }, UI_CONFIG.TOAST_DURATION);
    }

    exportStory() {
        if (gameState.storyHistory.length === 0) {
            this.showToast('没有故事内容可以导出', 'warning');
            return;
        }

        let fullStory = 'VibeStory 互动小说\n\n';
        gameState.storyHistory.forEach(segment => {
            fullStory += `第${segment.segment}段：\n${segment.content}\n\n`;
            if (segment.choices && segment.choices.length > 0) {
                fullStory += '可选路径：\n';
                segment.choices.forEach((choice, index) => {
                    fullStory += `  ${index + 1}. ${choice}\n`;
                });
                fullStory += '\n';
            }
        });

        const blob = new Blob([fullStory], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'VibeStory_Export.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }

    showStoryStructure() {
        const modalBody = document.getElementById('story-structure-modal-body');
        if (!modalBody) return;

        modalBody.innerHTML = '';
        if (gameState.storyStructure.length === 0) {
            modalBody.textContent = '故事结构尚未生成。';
            return;
        }

        const ul = document.createElement('ul');
        gameState.storyStructure.forEach(segment => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${segment.title}:</strong> ${segment.content} <span class="text-muted">(${segment.timestamp})</span>`;
            if (segment.choices && segment.choices.length > 0) {
                const choicesUl = document.createElement('ul');
                segment.choices.forEach(choice => {
                    const choiceLi = document.createElement('li');
                    choiceLi.textContent = choice;
                    choicesUl.appendChild(choiceLi);
                });
                li.appendChild(choicesUl);
            }
            ul.appendChild(li);
        });
        modalBody.appendChild(ul);

        // 显示模态框
        const modal = document.getElementById('story-structure-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    showCharacterRelations() {
        const modalBody = document.getElementById('character-relations-modal-body');
        if (!modalBody) return;

        modalBody.innerHTML = '';
        if (gameState.characters.size === 0) {
            modalBody.textContent = '尚未识别到角色。';
            return;
        }

        const ul = document.createElement('ul');
        gameState.characters.forEach((char, name) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${name}</strong> (出现次数: ${char.appearances})`;
            ul.appendChild(li);
        });
        modalBody.appendChild(ul);

        // 显示模态框
        const modal = document.getElementById('character-relations-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    showMemoryFragments() {
        const modalBody = document.getElementById('memory-fragments-modal-body');
        if (!modalBody) return;

        modalBody.innerHTML = '';
        if (gameState.memoryFragments.length === 0) {
            modalBody.textContent = '尚未提取到记忆碎片。';
            return;
        }

        const ul = document.createElement('ul');
        gameState.memoryFragments.forEach(fragment => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>第${fragment.segment}段:</strong> ${fragment.content} <span class="text-muted">(${fragment.timestamp})</span>`;
            ul.appendChild(li);
        });
        modalBody.appendChild(ul);

        const modal = new bootstrap.Modal(document.getElementById('memory-fragments-modal'));
        modal.show();
    }
}

// ==================== 初始化 ====================
const gameState = new GameState();
const apiManager = new APIManager();
const uiManager = new UIManager();

document.addEventListener('DOMContentLoaded', () => {
    uiManager.init();
});

