// Gallery Filtering
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

// Form Handling
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: contactForm.querySelector('#name').value,
        email: contactForm.querySelector('#email').value,
        phone: contactForm.querySelector('#phone').value,
        service: contactForm.querySelector('#service').value,
        message: contactForm.querySelector('#message').value,
        privacy: contactForm.querySelector('#privacy').checked
      };

      // Validate form data
      if (!formData.name || !formData.email || !formData.message || !formData.privacy) {
        alert('Per favore, compila tutti i campi obbligatori e accetta la privacy policy.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Per favore, inserisci un indirizzo email valido.');
        return;
      }

      // Phone validation (optional)
      if (formData.phone) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(formData.phone)) {
          alert('Per favore, inserisci un numero di telefono valido.');
          return;
        }
      }

      // Here you would typically send the data to a server
      // For now, we'll just show a success message
      alert('Grazie per averci contattato! Ti risponderemo al più presto.');
      contactForm.reset();
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        if (!this.value) {
          this.classList.add('invalid');
        } else {
          this.classList.remove('invalid');
        }
      });

      input.addEventListener('input', function () {
        if (this.value) {
          this.classList.remove('invalid');
        }
      });
    });
  }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Mobile Navigation Menu
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  // Add mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

  // Only add the button on mobile view
  if (window.innerWidth <= 768) {
    navbar.insertBefore(mobileMenuBtn, navLinks);

    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      mobileMenuBtn.innerHTML = navLinks.classList.contains('show')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }
});
