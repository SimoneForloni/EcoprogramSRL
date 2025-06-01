document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.querySelector('.gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalClose = document.querySelector('.modal-close');
  const modalPrev = document.querySelector('.modal-prev');
  const modalNext = document.querySelector('.modal-next');

  let currentIndex = 0;
  let filteredItems = [...galleryItems];

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter items
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Update filtered items array
      filteredItems = [...galleryItems].filter(item =>
        filter === 'all' || item.getAttribute('data-category') === filter
      );
    });
  });

  // Modal functionality
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      updateModal(item);
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  function updateModal(item) {
    const img = item.querySelector('img');
    const title = item.querySelector('h3');
    const desc = item.querySelector('p');

    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = title.textContent;
    modalDesc.textContent = desc.textContent;
  }

  // Close modal
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  });

  // Close modal on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Previous image
  modalPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateModal(filteredItems[currentIndex]);
  });

  // Next image
  modalNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateModal(filteredItems[currentIndex]);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        updateModal(filteredItems[currentIndex]);
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % filteredItems.length;
        updateModal(filteredItems[currentIndex]);
      }
    }
  });
}); 