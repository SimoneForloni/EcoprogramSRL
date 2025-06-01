document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  const formGroups = document.querySelectorAll('.form-group');

  // Form validation
  function validateForm() {
    let isValid = true;
    const errorMessages = {
      name: 'Inserisci il tuo nome e cognome',
      email: 'Inserisci un indirizzo email valido',
      service: 'Seleziona un servizio',
      message: 'Inserisci un messaggio',
      privacy: 'Devi accettare la Privacy Policy'
    };

    // Remove existing error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    formGroups.forEach(group => {
      const input = group.querySelector('input, select, textarea');
      if (!input) return;

      const isRequired = input.hasAttribute('required');
      if (!isRequired) return;

      let hasError = false;

      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        hasError = !emailRegex.test(input.value.trim());
      } else if (input.type === 'checkbox') {
        hasError = !input.checked;
      } else {
        hasError = !input.value.trim();
      }

      if (hasError) {
        isValid = false;
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = errorMessages[input.name];
        group.appendChild(errorMessage);
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    });

    return isValid;
  }

  // Real-time validation
  formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    if (!input) return;

    input.addEventListener('input', () => {
      // Remove error styling
      input.classList.remove('error');
      const errorMessage = group.querySelector('.error-message');
      if (errorMessage) {
        errorMessage.remove();
      }
    });
  });

  // Form submission
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      // Show loading state
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Invio in corso...';
      submitBtn.disabled = true;

      // Simulate API call (replace with actual API endpoint)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Grazie per averci contattato! Ti risponderemo al più presto.';
      contactForm.insertAdjacentElement('beforebegin', successMessage);

      // Reset form
      contactForm.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    } catch (error) {
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.textContent = 'Si è verificato un errore. Riprova più tardi.';
      contactForm.insertAdjacentElement('beforebegin', errorMessage);

      // Remove error message after 5 seconds
      setTimeout(() => {
        errorMessage.remove();
      }, 5000);
    } finally {
      // Reset button state
      const submitBtn = contactForm.querySelector('.submit-btn');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}); 