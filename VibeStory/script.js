// # VibeStory

// API配置
const API_CONFIG = {
    deepseek: {
        useLocalMode: false,
        useProxy: false,
        useCustomProxy: true,
        url: 'https://api.deepseek.com',
        proxyUrl: 'https://cors-proxy.deepseek-api.workers.dev',
        customProxyUrl: 'https://custom-proxy.example.com/api',
        maxRetries: 3,
        retryDelay: 1000,
        headers: {
            'Content-Type': 'application/json'
        }
    }
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
    const keywordsInput = document.getElementById('keywords-input');
    const difficultySlider = document.getElementById('difficulty-slider');
    const difficultyValue = document.getElementById('difficulty-value');
    const genreSelect = document.getElementById('genre-select');
    const storyContainer = document.getElementById('story-container');
    const choicesContainer = document.getElementById('choices-container');
    const narrativeNodesContainer = document.getElementById('narrative-nodes');
    const characterGraph = document.getElementById('character-graph');
    const characterStatsContainer = document.getElementById('character-stats');
    const memoryFragmentsContainer = document.getElementById('memory-fragments');
    const submitBtn = document.getElementById('submit-btn');
    const exportStoryBtn = document.getElementById('export-story-btn');
    const unlockStylesBtn = document.getElementById('unlock-styles-btn');
    const unlockCharactersBtn = document.getElementById('unlock-characters-btn');
    
    // 设置API模式切换
    const useLocalModeCheckbox = document.getElementById('use-local-mode');
    const useProxyModeCheckbox = document.getElementById('use-proxy-mode');
    const useCustomProxyCheckbox = document.getElementById('use-custom-proxy');
    
    // 初始化复选框状态
    useLocalModeCheckbox.checked = API_CONFIG.deepseek.useLocalMode;
    useProxyModeCheckbox.checked = API_CONFIG.deepseek.useProxy;
    useCustomProxyCheckbox.checked = API_CONFIG.deepseek.useCustomProxy;
    
    // 添加事件监听器
    useLocalModeCheckbox.addEventListener('change', function() {
        API_CONFIG.deepseek.useLocalMode = this.checked;
    });
    
    useProxyModeCheckbox.addEventListener('change', function() {
        API_CONFIG.deepseek.useProxy = this.checked;
        if (this.checked) {
            useCustomProxyCheckbox.checked = false;
            API_CONFIG.deepseek.useCustomProxy = false;
        }
    });
    
    useCustomProxyCheckbox.addEventListener('change', function() {
        API_CONFIG.deepseek.useCustomProxy = this.checked;
        if (this.checked) {
            useProxyModeCheckbox.checked = false;
            API_CONFIG.deepseek.useProxy = false;
        }
    });
    
    // 设置难度
    difficultySlider.value = currentStory.settings.difficulty;
    difficultyValue.textContent = currentStory.settings.difficulty;
    
    // 设置风格
    genreSelect.value = currentStory.settings.genre;
    
    // 设置开始游戏按钮事件
    submitBtn.addEventListener('click', startGame);
    
    // 设置导出故事按钮事件
    exportStoryBtn.addEventListener('click', exportStory);
    
    // 设置高级功能解锁按钮事件
    unlockStylesBtn.addEventListener('click', () => unlockPremiumFeature('styles'));
    unlockCharactersBtn.addEventListener('click', () => unlockPremiumFeature('characters'));
    
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
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);