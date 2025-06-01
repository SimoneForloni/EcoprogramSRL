class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'it';
    this.languageSelect = document.getElementById('languageSelect');
  }

  init() {
    // Imposta la lingua corrente nel select
    if (this.languageSelect) {
      this.languageSelect.value = this.currentLang;

      // Aggiungi event listener per il cambio lingua
      this.languageSelect.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }

    // Carica la lingua corrente
    this.setLanguage(this.currentLang);
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);

    // Traduci tutti gli elementi con attributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      if (translation) {
        element.textContent = translation;
      }
    });
  }

  getTranslation(key) {
    // Qui dovresti implementare la logica per ottenere le traduzioni
    // Per ora ritorniamo una stringa vuota
    return '';
  }
} 