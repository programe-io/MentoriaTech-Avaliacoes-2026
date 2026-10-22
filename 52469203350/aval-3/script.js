const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Reveal sections smoothly as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();

// Demo form: no backend is connected yet, so we clearly tell the visitor.
document.querySelector('#newsletterForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  const message = document.querySelector('#formMessage');
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  message.textContent = 'Obrigado pelo interesse! O cadastro ainda precisa ser conectado a um serviço de e-mail.';
  message.classList.add('form-notice');
});
