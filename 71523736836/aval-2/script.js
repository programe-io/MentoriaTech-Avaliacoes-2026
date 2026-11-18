// 1. Seleciona o título principal (h1) da página
const titulo = document.querySelector("h1");

// Muda a cor do texto do título quando você clica nele
titulo.addEventListener("click", function() {
  titulo.style.color = "#f1c40f"; // Amarelo
  titulo.textContent = "Você clicou no título!";
});

// 2. Seleciona todos os links dentro do menu (nav)
const links = document.querySelectorAll("nav a");

// Adiciona um alerta ao clicar em qualquer um dos links
links.forEach(function(link) {
  link.addEventListener("click", function(evento) {
    evento.preventDefault(); // Evita que a página tente pular de seção
    alert("Você clicou em: " + link.textContent);
  });
});