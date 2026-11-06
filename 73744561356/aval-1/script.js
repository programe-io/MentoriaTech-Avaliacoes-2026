// Mensagem de boas-vindas
window.onload = function() {
    console.log("Bem-vindo ao Meu Blog!");
};

// Interação com o menu
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function(event) {
        if (link.getAttribute("href") === "#") {
            event.preventDefault();
            alert("Página em construção!");
        }
    });
});

// Data atual no console
const data = new Date();

console.log("Data atual: " + data.toLocaleDateString("pt-BR"));