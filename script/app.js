// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');

  // Set initial checkbox state based on current theme
  themeToggle.checked = document.documentElement.getAttribute('data-theme') === 'dark';

  // Handle theme toggle
  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}); 