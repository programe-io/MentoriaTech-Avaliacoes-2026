// Mensagem de boas-vindas quando a página carregar
window.onload = function() {
    alert("Bem-vindo ao Blog da Maely! 💙");
};
// Efeito ao clicar nos links do menu
const links = document.querySelectorAll("nav a");
links.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você acessou: " + link.textContent);
    });
});
// Mensagem no console
console.log("Blog da Maely carregado com sucesso!");