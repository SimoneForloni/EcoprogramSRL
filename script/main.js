// Configurazione iniziale
const CONFIG = {
  theme: {
    storage_key: 'theme',
    default: 'light',
    values: { dark: 'dark', light: 'light' }
  },
  fontSize: {
    storage_key: 'fontSize',
    default: 'medium',
    values: ['small', 'medium', 'large']
  }
};

// Utility functions
const storage = {
  get: (key, defaultValue) => localStorage.getItem(key) || defaultValue,
  set: (key, value) => localStorage.setItem(key, value)
};

const dom = {
  getElement: id => document.getElementById(id),
  getElements: selector => document.querySelectorAll(selector),
  setDataAttribute: (element, attr, value) => element.setAttribute(`data-${attr}`, value)
};

// Initialize theme immediately to prevent flash
(function initializeTheme() {
  const savedTheme = storage.get(CONFIG.theme.storage_key);
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? CONFIG.theme.values.dark : CONFIG.theme.values.light);

  dom.setDataAttribute(document.documentElement, 'theme', theme);
  storage.set(CONFIG.theme.storage_key, theme);
})();

// Initialize font size immediately
(function initializeFontSize() {
  const savedSize = storage.get(CONFIG.fontSize.storage_key, CONFIG.fontSize.default);
  dom.setDataAttribute(document.documentElement, 'font-size', savedSize);
})();

// Theme functionality
function initTheme() {
  const themeToggle = dom.getElement('themeToggle');
  if (!themeToggle) return;

  const currentTheme = document.documentElement.getAttribute('data-theme') || CONFIG.theme.default;
  themeToggle.checked = currentTheme === CONFIG.theme.values.dark;

  themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? CONFIG.theme.values.dark : CONFIG.theme.values.light;
    dom.setDataAttribute(document.documentElement, 'theme', newTheme);
    storage.set(CONFIG.theme.storage_key, newTheme);
  });
}

// Font size functionality
function initFontSize() {
  const controls = document.querySelector('.font-size-controls');
  const buttons = dom.getElements('.font-size-btn');
  if (!controls || !buttons.length) return;

  updateFontButtons(storage.get(CONFIG.fontSize.storage_key, CONFIG.fontSize.default));

  controls.addEventListener('click', (e) => {
    const button = e.target.closest('.font-size-btn');
    if (!button) return;

    const newSize = button.dataset.size;
    dom.setDataAttribute(document.documentElement, 'font-size', newSize);
    storage.set(CONFIG.fontSize.storage_key, newSize);
    updateFontButtons(newSize);
  });
}

// Settings overlay functionality
function initSettingsOverlay() {
  const settingsToggle = dom.getElement('settingsToggle');
  if (!settingsToggle) return;

  settingsToggle.addEventListener('change', () => {
    document.body.classList.toggle('hidden', settingsToggle.checked);
  });
}

// Helper function to update font size buttons
function updateFontButtons(activeSize) {
  dom.getElements('.font-size-btn').forEach(btn => {
    btn.dataset.active = (btn.dataset.size === activeSize).toString();
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initFontSize();
  initSettingsOverlay();
}); 