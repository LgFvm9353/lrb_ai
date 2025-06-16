// // VibeStory

// API配置
const API_CONFIG = {
    url: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: 'sk-77a11aba20914bddb5294cc2d2d3a14d', // DeepSeek API密钥
    maxRetries: 3,
    retryDelay: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-77a11aba20914bddb5294cc2d2d3a14d'
    }
};

// 故事配置
const STORY_CONFIG = {
    MAX_SCENES: 12, // 最大场景数量，故事将在达到此数量后结束
    CURRENT_SCENE: 0, // 当前场景索引
    TEXT_LENGTH: {
        DESKTOP: { MIN: 50, MAX: 80 }, // PC端每段对话字数
        MOBILE: { MIN: 20, MAX: 30 }   // 移动端每段对话字数
    },
    IS_STORY_ENDED: false // 故事是否已结束标志
};

// 背景库
const BACKGROUND_LIBRARY = {
    none: '',
    forest: 'linear-gradient(135deg, #2d5016, #3e7b27)',
    city: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    space: 'linear-gradient(135deg, #0c0c0c, #1a1a2e)',
    ocean: 'linear-gradient(135deg, #006994, #0099cc)',
    desert: 'linear-gradient(135deg, #d2691e, #f4a460)',
    mountain: 'linear-gradient(135deg, #4a4a4a, #696969)'
};

// 游戏状态
let currentStory = {
    keywords: {
        raw: '',
        parsed: [],
        sceneBase: '',
        coreConflict: '',
        specialElements: []
    },
    scenes: [],
    currentSceneIndex: 0,
    choices: [],
    narrativeNodes: [],
    characters: {
        list: {},
        relations: [],
        attributes: {}
    },
    environment: {
        audio: null,
        colorTemp: '#ffffff',
        tags: []
    },
    settings: {
        difficulty: 3,
        genre: 'adventure',
        premium: {
            advancedStyles: false,
            dlcCharacters: false
        }
    },
    memoryFragments: []
};

/**
 * 初始化游戏
 */
function initGame() {
    const keywordsInput = document.getElementById('keywords');
    const difficultySlider = document.getElementById('difficulty');
    const difficultyValue = document.getElementById('difficulty-value');
    const genreSelect = document.getElementById('genre-select');
    const backgroundSelect = document.getElementById('background-select');
    const storyContainer = document.getElementById('story');
    const choicesContainer = document.getElementById('choices');
    const narrativeNodesContainer = document.getElementById('narrative-nodes');
    const characterGraph = document.getElementById('character-graph');
    const characterStatsContainer = document.getElementById('character-stats');
    const memoryFragmentsContainer = document.getElementById('memory-fragments');
    const submitBtn = document.getElementById('submit');
    const exportStoryBtn = document.getElementById('export-story');
    const unlockStylesBtn = document.getElementById('unlock-styles');
    const unlockCharactersBtn = document.getElementById('unlock-characters');
    
    // 设置难度滑块事件
    difficultySlider.addEventListener('input', function() {
        difficultyValue.textContent = this.value;
        currentStory.settings.difficulty = parseInt(this.value);
    });
    
    // 设置风格选择事件
    genreSelect.addEventListener('change', function() {
        currentStory.settings.genre = this.value;
    });
    
    // 设置背景切换事件
    backgroundSelect.addEventListener('change', function() {
        const background = BACKGROUND_LIBRARY[this.value];
        document.body.style.background = background;
    });
    
    // 设置难度
    difficultySlider.value = currentStory.settings.difficulty;
    difficultyValue.textContent = currentStory.settings.difficulty;
    
    // 设置风格
    genreSelect.value = currentStory.settings.genre;
    
    // 设置开始游戏按钮事件
    submitBtn.addEventListener('click', startGame);
    
    // 设置导出故事按钮事件
    if (exportStoryBtn) {
        exportStoryBtn.addEventListener('click', exportStory);
    }
    
    // 设置高级功能解锁按钮事件
    if (unlockStylesBtn) {
        unlockStylesBtn.addEventListener('click', () => unlockPremiumFeature('styles'));
    }
    if (unlockCharactersBtn) {
        unlockCharactersBtn.addEventListener('click', () => unlockPremiumFeature('characters'));
    }
    
    // 从本地存储加载高级功能设置
    const savedPremium = localStorage.getItem('vibeStoryPremium');
    if (savedPremium) {
        try {
            currentStory.settings.premium = JSON.parse(savedPremium);
        } catch (e) {
            console.error('无法解析保存的高级功能设置:', e);
        }
    }
    
    // 初始化导航系统
    initializeNavigation();
    
    // 初始化侧边栏标签系统
    initializeSidebarTabs();
    
    // 提示用户设置API密钥
    if (!API_CONFIG.apiKey) {
        console.warn('请设置DeepSeek API密钥');
    }
}

/**
 * 开始游戏
 */
function startGame() {
    const keywordsInput = document.getElementById('keywords');
    const keywords = keywordsInput.value.trim();
    
    if (!keywords) {
        alert('请输入关键词！');
        return;
    }
    
    // 验证API密钥
    if (!API_CONFIG.apiKey) {
        const apiKey = prompt('请输入您的DeepSeek API密钥：');
        if (!apiKey) {
            alert('需要API密钥才能开始游戏！');
            return;
        }
        API_CONFIG.apiKey = apiKey;
        API_CONFIG.headers.Authorization = 'Bearer ' + apiKey;
    }
    
    // 保存关键词
    currentStory.keywords.raw = keywords;
    currentStory.keywords.parsed = keywords.split('+').map(k => k.trim());
    
    // 保存当前设置
    currentStory.settings.difficulty = parseInt(document.getElementById('difficulty').value);
    currentStory.settings.genre = document.getElementById('genre-select').value;
    
    // 切换到游戏页面
    switchPage('game');
    
    // 显示加载状态
    const storyContainer = document.getElementById('story');
    storyContainer.innerHTML = '<div class="loading">正在生成故事...</div>';
    
    // 清空选择容器
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    
    // 重置故事状态
    currentStory.scenes = [];
    currentStory.currentSceneIndex = 0;
    
    // 生成故事
    generateStory(keywords).catch(error => {
        console.error('生成故事失败:', error);
        storyContainer.innerHTML = `<div class="error">生成故事失败: ${error.message}</div>`;
        
        // 添加重试按钮
        const retryButton = document.createElement('button');
        retryButton.className = 'primary-btn';
        retryButton.textContent = '重试';
        retryButton.addEventListener('click', startGame);
        storyContainer.appendChild(retryButton);
        
        // 添加返回按钮
        const backButton = document.createElement('button');
        backButton.className = 'secondary-btn';
        backButton.textContent = '返回设置';
        backButton.addEventListener('click', () => switchPage('setup'));
        storyContainer.appendChild(backButton);
    });
}

/**
 * 生成故事
 */
async function generateStory(keywords) {
    const storyContainer = document.getElementById('story');
    
    // 重置故事配置
    STORY_CONFIG.CURRENT_SCENE = 0;
    STORY_CONFIG.IS_STORY_ENDED = false;
    
    // 显示骨架屏加载动画
    storyContainer.innerHTML = generateSkeletonLoading();
    
    try {
        // 获取设备类型的文本长度限制
        const textLength = getDeviceTextLength();
        
        const prompt = `基于关键词"${keywords}"创建一个互动故事的开头。请包含：
1. 生动的场景描述
2. 主要角色介绍
3. 初始冲突或问题
4. 2-3个选择选项

请注意以下要求：
- 故事将在${STORY_CONFIG.MAX_SCENES}个场景内结束，请合理规划故事长度
- 每段对话的字数应控制在${textLength.MIN}-${textLength.MAX}字之间

你必须严格按照以下JSON格式返回，不要添加任何额外的文本、注释或代码块：
{
  "story": "详细的故事内容...",
  "choices": ["选项1", "选项2", "选项3"]
}

确保：
- story字段是字符串，不是对象
- choices字段是字符串数组，不是对象数组
- 返回的是有效的JSON格式，不包含markdown标记
- 不要在JSON外添加任何说明文字或代码块标记
`;
        
        const response = await callDeepSeekAPI(prompt);
        
        let result;
        try {
            result = JSON.parse(response);
        } catch (parseError) {
            console.error('JSON解析错误:', parseError, '原始响应:', response);
            throw new Error(`无法解析API返回的内容: ${parseError.message}\n\n原始响应: ${response.substring(0, 100)}...`);
        }
        
        // 验证返回的数据结构
        if (!result.story) {
            throw new Error('API返回的数据缺少story字段');
        }
        
        // 确保story是字符串
        if (typeof result.story === 'object') {
            result.story = result.story.text || result.story.content || JSON.stringify(result.story);
        }
        
        // 确保choices是字符串数组
        if (result.choices) {
            if (!Array.isArray(result.choices)) {
                // 如果不是数组，尝试转换
                result.choices = Object.values(result.choices);
            }
            
            // 处理数组中的每个元素
            result.choices = result.choices.map(choice => {
                if (typeof choice === 'object') {
                    return choice.text || choice.description || JSON.stringify(choice);
                }
                return String(choice);
            });
        } else {
            result.choices = [];
        }
        
        // 显示故事内容
        displayStory(result.story);
        
        // 显示选择
        displayChoices(result.choices);
        
        // 保存到故事状态
        currentStory.scenes.push({
            content: result.story,
            choices: result.choices
        });
        
        // 更新当前场景索引
        STORY_CONFIG.CURRENT_SCENE++;
        
    } catch (error) {
        console.error('生成故事失败:', error);
        storyContainer.innerHTML = `
            <div class="error">
                <h3>生成故事失败</h3>
                <p>${error.message}</p>
                <button id="retry-story" class="primary-btn">重试</button>
                <button id="back-to-setup" class="secondary-btn">返回设置</button>
            </div>
        `;
        
        // 添加重试和返回按钮的事件监听器
        document.getElementById('retry-story').addEventListener('click', () => generateStory(keywords));
        document.getElementById('back-to-setup').addEventListener('click', () => switchPage('setup'));
    }
}

/**
 * 获取当前设备的文本长度限制
 */
function getDeviceTextLength() {
    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 768;
    return isMobile ? STORY_CONFIG.TEXT_LENGTH.MOBILE : STORY_CONFIG.TEXT_LENGTH.DESKTOP;
}

/**
 * 生成骨架屏加载动画HTML
 */
function generateSkeletonLoading() {
    return `
        <div class="skeleton-loading">
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
        </div>
    `;
}

/**
 * 生成骨架屏选项加载动画HTML
 */
function generateSkeletonChoices() {
    return `
        <div class="skeleton-loading skeleton-choice"></div>
        <div class="skeleton-loading skeleton-choice"></div>
        <div class="skeleton-loading skeleton-choice"></div>
    `;
}

/**
 * 调用DeepSeek API
 */
async function callDeepSeekAPI(prompt) {
    // 确保API密钥已设置
    if (!API_CONFIG.apiKey) {
        const apiKey = prompt('请输入您的DeepSeek API密钥：');
        if (!apiKey) {
            throw new Error('需要API密钥才能调用DeepSeek API');
        }
        API_CONFIG.apiKey = apiKey;
        API_CONFIG.headers.Authorization = 'Bearer ' + apiKey;
    }
    
    // 添加重试逻辑
    let retries = 0;
    let lastError = null;
    
    while (retries <= API_CONFIG.maxRetries) {
        try {
            // 确保每次请求都使用最新的headers
            const headers = {
                ...API_CONFIG.headers,
                'Authorization': 'Bearer ' + API_CONFIG.apiKey
            };
            
            console.log('正在调用DeepSeek API...');
            const response = await fetch(API_CONFIG.url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 2000
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`API响应错误: ${response.status} ${response.statusText}`, errorText);
                
                if (response.status === 401) {
                    // 认证错误，重新获取API密钥
                    const apiKey = prompt('API密钥无效，请重新输入DeepSeek API密钥：');
                    if (!apiKey) {
                        throw new Error('需要有效的API密钥才能继续');
                    }
                    API_CONFIG.apiKey = apiKey;
                    API_CONFIG.headers.Authorization = 'Bearer ' + apiKey;
                    retries++;
                    continue;
                }
                
                throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            const content = data.choices[0].message.content;
            
            // 处理返回的内容，确保是有效的JSON
            // 如果内容包含markdown代码块，提取JSON部分
            let jsonContent = content;
            const jsonRegex = /```(?:json)?\s*([\s\S]*?)```/;
            const match = content.match(jsonRegex);
            
            if (match && match[1]) {
                jsonContent = match[1].trim();
            }
            
            // 尝试验证JSON是否有效
            try {
                JSON.parse(jsonContent);
                return jsonContent;
            } catch (e) {
                console.warn('API返回的内容不是有效的JSON，尝试修复格式...');
                // 尝试提取看起来像JSON的部分
                const possibleJson = jsonContent.match(/\{[\s\S]*\}/);
                if (possibleJson) {
                    return possibleJson[0];
                }
                throw new Error('无法解析API返回的内容为有效JSON');
            }
            
        } catch (error) {
            console.error(`尝试 ${retries + 1}/${API_CONFIG.maxRetries + 1} 失败:`, error);
            lastError = error;
            retries++;
            
            if (retries <= API_CONFIG.maxRetries) {
                // 等待一段时间后重试
                await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay * retries));
            }
        }
    }
    
    throw lastError || new Error('API调用失败，已达到最大重试次数');
}

/**
 * 显示故事内容
 */
function displayStory(content) {
    const storyContainer = document.getElementById('story');
    
    // 确保内容是字符串
    let storyContent = content;
    if (typeof content === 'object' && content !== null) {
        // 如果是对象，尝试获取text或content属性
        storyContent = content.text || content.content || JSON.stringify(content);
        console.warn('故事内容是对象格式，已转换为字符串:', content);
    } else if (typeof content !== 'string') {
        storyContent = String(content);
        console.warn('故事内容不是字符串格式，已转换:', content);
    }
    
    // 格式化故事内容，添加段落
    storyContent = storyContent
        .split('\n\n')
        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
    
    storyContainer.innerHTML = `<div class="story-content">${storyContent}</div>`;
}

/**
 * 显示选择
 */
function displayChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    
    // 确保choices是数组
    if (!Array.isArray(choices)) {
        console.error('选项不是数组格式:', choices);
        // 尝试转换为数组
        if (typeof choices === 'object' && choices !== null) {
            choices = Object.values(choices);
        } else {
            choices = [];
        }
    }
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        
        // 处理选项内容，确保是字符串
        let choiceText = choice;
        if (typeof choice === 'object' && choice !== null) {
            // 如果是对象，尝试获取text或description属性
            choiceText = choice.text || choice.description || JSON.stringify(choice);
        } else if (typeof choice !== 'string') {
            choiceText = String(choice);
        }
        
        button.textContent = choiceText;
        button.dataset.index = index;
        button.dataset.choice = choiceText;
        
        // 检查是否是故事结束选项
        if (STORY_CONFIG.IS_STORY_ENDED || choiceText === '查看故事总结') {
            button.classList.add('end-choice-btn');
            button.addEventListener('click', () => {
                // 显示故事结束内容
                showStoryEndContent();
                
                // 更新按钮文本
                button.textContent = '导出故事';
                button.removeEventListener('click', () => {});
                button.addEventListener('click', exportStory);
            });
        } else {
            // 添加点击事件
            button.addEventListener('click', () => makeChoice(index, choiceText));
            
            // 添加悬停事件，预加载下一个故事
            button.addEventListener('mouseenter', () => preloadNextScene(choiceText));
        }
        
        choicesContainer.appendChild(button);
    });
    
    // 如果故事未结束，自动预加载第一个选项的下一个场景
    if (!STORY_CONFIG.IS_STORY_ENDED && choices.length > 0) {
        const firstChoice = choices[0];
        const choiceText = typeof firstChoice === 'object' ? 
            (firstChoice.text || firstChoice.description || JSON.stringify(firstChoice)) : 
            String(firstChoice);
        preloadNextScene(choiceText);
    }
}

// 预加载的内容缓存
const preloadCache = {
    loading: false,
    choice: null,
    result: null
};

/**
 * 预加载下一个场景
 */
async function preloadNextScene(choice) {
    // 如果故事已结束，不进行预加载
    if (STORY_CONFIG.IS_STORY_ENDED) return;
    
    // 如果已经在加载相同的选择，或者已经有缓存，则跳过
    if (preloadCache.loading || (preloadCache.choice === choice && preloadCache.result)) {
        return;
    }
    
    // 标记为正在加载
    preloadCache.loading = true;
    preloadCache.choice = choice;
    
    try {
        const currentScene = currentStory.scenes[currentStory.scenes.length - 1];
        
        // 获取设备类型的文本长度限制
        const textLength = getDeviceTextLength();
        
        // 检查是否接近故事结束
        const isNearEnd = STORY_CONFIG.CURRENT_SCENE >= STORY_CONFIG.MAX_SCENES - 2;
        const endingPrompt = isNearEnd ? `\n请注意：故事应该在接下来的1-2个场景内结束，请开始为故事准备结局。` : '';
        
        const prompt = `基于之前的故事："${currentScene.content}"\n\n用户选择了："${choice}"\n\n请继续故事，包含新的情节发展和2-3个新的选择。每段对话的字数应控制在${textLength.MIN}-${textLength.MAX}字之间。${endingPrompt}\n\n用JSON格式返回，包含story和choices字段。`;
        
        console.log(`预加载选项: "${choice}"的下一个场景`);
        const response = await callDeepSeekAPI(prompt);
        
        try {
            const result = JSON.parse(response);
            // 验证返回的数据结构
            if (!result.story) {
                throw new Error('API返回的数据缺少story字段');
            }
            
            // 检查是否达到最大场景数
            if (STORY_CONFIG.CURRENT_SCENE + 1 >= STORY_CONFIG.MAX_SCENES) {
                // 如果有选项，替换为结束选项
                if (result.choices && result.choices.length > 0) {
                    result.choices = ['查看故事总结'];
                }
            }
            
            // 缓存结果
            preloadCache.result = result;
            console.log('预加载完成:', choice);
        } catch (parseError) {
            console.error('预加载JSON解析错误:', parseError);
            preloadCache.result = null;
        }
    } catch (error) {
        console.error('预加载失败:', error);
        preloadCache.result = null;
    } finally {
        preloadCache.loading = false;
    }
}

/**
 * 做出选择
 */
async function makeChoice(index, choice) {
    const storyContainer = document.getElementById('story');
    const choicesContainer = document.getElementById('choices');
    
    // 显示骨架屏加载动画
    choicesContainer.innerHTML = generateSkeletonChoices();
    
    try {
        let result;
        
        // 检查是否有预加载的内容
        if (preloadCache.choice === choice && preloadCache.result) {
            console.log('使用预加载的内容');
            result = preloadCache.result;
            // 清除缓存
            preloadCache.choice = null;
            preloadCache.result = null;
        } else {
            // 没有预加载内容，正常请求
            const currentScene = currentStory.scenes[currentStory.scenes.length - 1];
            
            // 获取设备类型的文本长度限制
            const textLength = getDeviceTextLength();
            
            // 检查是否接近故事结束
            const isNearEnd = STORY_CONFIG.CURRENT_SCENE >= STORY_CONFIG.MAX_SCENES - 2;
            const endingPrompt = isNearEnd ? `\n请注意：故事应该在接下来的1-2个场景内结束，请开始为故事准备结局。` : '';
            
            const prompt = `基于之前的故事："${currentScene.content}"\n\n用户选择了："${choice}"\n\n请继续故事，包含新的情节发展和2-3个新的选择。每段对话的字数应控制在${textLength.MIN}-${textLength.MAX}字之间。${endingPrompt}\n\n用JSON格式返回，包含story和choices字段。`;
            
            const response = await callDeepSeekAPI(prompt);
            result = JSON.parse(response);
        }
        
        // 更新当前场景索引
        STORY_CONFIG.CURRENT_SCENE++;
        
        // 检查是否达到最大场景数
        if (STORY_CONFIG.CURRENT_SCENE >= STORY_CONFIG.MAX_SCENES) {
            // 标记故事已结束
            STORY_CONFIG.IS_STORY_ENDED = true;
            
            // 如果有选项，替换为结束选项
            if (result.choices && result.choices.length > 0) {
                result.choices = ['查看故事总结'];
            }
        }
        
        // 显示新故事内容
        displayStory(result.story);
        displayChoices(result.choices || []);
        
        // 保存到故事状态
        currentStory.scenes.push({
            content: result.story,
            choices: result.choices || [],
            previousChoice: choice
        });
        
        // 如果故事已结束，显示侧边栏信息
        if (STORY_CONFIG.IS_STORY_ENDED) {
            showStoryEndContent();
        }
        
    } catch (error) {
        console.error('生成故事失败:', error);
        choicesContainer.innerHTML = `<div class="error">生成故事失败: ${error.message}</div>`;
        
        // 添加重试按钮
        const retryBtn = document.createElement('button');
        retryBtn.className = 'retry-btn';
        retryBtn.textContent = '重试';
        retryBtn.addEventListener('click', () => makeChoice(index, choice));
        choicesContainer.appendChild(retryBtn);
    }
}

/**
 * 显示故事结束后的内容
 */
function showStoryEndContent() {
    // 显示侧边栏信息
    updateStoryStructure();
    updateCharacterRelationships();
    updateCharacterStats();
    updateMemoryFragments();
    
    // 自动切换到故事结构标签
    const structureTabBtn = document.querySelector('.tab-btn[data-tab="structure"]');
    if (structureTabBtn) {
        structureTabBtn.click();
    }
}

/**
 * 更新故事结构信息
 */
function updateStoryStructure() {
    const narrativeNodesContainer = document.getElementById('narrative-nodes');
    if (!narrativeNodesContainer) return;
    
    let html = '<div class="narrative-timeline">';
    
    // 为每个场景创建节点
    currentStory.scenes.forEach((scene, index) => {
        const nodeClass = index === currentStory.scenes.length - 1 ? 'narrative-node current-node' : 'narrative-node';
        
        html += `
            <div class="${nodeClass}">
                <div class="node-title">场景 ${index + 1}</div>
                <div class="node-description">${scene.previousChoice ? `选择: ${scene.previousChoice}` : '开始'}</div>
            </div>
        `;
        
        // 添加连接器（除了最后一个节点）
        if (index < currentStory.scenes.length - 1) {
            html += '<div class="node-connector"></div>';
        }
    });
    
    html += '</div>';
    narrativeNodesContainer.innerHTML = html;
}

/**
 * 更新角色关系信息
 */
function updateCharacterRelationships() {
    const characterGraphContainer = document.getElementById('character-graph');
    if (!characterGraphContainer) return;
    
    // 简单实现，实际项目中可以使用D3.js等库创建可视化图表
    characterGraphContainer.innerHTML = '<div class="character-relationship-info">故事结束后的角色关系图将在这里显示</div>';
}

/**
 * 更新角色属性信息
 */
function updateCharacterStats() {
    const characterStatsContainer = document.getElementById('character-stats');
    if (!characterStatsContainer) return;
    
    characterStatsContainer.innerHTML = '<div class="character-stats-info">故事结束后的角色属性将在这里显示</div>';
}

/**
 * 更新记忆碎片信息
 */
function updateMemoryFragments() {
    const memoryFragmentsContainer = document.getElementById('memory-fragments');
    if (!memoryFragmentsContainer) return;
    
    memoryFragmentsContainer.innerHTML = '<div class="memory-fragment">故事结束后的记忆碎片将在这里显示</div>';
}

/**
 * 初始化导航系统
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const backToSetupBtn = document.getElementById('back-to-setup');
    const backToHomeBtn = document.getElementById('back-to-home');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            switchPage(page);
        });
    });
    
    if (backToSetupBtn) {
        backToSetupBtn.addEventListener('click', () => switchPage('setup'));
    }
    
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => switchPage('setup'));
    }
}

/**
 * 切换页面
 */
function switchPage(pageName) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示目标页面
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新导航状态
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

/**
 * 初始化侧边栏标签系统
 */
function initializeSidebarTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // 激活当前标签
            btn.classList.add('active');
            const targetContent = document.getElementById(tabName + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * 导出故事
 */
function exportStory() {
    if (currentStory.scenes.length === 0) {
        alert('还没有故事内容可以导出！');
        return;
    }
    
    const storyText = currentStory.scenes.map((scene, index) => {
        let text = `=== 第${index + 1}章 ===\n${scene.content}\n`;
        if (scene.previousChoice) {
            text = `选择：${scene.previousChoice}\n\n` + text;
        }
        return text;
    }).join('\n\n');
    
    const blob = new Blob([storyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VibeStory_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * 解锁高级功能
 */
function unlockPremiumFeature(feature) {
    alert(`高级功能"${feature}"暂未实现，敬请期待！`);
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);