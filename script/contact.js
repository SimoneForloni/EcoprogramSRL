// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      showMessage('Per favore, compila tutti i campi richiesti.', 'error');
      return;
    }

    try {
      const formData = new FormData(form);
      const response = await submitForm(formData);

      if (response.success) {
        showMessage('Grazie per averci contattato! Ti risponderemo presto.', 'success');
        form.reset();
      } else {
        throw new Error(response.message || 'Errore durante l\'invio del modulo.');
      }
    } catch (error) {
      showMessage(error.message, 'error');
      console.error('Form submission error:', error);
    }
  });
});

// Form validation
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    } else {
      field.classList.remove('error');
    }

    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        field.classList.add('error');
        isValid = false;
      }
    }
  });

  return isValid;
}

// Form submission
async function submitForm(formData) {
  const endpoint = '/api/contact'; // Replace with your actual endpoint

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Si è verificato un errore durante l\'invio. Riprova più tardi.');
  }
}

// Message display
function showMessage(message, type) {
  const messageContainer = document.querySelector('.form-message');
  if (!messageContainer) return;

  messageContainer.textContent = message;
  messageContainer.className = `form-message ${type}`;
  messageContainer.style.display = 'block';

  // Auto-hide message after 5 seconds
  setTimeout(() => {
    messageContainer.style.display = 'none';
  }, 5000);
} 