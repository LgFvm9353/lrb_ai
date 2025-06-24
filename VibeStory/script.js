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
    IS_STORY_ENDED: false, // 故事是否已结束标志
    BRANCH_DEPTH: 3, // 预生成的分支深度
    STEPS_PER_BRANCH: 5, // 每个分支的步数
    PRELOAD_THRESHOLD: 2 // 当剩余步数小于此值时触发预加载
};

// 背景库
const BACKGROUND_LIBRARY = {
    none: {
        gradient: '',
        image: ''
    },
    forest: {
        gradient: 'linear-gradient(135deg, #2d5016, #3e7b27)',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    },
    city: {
        gradient: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    },
    space: {
        gradient: 'linear-gradient(135deg, #0c0c0c, #1a1a2e)',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    },
    ocean: {
        gradient: 'linear-gradient(135deg, #006994, #0099cc)',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    },
    desert: {
        gradient: 'linear-gradient(135deg, #d2691e, #f4a460)',
        image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    },
    mountain: {
        gradient: 'linear-gradient(135deg, #4a4a4a, #696969)',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80'
    }
};

// 场景关键词映射到背景类型
const SCENE_KEYWORDS = {
    forest: ['森林', '树木', '丛林', '绿色', '植物', '自然', '野外', '树林'],
    city: ['城市', '街道', '建筑', '摩天楼', '都市', '市区', '城镇', '大厦'],
    space: ['太空', '星空', '宇宙', '星球', '星际', '飞船', '星系', '外太空'],
    ocean: ['海洋', '大海', '海底', '水下', '海滩', '海岸', '珊瑚', '潜水'],
    desert: ['沙漠', '荒漠', '干旱', '沙丘', '戈壁', '黄沙', '炎热', '荒芜'],
    mountain: ['山脉', '高山', '山峰', '山谷', '悬崖', '峡谷', '山地', '岩石']
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
        tags: [],
        currentBackground: 'none'
    },
    settings: {
        difficulty: 3,
        genre: 'adventure',
        premium: {
            advancedStyles: false,
            dlcCharacters: false
        }
    },
    memoryFragments: [],
    // 故事树结构，用于存储预生成的所有分支
    storyTree: {
        // 当前节点ID
        currentNodeId: 'root',
        // 节点映射表，键为节点ID，值为节点对象
        nodes: {}
    },
    // 当前路径，记录用户选择的路径
    currentPath: [],
    // 后台加载状态
    backgroundLoading: false
};

// 故事树节点结构
class StoryNode {
    constructor(id, content, choices = [], parentId = null, depth = 0) {
        this.id = id;                 // 节点唯一ID
        this.content = content;       // 故事内容
        this.choices = choices;       // 选项列表
        this.childrenIds = {};        // 子节点ID映射，键为选项文本，值为子节点ID
        this.parentId = parentId;     // 父节点ID
        this.depth = depth;           // 节点深度
        this.isGenerated = false;     // 是否已生成子节点
        this.isEnding = false;        // 是否是结局节点
    }
}

// 生成唯一ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

let isFirstStory = true;

/**
 * 初始化游戏
 */
function initGame() {
    const keywordsInput = document.getElementById('keywords');
    const genreSelect = document.getElementById('genre-select');
    const storyContainer = document.getElementById('story');
    const choicesContainer = document.getElementById('choices');
    const narrativeNodesContainer = document.getElementById('narrative-nodes');
    const characterGraph = document.getElementById('character-graph');
    const characterStatsContainer = document.getElementById('character-stats');
    const memoryFragmentsContainer = document.getElementById('memory-fragments');
    const submitBtn = document.getElementById('submit');
    const exportStoryBtn = document.getElementById('export-story');
    const backToSetupBtn = document.getElementById('back-to-setup');
    const backToHomeBtn = document.getElementById('back-to-home');

    // 设置风格选择事件
    if (genreSelect) {
        genreSelect.addEventListener('change', function() {
            currentStory.settings.genre = this.value;
        });
        genreSelect.value = currentStory.settings.genre;
    }

    // 设置开始游戏按钮事件
    if (submitBtn) {
        submitBtn.addEventListener('click', startGame);
    }

    // 设置导出故事按钮事件
    if (exportStoryBtn) {
        exportStoryBtn.addEventListener('click', exportStory);
    }

    // 设置返回按钮事件
    if (backToSetupBtn) {
        backToSetupBtn.addEventListener('click', () => switchPage('setup'));
    }
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => switchPage('setup'));
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
    isFirstStory = true;
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
    const difficultyElem = document.getElementById('difficulty');
    if (difficultyElem) {
        currentStory.settings.difficulty = parseInt(difficultyElem.value);
    }
    const genreElem = document.getElementById('genre-select');
    if (genreElem) {
        currentStory.settings.genre = genreElem.value;
    }
    // 切换到游戏页面
    switchPage('game');
    // 显示加载状态
    const storyContainer = document.getElementById('story');
    storyContainer.innerHTML = '<div class="loading">正在为你生成专属故事...</div>';
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
    setGameUIVisibility(false);
}

/**
 * 生成故事
 */
async function generateStory(keywords) {
    const storyContainer = document.getElementById('story');
    const choicesContainer = document.getElementById('choices');
    
    // 重置故事配置
    STORY_CONFIG.CURRENT_SCENE = 0;
    STORY_CONFIG.IS_STORY_ENDED = false;
    
    // 首次和后续生成的提示
    if (isFirstStory) {
        storyContainer.innerHTML = '<div class="loading">正在为你生成专属故事...</div>';
        isFirstStory = false;
    } else {
        storyContainer.innerHTML = '<div class="loading">正在生成专属剧情...</div>';
    }
    choicesContainer.innerHTML = '';
    
    try {
        // 重置故事树
        currentStory.storyTree = {
            currentNodeId: 'root',
            nodes: {}
        };
        currentStory.currentPath = [];
        
        // 获取设备类型的文本长度限制
        const textLength = getDeviceTextLength();
        
        const genre = currentStory.settings.genre;
        const prompt = `请基于关键词“${keywords}”和风格“${genre}”，创作一个紧密贴合主题和风格的互动故事开头。要求：\n- 剧情推进合理，环环相扣，情节紧凑，人物动机清晰。\n- 总共12段剧情，结局自然且不突兀。\n- 每段剧情都与主题和风格高度相关。\n- 第一段为开篇，介绍背景、角色和冲突。\n- 后续每段推进故事发展，最后一段为结局。\n- 每段50-80字。\n- 返回JSON格式：{\"story\": [\"第1段...\", ... , \"第12段...\"], \"choices\": [\"选项1\", ...] }\n- story为12段字符串数组，choices为本段可选项数组。\n- 不要添加任何多余说明、注释或代码块。`;
        
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
        
        // 创建根节点
        const rootId = 'root';
        const rootNode = new StoryNode(rootId, result.story, result.choices);
        currentStory.storyTree.nodes[rootId] = rootNode;
        
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
        
        // 初始化进度条
        updateStoryGenerationProgress(1, calculateTotalNodes());
        
        // 在后台生成故事树的其余部分
        setTimeout(() => {
            const progressInfo = { current: 1, total: calculateTotalNodes() };
            generateStoryBranches(rootId, result.story, result.choices, 1, progressInfo);
        }, 100);
        
        setGameUIVisibility(true);
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
        setGameUIVisibility(false);
    }
}

/**
 * 更新故事生成进度
 */
function updateStoryGenerationProgress(current, total) {
    const percentage = Math.min(Math.round((current / total) * 100), 100);
    const progressBar = document.querySelector('.progress-bar');
    const progressPercentage = document.querySelector('.progress-percentage');
    const progressStatus = document.querySelector('.progress-status');
    
    if (progressBar && progressPercentage && progressStatus) {
        progressBar.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage}%`;
        
        if (percentage < 25) {
            progressStatus.textContent = '正在生成故事主干...';
        } else if (percentage < 50) {
            progressStatus.textContent = '正在探索分支可能性...';
        } else if (percentage < 75) {
            progressStatus.textContent = '正在丰富故事细节...';
        } else if (percentage < 100) {
            progressStatus.textContent = '正在完善故事结局...';
        } else {
            progressStatus.textContent = '故事树生成完成！';
        }
    }
}

/**
 * 计算故事树的总节点数
 */
function calculateTotalNodes() {
    // 基于分支深度和每个节点的平均选择数计算
    const avgChoicesPerNode = 3; // 假设平均每个节点有3个选择
    let total = 0;
    
    // 计算每一层的节点数并累加
    for (let i = 0; i <= STORY_CONFIG.BRANCH_DEPTH; i++) {
        // 第i层的节点数 = avgChoicesPerNode^i
        total += Math.pow(avgChoicesPerNode, i);
    }
    
    return total;
}

/**
 * 递归生成故事分支
 * @param {string} parentId - 父节点ID
 * @param {string} parentContent - 父节点内容
 * @param {Array} parentChoices - 父节点选项
 * @param {number} depth - 当前深度
 * @param {Object} progressInfo - 进度信息对象
 */
async function generateStoryBranches(parentId, parentContent, parentChoices, depth, progressInfo = { current: 0, total: calculateTotalNodes() }) {
    // 如果已达到最大深度或没有选项，则停止生成
    if (depth >= STORY_CONFIG.BRANCH_DEPTH || !parentChoices || parentChoices.length === 0) {
        return;
    }
    
    // 标记当前正在后台加载
    currentStory.backgroundLoading = true;
    
    // 获取父节点
    const parentNode = currentStory.storyTree.nodes[parentId];
    if (!parentNode) return;
    
    // 更新进度
    progressInfo.current++;
    updateStoryGenerationProgress(progressInfo.current, progressInfo.total);
    
    // 获取设备类型的文本长度限制
    const textLength = getDeviceTextLength();
    
    // 为每个选项生成后续故事
    for (let i = 0; i < parentChoices.length; i++) {
        const choice = parentChoices[i];
        let choiceText = typeof choice === 'object' ? choice.text || choice.description : choice;
        
        try {
            // 检查是否接近故事结束
            const isNearEnd = depth >= STORY_CONFIG.BRANCH_DEPTH - 1;
            const endingPrompt = isNearEnd ? `\n请注意：故事应该在接下来的1-2个场景内结束，请开始为故事准备结局。` : '';
            
            // 构建提示词，要求一次性生成多步骤的故事段落
            const branchPrompt = `基于之前的故事："${parentContent}"\n\n用户选择了："${choiceText}"\n\n请继续故事，生成${STORY_CONFIG.STEPS_PER_BRANCH}步完整的故事段落，预测这个选项的后续发展。每段对话的字数应控制在${textLength.MIN}-${textLength.MAX}字之间。${endingPrompt}\n\n同时为每个步骤提供2-3个新的选择。\n\n用JSON格式返回，包含以下结构：\n{\n  "steps": [\n    {\n      "content": "第一步的故事内容",\n      "choices": ["选项1", "选项2", "选项3"]\n    },\n    {\n      "content": "第二步的故事内容",\n      "choices": ["选项1", "选项2"]\n    }\n    // 更多步骤...\n  ]\n}`;
            
            const branchResponse = await callDeepSeekAPI(branchPrompt);
            const branchResult = JSON.parse(branchResponse);
            
            // 验证返回的数据结构
            if (!branchResult.steps || !Array.isArray(branchResult.steps) || branchResult.steps.length === 0) {
                console.error('API返回的数据缺少有效的steps字段');
                continue;
            }
            
            // 创建分支节点链
            let currentParentId = parentId;
            let currentDepth = depth;
            
            for (let j = 0; j < branchResult.steps.length; j++) {
                const step = branchResult.steps[j];
                
                if (!step.content || !step.choices || !Array.isArray(step.choices)) {
                    console.error(`步骤 ${j+1} 缺少有效的content或choices字段`);
                    continue;
                }
                
                // 检查是否是最后一步，如果是则标记为结局
                const isLastStep = j === branchResult.steps.length - 1 && currentDepth + 1 >= STORY_CONFIG.BRANCH_DEPTH;
                
                // 创建新节点
                const nodeId = generateUniqueId();
                const newNode = new StoryNode(
                    nodeId,
                    step.content,
                    isLastStep ? ['查看故事总结'] : step.choices,
                    currentParentId,
                    currentDepth + 1
                );
                
                // 设置结局标志
                newNode.isEnding = isLastStep;
                
                // 将新节点添加到故事树
                currentStory.storyTree.nodes[nodeId] = newNode;
                
                // 更新父节点的子节点映射
                if (j === 0) {
                    // 第一步，连接到原始选项
                    parentNode.childrenIds[choiceText] = nodeId;
                } else {
                    // 后续步骤，连接到上一步的第一个选项
                    const prevNode = currentStory.storyTree.nodes[currentParentId];
                    if (prevNode && prevNode.choices && prevNode.choices.length > 0) {
                        const firstChoice = prevNode.choices[0];
                        const firstChoiceText = typeof firstChoice === 'object' ? 
                            firstChoice.text || firstChoice.description : 
                            String(firstChoice);
                        prevNode.childrenIds[firstChoiceText] = nodeId;
                    }
                }
                
                // 更新当前父节点为这个新节点
                currentParentId = nodeId;
                currentDepth++;
            }
            
            // 如果深度允许，继续递归生成更深的分支
                if (currentDepth < STORY_CONFIG.BRANCH_DEPTH) {
                    const lastNode = currentStory.storyTree.nodes[currentParentId];
                    if (lastNode && !lastNode.isEnding) {
                        await generateStoryBranches(
                            currentParentId,
                            lastNode.content,
                            lastNode.choices,
                            currentDepth,
                            progressInfo
                        );
                    }
                }
                
                // 更新进度
                progressInfo.current++;
                updateStoryGenerationProgress(progressInfo.current, progressInfo.total);
                
                // 定期保存到本地存储
                if (progressInfo.current % 5 === 0) { // 每生成5个节点保存一次
                    storyTreeCache.saveToLocalStorage();
                }
            
        } catch (error) {
            console.error(`生成选项 "${choiceText}" 的分支失败:`, error);
        }
        
        // 在每个选项之间添加短暂延迟，避免API限制
        if (i < parentChoices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    
    // 标记父节点已生成子节点
    parentNode.isGenerated = true;
    
    // 标记后台加载完成
    currentStory.backgroundLoading = false;
    
    console.log(`完成深度 ${depth} 的分支生成`);
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
    
    // 根据故事内容自动更新背景
    detectSceneBackground(storyContent);
}

/**
 * 根据背景类型更新页面背景
 */
function updateBackgroundByType(backgroundType) {
    const background = BACKGROUND_LIBRARY[backgroundType];
    if (!background) return;
    
    // 保存当前背景类型
    currentStory.environment.currentBackground = backgroundType;
    
    // 应用背景渐变
    if (background.gradient) {
        document.body.style.backgroundImage = background.gradient;
    }
    
    // 应用背景图片
    if (background.image) {
        // 创建或获取背景图片容器
        let bgImageContainer = document.getElementById('background-image-container');
        if (!bgImageContainer) {
            bgImageContainer = document.createElement('div');
            bgImageContainer.id = 'background-image-container';
            bgImageContainer.style.position = 'fixed';
            bgImageContainer.style.top = '0';
            bgImageContainer.style.left = '0';
            bgImageContainer.style.width = '100%';
            bgImageContainer.style.height = '100%';
            bgImageContainer.style.zIndex = '-3';
            bgImageContainer.style.transition = 'opacity 1.5s ease';
            bgImageContainer.style.backgroundSize = 'cover';
            bgImageContainer.style.backgroundPosition = 'center';
            bgImageContainer.style.opacity = '0';
            document.body.appendChild(bgImageContainer);
        }
        
        // 设置背景图片并添加淡入效果
        bgImageContainer.style.backgroundImage = `url(${background.image})`;
        setTimeout(() => {
            bgImageContainer.style.opacity = '0.7'; // 增加不透明度，使背景更明显
        }, 50);
    } else {
        // 如果没有图片，移除背景图片容器
        const bgImageContainer = document.getElementById('background-image-container');
        if (bgImageContainer) {
            bgImageContainer.style.opacity = '0';
            // 等待淡出动画完成后移除元素
            setTimeout(() => {
                bgImageContainer.remove();
            }, 1500);
        }
    }
    
    console.log(`背景已更新为: ${backgroundType}`);
}

/**
 * 根据故事内容检测并更新场景背景
 */
function detectSceneBackground(storyContent) {
    // 如果用户已手动选择背景，则不自动更新
    const bgSelect = document.getElementById('background-select');
    if (bgSelect && bgSelect.value !== 'none') {
        return;
    }
    
    // 将故事内容转换为小写以便匹配
    const lowerContent = storyContent.toLowerCase();
    
    // 遍历场景关键词，检查是否匹配
    let matchedType = null;
    let maxMatches = 0;
    
    for (const [type, keywords] of Object.entries(SCENE_KEYWORDS)) {
        let matches = 0;
        for (const keyword of keywords) {
            if (lowerContent.includes(keyword)) {
                matches++;
            }
        }
        
        if (matches > maxMatches) {
            maxMatches = matches;
            matchedType = type;
        }
    }
    
    // 如果找到匹配的背景类型，并且与当前背景不同，则更新背景
    if (matchedType && matchedType !== currentStory.environment.currentBackground) {
        console.log(`根据故事内容自动更新背景为: ${matchedType}`);
        updateBackgroundByType(matchedType);
    }
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
            
            // 检查是否已经预生成了这个选项的分支
            const currentNodeId = currentStory.storyTree.currentNodeId;
            const currentNode = currentStory.storyTree.nodes[currentNodeId];
            
            if (currentNode) {
                const childNodeId = currentNode.childrenIds[choiceText];
                if (!childNodeId) {
                    // 如果没有预生成，添加悬停事件来触发预加载
                    button.addEventListener('mouseenter', () => {
                        // 检查是否正在后台加载
                        if (!currentStory.backgroundLoading) {
                            console.log(`悬停预加载选项: "${choiceText}"`);
                            // 触发预加载
                            setTimeout(() => {
                                const currentNode = currentStory.storyTree.nodes[currentStory.storyTree.currentNodeId];
                                if (currentNode && !currentNode.childrenIds[choiceText]) {
                                    // 计算进度信息
                                    const totalNodes = calculateTotalNodes();
                                    const currentNodes = Object.keys(currentStory.storyTree.nodes).length;
                                    const progressInfo = {
                                        current: currentNodes,
                                        total: totalNodes,
                                        nodesGenerated: 0
                                    };
                                    
                                    // 模拟点击这个选项，但不更新UI
                                    simulateChoiceForPreload(choiceText, progressInfo);
                                }
                            }, 200);
                        }
                    });
                } else {
                    // 如果已经预生成，添加一个类来表示已准备好
                    button.classList.add('preloaded-choice');
                }
            }
        }
        
        choicesContainer.appendChild(button);
    });
    
    // 检查是否需要预加载更多分支
    checkAndPreloadMoreBranches();
}

/**
 * 模拟选择以进行预加载，但不更新UI
 */
async function simulateChoiceForPreload(choice, progressInfo = { current: 0, total: 0, nodesGenerated: 0 }) {
    try {
        // 标记正在后台加载
        currentStory.backgroundLoading = true;
        
        // 获取当前节点
        const currentNodeId = currentStory.storyTree.currentNodeId;
        const currentNode = currentStory.storyTree.nodes[currentNodeId];
        
        if (!currentNode || currentNode.childrenIds[choice]) {
            // 如果节点不存在或已经有这个选项的子节点，则不需要预加载
            currentStory.backgroundLoading = false;
            return;
        }
        
        console.log(`预加载选项: "${choice}" 的分支`);
        
        // 获取设备类型的文本长度限制
        const textLength = getDeviceTextLength();
        
        // 检查是否接近故事结束
        const isNearEnd = STORY_CONFIG.CURRENT_SCENE >= STORY_CONFIG.MAX_SCENES - 2;
        const endingPrompt = isNearEnd ? `\n请注意：故事应该在接下来的1-2个场景内结束，请开始为故事准备结局。` : '';
        
        const prompt = `基于之前的故事："${currentNode.content}"\n\n用户选择了："${choice}"\n\n请继续故事，包含新的情节发展和2-3个新的选择。每段对话的字数应控制在${textLength.MIN}-${textLength.MAX}字之间。${endingPrompt}\n\n用JSON格式返回，包含story和choices字段。`;
        
        const response = await callDeepSeekAPI(prompt);
        const result = JSON.parse(response);
        
        // 验证返回的数据结构
        if (!result.story || !result.choices || !Array.isArray(result.choices)) {
            throw new Error('API返回的数据格式不正确');
        }
        
        // 检查是否达到最大场景数
        const isEnding = STORY_CONFIG.CURRENT_SCENE + 1 >= STORY_CONFIG.MAX_SCENES;
        const choices = isEnding ? ['查看故事总结'] : result.choices;
        
        // 创建新节点
        const nodeId = generateUniqueId();
        const newNode = new StoryNode(
            nodeId,
            result.story,
            choices,
            currentNodeId,
            currentNode.depth + 1
        );
        
        // 设置结局标志
        newNode.isEnding = isEnding;
        
        // 将新节点添加到故事树
        currentStory.storyTree.nodes[nodeId] = newNode;
        
        // 更新父节点的子节点映射
        currentNode.childrenIds[choice] = nodeId;
        
        console.log(`预加载选项: "${choice}" 完成`);
        
        // 更新UI，为已预加载的选项添加类
        const buttons = document.querySelectorAll('.choice-btn');
        buttons.forEach(button => {
            if (button.dataset.choice === choice) {
                button.classList.add('preloaded-choice');
            }
        });
        
        // 更新进度信息
        progressInfo.nodesGenerated++;
        progressInfo.current++;
        
        // 更新进度条
        updateStoryGenerationProgress(progressInfo.current, progressInfo.total);
        
        // 每生成5个节点保存一次故事树
        if (progressInfo.nodesGenerated % 5 === 0) {
            storyTreeCache.saveToLocalStorage();
        }
        
        // 在后台生成更深的分支
        if (!isEnding) {
            generateStoryBranches(nodeId, result.story, result.choices, newNode.depth, progressInfo);
        }
        
    } catch (error) {
        console.error(`预加载选项 "${choice}" 失败:`, error);
    } finally {
        // 标记后台加载完成
        currentStory.backgroundLoading = false;
    }
}

// 故事树缓存，用于存储完整的故事树
const storyTreeCache = {
    // 缓存键为故事的关键词和设置的组合
    getKey: function() {
        return `${currentStory.keywords.raw}_${currentStory.settings.difficulty}_${currentStory.settings.genre}`;
    },
    // 保存故事树到本地存储
    saveToLocalStorage: function() {
        try {
            const key = this.getKey();
            // 只保存节点数据，不保存UI状态
            const dataToSave = {
                nodes: currentStory.storyTree.nodes,
                timestamp: Date.now()
            };
            localStorage.setItem(`storyTree_${key}`, JSON.stringify(dataToSave));
            console.log('故事树已保存到本地存储');
        } catch (error) {
            console.error('保存故事树失败:', error);
        }
    },
    // 从本地存储加载故事树
    loadFromLocalStorage: function() {
        try {
            const key = this.getKey();
            const savedData = localStorage.getItem(`storyTree_${key}`);
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                // 检查缓存是否过期（24小时）
                const isExpired = Date.now() - parsedData.timestamp > 24 * 60 * 60 * 1000;
                if (!isExpired) {
                    currentStory.storyTree.nodes = parsedData.nodes;
                    console.log('从本地存储加载故事树');
                    return true;
                } else {
                    console.log('故事树缓存已过期');
                    localStorage.removeItem(`storyTree_${key}`);
                }
            }
        } catch (error) {
            console.error('加载故事树失败:', error);
        }
        return false;
    }
};

// 定期保存故事树到本地存储
setInterval(() => {
    if (currentStory.storyTree && Object.keys(currentStory.storyTree.nodes).length > 0) {
        storyTreeCache.saveToLocalStorage();
    }
}, 30000); // 每30秒保存一次

/**
 * 做出选择
 */
async function makeChoice(index, choice) {
    const storyContainer = document.getElementById('story');
    const choicesContainer = document.getElementById('choices');
    
    // 显示骨架屏加载动画
    choicesContainer.innerHTML = generateSkeletonChoices();
    
    try {
        // 获取当前节点
        const currentNodeId = currentStory.storyTree.currentNodeId;
        const currentNode = currentStory.storyTree.nodes[currentNodeId];
        
        if (!currentNode) {
            throw new Error('当前节点不存在');
        }
        
        // 记录用户选择的路径
        currentStory.currentPath.push({
            nodeId: currentNodeId,
            choice: choice
        });
        
        // 检查是否有对应的子节点
        let nextNodeId = currentNode.childrenIds[choice];
        let nextNode = nextNodeId ? currentStory.storyTree.nodes[nextNodeId] : null;
        
        // 如果没有找到对应的子节点，可能是因为还没有生成
        if (!nextNode) {
            console.log(`选项 "${choice}" 的子节点尚未生成，正在生成...`);
            
            // 显示加载状态
            storyContainer.innerHTML = generateSkeletonLoading();
            
            try {
                // 获取设备类型的文本长度限制
                const textLength = getDeviceTextLength();
                
                // 检查是否接近故事结束
                const isNearEnd = STORY_CONFIG.CURRENT_SCENE >= STORY_CONFIG.MAX_SCENES - 2;
                const endingPrompt = isNearEnd ? `\n请注意：故事应该在接下来的1-2个场景内结束，请开始为故事准备结局。` : '';
                
                const prompt = `基于之前的故事："${currentNode.content}"\n\n用户选择了："${choice}"\n\n请继续故事，包含新的情节发展和2-3个新的选择。每段对话的字数应控制在${textLength.MIN}-${textLength.MAX}字之间。${endingPrompt}\n\n用JSON格式返回，包含story和choices字段。`;
                
                const response = await callDeepSeekAPI(prompt);
                const result = JSON.parse(response);
                
                // 验证返回的数据结构
                if (!result.story) {
                    throw new Error('API返回的数据缺少story字段');
                }
                
                if (!result.choices || !Array.isArray(result.choices) || result.choices.length === 0) {
                    throw new Error('API返回的数据缺少有效的choices字段');
                }
                
                // 检查是否达到最大场景数
                const isEnding = STORY_CONFIG.CURRENT_SCENE + 1 >= STORY_CONFIG.MAX_SCENES;
                const choices = isEnding ? ['查看故事总结'] : result.choices;
                
                // 创建新节点
                nextNodeId = generateUniqueId();
                nextNode = new StoryNode(
                    nextNodeId,
                    result.story,
                    choices,
                    currentNodeId,
                    currentNode.depth + 1
                );
                
                // 设置结局标志
                nextNode.isEnding = isEnding;
                
                // 将新节点添加到故事树
                currentStory.storyTree.nodes[nextNodeId] = nextNode;
                
                // 更新父节点的子节点映射
                currentNode.childrenIds[choice] = nextNodeId;
                
                // 更新进度条
                const progressInfo = { 
                    current: Object.keys(currentStory.storyTree.nodes).length, 
                    total: calculateTotalNodes() 
                };
                updateStoryGenerationProgress(progressInfo.current, progressInfo.total);
                
                // 在后台生成更深的分支
                if (!isEnding) {
                    setTimeout(() => {
                        generateStoryBranches(nextNodeId, result.story, result.choices, nextNode.depth, progressInfo);
                    }, 100);
                }
            } catch (error) {
                console.error(`生成选项 "${choice}" 的子节点失败:`, error);
                throw error;
            }
        }
        
        // 更新当前节点ID
        currentStory.storyTree.currentNodeId = nextNodeId;
        
        // 更新当前场景索引
        STORY_CONFIG.CURRENT_SCENE++;
        
        // 检查是否达到最大场景数或节点是结局
        if (STORY_CONFIG.CURRENT_SCENE >= STORY_CONFIG.MAX_SCENES || nextNode.isEnding) {
            // 标记故事已结束
            STORY_CONFIG.IS_STORY_ENDED = true;
        }
        
        // 显示新故事内容
        displayStory(nextNode.content);
        displayChoices(nextNode.choices || []);
        
        // 保存到故事状态
        currentStory.scenes.push({
            content: nextNode.content,
            choices: nextNode.choices || [],
            previousChoice: choice
        });
        
        // 如果故事已结束，显示侧边栏信息
        if (STORY_CONFIG.IS_STORY_ENDED) {
            showStoryEndContent();
        }
        
        // 检查是否需要预加载更多分支
        checkAndPreloadMoreBranches();
        
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
 * 检查并预加载更多分支
 */
function checkAndPreloadMoreBranches() {
    // 如果故事已结束或正在后台加载，则不进行预加载
    if (STORY_CONFIG.IS_STORY_ENDED || currentStory.backgroundLoading) {
        return;
    }
    
    // 获取当前节点
    const currentNodeId = currentStory.storyTree.currentNodeId;
    const currentNode = currentStory.storyTree.nodes[currentNodeId];
    
    if (!currentNode) return;
    
    // 检查当前节点的深度是否接近预加载阈值
    const remainingDepth = STORY_CONFIG.BRANCH_DEPTH - currentNode.depth;
    
    if (remainingDepth <= STORY_CONFIG.PRELOAD_THRESHOLD && !currentNode.isGenerated) {
        console.log(`当前节点深度 ${currentNode.depth} 接近阈值，开始预加载更多分支...`);
        
        // 计算进度信息
        const totalNodes = calculateTotalNodes();
        const currentNodes = Object.keys(currentStory.storyTree.nodes).length;
        const progressInfo = {
            current: currentNodes,
            total: totalNodes,
            nodesGenerated: 0
        };
        
        // 在后台生成更多分支
        setTimeout(() => {
            generateStoryBranches(
                currentNodeId,
                currentNode.content,
                currentNode.choices,
                currentNode.depth,
                progressInfo
            );
        }, 100);
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
    
    if (pageName === 'game') {
        setGameUIVisibility(false);
    }
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
 * 导出故事为文本文件
 */
function exportStory() {
    if (!currentStory.storyTree || Object.keys(currentStory.storyTree.nodes).length === 0) {
        alert('没有可导出的故事内容');
        return;
    }
    
    let storyText = `# ${currentStory.title || '我的故事'} #\n\n`;
    storyText += `关键词: ${currentStory.keywords.raw}\n`;
    storyText += `难度: ${currentStory.settings.difficulty}\n`;
    storyText += `类型: ${currentStory.settings.genre}\n\n`;
    
    // 添加用户当前选择的路径
    storyText += `## 用户选择的路径 ##\n\n`;
    
    // 添加每个场景和选择
    currentStory.scenes.forEach((scene, index) => {
        storyText += `### 场景 ${index + 1} ###\n\n`;
        storyText += `${scene.content}\n\n`;
        
        if (scene.choices && scene.choices.length > 0 && index < currentStory.scenes.length - 1) {
            storyText += `选择: ${scene.selectedChoice}\n\n`;
        }
    });
    
    // 添加完整的故事树结构
    storyText += `\n\n## 完整故事树 ##\n\n`;
    
    // 递归函数，用于遍历故事树并生成文本
    function traverseStoryTree(nodeId, depth, path) {
        const node = currentStory.storyTree.nodes[nodeId];
        if (!node) return;
        
        // 添加缩进和场景内容
        const indent = '  '.repeat(depth);
        storyText += `${indent}### 深度 ${depth} - 节点 ${nodeId} ###\n\n`;
        storyText += `${indent}${node.content}\n\n`;
        
        // 添加选择
        if (node.choices && node.choices.length > 0) {
            storyText += `${indent}可能的选择:\n`;
            
            // 遍历每个选择及其子节点
            node.choices.forEach((choice, index) => {
                const childId = node.childrenIds[choice];
                storyText += `${indent}- 选择 ${index + 1}: ${choice}`;
                
                // 标记当前路径
                if (path.includes(choice)) {
                    storyText += ` [用户选择的路径]`;
                }
                
                storyText += `\n`;
                
                // 如果有子节点，递归遍历
                if (childId) {
                    traverseStoryTree(childId, depth + 1, path.slice(path.indexOf(choice) + 1));
                }
            });
        } else if (node.isEnding) {
            storyText += `${indent}[故事结束]\n\n`;
        }
        
        storyText += `\n`;
    }
    
    // 从根节点开始遍历
    traverseStoryTree(currentStory.storyTree.rootNodeId, 0, currentStory.currentPath);
    
    // 创建并下载文本文件
    const blob = new Blob([storyText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentStory.title || '我的故事'}_完整版.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * 解锁高级功能
 */
function unlockPremiumFeature(feature) {
    alert(`高级功能"${feature}"暂未实现，敬请期待！`);
}

function setGameUIVisibility(isStoryReady) {
    // 导出按钮
    const exportBtn = document.getElementById('export-story');
    if (exportBtn) exportBtn.classList.toggle('hidden', !isStoryReady);
    // 侧边栏tab按钮
    const tabBtns = document.querySelectorAll('.game-sidebar .tab-btn');
    tabBtns.forEach(btn => btn.classList.toggle('hidden', !isStoryReady));
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);