// ============================================
// MENSAGEM DO TÍTULO DE 2025
// ============================================

function mostrarMensagem() {

    alert(
        "🏆 TETRACAMPEÃO DA LIBERTADORES!\n\n" +
        "Flamengo 1 x 0 Palmeiras\n\n" +
        "📅 29 de novembro de 2025\n" +
        "📍 Lima, Peru\n\n" +
        "Com a conquista de 2025, o Flamengo chegou ao " +
        "quarto título da Copa Libertadores."
    );
}


// ============================================
// ANIMAÇÃO DOS EVENTOS
// ============================================

const eventos = document.querySelectorAll(".evento");

function verificarScroll() {

    eventos.forEach((evento) => {

        const posicao =
            evento.getBoundingClientRect().top;

        const alturaTela =
            window.innerHeight;

        if (posicao < alturaTela - 100) {

            evento.style.opacity = "1";
            evento.style.transform = "translateX(0)";

        }

    });
}


eventos.forEach((evento) => {

    evento.style.opacity = "0";

    evento.style.transform =
        "translateX(-30px)";

    evento.style.transition =
        "all 0.6s ease";

});


window.addEventListener(
    "scroll",
    verificarScroll
);

verificarScroll();


// ============================================
// MENSAGEM NO CONSOLE
// ============================================

console.log(
    "🔴⚫ Flamengo - 4x Campeão da Libertadores"
);

console.log(
    "Títulos: 1981, 2019, 2022 e 2025"
);
