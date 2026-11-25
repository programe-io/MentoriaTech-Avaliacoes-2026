const postagens = [
  {
    id: 1,
    titulo: "Os segredos da fotografia no deserto",
    data: "12 de Outubro de 2026",
    resumo: "Como a equipe de filmagem capturou a luz natural sem depender excessivamente de tela verde.",
    conteudo: "Para criar a atmosfera imersiva do planeta desértico, o diretor de fotografia optou por gravar durante a 'hora mágica' na Jordânia e em Abu Dhabi, utilizando lentes anamórficas especiais que realçam o contraste entre a areia e o céu."
  },
  {
    id: 2,
    titulo: "Análise da trilha sonora e design de som",
    data: "18 de Outubro de 2026",
    resumo: "O uso de instrumentos não convencionais para dar vida aos vermes da areia.",
    conteudo: "A trilha sonora mistura sintetizadores analógicos com instrumentos de sopro criados sob medida. Os efeitos sonoros dos passos na areia foram gravados em dunas reais usando microfones enterrados."
  },
  {
    id: 3,
    titulo: "5 detalhes que você perdeu na primeira sessão",
    data: "25 de Outubro de 2026",
    resumo: "Pequenas referências visuais escondidas nos figurinos e cenários.",
    conteudo: "Desde os símbolos bordados nas vestes das Bene Gesserit até a arquitetura brutalista dos palácios, cada elemento visual conta uma parte da história política do universo antes mesmo de qualquer diálogo acontecer."
  }
];

const containerPosts = document.getElementById("lista-posts");
const campoBusca = document.getElementById("campo-busca");
const modal = document.getElementById("modal-artigo");

function renderizarPosts(lista) {
  containerPosts.innerHTML = "";

  lista.forEach(post => {
    const artigo = document.createElement("article");
    artigo.classList.add("card-post");

    artigo.innerHTML = `
      <div>
        <small>${post.data}</small>
        <h2>${post.titulo}</h2>
        <p>${post.resumo}</p>
      </div>
      <button class="btn-ler" onclick="abrirArtigo(${post.id})">Ler artigo completo</button>
    `;

    containerPosts.appendChild(artigo);
  });
}

function abrirArtigo(id) {
  const post = postagens.find(item => item.id === id);
  if (!post) return;

  document.getElementById("modal-titulo").innerText = post.titulo;
  document.getElementById("modal-data").innerText = post.data;
  document.getElementById("modal-texto").innerText = post.conteudo;
  modal.classList.remove("oculto");
}

document.getElementById("fechar-modal").addEventListener("click", () => {
  modal.classList.add("oculto");
});

campoBusca.addEventListener("input", (evento) => {
  const termo = evento.target.value.toLowerCase();
  const filtrados = postagens.filter(post => 
    post.titulo.toLowerCase().includes(termo) || 
    post.resumo.toLowerCase().includes(termo)
  );
  renderizarPosts(filtrados);
});

// Inicializa a página
renderizarPosts(postagens);
