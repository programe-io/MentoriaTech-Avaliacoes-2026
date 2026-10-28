
const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('navigation');
const themeToggle = document.getElementById('theme-toggle');

// Menu para celular
menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Tema claro e escuro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  const darkMode = document.body.classList.contains('dark');

  themeToggle.textContent = darkMode ? '☀️' : '🌙';
  themeToggle.setAttribute(
    'aria-label',
    darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'
  );
});

// Pesquisa e filtros
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');
const posts = document.querySelectorAll('.post');
const emptyMessage = document.getElementById('empty-message');

let selectedCategory = 'Todos';

function filterPosts() {
  const query = searchInput.value
    .trim()
    .toLocaleLowerCase('pt-BR');

  let visibleCount = 0;

  posts.forEach(post => {
    const text = post.textContent.toLocaleLowerCase('pt-BR');

    const matchesText = text.includes(query);

    const matchesCategory =
      selectedCategory === 'Todos' ||
      post.dataset.category === selectedCategory;

    const visible = matchesText && matchesCategory;

    post.hidden = !visible;

    if (visible) visibleCount++;
  });

  emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener('input', filterPosts);

categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach(item => {
      item.classList.toggle('active', item === button);
    });

    filterPosts();
  });
});

// Abrir e fechar artigos
const dialog = document.getElementById('article-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogText = document.getElementById('dialog-text');
const dialogClose = document.getElementById('dialog-close');

document.querySelectorAll('.read-more').forEach(button => {
  button.addEventListener('click', () => {
    dialogTitle.textContent = button.dataset.title;
    dialogText.textContent = button.dataset.text;

    dialog.showModal();
  });
});

dialogClose.addEventListener('click', () => {
  dialog.close();
});

// Newsletter demonstrativa
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');
const newsletterMessage = document.getElementById('newsletter-message');

newsletterForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = emailInput.value.trim();

  newsletterMessage.textContent =
    `Obrigado! O formulário foi testado com ${email}. ` +
    'Para receber inscrições de verdade, conecte um serviço de newsletter.';

  newsletterForm.reset();
});

// Atualizar ano do rodapé
document.getElementById('year').textContent =
  new Date().getFullYear();