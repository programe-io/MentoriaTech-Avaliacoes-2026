
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("🌸 Bem-vinda à Encanto do Crochê! Conheça nossas peças feitas à mão com amor!");
});

// EFEITO NOS PRODUTOS
const produtos = document.querySelectorAll(".produto");

produtos.forEach(function(produto) {
    produto.addEventListener("mouseenter", function() {
        produto.style.transform = "scale(1.05)";
    });

    produto.addEventListener("mouseleave", function() {
        produto.style.transform = "scale(1)";
    });
});

// BOTÕES DE COMPRA
const botoes = document.querySelectorAll(".produto .botao");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function(event) {
        event.preventDefault();

        const produto = botao.closest(".produto");
        const nome = produto.querySelector("h3").textContent;
        const preco = produto.querySelector(".preco").textContent;

        const telefone = "5500000000000";

        const mensagem = `Olá! Gostaria de encomendar: ${nome}. Preço: ${preco}.`;

        const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

        window.open(link, "_blank");
    });
});

// ANIMAÇÃO AO ROLAR A PÁGINA
window.addEventListener("scroll", function() {
    produtos.forEach(function(produto) {
        const posicao = produto.getBoundingClientRect().top;

        if (posicao < window.innerHeight - 50) {
            produto.style.opacity = "1";
        }
    });
});
