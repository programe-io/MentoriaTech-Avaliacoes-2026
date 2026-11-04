
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Meu Blog!");
});

// Efeito de clique nos artigos
const artigos = document.querySelectorAll("article");

artigos.forEach(function(artigo) {
    artigo.addEventListener("click", function() {
        artigo.style.backgroundColor = "#eaf6ff";

        setTimeout(function() {
            artigo.style.backgroundColor = "white";
        }, 500);
    });
});

// Menu de navegação
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você clicou em: " + link.textContent);
    });
});

// Botão para voltar ao topo
const botao = document.createElement("button");

botao.textContent = "↑ Voltar ao topo";

botao.style.position = "fixed";
botao.style.bottom = "20px";
botao.style.right = "20px";
botao.style.padding = "12px";
botao.style.backgroundColor = "#3498db";
botao.style.color = "white";
botao.style.border = "none";
botao.style.borderRadius = "8px";
botao.style.cursor = "pointer";

document.body.appendChild(botao);

botao.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
