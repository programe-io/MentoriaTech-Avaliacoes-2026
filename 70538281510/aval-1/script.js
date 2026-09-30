/* =========================================
   ROCKET ARENA
   JavaScript principal
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

const playButton = document.getElementById("playButton");
const heroPlay = document.getElementById("heroPlay");
const ctaButton = document.getElementById("ctaButton");

const modal = document.getElementById("gameModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const modeButtons =
    document.querySelectorAll(".mode-button");

const carOptions =
    document.querySelectorAll(".car-option");

const showcaseCar =
    document.querySelector(".showcase-car");


/* =========================================
   MENU MOBILE
========================================= */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("show");

        if (navbar.classList.contains("show")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });

}


/* =========================================
   FECHAR MENU AO CLICAR
========================================= */

document.querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("show");

            menuToggle.textContent = "☰";

        });

    });


/* =========================================
   MODAL DE JOGO
========================================= */

function openGameModal(mode = "Partida") {

    if (!modal) return;

    modal.classList.add("show");

    modalTitle.textContent =
        `ENTRANDO: ${mode.toUpperCase()}`;

    modalText.textContent =
        `Preparando a arena para o modo ${mode}.`;

}


/* =========================================
   BOTÕES JOGAR
========================================= */

if (playButton) {

    playButton.addEventListener("click", () => {

        openGameModal("Partida rápida");

    });

}


if (heroPlay) {

    heroPlay.addEventListener("click", () => {

        openGameModal("Competitivo");

    });

}


if (ctaButton) {

    ctaButton.addEventListener("click", () => {

        openGameModal("Arena");

    });

}


/* =========================================
   MODOS
========================================= */

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const mode =
            button.dataset.mode || "Arena";

        openGameModal(mode);

    });

});


/* =========================================
   FECHAR MODAL
========================================= */

if (modalClose) {

    modalClose.addEventListener("click", () => {

        modal.classList.remove("show");

    });

}


if (modal) {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            modal.classList.remove("show");

        }

    });

}


/* =========================================
   ESC FECHA MODAL
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        modal.classList.remove("show");

    }

});


/* =========================================
   PERSONALIZAÇÃO DO CARRO
========================================= */

const customizeButton =
    document.getElementById("customizeButton");

if (customizeButton) {

    customizeButton.addEventListener("click", () => {

        document.querySelector(".car-selector")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

}


/* =========================================
   TROCAR COR DO CARRO
========================================= */

carOptions.forEach(option => {

    option.addEventListener("click", () => {

        const color =
            option.dataset.color;

        /* Remove ativo */

        carOptions.forEach(item => {

            item.classList.remove("active");

        });

        /* Ativa selecionado */

        option.classList.add("active");


        /* Altera cor */

        if (showcaseCar) {

            showcaseCar.style.background =
                `linear-gradient(
                    160deg,
                    ${color},
                    ${darkenColor(color)} 55%,
                    #07152b
                )`;

            showcaseCar.style.boxShadow =
                `
                0 40px 80px rgba(0,0,0,0.6),
                0 0 50px ${color}55
                `;

        }

    });

});


/* =========================================
   FUNÇÃO PARA ESCURECER COR
========================================= */

function darkenColor(hex) {

    hex = hex.replace("#", "");

    let r =
        parseInt(hex.substring(0, 2), 16);

    let g =
        parseInt(hex.substring(2, 4), 16);

    let b =
        parseInt(hex.substring(4, 6), 16);


    r = Math.max(0, r - 80);
    g = Math.max(0, g - 80);
    b = Math.max(0, b - 80);


    return `rgb(${r}, ${g}, ${b})`;

}


/* =========================================
   ANIMAÇÃO DOS ELEMENTOS
========================================= */

const revealElements =
    document.querySelectorAll(
        ".mode-card, .ranking-table, .arena, .cars-content"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================
   MENU ATIVO CONFORME SCROLL
========================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".navbar a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   EFEITO DE PARALLAX
========================================= */

const hero =
    document.querySelector(".hero");

const carDecoration =
    document.querySelector(".car-decoration");


window.addEventListener("scroll", () => {

    if (!hero || !carDecoration) return;

    const scroll =
        window.scrollY;

    if (scroll < hero.offsetHeight) {

        carDecoration.style.transform =
            `
            skewX(-8deg)
            rotate(-3deg)
            translateY(${scroll * 0.15}px)
            `;

    }

});


/* =========================================
   EFEITO HOVER NOS CARDS
========================================= */

const cards =
    document.querySelectorAll(".mode-card");


cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            (y - centerY) / 20;

        const rotateY =
            (centerX - x) / 20;

        card.style.transform =
            `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================
   CONTADOR SIMPLES
========================================= */

function animateNumber(element, target) {

    let current = 0;

    const increment =
        target / 80;

    const timer =
        setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            element.textContent =
                Math.floor(current).toLocaleString("pt-BR");

        }, 20);

}


/* =========================================
   CONSOLE
========================================= */

console.log(
    "%c🚀 ROCKET ARENA",
    "color:#19b5ff;font-size:24px;font-weight:bold;"
);

console.log(
    "%cProjeto carregado com sucesso!",
    "color:#22c55e;font-size:14px;"
);