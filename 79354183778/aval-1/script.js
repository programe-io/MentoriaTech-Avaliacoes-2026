
// Atualiza automaticamente o ano do rodapé.
document.getElementById("year").textContent =
  new Date().getFullYear();

// Seleciona o botão de voltar ao topo.
const topButton = document.getElementById("topButton");

// Mostra ou esconde o botão durante a rolagem.
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
});

// Volta suavemente para o início da página.
topButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Mensagem no console do navegador.
console.log("Bem-vindo ao Mundo do Vôlei! 🏐");