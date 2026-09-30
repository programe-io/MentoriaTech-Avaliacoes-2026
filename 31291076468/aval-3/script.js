// ========================================
// MENU MOBILE
// ========================================

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");


menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");


    if (nav.classList.contains("active")) {

        menuToggle.textContent = "✕";

    } else {

        menuToggle.textContent = "☰";

    }

});


// Fecha o menu ao clicar em um link

const navLinks =
    document.querySelectorAll(".nav a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


// ========================================
// TEMA ESCURO
// ========================================

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️";

        localStorage.setItem(
            "jjba-theme",
            "dark"
        );

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem(
            "jjba-theme",
            "light"
        );

    }

});


// Recupera o tema salvo

const savedTheme =
    localStorage.getItem("jjba-theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}


// ========================================
// PESQUISA DE PERSONAGENS
// ========================================

const characterSearch =
    document.getElementById("characterSearch");

const characterCards =
    document.querySelectorAll(".character-card");

const characterNoResults =
    document.getElementById(
        "characterNoResults"
    );


characterSearch.addEventListener("input", () => {

    const search =
        characterSearch.value
            .toLowerCase()
            .trim();


    let found = false;


    characterCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();


        if (name.includes(search)) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (found) {

        characterNoResults.style.display =
            "none";

    } else {

        characterNoResults.style.display =
            "block";

    }

});


// ========================================
// MODAL
// ========================================

const modal =
    document.getElementById("infoModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalRole =
    document.getElementById("modalRole");

const modalDescription =
    document.getElementById(
        "modalDescription"
    );


// ========================================
// PARTES
// ========================================

const partButtons =
    document.querySelectorAll(
        ".details-button"
    );


partButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();


        const card =
            button.closest(".part-card");


        const title =
            card.dataset.title;

        const description =
            card.dataset.description;


        modalTitle.textContent =
            title;

        modalRole.textContent =
            "PARTE DE JJBA";

        modalDescription.textContent =
            description;


        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


// ========================================
// PERSONAGENS
// ========================================

const characterButtons =
    document.querySelectorAll(
        ".character-button"
    );


characterButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();


        const card =
            button.closest(
                ".character-card"
            );


        const title =
            card.dataset.title;

        const role =
            card.dataset.role;

        const description =
            card.dataset.description;


        modalTitle.textContent =
            title;

        modalRole.textContent =
            role;

        modalDescription.textContent =
            description;


        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


// ========================================
// FECHAR MODAL
// ========================================

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


// Clicar fora do modal

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


// Tecla ESC

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


// ========================================
// FORMULÁRIO
// ========================================

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value;


        formMessage.textContent =
            `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;


        contactForm.reset();


        setTimeout(() => {

            formMessage.textContent = "";

        }, 5000);

    }
);


// ========================================
// ANIMAÇÕES AO ROLAR
// ========================================

const animatedElements =
    document.querySelectorAll(
        ".part-card, .character-card, .stand-card, .stat-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach(element => {

    observer.observe(element);

});


// ========================================
// EFEITO DO TÍTULO
// ========================================

const heroTitle =
    document.querySelector(
        ".hero h1"
    );


document.addEventListener(
    "mousemove",
    event => {

        if (!heroTitle) {
            return;
        }


        const x =
            (event.clientX /
                window.innerWidth -
                0.5) * 2;


        const y =
            (event.clientY /
                window.innerHeight -
                0.5) * 2;


        heroTitle.style.transform =
            `
            skew(-3deg)
            translate(
                ${x * 4}px,
                ${y * 4}px
            )
            `;

    }
);


// ========================================
// CONSOLE
// ========================================

console.log(
    "JJBA Fan Site carregado!"
);
