
        // 轮播图切换
        const bannerDots = document.querySelectorAll('.banner-dot');
        let currentBanner = 0;
        
        function changeBanner(index) {
            bannerDots.forEach(dot => dot.classList.remove('active'));
            bannerDots[index].classList.add('active');
            // 这里应该有实际的图片切换逻辑，示例中省略了
        }
        
        bannerDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentBanner = index;
                changeBanner(currentBanner);
            });
        });
        
        // 自动轮播
        setInterval(() => {
            currentBanner = (currentBanner + 1) % bannerDots.length;
            changeBanner(currentBanner);
        }, 5000);
        
        // 动态标签切换
        const dynamicTabs = document.querySelectorAll('.dynamic-tab');
        
        dynamicTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                dynamicTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // 这里应该有实际的内容切换逻辑，示例中省略了
            });
        });
        
        // 导航栏悬停效果
        const navItems = document.querySelectorAll('.nav li');
        
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
                document.querySelector('.nav li:first-child').classList.add('active');
            });
        });
        
        // 视频卡片悬停效果
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });