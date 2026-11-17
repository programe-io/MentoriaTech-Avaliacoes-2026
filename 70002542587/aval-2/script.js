// FUNÇÃO DO BOTÃO
function mostrarMensagem() {
    document.getElementById("mensagem").innerText =
        "Parabéns! Você interagiu com o projeto!";
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Projeto carregado com sucesso!");
});

// EFEITO NO MENU
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você clicou em: " + link.innerText);
    });
});

// ANO AUTOMÁTICO NO RODAPÉ
const ano = new Date().getFullYear();

console.log("Ano atual: " + ano);