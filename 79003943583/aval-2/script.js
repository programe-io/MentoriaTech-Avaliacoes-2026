const formulario = document.querySelector("#form-publicacao");
const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");
const publicacoes = document.querySelector("#publicacoes");
const statusPublicacao = document.querySelector("#status");

mensagem.addEventListener("input", function () {
  contador.textContent = mensagem.value.length + "/280";
  mensagem.setCustomValidity("");
});

function criarPublicacao(texto, nome, data) {
  const artigo = document.createElement("article");
  artigo.className = "card";

  const cabecalho = document.createElement("div");
  cabecalho.className = "autor";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = nome.charAt(0);

  const autor = document.createElement("strong");
  autor.textContent = nome;

  cabecalho.append(avatar, autor);

  const horario = document.createElement("p");
  horario.className = "data";
  horario.textContent = data;

  const conteudo = document.createElement("p");
  conteudo.className = "texto-publicacao";

  // textContent exibe o texto sem executar HTML digitado.
  conteudo.textContent = texto;

  const botaoCurtir = document.createElement("button");
  botaoCurtir.type = "button";
  botaoCurtir.className = "curtir";
  botaoCurtir.setAttribute("aria-pressed", "false");
  botaoCurtir.textContent = "♡ Curtir · 0";

  botaoCurtir.addEventListener("click", function () {
    const curtido =
      botaoCurtir.getAttribute("aria-pressed") === "true";

    botaoCurtir.setAttribute("aria-pressed", String(!curtido));

    botaoCurtir.textContent = curtido
      ? "♡ Curtir · 0"
      : "♥ Curtido · 1";
  });

  artigo.append(cabecalho, horario, conteudo, botaoCurtir);

  // A publicação mais recente aparece primeiro.
  publicacoes.prepend(artigo);
}

criarPublicacao(
  "Bem-vindos ao meu Mini Feed! Estou praticando HTML, CSS e JavaScript.",
  "Ágatha",
  "Publicação de exemplo"
);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = mensagem.value.trim();

  if (!texto) {
    mensagem.setCustomValidity(
      "Escreva uma mensagem antes de publicar."
    );

    mensagem.reportValidity();
    return;
  }

  const data = new Date().toLocaleString("pt-BR");

  criarPublicacao(texto, "Ágatha", data);

  formulario.reset();
  contador.textContent = "0/280";

  statusPublicacao.textContent =
    "Mensagem publicada! As publicações reiniciam ao recarregar a página.";

  mensagem.focus();
});