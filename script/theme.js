document.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.querySelector('.settings-btn');
  const settingsDropdown = document.querySelector('.settings-dropdown');
  const themeSwitch = document.getElementById('themeSwitch');
  const themeIcon = themeSwitch.querySelector('i');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const fontSizeButtons = document.querySelectorAll('.font-size-btn');
  const languageSelect = document.getElementById('languageSelect');

  // Load saved settings from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedFontSize = localStorage.getItem('fontSize') || 'medium';
  const savedLanguage = localStorage.getItem('language') || 'it';

  // Apply saved settings
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-font-size', savedFontSize);
  languageSelect.value = savedLanguage;
  updateThemeIcon(savedTheme);
  updateFontSizeButtons(savedFontSize);

  // Initialize language manager
  const languageManager = new LanguageManager();
  languageManager.init();

  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Toggle settings dropdown
  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsDropdown.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
      settingsDropdown.classList.remove('active');
    }
  });

  // Theme switch functionality
  themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  // Font size functionality
  fontSizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.getAttribute('data-size');
      document.documentElement.setAttribute('data-font-size', size);
      localStorage.setItem('fontSize', size);
      updateFontSizeButtons(size);
    });
  });

  // Language select functionality
  languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('language', selectedLanguage);
    // In un'implementazione reale, qui andresti a caricare le traduzioni
    // e aggiornare i testi della pagina
    console.log(`Lingua cambiata in: ${selectedLanguage}`);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    } else {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }

  function updateFontSizeButtons(activeSize) {
    fontSizeButtons.forEach(btn => {
      const size = btn.getAttribute('data-size');
      if (size === activeSize) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}); 