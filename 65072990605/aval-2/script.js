/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

});


/* Fecha o menu ao clicar em um link */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =====================================================
   HEADER AO ROLAR
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   FILTRO DE VEÍCULOS
===================================================== */

const vehicleFilters =
    document.querySelectorAll(".vehicle-filter");

const vehicles =
    document.querySelectorAll(".vehicle-card");


vehicleFilters.forEach(filter => {

    filter.addEventListener("click", () => {

        vehicleFilters.forEach(item => {

            item.classList.remove("active");

        });

        filter.classList.add("active");

        const selectedType =
            filter.dataset.type;


        vehicles.forEach(vehicle => {

            const vehicleType =
                vehicle.dataset.type;


            if (
                selectedType === "all" ||
                selectedType === vehicleType
            ) {

                vehicle.classList.remove("hidden");

            } else {

                vehicle.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   MODAL DO TRAILER
===================================================== */

const trailerButton =
    document.getElementById("trailerButton");

const modal =
    document.getElementById("modal");

const modalClose =
    document.getElementById("modalClose");

const modalAction =
    document.getElementById("modalAction");


function openModal() {

    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


trailerButton.addEventListener(
    "click",
    openModal
);

modalClose.addEventListener(
    "click",
    closeModal
);

modalAction.addEventListener(
    "click",
    closeModal
);


/* Fechar clicando fora */

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


/* Fechar com ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* =====================================================
   MISSÕES
===================================================== */

const missionButtons =
    document.querySelectorAll(".mission-button");


missionButtons.forEach(button => {

    button.addEventListener("click", () => {

        const mission =
            button
                .closest(".mission-card")
                .querySelector("h3")
                .textContent;


        button.textContent = "ACEITA ✓";

        button.style.background = "#f2c94c";
        button.style.color = "#17140a";

        alert(
            `Missão "${mission}" adicionada à sua lista!`
        );

    });

});


/* =====================================================
   BOTÃO JOGAR
===================================================== */

const playButton =
    document.getElementById("playButton");

const startButton =
    document.getElementById("startButton");


function startGame() {

    alert(
        "Bem-vindo ao Urban Crime!\n\n" +
        "Aqui você poderá conectar este botão " +
        "ao seu sistema de login, jogo ou plataforma."
    );

}


playButton.addEventListener(
    "click",
    startGame
);

startButton.addEventListener(
    "click",
    startGame
);


/* =====================================================
   BOTÕES EXPLORAR
===================================================== */

const exploreButtons =
    document.querySelectorAll(".explore-btn");


exploreButtons.forEach(button => {

    button.addEventListener("click", () => {

        const city =
            button
                .closest(".city-card")
                .querySelector("h3")
                .textContent;


        alert(
            `Você escolheu explorar ${city}.`
        );

    });

});


/* =====================================================
   ANIMAÇÕES DE ENTRADA
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".city-card, " +
        ".character-card, " +
        ".vehicle-card, " +
        ".mission-card, " +
        ".news-card, " +
        ".section-heading"
    );


animatedElements.forEach(element => {

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
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    observer.observe(element);

});


/* =====================================================
   ANO DO FOOTER
===================================================== */

const year =
    document.getElementById("year");

year.textContent =
    new Date().getFullYear();


/* =====================================================
   TECLA ENTER EM ELEMENTOS INTERATIVOS
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        const active =
            document.activeElement;

        if (
            active.classList.contains(
                "mission-button"
            )
        ) {

            active.click();

        }

    }

});


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%c Urban Crime ",
    "background:#f2c94c;color:#111;padding:5px;font-weight:bold;"
);

console.log(
    "Projeto carregado com sucesso."
);
