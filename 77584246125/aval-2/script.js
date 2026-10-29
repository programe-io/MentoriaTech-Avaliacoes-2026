const formulario = document.querySelector("#post-form");
const campoTexto = document.querySelector("#texto-post");
const listaPosts = document.querySelector("#lista-posts");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = campoTexto.value.trim();

  if (texto === "") {
    return;
  }

  const post = document.createElement("article");
  post.classList.add("post");

  const cabecalho = document.createElement("div");
  cabecalho.classList.add("post-cabecalho");

  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.textContent = "D";

  const usuario = document.createElement("div");

  const nome = document.createElement("strong");
  nome.textContent = "Dallyson";

  const data = document.createElement("span");
  data.classList.add("data");
  data.textContent = new Date().toLocaleString("pt-BR");

  usuario.append(nome, data);
  cabecalho.append(avatar, usuario);

  const mensagem = document.createElement("p");
  mensagem.classList.add("mensagem");
  mensagem.textContent = texto;

  const botaoCurtir = document.createElement("button");
  botaoCurtir.classList.add("botao-curtir");
  botaoCurtir.type = "button";
  botaoCurtir.setAttribute("aria-pressed", "false");

  const textoCurtir = document.createElement("span");
  textoCurtir.classList.add("texto-curtir");
  textoCurtir.textContent = "♡ Curtir";

  const curtidas = document.createElement("span");
  curtidas.classList.add("contagem-curtidas");
  curtidas.textContent = "0";

  botaoCurtir.append(textoCurtir, " ", curtidas);
  post.append(cabecalho, mensagem, botaoCurtir);
  listaPosts.prepend(post);

  campoTexto.value = "";
});

listaPosts.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".botao-curtir");

  if (!botao) {
    return;
  }

  const contador = botao.querySelector(".contagem-curtidas");
  const textoBotao = botao.querySelector(".texto-curtir");
  const jaCurtiu = botao.getAttribute("aria-pressed") === "true";

  let total = Number(contador.textContent);

  if (jaCurtiu) {
    total = total - 1;
    textoBotao.textContent = "♡ Curtir";
    botao.classList.remove("curtido");
    botao.setAttribute("aria-pressed", "false");
  } else {
    total = total + 1;
    textoBotao.textContent = "♥ Curtido";
    botao.classList.add("curtido");
    botao.setAttribute("aria-pressed", "true");
  }

  contador.textContent = total;
});
