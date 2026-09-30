/* =========================================================
   GILMORE GIRLS
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const preloader =
    document.getElementById("preloader");

const header =
    document.getElementById("header");

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");

const coffeeButton =
    document.getElementById("coffeeButton");

const coffeeCounter =
    document.getElementById("coffeeCounter");

const coffeeMessage =
    document.getElementById("coffeeMessage");

const quoteButton =
    document.getElementById("newQuote");

const quoteText =
    document.getElementById("quoteText");

const quoteLabel =
    document.getElementById("quoteLabel");

const characterModal =
    document.getElementById(
        "characterModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalLabel =
    document.getElementById(
        "modalLabel"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );

const email =
    document.getElementById(
        "email"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );

const currentYear =
    document.getElementById(
        "currentYear"
    );


/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                preloader.classList.add(
                    "hidden"
                );

            },
            1000
        );

    }
);


/* =========================================================
   HEADER AO ROLAR
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 50
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            nav.classList.toggle(
                "active"
            );

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);


const navLinks =
    document.querySelectorAll(
        ".nav a"
    );


navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);


/* =========================================================
   BOTÃO CAFÉ DO HERO
========================================================= */

coffeeButton.addEventListener(
    "click",
    () => {

        createCoffeeParticles();

        coffeeButton.innerHTML =
            "☕ Café servido!";

        setTimeout(
            () => {

                coffeeButton.innerHTML =
                    "☕ Café?";

            },
            1800
        );

    }
);


/* =========================================================
   PARTÍCULAS DE CAFÉ
========================================================= */

function createCoffeeParticles() {

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.textContent =
            Math.random() > 0.5
                ? "☕"
                : "✦";

        particle.style.position =
            "fixed";

        particle.style.zIndex =
            "9999";

        particle.style.left =
            Math.random() * 100 +
            "vw";

        particle.style.top =
            Math.random() * 100 +
            "vh";

        particle.style.fontSize =
            Math.random() * 12 +
            10 +
            "px";

        particle.style.pointerEvents =
            "none";

        particle.style.transition =
            "all 1.5s ease";

        document.body.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.style.transform =
                    `translate(
                        ${(Math.random() - 0.5) * 200}px,
                        -${Math.random() * 300 + 100}px
                    )`;

                particle.style.opacity =
                    "0";

            },
            50
        );


        setTimeout(
            () => {

                particle.remove();

            },
            1700
        );

    }

}


/* =========================================================
   PERSONAGENS
========================================================= */

const characters = {

    lorelai: {

        label:
            "Gilmore",

        title:
            "Lorelai Gilmore",

        description:
            "Lorelai é a mãe de Rory e uma das figuras centrais da história. Independente, espirituosa e apaixonada por café, ela construiu sua própria vida em Stars Hollow enquanto cria a filha."

    },


    rory: {

        label:
            "Gilmore",

        title:
            "Rory Gilmore",

        description:
            "Rory é filha de Lorelai e uma jovem apaixonada por livros e jornalismo. Sua trajetória acompanha sua vida acadêmica, seus relacionamentos e sua relação com a família."

    },


    luke: {

        label:
            "Luke's",

        title:
            "Luke Danes",

        description:
            "Luke é proprietário do Luke's Diner e um dos moradores mais conhecidos de Stars Hollow. Sua relação com Lorelai ocupa um espaço importante na narrativa."

    },


    emily: {

        label:
            "Gilmore",

        title:
            "Emily Gilmore",

        description:
            "Emily é mãe de Lorelai e avó de Rory. Ela representa uma parte importante da família Gilmore e participa de muitos dos conflitos e encontros familiares."

    },


    richard: {

        label:
            "Gilmore",

        title:
            "Richard Gilmore",

        description:
            "Richard é pai de Lorelai e avô de Rory. Sua relação com a família e sua carreira fazem parte de vários momentos importantes da história."

    },


    sookie: {

        label:
            "Dragonfly Inn",

        title:
            "Sookie St. James",

        description:
            "Sookie é uma chef talentosa e amiga próxima de Lorelai. Sua personalidade divertida e sua paixão pela gastronomia fazem dela uma presença marcante em Stars Hollow."

    }

};


/* =========================================================
   ABRIR MODAL
========================================================= */

const characterButtons =
    document.querySelectorAll(
        ".character-button"
    );


characterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                const card =
                    event.target.closest(
                        ".character-card"
                    );

                const characterName =
                    card.dataset.character;

                const character =
                    characters[
                        characterName
                    ];


                if (!character) {

                    return;

                }


                modalLabel.textContent =
                    character.label;

                modalTitle.textContent =
                    character.title;

                modalDescription.textContent =
                    character.description;


                characterModal.classList.add(
                    "active"
                );


                characterModal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


/* =========================================================
   FECHAR MODAL
========================================================= */

function closeModal() {

    characterModal.classList.remove(
        "active"
    );

    characterModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


characterModal.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal-overlay"
            )
        ) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   TIMELINE
========================================================= */

const timelineItems =
    document.querySelectorAll(
        ".timeline-item"
    );


timelineItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                timelineItems.forEach(
                    element => {

                        element.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================================
   CONTADOR DE CAFÉS
========================================================= */

let coffeeCount = 0;


coffeeCounter.addEventListener(
    "click",
    () => {

        coffeeCount++;


        const messages = [

            "Um café chegando!",

            "Mais um. É sempre uma boa ideia.",

            "Luke provavelmente está julgando você.",

            "Café número " +
            coffeeCount +
            "!",

            "Rory aprovaria.",

            "Lorelai definitivamente pediria outro."

        ];


        const messageIndex =
            Math.min(
                coffeeCount - 1,
                messages.length - 1
            );


        coffeeMessage.textContent =
            messages[messageIndex];


        coffeeCounter.style.transform =
            "scale(1.05)";


        setTimeout(
            () => {

                coffeeCounter.style.transform =
                    "scale(1)";

            },
            150
        );

    }
);


/* =========================================================
   FRASES
========================================================= */

const quotes = [

    {
        text:
            "Café, livros e uma boa conversa. Às vezes, é tudo que precisamos.",

        label:
            "Stars Hollow"
    },


    {
        text:
            "Algumas cidades se tornam especiais pelas pessoas que vivem nelas.",

        label:
            "Stars Hollow"
    },


    {
        text:
            "Uma boa conversa pode começar com uma simples xícara de café.",

        label:
            "Luke's Diner"
    },


    {
        text:
            "Entre uma página e outra, sempre existe espaço para uma nova história.",

        label:
            "Rory's Bookshelf"
    },


    {
        text:
            "Família nem sempre é simples, mas sempre deixa uma história para contar.",

        label:
            "The Gilmore Family"
    }

];


let quoteIndex = 0;


quoteButton.addEventListener(
    "click",
    () => {

        quoteIndex++;


        if (
            quoteIndex >=
            quotes.length
        ) {

            quoteIndex = 0;

        }


        quoteText.style.opacity =
            "0";


        setTimeout(
            () => {

                quoteText.textContent =
                    quotes[quoteIndex].text;

                quoteLabel.textContent =
                    quotes[quoteIndex].label;

                quoteText.style.opacity =
                    "1";

            },
            250
        );

    }
);


/* =========================================================
   NEWSLETTER
========================================================= */

newsletterForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const emailValue =
            email.value.trim();


        if (
            emailValue === ""
        ) {

            formMessage.textContent =
                "Digite seu e-mail.";

            return;

        }


        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailRegex.test(
                emailValue
            )
        ) {

            formMessage.textContent =
                "Digite um e-mail válido.";

            return;

        }


        formMessage.textContent =
            "☕ Inscrição confirmada! Seu café está a caminho.";


        email.value = "";


        setTimeout(
            () => {

                formMessage.textContent =
                    "";

            },
            5000
        );

    }
);


/* =========================================================
   REVEAL AO ROLAR
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".intro-grid, " +
        ".section-heading, " +
        ".story-card, " +
        ".character-card, " +
        ".town-text, " +
        ".town-illustration, " +
        ".timeline-item, " +
        ".books-text, " +
        ".bookshelf, " +
        ".curiosity-card, " +
        ".newsletter-content"
    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

    }
);


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
           