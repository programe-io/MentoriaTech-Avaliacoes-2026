/* ==============================
   CHUVA
================================= */

const rain = document.getElementById("rain");

function createRain() {

    for (let i = 0; i < 120; i++) {

        const drop = document.createElement("div");

        drop.classList.add("drop");

        drop.style.left =
            Math.random() * 100 + "%";

        drop.style.height =
            Math.random() * 25 + 10 + "px";

        drop.style.animationDuration =
            Math.random() * 1 + 0.5 + "s";

        drop.style.animationDelay =
            Math.random() * 2 + "s";

        rain.appendChild(drop);
    }
}

createRain();


/* ==============================
   MENU MOBILE
================================= */

const menuBtn =
    document.getElementById("menuBtn");

const menu =
    document.getElementById("menu");

menuBtn.addEventListener("click", () => {

    menu.classList.toggle("active");

});


/* Fecha o menu ao clicar em um link */

const links =
    document.querySelectorAll(".menu a");

links.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

    });

});


/* ==============================
   TEMA
================================= */

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (
        document.body.classList.contains("light")
    ) {

        themeBtn.textContent = "🌙";

    } else {

        themeBtn.textContent = "☀";

    }

});


/* ==============================
   MODAL DOS SLUGCATS
================================= */

const modal =
    document.getElementById("modal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const closeModal =
    document.getElementById("closeModal");


const characters = {

    Survivor: `
        O Survivor representa a jornada de sobrevivência
        e descoberta. Ele precisa explorar o mundo,
        encontrar abrigo e aprender a lidar com os
        perigos do ambiente.
    `,

    Monk: `
        O Monk possui uma jornada mais acessível.
        Sua aventura apresenta uma experiência diferente
        para quem está começando a conhecer o universo
        de Rain World.
    `,

    Hunter: `
        O Hunter é voltado para uma experiência muito
        mais desafiadora. Sua jornada exige habilidade,
        conhecimento do mapa e atenção aos perigos.
    `

};


const buttons =
    document.querySelectorAll(".card-btn");


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        modalTitle.textContent = name;

        modalText.textContent =
            characters[name];

        modal.classList.add("active");

    });

});


/* Fechar modal */

closeModal.addEventListener("click", () => {

    modal.classList.remove("active");

});


/* Fechar clicando fora */

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("active");

    }

});


/* ==============================
   EFEITO DE REVELAÇÃO
================================= */

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


sections.forEach(section => {

    section.style.opacity = "0";

    section.style.transform =
        "translateY(30px)";

    section.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(section);

});


/* ==============================
   CONSOLE
================================= */

console.log(
    "🌧️ Bem-vindo ao mundo de Rain World!"
);