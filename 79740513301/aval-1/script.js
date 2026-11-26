// Artigos iniciais do blog
const postsIniciais = [
  {
    id: 1,
    titulo: "O que caracteriza o bullying e o que diz a lei no Brasil",
    categoria: "entenda",
    categoriaNome: "Entenda o Tema",
    autor: "Equipe Espaço Respeito",
    data: "20 Nov 2026",
    resumo: "Entenda a diferença entre conflitos pontuais e intimidação sistemática, além de conhecer as leis brasileiras que punem essa prática.",
    conteudo: `
      <p>Para que uma atitude seja considerada bullying, ela precisa apresentar três características principais: intencionalidade (vontade de ferir), repetição ao longo do tempo e desequilíbrio de poder entre agressor e vítima.</p>
      <p>No Brasil, a Lei nº 13.185/2015 obriga escolas e clubes a adotarem medidas de prevenção. Além disso, a Lei nº 14.811/2024 incluiu o bullying e o cyberbullying no Código Penal, prevendo multa e, no caso virtual, pena de reclusão.</p>
      <p>Reconhecer que o problema é sério é o primeiro passo para proteger crianças e adolescentes.</p>
    `
  },
  {
    id: 2,
    titulo: "Cyberbullying: como reunir provas e se proteger na internet",
    categoria: "cyberbullying",
    categoriaNome: "Cyberbullying",
    autor: "Mariana Silva (Psicóloga)",
    data: "22 Nov 2026",
    resumo: "Ataques virtuais se espalham rápido, mas deixam rastros. Veja o passo a passo de como registrar evidências antes de bloquear o agressor.",
    conteudo: `
      <p>O cyberbullying acontece por meio de mensagens ofensivas, exposição de fotos sem consentimento, criação de perfis falsos ou exclusão intencional em grupos online.</p>
      <p><strong>O que fazer ao sofrer um ataque:</strong></p>
      <p>1. Não responda às provocações.<br>
      2. Tire prints da tela mostrando data, hora e o perfil do agressor.<br>
      3. Copie o link (URL) da publicação ou perfil.<br>
      4. Denuncie na própria plataforma e bloqueie a conta.<br>
      5. Mostre as provas a um adulto de confiança e, se necessário, registre um Boletim de Ocorrência.</p>
    `
  },
  {
    id: 3,
    titulo: "Sinais de alerta: como saber se seu filho está sofrendo bullying",
    categoria: "ajuda",
    categoriaNome: "Para Vítimas e Pais",
    autor: "Carlos Mendes (Educador)",
    data: "25 Nov 2026",
    resumo: "Muitos jovens escondem o problema por medo ou vergonha. Saiba quais mudanças de comportamento merecem atenção.",
    conteudo: `
      <p>Nem sempre a vítima pede ajuda verbalmente. Pais e professores devem ficar atentos a sinais silenciosos:</p>
      <p>- Recusa repentina em ir à escola ou desculpas frequentes (dor de cabeça, dor de barriga).<br>
      - Queda brusca no rendimento escolar.<br>
      - Isolamento social, tristeza constante ou irritabilidade.<br>
      - Material escolar rasgado, perdido ou roupas danificadas sem explicação.</p>
      <p>Ao notar esses sinais, acolha sem julgar, valide os sentimentos do jovem e procure a coordenação da escola imediatamente.</p>
    `
  }
];

// Carrega posts salvos no navegador ou usa os iniciais
let posts = JSON.parse(localStorage.getItem('blogBullyingPosts')) || postsIniciais;

const postsContainer = document.getElementById('postsContainer');
const filtroBtns = document.querySelectorAll('.filtro-btn');

// Renderiza os cards na tela
function renderizarPosts(categoriaFiltro = 'todos') {
  postsContainer.innerHTML = '';

  const filtrados = categoriaFiltro === 'todos' 
    ? posts 
    : posts.filter(post => post.categoria === categoriaFiltro);

  filtrados.forEach(post => {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.innerHTML = `
      <div>
        <span class="badge">${post.categoriaNome}</span>
        <h3>${post.titulo}</h3>
        <p>${post.resumo}</p>
      </div>
      <div class="post-footer">
        <span>Por ${post.autor}</span>
        <button class="btn-ler" onclick="abrirLeitura(${post.id})">Ler mais &rarr;</button>
      </div>
    `;
    postsContainer.appendChild(card);
  });
}

// Lógica dos botões de filtro
filtroBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderizarPosts(btn.dataset.categoria);
  });
});

// Modal de Leitura
const modalLeitura = document.getElementById('modalLeitura');
const fecharLeitura = document.getElementById('fecharLeitura');

window.abrirLeitura = function(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  document.getElementById('leituraCategoria').textContent = post.categoriaNome;
  document.getElementById('leituraTitulo').textContent = post.titulo;
  document.getElementById('leituraMeta').textContent = `Publicado por ${post.autor} em ${post.data}`;
  document.getElementById('leituraTexto').innerHTML = post.conteudo;

  modalLeitura.style.display = 'flex';
};

fecharLeitura.onclick = () => modalLeitura.style.display = 'none';

// Modal de Novo Post
const modalNovoPost = document.getElementById('modalNovoPost');
const btnNovoPost = document.getElementById('btnNovoPost');
const fecharNovoPost = document.getElementById('fecharNovoPost');
const formNovoPost = document.getElementById('formNovoPost');

btnNovoPost.onclick = () => modalNovoPost.style.display = 'flex';
fecharNovoPost.onclick = () => modalNovoPost.style.display = 'none';

// Salvar novo post
formNovoPost.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const categoriaSelect = document.getElementById('categoria');
  const categoria = categoriaSelect.value;
  const categoriaNome = categoriaSelect.options[categoriaSelect.selectedIndex].text;
  const autor = document.getElementById('autor').value;
  const textoBruto = document.getElementById('conteudo').value;

  // Converte quebras de linha em parágrafos HTML
  const conteudoFormatado = textoBruto
    .split('\n')
    .filter(linha => linha.trim() !== '')
    .map(linha => `<p>${linha}</p>`)
    .join('');

  const novoPost = {
    id: Date.now(),
    titulo,
    categoria,
    categoriaNome,
    autor,
    data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
    resumo: textoBruto.substring(0, 120) + '...',
    conteudo: conteudoFormatado
  };

  posts.unshift(novoPost);
  localStorage.setItem('blogBullyingPosts', JSON.stringify(posts));

  formNovoPost.reset();
  modalNovoPost.style.display = 'none';
  renderizarPosts();
});

// Fecha modais ao clicar fora da caixa
window.onclick = (e) => {
  if (e.target === modalLeitura) modalLeitura.style.display = 'none';
  if (e.target === modalNovoPost) modalNovoPost.style.display = 'none';
};

// Inicializa o blog
renderizarPosts();