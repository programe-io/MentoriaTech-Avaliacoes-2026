/* =========================================
   MENU MOBILE
========================================= */

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");


menuButton.addEventListener("click", () => {

    navigation.classList.toggle("active");

});


/* Fecha o menu quando clicar em um link */

const navigationLinks =
    document.querySelectorAll(".navigation a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("active");

    });

});


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById("modal");

const modalClose =
    document.getElementById("modalClose");

const modalOk =
    document.getElementById("modalOk");

const modalTitle =
    document.getElementById("modalTitle");

const modalMessage =
    document.getElementById("modalMessage");


function openModal(title, message) {

    modalTitle.textContent = title;

    modalMessage.textContent = message;

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalOk.addEventListener(
    "click",
    closeModal
);


/* Fecha clicando fora da caixa */

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeModal();

    }

});


/* Fecha com ESC */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* =========================================
   BOTÕES DOS CARDS
========================================= */

const cardButtons =
    document.querySelectorAll(".card-button");


cardButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const message =
            button.dataset.message;

        openModal(
            "Pica-Pau!",
            message
        );

    });

});


/* =========================================
   BOTÃO SURPRESA
========================================= */

const surpriseButton =
    document.getElementById("surpriseButton");


const surprises = [

    "Hora de começar uma nova aventura! 🐦",

    "Prepare-se para muita diversão! 😂",

    "Uma grande confusão está chegando! 💥",

    "O Pica-Pau está pronto para aprontar! 🐦",

    "Diversão desbloqueada! ⭐"

];


surpriseButton.addEventListener(
    "click",
    () => {

        const randomIndex =
            Math.floor(
                Math.random() *
                surprises.length
            );

        openModal(
            "Surpresa!",
            surprises[randomIndex]
        );

    }
);


/* =========================================
   ACCORDION
========================================= */

const accordionHeaders =
    document.querySelectorAll(
        ".accordion-header"
    );


accordionHeaders.forEach((header) => {

    header.addEventListener(
        "click",
        () => {

            const item =
                header.parentElement;

            const content =
                item.querySelector(
                    ".accordion-content"
                );


            const isActive =
                item.classList.contains(
                    "active"
                );


            /*
             * Fecha todos os itens
             */

            document
                .querySelectorAll(
                    ".accordion-item"
                )
                .forEach((otherItem) => {

                    otherItem.classList.remove(
                        "active"
                    );

                    const otherContent =
                        otherItem.querySelector(
                            ".accordion-content"
                        );

                    otherContent.style.maxHeight =
                        null;

                });


            /*
             * Abre o item selecionado
             */

            if (!isActive) {

                item.classList.add("active");

                content.style.maxHeight =
                    content.scrollHeight + "px";

            }

        }
    );

});


/* =========================================
   GALERIA
========================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        const title =
            item.dataset.title;

        openModal(
            title,
            `Você selecionou a categoria "${title}".`
        );

    });

});


/* =========================================
   ANIMAÇÃO AO ROLAR
========================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(
        ".card, .gallery-item, .character-grid"
    )
    .forEach((element) => {

        observer.observe(element);

    });


/* =========================================
   CONSOLE
========================================= */

console.log(
    "🐦 Site temático carregado com sucesso!"
);