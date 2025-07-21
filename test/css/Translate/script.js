class Carousel3D {
    constructor() {
        this.carousel = document.getElementById('carousel');
        this.items = document.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorContainer = document.getElementById('indicators');
        
        this.currentIndex = 0;
        this.totalItems = this.items.length;
        this.autoPlayInterval = null;
        this.isHovered = false;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.updateCarousel();
        this.bindEvents();
        this.startAutoPlay();
    }
    
    bindEvents() {
        // 左右按钮事件
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // 指示器点击事件
        this.indicatorContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('indicator')) {
                const index = parseInt(e.target.dataset.index);
                this.goToSlide(index);
            }
        });
        
        // 鼠标悬浮事件
        this.carousel.addEventListener('mouseenter', () => {
            this.isHovered = true;
            this.stopAutoPlay();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.startAutoPlay();
        });
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
        
        // 触摸事件支持
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            if (!this.isHovered) {
                this.startAutoPlay();
            }
        });
        
        // 防止图片拖拽
        this.items.forEach(item => {
            const img = item.querySelector('img');
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
    }
    
    updateCarousel() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        this.items.forEach((item, index) => {
            // 清除所有类名
            item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            
            const position = this.getItemPosition(index);
            item.classList.add(position);
        });
        
        // 更新指示器
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // 过渡完成后重置标志
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    getItemPosition(index) {
        const diff = index - this.currentIndex;
        
        if (diff === 0) {
            return 'active';
        } else if (diff === 1 || (diff === -(this.totalItems - 1))) {
            return 'next';
        } else if (diff === -1 || (diff === this.totalItems - 1)) {
            return 'prev';
        } else if (diff === 2 || (diff === -(this.totalItems - 2))) {
            return 'far-next';
        } else {
            return 'far-prev';
        }
    }
    
    next() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    prev() {
        if (this.isTransitioning) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            if (!this.isHovered && !this.isTransitioning) {
                this.next();
            }
        }, 5000); // 5秒间隔
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        if (!this.isHovered) {
            this.startAutoPlay();
        }
    }
}

// 页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    new Carousel3D();
});

// 页面可见性变化时控制自动播放
document.addEventListener('visibilitychange', () => {
    const carousel = window.carousel3D;
    if (carousel) {
        if (document.hidden) {
            carousel.stopAutoPlay();
        } else if (!carousel.isHovered) {
            carousel.startAutoPlay();
        }
    }
});

// 窗口大小变化时重新计算布局
window.addEventListener('resize', () => {
    // 防抖处理
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        const carousel = window.carousel3D;
        if (carousel) {
            carousel.updateCarousel();
        }
    }, 250);
});

// 预加载图片
function preloadImages() {
    const images = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 页面加载时预加载图片
window.addEventListener('load', preloadImages);

