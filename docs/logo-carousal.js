class LogoCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.items = document.querySelectorAll('.carousel-item');
        
        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.maxIndex = Math.max(0, this.items.length - this.itemsPerView);
        
        this.init();
    }
    
    init() {
        this.updateCarousel();
        this.bindEvents();
        this.handleResize();
    }
    
    getItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024) return 4;
        if (width >= 768) return 3;
        return 2;
    }
    
    updateCarousel() {
        const itemWidth = 100 / this.itemsPerView;
        const translateX = -(this.currentIndex * itemWidth);
        
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }
    
    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    bindEvents() {
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());
        
        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            isDragging = false;
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            const newItemsPerView = this.getItemsPerView();
            
            if (newItemsPerView !== this.itemsPerView) {
                this.itemsPerView = newItemsPerView;
                this.maxIndex = Math.max(0, this.items.length - this.itemsPerView);
                
                // Adjust current index if needed
                if (this.currentIndex > this.maxIndex) {
                    this.currentIndex = this.maxIndex;
                }
                
                this.updateCarousel();
            }
        });
    }
    
    // Auto-play functionality (optional)
    startAutoPlay(interval = 3000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentIndex >= this.maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateCarousel();
        }, interval);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carousel = new LogoCarousel();
    
    // Optional: Start auto-play on desktop
    if (window.innerWidth >= 768) {
        carousel.startAutoPlay(4000);
        
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.desktop-carousel');
        carouselContainer.addEventListener('mouseenter', () => carousel.stopAutoPlay());
        carouselContainer.addEventListener('mouseleave', () => carousel.startAutoPlay(4000));
    }
});