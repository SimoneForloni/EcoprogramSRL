// Initialize font size from localStorage or default to medium
(function () {
  // Set initial font size
  const savedSize = localStorage.getItem('fontSize') || 'medium';
  document.documentElement.setAttribute('data-font-size', savedSize);

  // Handle font size buttons
  document.addEventListener('DOMContentLoaded', () => {
    const fontSizeButtons = document.querySelectorAll('.font-size-btn');

    // Set initial active state
    fontSizeButtons.forEach(btn => {
      if (btn.dataset.size === savedSize) {
        btn.dataset.active = 'true';
      }
    });

    // Add click handlers
    document.querySelector('.font-size-controls').addEventListener('click', (e) => {
      const button = e.target.closest('.font-size-btn');
      if (!button) return;

      const newSize = button.dataset.size;

      // Update active states
      fontSizeButtons.forEach(btn => {
        btn.dataset.active = btn === button ? 'true' : 'false';
      });

      // Apply new size
      document.documentElement.setAttribute('data-font-size', newSize);
      localStorage.setItem('fontSize', newSize);
    });
  });
})(); 