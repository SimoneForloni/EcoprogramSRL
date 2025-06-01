// Gallery initialization
document.addEventListener('DOMContentLoaded', () => {
  const gallery = {
    init() {
      this.images = document.querySelectorAll('.gallery-item');
      this.lightbox = document.getElementById('lightbox');
      this.lightboxImg = this.lightbox.querySelector('img');
      this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
      this.lightboxTitle = this.lightboxCaption.querySelector('h3');
      this.lightboxDesc = this.lightboxCaption.querySelector('p');
      this.lightboxCounter = this.lightboxCaption.querySelector('.lightbox-counter');
      this.currentIndex = 0;
      this.totalImages = this.images.length;

      // Bind event listeners
      this.bindEvents();
      
      // Initialize filters
      this.initFilters();
    },

    bindEvents() {
      // Open lightbox on image click
      this.images.forEach((item, index) => {
        const viewBtn = item.querySelector('.view-btn');
        viewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.openLightbox(index);
        });
      });

      // Close lightbox
      this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
      this.lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => this.closeLightbox());

      // Navigation
      this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.navigate(-1));
      this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.navigate(1));

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!this.lightbox.classList.contains('active')) return;
        
        switch(e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.navigate(-1);
            break;
          case 'ArrowRight':
            this.navigate(1);
            break;
        }
      });

      // Handle image load
      this.lightboxImg.addEventListener('load', () => {
        this.lightbox.querySelector('.lightbox-loading').classList.remove('active');
        this.lightboxImg.classList.add('loaded');
      });
    },

    openLightbox(index) {
      this.currentIndex = index;
      const currentItem = this.images[index];
      const img = currentItem.querySelector('img');
      const title = currentItem.querySelector('.gallery-item-overlay h3').textContent;
      const desc = currentItem.querySelector('.gallery-item-overlay p').textContent;

      // Show loading
      this.lightbox.querySelector('.lightbox-loading').classList.add('active');
      this.lightboxImg.classList.remove('loaded');

      // Update lightbox content
      this.lightboxImg.src = img.dataset.src || img.src;
      this.lightboxImg.alt = img.alt;
      this.lightboxTitle.textContent = title;
      this.lightboxDesc.textContent = desc;
      this.lightboxCounter.textContent = `${index + 1} / ${this.totalImages}`;

      // Show lightbox
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.lightbox.setAttribute('aria-hidden', 'false');
    },

    closeLightbox() {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = '';
      this.lightbox.setAttribute('aria-hidden', 'true');
      
      // Reset image
      setTimeout(() => {
        this.lightboxImg.src = '';
        this.lightboxImg.classList.remove('loaded');
      }, 300);
    },

    navigate(direction) {
      let newIndex = this.currentIndex + direction;
      
      // Handle loop
      if (newIndex >= this.totalImages) newIndex = 0;
      if (newIndex < 0) newIndex = this.totalImages - 1;

      this.openLightbox(newIndex);
    },

    initFilters() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active state
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Filter images
          const category = btn.dataset.filter;
          this.filterImages(category);
        });
      });
    },

    filterImages(category) {
      this.images.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }
  };

  gallery.init();
}); 