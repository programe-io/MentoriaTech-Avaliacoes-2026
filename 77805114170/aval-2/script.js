const formulario = document.querySelector("#formulario");
const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");
const feed = document.querySelector("#feed");
const aviso = document.querySelector("#status");

mensagem.addEventListener("input", function () {
  contador.textContent = mensagem.value.length + "/280";
  mensagem.setCustomValidity("");
});

function criarPublicacao(texto, data) {
  const artigo = document.createElement("article");
  artigo.className = "card";

  const cabecalho = document.createElement("div");
  cabecalho.className = "autor";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = "AC";

  const nome = document.createElement("strong");
  nome.textContent = "Ana Clara";

  cabecalho.append(avatar, nome);

  const horario = document.createElement("p");
  horario.className = "data";
  horario.textContent = data;

  const conteudo = document.createElement("p");
  conteudo.className = "texto";

  // Exibe a mensagem como texto, sem executar HTML.
  conteudo.textContent = texto;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "curtir";
  botao.setAttribute("aria-pressed", "false");
  botao.textContent = "♡ Curtir · 0";

  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));
    botao.textContent = ativo ? "♥ Curtido · 1" : "♡ Curtir · 0";
  });

  artigo.append(cabecalho, horario, conteudo, botao);
  feed.prepend(artigo);
}

criarPublicacao(
  "Bem-vindos ao Conecta Clara! Este é meu projeto de Mini Feed com HTML, CSS e JavaScript. ✦",
  "Publicação de exemplo"
);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = mensagem.value.trim();

  if (!texto) {
    mensagem.setCustomValidity("Escreva uma mensagem antes de publicar.");
    mensagem.reportValidity();
    return;
  }

  criarPublicacao(texto, new Date().toLocaleString("pt-BR"));

  formulario.reset();
  contador.textContent = "0/280";

  aviso.textContent =
    "Publicado! As mensagens desta demonstração reiniciam ao recarregar.";

  mensagem.focus();
});