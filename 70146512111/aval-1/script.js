// ================================
// MODO ESCURO
// ================================

const modoBtn = document.getElementById("modoBtn");

modoBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        modoBtn.textContent = "☀️ Modo claro";
    } else {
        modoBtn.textContent = "🌙 Modo escuro";
    }

});


// ================================
// MODAL DOS JOGOS
// ================================

const botoesLer = document.querySelectorAll(".lerBtn");

const modal = document.getElementById("modal");

const modalTitulo =
    document.getElementById("modalTitulo");

const fecharModal =
    document.getElementById("fecharModal");

const okBtn =
    document.getElementById("okBtn");


botoesLer.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const titulo = botao.getAttribute("data-titulo");

        modalTitulo.textContent = titulo;

        modal.style.display = "flex";

    });

});


// Fechar modal pelo X

fecharModal.addEventListener("click", function () {

    modal.style.display = "none";

});


// Fechar pelo botão Voltar

okBtn.addEventListener("click", function () {

    modal.style.display = "none";

});


// Fechar clicando fora da caixa

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.style.display = "none";
    }

});


// ================================
// MENSAGEM AO CARREGAR
// ================================

console.log(
    "GameZone carregado! Desenvolvido por Kailane."
);
