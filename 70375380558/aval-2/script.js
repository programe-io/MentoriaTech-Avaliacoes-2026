
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("🌸 Bem-vinda à Encanto do Crochê! Conheça nossas peças feitas com amor!");
});

// BOTÃO DE ENCOMENDAS
const botao = document.querySelector(".propaganda a");

botao.addEventListener("click", function() {
    alert("💕 Obrigada pelo interesse! Vamos preparar sua encomenda!");
});

// EFEITO NA LISTA DE PRODUTOS
const produtos = document.querySelectorAll(".propaganda li");

produtos.forEach(function(produto) {
    produto.addEventListener("mouseenter", function() {
        produto.style.color = "#c6537e";
        produto.style.transform = "scale(1.05)";
    });

    produto.addEventListener("mouseleave", function() {
        produto.style.color = "#663f4b";
        produto.style.transform = "scale(1)";
    });
});

// ANO AUTOMÁTICO NO RODAPÉ
const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.textContent =
        "Encanto do Crochê © " + new Date().getFullYear();
}
