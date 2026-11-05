
// =====================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// =====================================

function revelarElementos() {
    const elementos = document.querySelectorAll(".reveal");

    elementos.forEach(elemento => {
        const posicao = elemento.getBoundingClientRect().top;

        if (posicao < window.innerHeight - 80) {
            elemento.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revelarElementos);
window.addEventListener("load", revelarElementos);


// =====================================
// MENU DE NAVEGAÇÃO
// =====================================

const linksMenu = document.querySelectorAll("nav a");

linksMenu.forEach(link => {
    link.addEventListener("click", function(event) {
        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {
            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


// =====================================
// EFEITO NOS CARDS
// =====================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
    });

});


// =====================================
// EFEITO DE MOVIMENTO NO BOTÃO
// =====================================

const botoes = document.querySelectorAll(".btn");

botoes.forEach(botao => {

    botao.addEventListener("mouseenter", () => {
        botao.style.boxShadow = "0 0 25px #00c8ff80";
    });

    botao.addEventListener("mouseleave", () => {
        botao.style.boxShadow = "none";
    });

});


// =====================================
// ANIMAÇÃO DA IMAGEM
// =====================================

const imagem = document.querySelector(".about-image");

if (imagem) {

    imagem.addEventListener("click", () => {
        imagem.classList.toggle("imagem-ampliada");
    });

}


// =====================================
// ANIMAÇÃO DOS NÚMEROS E ESTATÍSTICAS
// =====================================

const estatisticas = document.querySelectorAll(".stat");

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {
            entrada.target.style.transition = "0.7s";
            entrada.target.style.transform = "scale(1.08)";
            entrada.target.style.opacity = "1";
        } else {
            entrada.target.style.transform = "scale(1)";
        }

    });

}, {
    threshold: 0.3
});

estatisticas.forEach(item => {
    observador.observe(item);
});


// =====================================
// ANO AUTOMÁTICO NO RODAPÉ
// =====================================

const rodape = document.querySelector("footer p");

if (rodape) {
    rodape.textContent =
        `© ${new Date().getFullYear()} Engenharia | Tecnologia, Inovação e Futuro.`;
}


// =====================================
// MENSAGEM NO CONSOLE
// =====================================

console.log("🚀 Site de Engenharia carregado com sucesso!");
console.log("⚙ Tecnologia, inovação e futuro!");
