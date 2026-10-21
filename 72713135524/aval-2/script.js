// =====================================
// MINHA GALERIA F0FA 💜💙
// =====================================

// Mensagem de boas-vindas
window.addEventListener("DOMContentLoaded", function () {
    console.log("Bem-vindo à Minha Galeria F0fa!");

    // Atualiza o ano no rodapé
    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    // Interação com os cartões
    const cartoes = document.querySelectorAll(".card");

    cartoes.forEach(function (cartao) {
        cartao.addEventListener("click", function () {
            cartao.classList.toggle("selecionado");
        });
    });
});