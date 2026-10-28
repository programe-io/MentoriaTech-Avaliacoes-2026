
/* ==============================
   TOJI FUSHIGURO - JAVASCRIPT
   ============================== */

// Aguarda o HTML carregar
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS
    const header = document.querySelector("header");
    const hero = document.querySelector(".hero");
    const botao = document.querySelector(".btn");
    const cards = document.querySelectorAll(".card");
    const secoes = document.querySelectorAll("main section");
    const links = document.querySelectorAll("nav a");

    // EFEITO NO CABEÇALHO AO ROLAR A PÁGINA
    function atualizarHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.style.background = "rgba(5, 10, 7, 0.98)";
            header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)";
        } else {
            header.style.background = "rgba(10, 16, 12, 0.95)";
            header.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", atualizarHeader);
    atualizarHeader();


    // EFEITO DE CLIQUE NO BOTÃO PRINCIPAL
    if (botao) {
        botao.addEventListener("click", () => {
            console.log("Bem-vindo ao mundo de Toji Fushiguro!");
        });
    }


    // ANIMAÇÃO DOS CARDS AO ENTRAREM NA TELA
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15
    });

    cards.forEach((card, indice) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition =
            `opacity 0.6s ease ${indice * 0.12}s,
             transform 0.6s ease ${indice * 0.12}s`;

        observador.observe(card);
    });


    // EFEITO AO REVELAR OS CARDS
    document.querySelectorAll(".card").forEach((card) => {
        card.addEventListener("transitionend", () => {
            if (card.classList.contains("visivel")) {
                card.style.willChange = "auto";
            }
        });
    });

    // CLASSE VISÍVEL
    const estilo = document.createElement("style");

    estilo.textContent = `
        .card.visivel {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        nav a.ativo {
            color: #76ff9a;
        }
    `;

    document.head.appendChild(estilo);


    // DESTACAR O LINK DA SEÇÃO ATUAL
    const observadorSecoes = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                links.forEach((link) => {
                    link.classList.remove("ativo");

                    if (
                        link.getAttribute("href") ===
                        "#" + entrada.target.id
                    ) {
                        link.classList.add("ativo");
                    }
                });
            }
        });
    }, {
        threshold: 0.35
    });

    secoes.forEach((secao) => {
        if (secao.id) {
            observadorSecoes.observe(secao);
        }
    });


    // EFEITO PARALLAX LEVE NO FUNDO PRINCIPAL
    if (hero && window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
    ).matches) {

        window.addEventListener("scroll", () => {
            const rolagem = window.scrollY;

            if (rolagem < hero.offsetHeight) {
                hero.style.backgroundPositionY =
                    `${rolagem * 0.25}px`;
            }
        }, { passive: true });
    }


    // ANO AUTOMÁTICO NO RODAPÉ, SE EXISTIR O ELEMENTO
    const ano = document.querySelector("#ano-atual");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }


    console.log("Blog do Toji carregado com sucesso!");
});
