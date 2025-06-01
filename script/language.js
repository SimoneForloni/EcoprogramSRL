class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'it';
    this.translations = translations; // from translations.js
    this.elements = new Map();
    this.debug = true; // Enable debug logging
  }

  init() {
    this.initializeElements();
    this.setLanguage(this.currentLang);

    // Add language change listener
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
      languageSelect.value = this.currentLang;
      languageSelect.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }
  }

  initializeElements() {
    // Clear existing elements
    this.elements.clear();

    // Initialize translation elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (key) {
        if (this.debug) {
          console.log(`Registering element for translation:`, {
            key,
            element: element.outerHTML,
            tagName: element.tagName
          });
        }
        this.elements.set(key, element);
      }
    });
  }

  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.error(`Language ${lang} not supported`);
      return;
    }

    if (this.debug) {
      console.log(`Setting language to: ${lang}`);
    }

    this.currentLang = lang;
    localStorage.setItem('language', lang);

    // Reinitialize elements to catch any new ones
    this.initializeElements();

    // Update all translations
    this.elements.forEach((element, key) => {
      try {
        const translation = this.getTranslation(key);

        if (this.debug) {
          console.log(`Translating element:`, {
            key,
            translation,
            element: element.outerHTML
          });
        }

        // Handle different element types
        if (element.tagName === 'H3') {
          // Direct text update for h3 elements
          element.textContent = translation;
          if (this.debug) {
            console.log(`Updated H3 text to: ${translation}`);
          }
        } else if (element.tagName === 'INPUT' && element.getAttribute('type') === 'placeholder') {
          element.placeholder = translation;
        } else if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
          element.content = translation;
        } else if (element.classList.contains('service-link')) {
          // Special handling for service links with icons
          const icon = element.querySelector('i');
          if (icon) {
            element.innerHTML = translation + ' ' + icon.outerHTML;
          } else {
            element.textContent = translation;
          }
        } else {
          // Check if element has child elements that are not translation spans
          const hasNonTranslationChildren = Array.from(element.children).some(child =>
            !child.hasAttribute('data-i18n') && !child.classList.contains('fas') && !child.classList.contains('fab')
          );

          if (hasNonTranslationChildren) {
            // If has non-translation children, only update the text nodes
            this.updateTextNodesOnly(element, translation);
          } else {
            element.textContent = translation;
          }
        }

        // Verify the update
        if (this.debug) {
          console.log(`After translation:`, {
            key,
            elementContent: element.textContent,
            elementHtml: element.innerHTML
          });
        }
      } catch (error) {
        console.error(`Error translating element with key ${key}:`, error);
      }
    });

    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }

  updateTextNodesOnly(element, translation) {
    // Get all text nodes that are direct children
    const textNodes = Array.from(element.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE);

    if (textNodes.length > 0) {
      // Update only the first text node
      textNodes[0].textContent = translation;

      // Clear any other text nodes
      textNodes.slice(1).forEach(node => {
        node.textContent = '';
      });
    } else {
      // If no text nodes exist, create one
      element.insertBefore(document.createTextNode(translation), element.firstChild);
    }
  }

  getTranslation(key) {
    if (!key) return '';

    if (this.debug) {
      console.log(`Getting translation for key: ${key}`, {
        currentLang: this.currentLang,
        availableTranslations: Object.keys(this.translations[this.currentLang])
      });
    }

    const translation = this.translations[this.currentLang][key];

    if (translation === undefined) {
      console.warn(`Translation not found for key: ${key} in language: ${this.currentLang}`);
      return key;
    }

    return translation;
  }

  translateElement(element, key) {
    if (!element || !key) return;
    const translation = this.getTranslation(key);
    element.textContent = translation;
  }

  translateAttribute(element, attr, key) {
    if (!element || !attr || !key) return;
    const translation = this.getTranslation(key);
    element.setAttribute(attr, translation);
  }
} 