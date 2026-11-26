const menuBtn = document.getElementById('menuBtn');
const menuLinks = document.getElementById('menuLinks');
const themeBtn = document.getElementById('themeBtn');

menuBtn.addEventListener('click', () => {
  const aberto = menuLinks.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', aberto);
});
menuLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuLinks.classList.remove('aberto');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
});

const filtros = document.querySelectorAll('.filtro');
const posts = document.querySelectorAll('.post');
const busca = document.getElementById('searchInput');
let categoriaAtual = 'Todas';

function filtrarPosts() {
  const termo = busca.value.toLocaleLowerCase('pt-BR').trim();
  let encontrados = 0;
  posts.forEach(post => {
    const correspondeCategoria = categoriaAtual === 'Todas' || post.dataset.category === categoriaAtual;
    const correspondeTexto = post.textContent.toLocaleLowerCase('pt-BR').includes(termo);
    const mostrar = correspondeCategoria && correspondeTexto;
    post.hidden = !mostrar;
    if (mostrar) encontrados++;
  });
  document.getElementById('noResults').hidden = encontrados !== 0;
}
filtros.forEach(botao => botao.addEventListener('click', () => {
  filtros.forEach(item => item.classList.remove('ativo'));
  botao.classList.add('ativo');
  categoriaAtual = botao.dataset.category;
  filtrarPosts();
}));
busca.addEventListener('input', filtrarPosts);

const dialog = document.getElementById('articleDialog');
document.querySelectorAll('.ler-mais').forEach(botao => botao.addEventListener('click', () => {
  document.getElementById('dialogTitle').textContent = botao.dataset.title;
  document.getElementById('dialogText').textContent = botao.dataset.text;
  dialog.showModal();
}));
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('formMessage').textContent = 'Mensagem de demonstração enviada! Este formulário não envia dados para um servidor.';
  event.target.reset();
});