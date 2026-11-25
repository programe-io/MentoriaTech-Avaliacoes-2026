// Carrossel de ilustrações.
const slides = document.querySelectorAll(".slide");
let indice = 0;

function mostrarSlide(novoIndice) {
  indice = (novoIndice + slides.length) % slides.length;

  slides.forEach(function (slide, posicao) {
    slide.hidden = posicao !== indice;
  });

  document.querySelector("#posicao").textContent =
    (indice + 1) + " / " + slides.length;
}

document.querySelector("#anterior").addEventListener("click", function () {
  mostrarSlide(indice - 1);
});

document.querySelector("#proxima").addEventListener("click", function () {
  mostrarSlide(indice + 1);
});

// Curtidas.
const curtir = document.querySelector("#curtir");

curtir.addEventListener("click", function () {
  const ativo = curtir.getAttribute("aria-pressed") !== "true";

  curtir.setAttribute("aria-pressed", String(ativo));
  curtir.textContent = ativo ? "♥ Curtido" : "♡ Curtir";

  document.querySelector("#curtidas").textContent =
    (ativo ? 22 : 21) + " curtidas";
});

// Salvar publicação.
const salvar = document.querySelector("#salvar");

salvar.addEventListener("click", function () {
  const ativo = salvar.getAttribute("aria-pressed") !== "true";

  salvar.setAttribute("aria-pressed", String(ativo));
  salvar.textContent = ativo ? "✓ Salvo" : "Salvar";
});

// Seguir sugestões.
document.querySelectorAll(".seguir").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const ativo = botao.getAttribute("aria-pressed") !== "true";

    botao.setAttribute("aria-pressed", String(ativo));
    botao.textContent = ativo ? "Seguindo" : "Seguir";
  });
});

// Comentários.
const campo = document.querySelector("#comentario");
const formulario = document.querySelector("#form-comentario");

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

  nome.textContent = "andressa.ribeiro ";
  item.append(nome, document.createTextNode(texto));

  document.querySelector("#comentarios").append(item);

  formulario.reset();
  campo.focus();
});

// Busca.
document.querySelector("#busca").addEventListener("input", function (evento) {
  const termo = evento.target.value.toLowerCase().trim();
  const post = document.querySelector("#post");
  const encontrou = post.textContent.toLowerCase().includes(termo);

  post.hidden = !encontrou;
  document.querySelector("#vazio").hidden = encontrou;
});