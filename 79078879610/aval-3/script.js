const curtir = document.querySelector("#curtir");
const salvar = document.querySelector("#salvar");
const campo = document.querySelector("#texto-comentario");
const formulario = document.querySelector("#form-comentario");
const post = document.querySelector("#post");

curtir.addEventListener("click", function () {
  const ativo = curtir.getAttribute("aria-pressed") !== "true";

  curtir.setAttribute("aria-pressed", String(ativo));
  curtir.textContent = ativo ? "♥ Curtido" : "♡ Curtir";

  document.querySelector("#curtidas").textContent =
    (ativo ? 33 : 32) + " curtidas";
});

salvar.addEventListener("click", function () {
  const ativo = salvar.getAttribute("aria-pressed") !== "true";

  salvar.setAttribute("aria-pressed", String(ativo));
  salvar.textContent = ativo ? "✓ Salvo" : "Salvar";
});

document.querySelector("#comentar").addEventListener("click", function () {
  campo.focus();
});

campo.addEventListener("input", function () {
  campo.setCustomValidity("");
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const texto = campo.value.trim();

  if (!texto) {
    campo.setCustomValidity("Escreva um comentário.");
    campo.reportValidity();
    return;
  }

  const item = document.createElement("li");
  const nome = document.createElement("strong");

  nome.textContent = "ana.carolina ";
  item.append(nome, document.createTextNode(texto));

  document.querySelector("#comentarios").append(item);

  formulario.reset();
  campo.focus();
});

document.querySelectorAll(".seguir").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));
    botao.textContent = ativo ? "Seguindo" : "Seguir";
  });
});

document.querySelector("#busca").addEventListener("input", function (evento) {
  const termo = evento.target.value.toLowerCase().trim();
  const encontrou = post.textContent.toLowerCase().includes(termo);

  post.hidden = !encontrou;
  document.querySelector("#vazio").hidden = encontrou;
});