const formulario = document.querySelector("#formulario");
const mensagem = document.querySelector("#mensagem");
const contador = document.querySelector("#contador");
const feed = document.querySelector("#feed");
const aviso = document.querySelector("#status");

mensagem.addEventListener("input", function () {
  contador.textContent = mensagem.value.length + "/280";
  mensagem.setCustomValidity("");
});

function publicar(texto, data) {
  const artigo = document.createElement("article");
  artigo.className = "card";

  const cabecalho = document.createElement("div");
  cabecalho.className = "autor";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = "AL";

  const nome = document.createElement("strong");
  nome.textContent = "Allan Lucas";

  cabecalho.append(avatar, nome);

  const horario = document.createElement("p");
  horario.className = "data";
  horario.textContent = data;

  const conteudo = document.createElement("p");
  conteudo.className = "texto";
  conteudo.textContent = texto;

  const curtir = document.createElement("button");
  curtir.type = "button";
  curtir.className = "curtir";
  curtir.setAttribute("aria-pressed", "false");
  curtir.textContent = "♡ Curtir · 0";

  curtir.addEventListener("click", function () {
    const ativo = curtir.getAttribute("aria-pressed") !== "true";

    curtir.setAttribute("aria-pressed", String(ativo));
    curtir.textContent = ativo ? "💚 Curtido · 1" : "♡ Curtir · 0";
  });

  artigo.append(cabecalho, horario, conteudo, curtir);
  feed.prepend(artigo);
}

publicar(
  "Meu Mini Feed entrou em campo! Projeto com HTML, CSS e JavaScript. Avanti, Palestra! 💚⚽",
  "Publicação de exemplo"
);

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = mensagem.value.trim();

  if (!texto) {
    mensagem.setCustomValidity("Escreva uma mensagem.");
    mensagem.reportValidity();
    return;
  }

  publicar(texto, new Date().toLocaleString("pt-BR"));

  formulario.reset();
  contador.textContent = "0/280";
  aviso.textContent =
    "Publicado! As mensagens desta demonstração reiniciam ao recarregar.";

  mensagem.focus();
});