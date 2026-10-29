const conteudo = document.querySelector(".conteudo");

// Cria a caixa para escrever uma nova publicação
const formularioNovoPost = document.createElement("form");
formularioNovoPost.classList.add("criador-publicacao");

const titulo = document.createElement("h2");
titulo.textContent = "Compartilhe uma ideia";

const campoNovoPost = document.createElement("textarea");
campoNovoPost.placeholder = "O que você quer compartilhar?";
campoNovoPost.maxLength = 280;
campoNovoPost.required = true;

const botaoPublicar = document.createElement("button");
botaoPublicar.type = "submit";
botaoPublicar.textContent = "Publicar";

formularioNovoPost.append(titulo, campoNovoPost, botaoPublicar);
conteudo.insertBefore(formularioNovoPost, conteudo.firstElementChild);

// Prepara um botão de curtir e seu contador
function prepararCurtida(botao) {
  botao.type = "button";
  botao.dataset.curtido = "false";
  botao.dataset.total = "0";
  botao.setAttribute("aria-pressed", "false");
  botao.textContent = "";

  const texto = document.createElement("span");
  texto.classList.add("texto-curtir");
  texto.textContent = "♡ Curtir";

  const total = document.createElement("span");
  total.classList.add("contagem-curtidas");
  total.textContent = "0 curtidas";

  botao.append(texto, total);
}

document.querySelectorAll(".curtir").forEach(prepararCurtida);

// Faz os botões de curtir funcionarem
document.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".curtir");

  if (!botao) {
    return;
  }

  const curtiu = botao.dataset.curtido === "true";
  let total = Number(botao.dataset.total);

  if (curtiu) {
    total--;
    botao.dataset.curtido = "false";
    botao.classList.remove("curtido");
    botao.setAttribute("aria-pressed", "false");
    botao.querySelector(".texto-curtir").textContent = "♡ Curtir";
  } else {
    total++;
    botao.dataset.curtido = "true";
    botao.classList.add("curtido");
    botao.setAttribute("aria-pressed", "true");
    botao.querySelector(".texto-curtir").textContent = "♥ Curtido";
  }

  botao.dataset.total = total;
  botao.querySelector(".contagem-curtidas").textContent =
    total + (total === 1 ? " curtida" : " curtidas");
});

// Cria uma nova publicação
formularioNovoPost.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = campoNovoPost.value.trim();

  if (texto === "") {
    return;
  }

  const post = document.createElement("article");
  post.classList.add("publicacao");

  const autor = document.createElement("div");
  autor.classList.add("autor");

  const avatar = document.createElement("span");
  avatar.classList.add("avatar");
  avatar.textContent = "D";

  const nome = document.createElement("strong");
  nome.textContent = "Dallyson";

  autor.append(avatar, nome);

  const imagem = document.createElement("div");
  imagem.classList.add("foto", "foto-nova");
  imagem.textContent = "💬";

  const legenda = document.createElement("p");
  const nomeLegenda = document.createElement("strong");
  nomeLegenda.textContent = "Dallyson ";
  legenda.append(nomeLegenda, document.createTextNode(texto));

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  const botaoCurtir = document.createElement("button");
  botaoCurtir.classList.add("curtir");
  prepararCurtida(botaoCurtir);
  acoes.appendChild(botaoCurtir);

  const comentarios = document.createElement("div");
  comentarios.classList.add("comentarios");

  const formularioComentario = document.createElement("form");
  formularioComentario.classList.add("form-comentario");

  const campoComentario = document.createElement("input");
  campoComentario.placeholder = "Escreva um comentário...";
  campoComentario.required = true;

  const botaoComentario = document.createElement("button");
  botaoComentario.type = "submit";
  botaoComentario.textContent = "Enviar";

  formularioComentario.append(campoComentario, botaoComentario);
  post.append(autor, imagem, acoes, legenda, comentarios, formularioComentario);

  // Coloca a nova publicação no início do feed, logo depois dos stories
  const stories = conteudo.querySelector(".stories");
  stories.insertAdjacentElement("afterend", post);

  campoNovoPost.value = "";
});

// Permite adicionar comentários às publicações
document.addEventListener("submit", function (evento) {
  const formulario = evento.target;

  if (!formulario.matches(".form-comentario")) {
    return;
  }

  evento.preventDefault();

  const campo = formulario.querySelector("input");
  const texto = campo.value.trim();

  if (texto === "") {
    return;
  }

  const comentario = document.createElement("p");
  comentario.textContent = "Você: " + texto;

  formulario.parentElement
    .querySelector(".comentarios")
    .appendChild(comentario);

  campo.value = "";
});
