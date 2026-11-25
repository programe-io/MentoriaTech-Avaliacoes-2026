const feed = document.querySelector("#feed");
const formulario = document.querySelector("#formulario");
const mensagem = document.querySelector("#mensagem");
const categoria = document.querySelector("#categoria");
const contador = document.querySelector("#contador");

function atualizarTotal() {
  const quantidade = feed.children.length;

  document.querySelector("#total").textContent =
    quantidade + (quantidade === 1
      ? " publicação"
      : " publicações");
}

function criarPost(nome, texto, tipo, proprio, likes = 0) {
  const post = document.createElement("article");
  post.className = "card";

  post.innerHTML = `
    <div class="autor">
      <div class="perfil"></div>
      <div>
        <strong class="nome"></strong>
        <span class="post-info">GameZone • Agora</span>
      </div>
    </div>

    <span class="categoria"></span>

    <p class="post-texto"></p>

    <div class="acoes">
      <button class="curtir">♡ Curtir</button>
      <button class="comentar">💬 Comentar</button>
    </div>

    <div class="comentarios"></div>

    <form class="comentario-form" hidden>
      <input placeholder="Escreva um comentário..."
             maxlength="150" required>
      <button type="submit">Enviar</button>
    </form>
  `;

  post.querySelector(".perfil").textContent =
    nome.split(" ").map(p => p[0]).slice(0, 2).join("");

  post.querySelector(".nome").textContent = nome;
  post.querySelector(".categoria").textContent = tipo;
  post.querySelector(".post-texto").textContent = texto;

  const curtir = post.querySelector(".curtir");
  let curtido = false;

  curtir.textContent = "♡ Curtir " + likes;

  curtir.addEventListener("click", () => {
    curtido = !curtido;

    curtir.classList.toggle("ativo", curtido);

    curtir.textContent = curtido
      ? "♥ Curtido " + (likes + 1)
      : "♡ Curtir " + likes;
  });

  const formComentario =
    post.querySelector(".comentario-form");

  formComentario.style.display = "none";

  post.querySelector(".comentar").onclick = () => {
    formComentario.hidden = false;
    formComentario.style.display = "flex";
    formComentario.querySelector("input").focus();
  };

  formComentario.addEventListener("submit", evento => {
    evento.preventDefault();

    const campo = formComentario.querySelector("input");
    const texto = campo.value.trim();

    if (!texto) return;

    const comentario = document.createElement("p");

    comentario.textContent = "Antonio Pedro: " + texto;

    post.querySelector(".comentarios").appendChild(comentario);

    formComentario.reset();
  });

  if (proprio) {
    const excluir = document.createElement("button");

    excluir.textContent = "Excluir";

    excluir.onclick = () => {
      post.remove();
      atualizarTotal();
    };

    post.querySelector(".acoes").appendChild(excluir);
  }

  feed.prepend(post);
  atualizarTotal();
}

mensagem.addEventListener("input", () => {
  contador.textContent = mensagem.value.length + "/280";
});

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const texto = mensagem.value.trim();

  if (!texto) return;

  criarPost(
    "Antonio Pedro",
    texto,
    categoria.value,
    true
  );

  formulario.reset();
  contador.textContent = "0/280";
});

criarPost(
  "Comunidade GameZone",
  "Qual jogo você recomendaria para alguém que está começando a jogar?",
  "Games",
  false,
  12
);

criarPost(
  "Antonio Pedro",
  "Aprender programação também é uma maneira de entender como os jogos são desenvolvidos. Bem-vindos à GameZone!",
  "Tecnologia",
  false,
  8
);

criarPost(
  "GameZone Dicas",
  "Uma boa dica para melhorar nos jogos é praticar com frequência e aprender com os próprios erros.",
  "Dicas",
  false,
  15
);