/ Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Meu Blog!");
});

// Mostrar mensagem ao clicar no menu
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        alert("Você clicou em: " + link.textContent);
    });
});

// Alterar a cor do cabeçalho
const header = document.querySelector("header");

header.addEventListener("click", function() {
    header.style.backgroundColor = "#2c3e50";
});

// Adicionar data atual no rodapé
const footer = document.querySelector("footer");

const data = new Date().toLocaleDateString("pt-BR");

footer.innerHTML += "<p>Data atual: " + data + "</p>";