const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

// Reveal-on-scroll with a graceful fallback for browsers without IntersectionObserver.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

// Content filters
const filterButtons = document.querySelectorAll('.filter');
const storyCards = document.querySelectorAll('.story-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  storyCards.forEach(card => {
    const matches = filter === 'todos' || card.dataset.category === filter;
    card.classList.toggle('filtered-out', !matches);
  });
}));

// Demo form: no email is stored or sent until a newsletter provider is connected.
document.querySelector('#newsletterForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email');
  const message = document.querySelector('#formMessage');
  if (email.checkValidity()) {
    message.textContent = 'Demonstração: formulário validado. Conecte um serviço de newsletter para ativar os cadastros.';
    message.setAttribute('role', 'status');
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Gentle hero parallax on pointer devices, disabled for reduced-motion preference.
const heroArt = document.querySelector('.hero-art');
if (heroArt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer:fine)').matches) {
  heroArt.addEventListener('pointermove', event => {
    const rect = heroArt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    const image = heroArt.querySelector('.hero-image-wrap');
    if (image) image.style.transform = `rotate(${3 + x * 2}deg) translate(${x * 7}px, ${y * 7}px)`;
  });
  heroArt.addEventListener('pointerleave', () => {
    const image = heroArt.querySelector('.hero-image-wrap');
    if (image) image.style.transform = 'rotate(3deg)';
  });
}
