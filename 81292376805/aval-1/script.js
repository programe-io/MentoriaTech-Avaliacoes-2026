
// MENU E NAVEGAÇÃO
console.log("Bem-vindo à Yan Celulares!");

// ANIMAÇÃO DOS PRODUTOS
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("click", () => {
        console.log("Produto selecionado!");
    });
});

// BOTÃO DE WHATSAPP
function comprar(produto) {
    const numero = "5500000000000";

    const mensagem = `Olá! Tenho interesse no ${produto}. Gostaria de saber o preço!`;

    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}

// ANO AUTOMÁTICO NO RODAPÉ
const ano = document.querySelector("#ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}

// MENSAGEM DE BOAS-VINDAS
console.log("Sua loja online está pronta!");
