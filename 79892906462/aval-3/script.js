
// Pesquisa os cartões de interesses conforme o texto digitado.
const siteSearch = document.getElementById('siteSearch');
const interestCards = [...document.querySelectorAll('.interest-card')];
const searchFeedback = document.getElementById('searchFeedback');
const emptyState = document.getElementById('emptyState');

siteSearch.addEventListener('input', () => {
  const term = siteSearch.value.trim().toLocaleLowerCase('pt-BR');
  let visibleCount = 0;

  interestCards.forEach(card => {
    const searchableText =
      `${card.innerText} ${card.dataset.searchable}`
        .toLocaleLowerCase('pt-BR');

    const matches = searchableText.includes(term);
    card.hidden = !matches;

    if (matches) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
  searchFeedback.textContent = term
    ? `${visibleCount} interesse(s) encontrado(s).`
    : '';
});

// Alterna o tema e guarda a preferência neste navegador.
const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('pedro-theme') === 'light') {
  document.body.classList.add('light');
}

function updateThemeControl() {
  const isLight = document.body.classList.contains('light');

  themeToggle.textContent = isLight ? '☀' : '☾';
  themeToggle.setAttribute(
    'aria-label',
    isLight ? 'Ativar modo escuro' : 'Ativar modo claro'
  );
}

updateThemeControl();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');

  localStorage.setItem(
    'pedro-theme',
    document.body.classList.contains('light') ? 'light' : 'dark'
  );

  updateThemeControl();
});

// Menu responsivo para celulares.
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';

    nav.querySelectorAll('a').forEach(item =>
      item.classList.remove('active')
    );

    link.classList.add('active');
  });
});

// Formulário demonstrativo: valida os campos, mas não envia a um servidor.
document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value.trim();
  const feedback = document.getElementById('formFeedback');

  if (!name || !email || !message) {
    feedback.textContent =
      'Preencha os campos obrigatórios antes de continuar.';
    return;
  }

  feedback.textContent =
    `Obrigado, ${name}! A demonstração validou sua mensagem sobre ` +
    `“${subject}”. Para enviar de verdade, conecte um serviço de formulário.`;

  event.currentTarget.reset();
});

// Atualiza automaticamente o ano no rodapé.
document.getElementById('currentYear').textContent =
  new Date().getFullYear();
