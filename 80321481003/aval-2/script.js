// Postagens iniciais para o feed já começar preenchido
let posts = [
  {
    id: 1,
    autor: "Mariana Silva",
    iniciais: "MS",
    tempo: "Há 15 minutos",
    texto: "Acabei de finalizar meu projeto de front-end! Muito feliz com o resultado.",
    curtidas: 4,
    curtidoPorMim: false,
    comentarios: ["Parabéns, Mari! Ficou incrível!"]
  },
  {
    id: 2,
    autor: "Lucas Oliveira",
    iniciais: "LO",
    tempo: "Há 1 hora",
    texto: "Alguém tem dicas de bons livros sobre JavaScript moderno?",
    curtidas: 2,
    curtidoPorMim: false,
    comentarios: []
  }
];

const listaPostsEl = document.getElementById("lista-posts");
const textoPostEl = document.getElementById("texto-post");
const btnPublicarEl = document.getElementById("btn-publicar");

// Função para renderizar todos os posts na tela
function renderizarFeed() {
  listaPostsEl.innerHTML = "";

  posts.forEach((post) => {
    const postDiv = document.createElement("article");
    postDiv.classList.add("post");

    const classeCurtido = post.curtidoPorMim ? "curtido" : "";
    const iconeCoracao = post.curtidoPorMim ? "❤️" : "🤍";

    // Monta a lista de comentários
    const comentariosHTML = post.comentarios
      .map((c) => `<li><strong>Você:</strong> ${c}</li>`)
      .join("");

    postDiv.innerHTML = `
      <div class="post-cabecalho">
        <div class="avatar">${post.iniciais}</div>
        <div class="autor-info">
          <h3>${post.autor}</h3>
          <span>${post.tempo}</span>
        </div>
      </div>
      <p class="post-conteudo">${post.texto}</p>
      <div class="post-rodape">
        <button class="btn-acao ${classeCurtido}" onclick="alternarCurtida(${post.id})">
          ${iconeCoracao} Curtir (${post.curtidas})
        </button>
      </div>
      <div class="comentarios-box">
        <ul class="lista-comentarios">${comentariosHTML}</ul>
        <form class="form-comentario" onsubmit="adicionarComentario(event, ${post.id})">
          <input type="text" placeholder="Escreva um comentário..." required />
          <button type="submit">Enviar</button>
        </form>
      </div>
    `;

    listaPostsEl.appendChild(postDiv);
  });
}

// Adicionar nova postagem
btnPublicarEl.addEventListener("click", () => {
  const texto = textoPostEl.value.trim();
  if (texto === "") {
    alert("Escreva algo antes de publicar!");
    return;
  }

  const novoPost = {
    id: Date.now(),
    autor: "Usuário Atual",
    iniciais: "UA",
    tempo: "Agora mesmo",
    texto: texto,
    curtidas: 0,
    curtidoPorMim: false,
    comentarios: []
  };

  posts.unshift(novoPost); // Adiciona no topo do feed
  textoPostEl.value = "";
  renderizarFeed();
});

// Curtir ou descurtir
window.alternarCurtida = function (id) {
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.curtidoPorMim = !post.curtidoPorMim;
    post.curtidas += post.curtidoPorMim ? 1 : -1;
    renderizarFeed();
  }
};

// Adicionar comentário
window.adicionarComentario = function (event, id) {
  event.preventDefault();
  const input = event.target.querySelector("input");
  const textoComentario = input.value.trim();

  if (textoComentario !== "") {
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.comentarios.push(textoComentario);
      renderizarFeed();
    }
  }
};

// Inicializa o feed ao carregar
renderizarFeed();