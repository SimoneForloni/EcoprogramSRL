// Gallery initialization
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initFilters();
});

// Initialize gallery
function initGallery() {
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery) return;

  // Add click handlers to gallery items
  gallery.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      const caption = item.querySelector('.gallery-caption h3')?.textContent;
      openLightbox(imgSrc, caption);
    });
  });
}

// Initialize filters
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter items
      galleryItems.forEach(item => {
        const shouldShow = filter === 'all' || item.dataset.category === filter;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  });
}

// Lightbox functionality
function openLightbox(imgSrc, caption) {
  const lightbox = createLightboxElement(imgSrc, caption);
  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';

  // Close on click outside image
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox(lightbox);
    }
  });

  // Close on escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLightbox(lightbox);
    }
  });
}

// Create lightbox element
function createLightboxElement(imgSrc, caption) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <img src="${imgSrc}" alt="${caption || ''}" />
      ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
      <button class="lightbox-close">&times;</button>
    </div>
  `;

  // Add close button handler
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    closeLightbox(lightbox);
  });

  return lightbox;
}

// Close lightbox
function closeLightbox(lightbox) {
  lightbox.remove();
  document.body.style.overflow = '';
} 