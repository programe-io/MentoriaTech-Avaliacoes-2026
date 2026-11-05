
// EFEITO DE BOAS-VINDAS
window.addEventListener("load", function() {
    alert("Olá! Seja bem-vindo à página pessoal do Heitor! 💙");
});

// ANIMAÇÃO DE ENTRADA
const principal = document.querySelector(".principal");

window.addEventListener("load", function() {
    principal.style.opacity = "0";
    principal.style.transform = "translateY(30px)";

    setTimeout(function() {
        principal.style.transition = "1s";
        principal.style.opacity = "1";
        principal.style.transform = "translateY(0)";
    }, 200);
});

// EFEITO NOS CARDS
const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {
    card.addEventListener("click", function() {
        card.style.transform = "scale(1.05)";

        setTimeout(function() {
            card.style.transform = "scale(1)";
        }, 300);
    });
});

// MENSAGEM NO RODAPÉ
const footer = document.querySelector("footer");

footer.addEventListener("click", function() {
    alert("Obrigado por visitar meu site! - Heitor 💙");
});

// ANO AUTOMÁTICO
const ano = new Date().getFullYear();

footer.innerHTML = `
    <p>© ${ano} | Feito por Heitor 💙</p>
    <p>Explorando o mundo e criando novas histórias.</p>
`;
