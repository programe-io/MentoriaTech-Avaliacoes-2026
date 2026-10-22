const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menuToggle.textContent = '☰';
  });
});

const filters = document.querySelectorAll('.filter');
const lookCards = document.querySelectorAll('.look-card');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(button => button.classList.remove('active'));
    filter.classList.add('active');

    const category = filter.dataset.filter;
    lookCards.forEach(card => {
      const visible = category === 'todos' || card.dataset.category === category;
      card.hidden = !visible;
    });
  });
});

// Pequeno efeito de entrada quando os cartões entram na tela.
const cards = document.querySelectorAll('.look-card, .boot-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => {
    card.classList.add('reveal');
    observer.observe(card);
  });
}
