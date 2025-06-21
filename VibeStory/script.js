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

// 音频系统配置
const AUDIO_CONFIG = {
    // 背景音乐库 - 按主题分类
    backgroundMusic: {
        adventure: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/adventure.mp3',
            volume: 0.4,
            loop: true,
            description: '史诗冒险音乐，充满勇气和探索精神'
        },
        scifi: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/scifi.mp3',
            volume: 0.35,
            loop: true,
            description: '未来科技音乐，营造太空探索氛围'
        },
        fantasy: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/fantasy.mp3',
            volume: 0.4,
            loop: true,
            description: '魔法奇幻音乐，神秘而梦幻'
        },
        mystery: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/mystery.mp3',
            volume: 0.3,
            loop: true,
            description: '悬疑推理音乐，紧张而神秘'
        },
        romance: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/romance.mp3',
            volume: 0.35,
            loop: true,
            description: '浪漫温馨音乐，充满情感'
        }
    },
    // 主题特定音乐 - 根据关键词和场景动态选择
    themeMusic: {
        // 末日主题
        apocalypse: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/apocalypse.mp3',
            volume: 0.3,
            loop: true,
            keywords: ['末日', '废墟', '灾难', '毁灭', '末世', '废土']
        },
        // 机械主题
        mechanical: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/mechanical.mp3',
            volume: 0.35,
            loop: true,
            keywords: ['机械', '义肢', '机器人', '齿轮', '蒸汽', '工业']
        },
        // 失忆主题
        memory: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/memory.mp3',
            volume: 0.3,
            loop: true,
            keywords: ['失忆', '记忆', '遗忘', '回忆', '过去', '身份']
        },
        // 魔法主题
        magic: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/magic.mp3',
            volume: 0.4,
            loop: true,
            keywords: ['魔法', '法术', '咒语', '巫师', '精灵', '龙']
        },
        // 战争主题
        war: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/war.mp3',
            volume: 0.35,
            loop: true,
            keywords: ['战争', '战斗', '军队', '武器', '战场', '将军']
        },
        // 海洋主题
        ocean: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/ocean.mp3',
            volume: 0.3,
            loop: true,
            keywords: ['海洋', '海盗', '船只', '深海', '岛屿', '宝藏']
        },
        // 太空主题
        space: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/space.mp3',
            volume: 0.3,
            loop: true,
            keywords: ['太空', '宇宙', '星球', '飞船', '星际', '外星']
        },
        // 古代主题
        ancient: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/ancient.mp3',
            volume: 0.35,
            loop: true,
            keywords: ['古代', '王朝', '皇帝', '宫殿', '历史', '传统']
        },
        // 现代都市主题
        urban: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/urban.mp3',
            volume: 0.35,
            loop: true,
            keywords: ['都市', '城市', '现代', '科技', '商业', '生活']
        },
        // 自然主题
        nature: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/nature.mp3',
            volume: 0.3,
            loop: true,
            keywords: ['自然', '森林', '山脉', '河流', '动物', '生态']
        }
    },
    // 音效库
    soundEffects: {
        buttonClick: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/button-click.wav',
            volume: 0.5
        },
        pageTransition: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/page-transition.wav',
            volume: 0.4
        },
        choiceSelect: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/choice-select.wav',
            volume: 0.6
        },
        storyProgress: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/story-progress.wav',
            volume: 0.4
        },
        error: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/error.wav',
            volume: 0.7
        },
        // 主题相关音效
        magicSpell: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/magic-spell.wav',
            volume: 0.6
        },
        swordClash: {
            url: 'https://cdn.jsdelivr.net/gh/gemini-pro-copilot/VibeStory-Music/sword-clash.wav',
            volume: 0.5
        },
        footsteps: {
            url: 'https://www.soundjay.com/misc/sounds/footsteps.wav',
            volume: 0.4
        },
        doorOpen: {
            url: 'https://www.soundjay.com/misc/sounds/door-open.wav',
            volume: 0.5
        },
        thunder: {
            url: 'https://www.soundjay.com/misc/sounds/thunder.wav',
            volume: 0.6
        }
    },
    // 环境音效
    ambientSounds: {
        forest: {
            url: 'https://www.soundjay.com/nature/sounds/forest-1.wav',
            volume: 0.2,
            loop: true
        },
        city: {
            url: 'https://www.soundjay.com/nature/sounds/city-1.wav',
            volume: 0.2,
            loop: true
        },
        space: {
            url: 'https://www.soundjay.com/nature/sounds/space-1.wav',
            volume: 0.2,
            loop: true
        },
        ocean: {
            url: 'https://www.soundjay.com/nature/sounds/ocean-1.wav',
            volume: 0.2,
            loop: true
        },
        desert: {
            url: 'https://www.soundjay.com/nature/sounds/desert-1.wav',
            volume: 0.2,
            loop: true
        },
        mountain: {
            url: 'https://www.soundjay.com/nature/sounds/mountain-1.wav',
            volume: 0.2,
            loop: true
        }
    }
};

// 性能优化配置
const PERFORMANCE_CONFIG = {
    // 虚拟滚动配置
    virtualScroll: {
        itemHeight: 60, // 每个选项的高度
        visibleItems: 5, // 可见项目数量
        bufferSize: 2, // 缓冲区大小
        throttleDelay: 16 // 节流延迟（60fps）
    },
    // 懒加载配置
    lazyLoad: {
        threshold: 0.1, // 交叉观察器阈值
        rootMargin: '50px' // 根边距
    },
    // 缓存配置
    cache: {
        maxSize: 100, // 最大缓存项数
        ttl: 5 * 60 * 1000 // 缓存生存时间（5分钟）
    }
};

// 音频管理器类
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.backgroundMusic = null;
        this.themeMusic = null;
        this.ambientSound = null;
        this.soundCache = new Map();
        this.isMuted = false;
        this.masterVolume = 1.0;
        this.currentTheme = null;
        this.initAudioContext();
    }

    // 初始化音频上下文
    async initAudioContext() {
        try {
            // 检查浏览器支持
            if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
                this.audioContext = new (AudioContext || webkitAudioContext)();
                
                // 用户交互后恢复音频上下文
                document.addEventListener('click', () => {
                    if (this.audioContext.state === 'suspended') {
                        this.audioContext.resume();
                    }
                }, { once: true });
            }
        } catch (error) {
            console.warn('音频上下文初始化失败:', error);
        }
    }

    // 预加载音频文件
    async preloadAudio(url) {
        if (this.soundCache.has(url)) {
            return this.soundCache.get(url);
        }

        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            this.soundCache.set(url, audioBuffer);
            return audioBuffer;
        } catch (error) {
            console.warn(`音频预加载失败: ${url}`, error);
            return null;
        }
    }

    // 检测关键词匹配的主题音乐
    detectThemeMusic(keywords) {
        if (!keywords || !Array.isArray(keywords)) return null;
        
        const keywordString = keywords.join(' ').toLowerCase();
        let bestMatch = null;
        let maxScore = 0;
        
        for (const [themeName, themeConfig] of Object.entries(AUDIO_CONFIG.themeMusic)) {
            let score = 0;
            for (const keyword of themeConfig.keywords) {
                if (keywordString.includes(keyword.toLowerCase())) {
                    score += 1;
                }
            }
            
            if (score > maxScore) {
                maxScore = score;
                bestMatch = themeName;
            }
        }
        
        return maxScore > 0 ? bestMatch : null;
    }

    // 播放背景音乐
    async playBackgroundMusic(genre) {
        if (this.isMuted || !this.audioContext) return;

        const musicConfig = AUDIO_CONFIG.backgroundMusic[genre];
        if (!musicConfig) return;

        try {
            // 停止当前背景音乐
            if (this.backgroundMusic) {
                this.backgroundMusic.source.stop();
                this.backgroundMusic = null;
            }

            // 创建新的音频源
            const audioBuffer = await this.preloadAudio(musicConfig.url);
            if (!audioBuffer) return;

            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = audioBuffer;
            source.loop = musicConfig.loop;
            
            gainNode.gain.value = musicConfig.volume * this.masterVolume;
            
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            source.start();
            this.backgroundMusic = { source, gainNode, type: 'background', genre };
            
            console.log(`播放背景音乐: ${genre} - ${musicConfig.description}`);
            
        } catch (error) {
            console.warn('背景音乐播放失败:', error);
        }
    }

    // 播放主题音乐
    async playThemeMusic(themeName) {
        if (this.isMuted || !this.audioContext) return;

        const themeConfig = AUDIO_CONFIG.themeMusic[themeName];
        if (!themeConfig) return;

        try {
            // 停止当前主题音乐
            if (this.themeMusic) {
                this.themeMusic.source.stop();
                this.themeMusic = null;
            }

            const audioBuffer = await this.preloadAudio(themeConfig.url);
            if (!audioBuffer) return;

            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = audioBuffer;
            source.loop = themeConfig.loop;
            gainNode.gain.value = themeConfig.volume * this.masterVolume;
            
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            source.start();
            this.themeMusic = { source, gainNode, type: 'theme', theme: themeName };
            this.currentTheme = themeName;
            
            console.log(`播放主题音乐: ${themeName}`);
            
        } catch (error) {
            console.warn('主题音乐播放失败:', error);
        }
    }

    // 智能音乐选择 - 根据关键词和风格选择最合适的音乐
    async playSmartMusic(keywords, genre) {
        // 首先尝试检测主题音乐
        const detectedTheme = this.detectThemeMusic(keywords);
        
        if (detectedTheme) {
            await this.playThemeMusic(detectedTheme);
            return { type: 'theme', theme: detectedTheme };
        } else {
            // 如果没有检测到特定主题，播放风格背景音乐
            await this.playBackgroundMusic(genre);
            return { type: 'background', genre };
        }
    }

    // 播放环境音效
    async playAmbientSound(backgroundType) {
        if (this.isMuted || !this.audioContext) return;

        const ambientConfig = AUDIO_CONFIG.ambientSounds[backgroundType];
        if (!ambientConfig) return;

        try {
            // 停止当前环境音效
            if (this.ambientSound) {
                this.ambientSound.source.stop();
                this.ambientSound = null;
            }

            const audioBuffer = await this.preloadAudio(ambientConfig.url);
            if (!audioBuffer) return;

            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = audioBuffer;
            source.loop = ambientConfig.loop;
            
            gainNode.gain.value = ambientConfig.volume * this.masterVolume;
            
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            source.start();
            this.ambientSound = { source, gainNode };
            
        } catch (error) {
            console.warn('环境音效播放失败:', error);
        }
    }

    // 播放音效
    async playSoundEffect(effectName) {
        if (this.isMuted || !this.audioContext) return;

        const effectConfig = AUDIO_CONFIG.soundEffects[effectName];
        if (!effectConfig) return;

        try {
            const audioBuffer = await this.preloadAudio(effectConfig.url);
            if (!audioBuffer) return;

            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            
            source.buffer = audioBuffer;
            gainNode.gain.value = effectConfig.volume * this.masterVolume;
            
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            source.start();
            
        } catch (error) {
            console.warn(`音效播放失败: ${effectName}`, error);
        }
    }

    // 根据故事内容播放相关音效
    async playContextualSound(storyContent) {
        const content = storyContent.toLowerCase();
        
        // 检测故事内容中的关键词，播放相应音效
        if (content.includes('魔法') || content.includes('咒语') || content.includes('法术')) {
            await this.playSoundEffect('magicSpell');
        } else if (content.includes('战斗') || content.includes('剑') || content.includes('武器')) {
            await this.playSoundEffect('swordClash');
        } else if (content.includes('脚步声') || content.includes('行走') || content.includes('移动')) {
            await this.playSoundEffect('footsteps');
        } else if (content.includes('门') || content.includes('打开') || content.includes('进入')) {
            await this.playSoundEffect('doorOpen');
        } else if (content.includes('雷声') || content.includes('闪电') || content.includes('暴风雨')) {
            await this.playSoundEffect('thunder');
        }
    }

    // 设置静音状态
    setMuted(muted) {
        this.isMuted = muted;
        
        if (muted) {
            if (this.backgroundMusic) {
                this.backgroundMusic.gainNode.gain.value = 0;
            }
            if (this.themeMusic) {
                this.themeMusic.gainNode.gain.value = 0;
            }
            if (this.ambientSound) {
                this.ambientSound.gainNode.gain.value = 0;
            }
        } else {
            if (this.backgroundMusic) {
                const musicConfig = AUDIO_CONFIG.backgroundMusic[this.backgroundMusic.genre];
                this.backgroundMusic.gainNode.gain.value = musicConfig.volume * this.masterVolume;
            }
            if (this.themeMusic) {
                const themeConfig = AUDIO_CONFIG.themeMusic[this.themeMusic.theme];
                this.themeMusic.gainNode.gain.value = themeConfig.volume * this.masterVolume;
            }
            if (this.ambientSound) {
                const currentBackground = currentStory.environment.currentBackground;
                if (currentBackground !== 'none') {
                    const ambientConfig = AUDIO_CONFIG.ambientSounds[currentBackground];
                    this.ambientSound.gainNode.gain.value = ambientConfig.volume * this.masterVolume;
                }
            }
        }
    }

    // 设置主音量
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        
        if (this.backgroundMusic) {
            const musicConfig = AUDIO_CONFIG.backgroundMusic[this.backgroundMusic.genre];
            this.backgroundMusic.gainNode.gain.value = musicConfig.volume * this.masterVolume;
        }
        
        if (this.themeMusic) {
            const themeConfig = AUDIO_CONFIG.themeMusic[this.themeMusic.theme];
            this.themeMusic.gainNode.gain.value = themeConfig.volume * this.masterVolume;
        }
        
        if (this.ambientSound) {
            const currentBackground = currentStory.environment.currentBackground;
            if (currentBackground !== 'none') {
                const ambientConfig = AUDIO_CONFIG.ambientSounds[currentBackground];
                this.ambientSound.gainNode.gain.value = ambientConfig.volume * this.masterVolume;
            }
        }
    }

    // 停止所有音频
    stopAll() {
        if (this.backgroundMusic) {
            this.backgroundMusic.source.stop();
            this.backgroundMusic = null;
        }
        if (this.themeMusic) {
            this.themeMusic.source.stop();
            this.themeMusic = null;
        }
        if (this.ambientSound) {
            this.ambientSound.source.stop();
            this.ambientSound = null;
        }
        this.currentTheme = null;
    }

    // 获取当前播放的音乐信息
    getCurrentMusicInfo() {
        if (this.themeMusic) {
            return {
                type: 'theme',
                name: this.themeMusic.theme,
                description: `主题音乐: ${this.themeMusic.theme}`
            };
        } else if (this.backgroundMusic) {
            const musicConfig = AUDIO_CONFIG.backgroundMusic[this.backgroundMusic.genre];
            return {
                type: 'background',
                name: this.backgroundMusic.genre,
                description: musicConfig.description || `背景音乐: ${this.backgroundMusic.genre}`
            };
        }
        return null;
    }
}

// 性能优化管理器类
class PerformanceManager {
    constructor() {
        this.observer = null;
        this.cache = new Map();
        this.virtualScrollContainers = new Map();
        this.initIntersectionObserver();
    }

    // 初始化交叉观察器
    initIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadLazyContent(entry.target);
                        }
                    });
                },
                {
                    threshold: PERFORMANCE_CONFIG.lazyLoad.threshold,
                    rootMargin: PERFORMANCE_CONFIG.lazyLoad.rootMargin
                }
            );
        }
    }

    // 懒加载内容
    loadLazyContent(element) {
        if (element.dataset.lazyLoaded === 'true') return;

        const loadType = element.dataset.lazyType;
        const loadData = element.dataset.lazyData;

        switch (loadType) {
            case 'image':
                this.loadLazyImage(element, loadData);
                break;
            case 'content':
                this.loadLazyContent(element, loadData);
                break;
            case 'component':
                this.loadLazyComponent(element, loadData);
                break;
        }

        element.dataset.lazyLoaded = 'true';
        this.observer.unobserve(element);
    }

    // 懒加载图片
    loadLazyImage(element, imageUrl) {
        const img = new Image();
        img.onload = () => {
            element.style.backgroundImage = `url(${imageUrl})`;
            element.classList.add('loaded');
        };
        img.src = imageUrl;
    }

    // 懒加载组件
    loadLazyComponent(element, componentData) {
        try {
            const data = JSON.parse(componentData);
            // 根据组件类型动态加载
            switch (data.type) {
                case 'character-card':
                    element.innerHTML = this.createCharacterCard(data);
                    break;
                case 'story-node':
                    element.innerHTML = this.createStoryNode(data);
                    break;
                default:
                    element.innerHTML = data.content || '';
            }
            element.classList.add('loaded');
        } catch (error) {
            console.warn('懒加载组件失败:', error);
        }
    }

    // 创建角色卡片
    createCharacterCard(data) {
        return `
            <div class="character-card">
                <div class="character-avatar" style="background-image: url(${data.avatar || 'default-avatar.png'})"></div>
                <div class="character-info">
                    <h4>${data.name}</h4>
                    <p>${data.description}</p>
                </div>
            </div>
        `;
    }

    // 创建故事节点
    createStoryNode(data) {
        return `
            <div class="story-node">
                <div class="node-title">${data.title}</div>
                <div class="node-content">${data.content}</div>
            </div>
        `;
    }

    // 虚拟滚动实现
    createVirtualScroll(container, items, itemHeight = PERFORMANCE_CONFIG.virtualScroll.itemHeight) {
        const visibleItems = PERFORMANCE_CONFIG.virtualScroll.visibleItems;
        const bufferSize = PERFORMANCE_CONFIG.virtualScroll.bufferSize;
        
        let scrollTop = 0;
        let startIndex = 0;
        let endIndex = visibleItems + bufferSize;

        // 创建虚拟滚动容器
        const virtualContainer = document.createElement('div');
        virtualContainer.style.height = `${items.length * itemHeight}px`;
        virtualContainer.style.position = 'relative';
        virtualContainer.style.overflow = 'hidden';

        const contentContainer = document.createElement('div');
        contentContainer.style.position = 'absolute';
        contentContainer.style.top = '0';
        contentContainer.style.left = '0';
        contentContainer.style.right = '0';

        virtualContainer.appendChild(contentContainer);
        container.appendChild(virtualContainer);

        // 渲染可见项目
        const renderVisibleItems = () => {
            contentContainer.innerHTML = '';
            contentContainer.style.transform = `translateY(${startIndex * itemHeight}px)`;

            for (let i = startIndex; i <= endIndex && i < items.length; i++) {
                const item = items[i];
                const itemElement = this.createVirtualScrollItem(item, i, itemHeight);
                contentContainer.appendChild(itemElement);
            }
        };

        // 滚动事件处理（节流）
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    scrollTop = container.scrollTop;
                    const newStartIndex = Math.floor(scrollTop / itemHeight);
                    const newEndIndex = Math.min(newStartIndex + visibleItems + bufferSize, items.length);

                    if (newStartIndex !== startIndex || newEndIndex !== endIndex) {
                        startIndex = newStartIndex;
                        endIndex = newEndIndex;
                        renderVisibleItems();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        container.addEventListener('scroll', handleScroll);
        renderVisibleItems();

        // 保存虚拟滚动实例
        this.virtualScrollContainers.set(container, {
            virtualContainer,
            contentContainer,
            items,
            itemHeight,
            startIndex,
            endIndex,
            handleScroll
        });
    }

    // 创建虚拟滚动项目
    createVirtualScrollItem(item, index, height) {
        const itemElement = document.createElement('div');
        itemElement.style.height = `${height}px`;
        itemElement.style.position = 'absolute';
        itemElement.style.top = `${index * height}px`;
        itemElement.style.left = '0';
        itemElement.style.right = '0';
        itemElement.innerHTML = item.content || item;
        return itemElement;
    }

    // 清理虚拟滚动
    destroyVirtualScroll(container) {
        const instance = this.virtualScrollContainers.get(container);
        if (instance) {
            container.removeEventListener('scroll', instance.handleScroll);
            container.innerHTML = '';
            this.virtualScrollContainers.delete(container);
        }
    }

    // 缓存管理
    setCache(key, value, ttl = PERFORMANCE_CONFIG.cache.ttl) {
        const cacheItem = {
            value,
            timestamp: Date.now(),
            ttl
        };
        this.cache.set(key, cacheItem);

        // 清理过期缓存
        this.cleanupCache();
    }

    getCache(key) {
        const cacheItem = this.cache.get(key);
        if (!cacheItem) return null;

        if (Date.now() - cacheItem.timestamp > cacheItem.ttl) {
            this.cache.delete(key);
            return null;
        }

        return cacheItem.value;
    }

    cleanupCache() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now - item.timestamp > item.ttl) {
                this.cache.delete(key);
            }
        }

        // 限制缓存大小
        if (this.cache.size > PERFORMANCE_CONFIG.cache.maxSize) {
            const entries = Array.from(this.cache.entries());
            entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            
            const toDelete = entries.slice(0, this.cache.size - PERFORMANCE_CONFIG.cache.maxSize);
            toDelete.forEach(([key]) => this.cache.delete(key));
        }
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 图片懒加载
    setupImageLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            this.observer.observe(img);
        });
    }

    // 组件懒加载
    setupComponentLazyLoading() {
        const components = document.querySelectorAll('[data-lazy-type]');
        components.forEach(component => {
            this.observer.observe(component);
        });
    }

    // 预加载关键资源
    preloadCriticalResources() {
        const criticalResources = [
            '/assets/fonts/Poppins-Regular.woff2',
            '/assets/images/backgrounds/forest.jpg',
            '/assets/images/backgrounds/city.jpg'
        ];

        criticalResources.forEach(resource => {
            if (resource.endsWith('.woff2')) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = 'font';
                link.type = 'font/woff2';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            } else if (resource.endsWith('.jpg') || resource.endsWith('.png')) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = 'image';
                document.head.appendChild(link);
            }
        });
    }
}

// 创建全局实例
const audioManager = new AudioManager();
const performanceManager = new PerformanceManager();

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

/**
 * 初始化游戏
 */
function initGame() {
    // 初始化页面导航
    initializeNavigation();
    
    // 初始化音频控制
    initializeAudioControls();

    // 初始化性能优化
    initializePerformanceOptimizations();
    
    // 初始化侧边栏标签系统
    initializeSidebarTabs();

    // 初始化音乐控制功能
    initializeMusicControls();
    
    // 提示用户设置API密钥
    if (!API_CONFIG.apiKey) {
        console.warn('请设置DeepSeek API密钥');
    }
    
    // 添加事件监听
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }

    const difficultySlider = document.getElementById('difficulty');
    const difficultyValue = document.getElementById('difficulty-value');
    if (difficultySlider && difficultyValue) {
        difficultySlider.addEventListener('input', () => {
            difficultyValue.textContent = difficultySlider.value;
        });
    }

    const backgroundSelect = document.getElementById('background-select');
    if (backgroundSelect) {
        backgroundSelect.addEventListener('change', () => {
            updateBackgroundByType(backgroundSelect.value);
        });
    }

    // 预加载关键资源
    preloadAudioFiles();
}

/**
 * 初始化音频控制功能
 */
function initializeAudioControls() {
    const masterVolume = document.getElementById('master-volume');
    const muteToggle = document.getElementById('mute-toggle');
    const bgmToggle = document.getElementById('bgm-toggle');
    const ambientToggle = document.getElementById('ambient-toggle');
    const uiToggle = document.getElementById('ui-toggle');

    // 加载保存的设置
    const savedSettings = JSON.parse(localStorage.getItem('vibeStoryAudioSettings')) || {};

    if (masterVolume) {
        masterVolume.value = savedSettings.masterVolume ?? 1;
        audioManager.setMasterVolume(parseFloat(masterVolume.value));
        masterVolume.addEventListener('input', () => {
            audioManager.setMasterVolume(parseFloat(masterVolume.value));
        });
    }

    if (muteToggle) {
        muteToggle.checked = savedSettings.isMuted ?? false;
        audioManager.setMuted(muteToggle.checked);
        muteToggle.addEventListener('change', () => {
            audioManager.setMuted(muteToggle.checked);
        });
    }

    if (bgmToggle) {
        bgmToggle.checked = savedSettings.bgmEnabled ?? true;
        currentStory.settings.bgmEnabled = bgmToggle.checked;
        bgmToggle.addEventListener('change', () => {
            currentStory.settings.bgmEnabled = bgmToggle.checked;
            if (!bgmToggle.checked) {
                audioManager.stopAll();
            }
        });
    }

    if (ambientToggle) {
        ambientToggle.checked = savedSettings.ambientEnabled ?? true;
        currentStory.settings.ambientSoundEnabled = ambientToggle.checked;
        ambientToggle.addEventListener('change', () => {
            currentStory.settings.ambientSoundEnabled = ambientToggle.checked;
        });
    }

    if (uiToggle) {
        uiToggle.checked = savedSettings.uiSoundEnabled ?? true;
        currentStory.settings.uiSoundEnabled = uiToggle.checked;
        uiToggle.addEventListener('change', () => {
            currentStory.settings.uiSoundEnabled = uiToggle.checked;
        });
    }
}

/**
 * 初始化性能优化
 */
function initializePerformanceOptimizations() {
    // 预加载关键资源
    performanceManager.preloadCriticalResources();
    
    // 设置图片懒加载
    performanceManager.setupImageLazyLoading();
    
    // 设置组件懒加载
    performanceManager.setupComponentLazyLoading();
    
    // 预加载音频文件
    preloadAudioFiles();
    
    // 设置页面可见性API
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // 页面隐藏时暂停音频
            if (audioManager.backgroundMusic) {
                audioManager.backgroundMusic.source.suspend();
            }
            if (audioManager.ambientSound) {
                audioManager.ambientSound.source.suspend();
            }
        } else {
            // 页面显示时恢复音频
            if (audioManager.backgroundMusic) {
                audioManager.backgroundMusic.source.resume();
            }
            if (audioManager.ambientSound) {
                audioManager.ambientSound.source.resume();
            }
        }
    });
}

/**
 * 预加载音频文件
 */
async function preloadAudioFiles() {
    const audioFiles = [
        // 背景音乐
        ...Object.values(AUDIO_CONFIG.backgroundMusic).map(music => music.url),
        // 主题音乐
        ...Object.values(AUDIO_CONFIG.themeMusic).map(music => music.url),
        // 音效
        ...Object.values(AUDIO_CONFIG.soundEffects).map(effect => effect.url),
        // 环境音效
        ...Object.values(AUDIO_CONFIG.ambientSounds).map(ambient => ambient.url)
    ];
    
    // 使用Promise.allSettled避免某个文件加载失败影响其他文件
    const preloadPromises = audioFiles.map(url => audioManager.preloadAudio(url));
    
    Promise.allSettled(preloadPromises).then(results => {
        const successCount = results.filter(result => result.status === 'fulfilled').length;
        console.log(`音频预加载完成: ${successCount}/${audioFiles.length} 个文件`);
        
        // 更新音乐信息面板
        updateMusicInfo();
    });
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
    
    // 播放开始音效
    if (currentStory.settings.uiSoundEnabled !== false) {
        audioManager.playSoundEffect('storyProgress');
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
    
    // 播放页面切换音效
    if (currentStory.settings.uiSoundEnabled !== false) {
        audioManager.playSoundEffect('pageTransition');
    }
    
    // 显示加载状态
    const storyContainer = document.getElementById('story');
    storyContainer.innerHTML = '<div class="loading">正在生成故事...</div>';
    
    // 清空选择容器
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';
    
    // 重置故事状态
    currentStory.scenes = [];
    currentStory.currentSceneIndex = 0;
    
    // 智能选择并播放音乐
    audioManager.playSmartMusic(currentStory.keywords.parsed, currentStory.settings.genre);
    
    // 生成故事
    generateStory(keywords).catch(error => {
        console.error('生成故事失败:', error);
        storyContainer.innerHTML = `<div class="error">生成故事失败: ${error.message}</div>`;
        
        // 播放错误音效
        audioManager.playSoundEffect('error');
        
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
    const choicesContainer = document.getElementById('choices');
    
    // 重置故事配置
    STORY_CONFIG.CURRENT_SCENE = 0;
    STORY_CONFIG.IS_STORY_ENDED = false;
    
    // 显示骨架屏加载动画
    storyContainer.innerHTML = generateSkeletonLoading();
    choicesContainer.innerHTML = generateSkeletonChoices();
    
    try {
        // 重置故事树
        currentStory.storyTree = {
            currentNodeId: 'root',
            nodes: {}
        };
        currentStory.currentPath = [];
        
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
    
    // 根据故事内容播放相关音效
    if (currentStory.settings.uiSoundEnabled !== false) {
        audioManager.playContextualSound(storyContent);
    }
    
    // 检查是否需要切换主题音乐
    checkAndSwitchThemeMusic(storyContent);
}

/**
 * 检查并切换主题音乐
 */
function checkAndSwitchThemeMusic(storyContent) {
    const content = storyContent.toLowerCase();
    const currentKeywords = currentStory.keywords.parsed;
    
    // 检测新的主题关键词
    for (const [themeName, themeConfig] of Object.entries(AUDIO_CONFIG.themeMusic)) {
        let shouldSwitch = false;
        
        // 检查故事内容中是否包含主题关键词
        for (const keyword of themeConfig.keywords) {
            if (content.includes(keyword.toLowerCase())) {
                shouldSwitch = true;
                break;
            }
        }
        
        // 如果检测到新主题且与当前主题不同，则切换音乐
        if (shouldSwitch && audioManager.currentTheme !== themeName) {
            console.log(`检测到新主题: ${themeName}，切换音乐`);
            audioManager.playThemeMusic(themeName);
            break;
        }
    }
}

/**
 * 根据类型更新背景
 */
function updateBackgroundByType(backgroundType) {
    // 如果场景没有变化，则不执行任何操作
    if (currentStory.environment.currentBackground === backgroundType) {
        return;
    }
    
    currentStory.environment.currentBackground = backgroundType;

    // 根据设置播放环境音效
    const ambientToggle = document.getElementById('ambient-toggle');
    if (ambientToggle && ambientToggle.checked) {
        if (backgroundType !== 'none') {
            audioManager.playAmbientSound(backgroundType);
            console.log(`智能场景音效已切换为: ${backgroundType}`);
        } else {
            if (audioManager.ambientSound) {
                audioManager.ambientSound.source.stop();
                audioManager.ambientSound = null;
            }
        }
    }
}

/**
 * 检测故事内容中的场景并更新背景
 */
function detectSceneBackground(storyContent) {
    // 如果用户已手动选择背景，则不自动更新
    if (document.getElementById('background-select').value !== 'none') {
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
    
    // 播放选择音效
    if (currentStory.settings.uiSoundEnabled !== false) {
        audioManager.playSoundEffect('choiceSelect');
    }
    
    // 显示骨架屏加载动画
    choicesContainer.innerHTML = generateSkeletonLoading();
    
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
            
            // 播放故事结束音效
            if (currentStory.settings.uiSoundEnabled !== false) {
                audioManager.playSoundEffect('storyProgress');
            }
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
        
        // 播放错误音效
        audioManager.playSoundEffect('error');
        
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
    // 播放页面切换音效
    if (currentStory.settings.uiSoundEnabled !== false) {
        audioManager.playSoundEffect('pageTransition');
    }
    
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
    
    // 根据页面类型调整音频
    if (pageName === 'setup') {
        // 返回设置页面时停止背景音乐
        audioManager.stopAll();
    } else if (pageName === 'game') {
        // 进入游戏页面时开始播放背景音乐
        if (currentStory.settings.genre) {
            audioManager.playBackgroundMusic(currentStory.settings.genre);
        }
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

/**
 * 保存音频设置到本地存储
 */
function saveAudioSettings() {
    const audioSettings = {
        isMuted: audioManager.isMuted,
        masterVolume: audioManager.masterVolume,
        bgmEnabled: document.getElementById('bgm-toggle')?.checked,
        ambientEnabled: document.getElementById('ambient-toggle')?.checked,
        uiSoundEnabled: document.getElementById('ui-toggle')?.checked
    };
    
    try {
        localStorage.setItem('vibeStoryAudioSettings', JSON.stringify(audioSettings));
    } catch (error) {
        console.error('保存音频设置失败:', error);
    }
}

/**
 * 定期保存音频设置
 */
setInterval(saveAudioSettings, 30000); // 每30秒保存一次

// 页面卸载时保存设置
window.addEventListener('beforeunload', saveAudioSettings);

/**
 * 更新音乐信息面板
 */
function updateMusicInfo() {
    const musicInfoContainer = document.getElementById('music-info');
    if (!musicInfoContainer) return;
    
    const musicInfo = audioManager.getCurrentMusicInfo();
    if (!musicInfo) {
        musicInfoContainer.innerHTML = '<div class="no-music">当前没有播放音乐</div>';
        return;
    }
    
    const musicType = musicInfo.type === 'theme' ? '主题音乐' : '背景音乐';
    const musicName = musicInfo.name;
    const musicDescription = musicInfo.description;
    
    const currentMusicDiv = musicInfoContainer.querySelector('.current-music');
    if (currentMusicDiv) {
        currentMusicDiv.innerHTML = `
            <div class="music-type">${musicType}</div>
            <div class="music-name">${musicName}</div>
            <div class="music-description">${musicDescription}</div>
            <div class="music-visualizer">
                <div class="visualizer-bar"></div>
                <div class="visualizer-bar"></div>
                <div class="visualizer-bar"></div>
                <div class="visualizer-bar"></div>
                <div class="visualizer-bar"></div>
            </div>
        `;
    }
    
    // 更新主题建议的激活状态
    updateThemeSuggestions();
}

/**
 * 更新主题建议
 */
function updateThemeSuggestions() {
    const themeItems = document.querySelectorAll('.theme-item');
    const currentTheme = audioManager.currentTheme;
    
    themeItems.forEach(item => {
        const themeName = item.dataset.theme;
        if (themeName === currentTheme) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * 初始化音乐控制功能
 */
function initializeMusicControls() {
    const musicPauseBtn = document.getElementById('music-pause');
    const musicResumeBtn = document.getElementById('music-resume');
    const musicStopBtn = document.getElementById('music-stop');
    
    if (musicPauseBtn) {
        musicPauseBtn.addEventListener('click', () => {
            audioManager.setMuted(true);
            musicPauseBtn.style.display = 'none';
            musicResumeBtn.style.display = 'inline-block';
        });
    }
    
    if (musicResumeBtn) {
        musicResumeBtn.addEventListener('click', () => {
            audioManager.setMuted(false);
            musicResumeBtn.style.display = 'none';
            musicPauseBtn.style.display = 'inline-block';
        });
    }
    
    if (musicStopBtn) {
        musicStopBtn.addEventListener('click', () => {
            audioManager.stopAll();
            updateMusicInfo();
            musicResumeBtn.style.display = 'none';
            musicPauseBtn.style.display = 'inline-block';
        });
    }
    
    // 主题建议点击事件
    const themeItems = document.querySelectorAll('.theme-item');
    themeItems.forEach(item => {
        item.addEventListener('click', () => {
            const themeName = item.dataset.theme;
            audioManager.playThemeMusic(themeName);
            updateMusicInfo();
            
            // 添加切换动画
            const currentMusic = document.querySelector('.current-music');
            if (currentMusic) {
                currentMusic.classList.add('music-transition');
                setTimeout(() => {
                    currentMusic.classList.remove('music-transition');
                }, 500);
            }
        });
    });
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);