
// ========================================
// 1. ANIMAÇÕES AO ROLAR A PÁGINA
// ========================================

const elementos = document.querySelectorAll(
    ".card, .tecnologia-item, .sobre-conteudo, .curiosidade-box, .titulo"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("mostrar");
        }

    });

}, {
    threshold: 0.15
});

elementos.forEach(elemento => {

    elemento.classList.add("revelar");
    observador.observe(elemento);

});


// ========================================
// 2. MENU COM ROLAGEM SUAVE
// ========================================

const links = document.querySelectorAll("nav a");

links.forEach(link => {

    link.addEventListener("click", function(event) {

        const destino = document.querySelector(
            this.getAttribute("href")
        );

        if (destino) {

            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ========================================
// 3. EFEITO INTERATIVO NOS CARDS
// ========================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.03)";

        card.style.boxShadow =
            "0 10px 35px rgba(0, 217, 255, 0.25)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

        card.style.boxShadow = "";

    });

});


// ========================================
// 4. ROBÔ INTERATIVO
// ========================================

const robo = document.querySelector(".robot");

if (robo) {

    robo.style.cursor = "pointer";

    robo.addEventListener("click", () => {

        robo.textContent = "🤖";

        robo.animate([
            {
                transform: "rotate(0deg) scale(1)"
            },
            {
                transform: "rotate(15deg) scale(1.2)"
            },
            {
                transform: "rotate(-15deg) scale(1.2)"
            },
            {
                transform: "rotate(0deg) scale(1)"
            }
        ], {
            duration: 700,
            easing: "ease-in-out"
        });

    });

}


// ========================================
// 5. EFEITO NOS BOTÕES
// ========================================

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("mouseenter", () => {

        botao.style.boxShadow =
            "0 0 30px rgba(0, 217, 255, 0.8)";

    });

    botao.addEventListener("mouseleave", () => {

        botao.style.boxShadow = "";

    });

});


// ========================================
// 6. EFEITO DE MOVIMENTO DO MOUSE
// ========================================

document.addEventListener("mousemove", (evento) => {

    if (!robo || window.innerWidth < 768) return;

    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight / 2;

    const movimentoX = (evento.clientX - centroX) / 60;
    const movimentoY = (evento.clientY - centroY) / 60;

    robo.style.translate =
        `${movimentoX}px ${movimentoY}px`;

});


// ========================================
// 7. ANO AUTOMÁTICO NO RODAPÉ
// ========================================

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} ROBOTICS - Todos os direitos reservados.`;

}


// ========================================
// 8. EFEITO DE DIGITAÇÃO
// ========================================

const subtitulo = document.querySelector(".subtitle");

if (subtitulo) {

    const mensagem = "O FUTURO COMEÇA AGORA";

    let indice = 0;

    subtitulo.textContent = "";

    function digitar() {

        if (indice < mensagem.length) {

            subtitulo.textContent += mensagem.charAt(indice);

            indice++;

            setTimeout(digitar, 75);

        }

    }

    digitar();

}


// ========================================
// 9. ANIMAÇÃO DE ENTRADA
// ========================================

const estilo = document.createElement("style");

estilo.textContent = `

.revelar {
    opacity: 0;
    transform: translateY(35px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.revelar.mostrar {
    opacity: 1;
    transform: translateY(0);
}

`;

document.head.appendChild(estilo);


// ========================================
// 10. MENSAGEM NO CONSOLE
// ========================================

console.log("🤖 ROBOTICS iniciado com sucesso!");
console.log("⚡ Sistema tecnológico carregado!");
console.log("🚀 Bem-vindo ao mundo da robótica!");

