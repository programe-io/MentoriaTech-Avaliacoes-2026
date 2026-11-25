const feed = document.querySelector("#feed");
const formulario = document.querySelector("#formulario");
const mensagem = document.querySelector("#mensagem");
const categoria = document.querySelector("#categoria");

let filtroAtual = "Todos";

function atualizarFeed() {
  let total = 0;

  document.querySelectorAll(".post").forEach(post => {
    const mostrar =
      filtroAtual === "Todos" ||
      post.dataset.categoria === filtroAtual;

    post.hidden = !mostrar;

    if (mostrar) total++;
  });

  document.querySelector("#quantidade").textContent =
    total + " posts";

  document.querySelector("#vazio").hidden = total > 0;
}

function criarPublicacao(nome, texto, tipo, proprio) {

  const post = document.createElement("article");

  post.className = "post";
  post.dataset.categoria = tipo;

  post.innerHTML = `
    <div class="usuario">
      <div class="avatar"></div>

      <div>
        <strong class="nome"></strong>
        <small>Comunidade Arena Sports</small>
      </div>
    </div>

    <span class="etiqueta"></span>

    <p class="mensagem"></p>

    <div class="acoes">
      <button class="curtir">👍 0</button>
      <button class="fogo">🔥 0</button>
      <button class="trofeu">🏆 0</button>
    </div>
  `;

  post.querySelector(".avatar").textContent =
    nome.split(" ").map(p => p[0]).slice(0, 2).join("");

  post.querySelector(".nome").textContent = nome;

  post.querySelector(".etiqueta").textContent = tipo;

  post.querySelector(".mensagem").textContent = texto;

  const reacoes = [
    { classe: ".curtir", emoji: "👍" },
    { classe: ".fogo", emoji: "🔥" },
    { classe: ".trofeu", emoji: "🏆" }
  ];

  reacoes.forEach(reacao => {

    const botao = post.querySelector(reacao.classe);

    let ativo = false;

    botao.addEventListener("click", () => {

      ativo = !ativo;

      botao.textContent =
        reacao.emoji + " " + (ativo ? 1 : 0);

      botao.classList.toggle("reagido", ativo);

    });

  });

  if (proprio) {
    const excluir = document.createElement("button");

    excluir.className = "excluir";
    excluir.textContent = "Excluir";

    excluir.onclick = () => {
      post.remove();
      atualizarFeed();
    };

    post.querySelector(".acoes").append(excluir);
  }

  feed.prepend(post);

  atualizarFeed();
}

mensagem.addEventListener("input", () => {
  document.querySelector("#contador").textContent =
    mensagem.value.length + "/250";
});

formulario.addEventListener("submit", evento => {

  evento.preventDefault();

  const texto = mensagem.value.trim();

  if (!texto) return;

  filtroAtual = "Todos";

  document.querySelectorAll(".filtros button").forEach(botao => {
    botao.classList.toggle(
      "ativo",
      botao.dataset.filtro === "Todos"
    );
  });

  criarPublicacao(
    "Arthur Garcia",
    texto,
    categoria.value,
    true
  );

  formulario.reset();

  document.querySelector("#contador").textContent = "0/250";

});

document.querySelectorAll(".filtros button").forEach(botao => {

  botao.onclick = () => {

    filtroAtual = botao.dataset.filtro;

    document.querySelectorAll(".filtros button").forEach(item => {
      item.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    atualizarFeed();

  };

});

criarPublicacao(
  "Arena News",
  "O futebol é um dos esportes mais populares do mundo. Qual é o seu time favorito?",
  "Futebol",
  false
);

criarPublicacao(
  "Arthur Garcia",
  "A prática de esportes ajuda a desenvolver disciplina, concentração e trabalho em equipe.",
  "Outros",
  false
);

criarPublicacao(
  "Basket Brasil",
  "Treinar os fundamentos é essencial para melhorar os arremessos no basquete.",
  "Basquete",
  false
);

criarPublicacao(
  "Arena Vôlei",
  "Comunicação e posicionamento fazem toda a diferença durante uma partida.",
  "Vôlei",
  false
);