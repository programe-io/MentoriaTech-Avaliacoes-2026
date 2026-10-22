
const form = document.getElementById("post-form");
const postInput = document.getElementById("post-input");
const feed = document.getElementById("feed");

// Criar uma nova publicação
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = postInput.value.trim();

  if (texto === "") {
    return;
  }

  const post = document.createElement("article");
  post.className = "card post";

  const cabecalho = document.createElement("div");
  cabecalho.className = "post-header";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "V";

  const usuario = document.createElement("div");
  const nome = document.createElement("strong");
  nome.textContent = "Visitante";

  const tempo = document.createElement("span");
  tempo.textContent = "Agora";

  usuario.append(nome, tempo);
  cabecalho.append(avatar, usuario);

  const paragrafo = document.createElement("p");
  paragrafo.className = "post-text";
  paragrafo.textContent = texto;

  const acoes = document.createElement("div");
  acoes.className = "post-actions";

  const curtir = document.createElement("button");
  curtir.type = "button";
  curtir.className = "like-button";
  curtir.innerHTML = "♡ Curtir <span>0</span>";

  const comentar = document.createElement("button");
  comentar.type = "button";
  comentar.className = "comment-button";
  comentar.textContent = "Comentar";

  const comentarios = document.createElement("div");
  comentarios.className = "comments";

  acoes.append(curtir, comentar);
  post.append(cabecalho, paragrafo, acoes, comentarios);
  feed.prepend(post);

  postInput.value = "";
});

// Curtir publicações
feed.addEventListener("click", function (event) {
  const botao = event.target.closest(".like-button");

  if (!botao) {
    return;
  }

  const contador = botao.querySelector("span");
  let quantidade = Number(contador.textContent);

  if (botao.classList.contains("liked")) {
    quantidade--;
    botao.classList.remove("liked");
    botao.innerHTML = `♡ Curtir <span>${quantidade}</span>`;
  } else {
    quantidade++;
    botao.classList.add("liked");
    botao.innerHTML = `♥ Curtido <span>${quantidade}</span>`;
  }
});

// Abrir o campo de comentário
feed.addEventListener("click", function (event) {
  const botao = event.target.closest(".comment-button");

  if (!botao) {
    return;
  }

  const post = botao.closest(".post");
  const areaComentarios = post.querySelector(".comments");

  if (areaComentarios.querySelector(".comment-form")) {
    return;
  }

  const formulario = document.createElement("form");
  formulario.className = "comment-form";

  const campo = document.createElement("input");
  campo.type = "text";
  campo.placeholder = "Escreva um comentário...";
  campo.required = true;

  const enviar = document.createElement("button");
  enviar.type = "submit";
  enviar.textContent = "Enviar";

  formulario.append(campo, enviar);
  areaComentarios.append(formulario);
  campo.focus();
});

// Enviar comentários
feed.addEventListener("submit", function (event) {
  if (!event.target.matches(".comment-form")) {
    return;
  }

  event.preventDefault();

  const formulario = event.target;
  const campo = formulario.querySelector("input");
  const texto = campo.value.trim();

  if (texto === "") {
    return;
  }

  const comentario = document.createElement("div");
  comentario.className = "comment-item";

  const nome = document.createElement("strong");
  nome.textContent = "Visitante: ";

  const mensagem = document.createElement("span");
  mensagem.textContent = texto;

  comentario.append(nome, mensagem);
  formulario.before(comentario);
  formulario.remove();
});
