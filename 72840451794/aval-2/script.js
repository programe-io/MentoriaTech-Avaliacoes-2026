/* =========================================
   MENU MOBILE
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");


menuToggle.addEventListener(
    "click",
    () => {

        nav.classList.toggle("active");

    }
);


document
    .querySelectorAll(".nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================
   CONTADORES
========================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.target
                    );

                let current = 0;

                const increment =
                    target / 80;


                function updateCounter() {

                    current += increment;

                    if (
                        current < target
                    ) {

                        counter.textContent =
                            Math.floor(current);

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        counter.textContent =
                            target;

                    }

                }

                updateCounter();

                counterObserver.unobserve(
                    counter
                );

            });

        },
        {
            threshold: .5
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================
   TÍTULOS EXTRAS
========================================= */

const showTrophies =
    document.getElementById(
        "showTrophies"
    );

const extraTrophies =
    document.getElementById(
        "extraTrophies"
    );


showTrophies.addEventListener(
    "click",
    () => {

        extraTrophies.classList.toggle(
            "active"
        );


        if (
            extraTrophies.classList.contains(
                "active"
            )
        ) {

            showTrophies.textContent =
                "Ocultar conquistas";

        } else {

            showTrophies.textContent =
                "Mostrar mais conquistas";

        }

    }
);


/* =========================================
   DADOS DOS ÍDOLOS
========================================= */

const idols = {

    ademir: {

        category:
            "ÍDOLO HISTÓRICO",

        title:
            "Ademir da Guia",

        description:
            "Ademir da Guia é um dos maiores símbolos da história do Palmeiras e ficou marcado por sua elegância, técnica e importância para a chamada Academia de Futebol."

    },

    evair: {

        category:
            "ÍDOLO",

        title:
            "Evair",

        description:
            "Evair foi um dos grandes atacantes da história recente do Palmeiras e teve papel importante nas conquistas da década de 1990."

    },

    marcos: {

        category:
            "SÃO MARCOS",

        title:
            "Marcos",

        description:
            "Marcos tornou-se um dos maiores ídolos do Palmeiras. Goleiro de destaque, foi protagonista na campanha da Libertadores de 1999."

    },

    abel: {

        category:
            "ERA CONTEMPORÂNEA",

        title:
            "Abel Ferreira",

        description:
            "Abel Ferreira comandou o Palmeiras em uma das fases mais vitoriosas da história recente do clube, conquistando títulos nacionais e internacionais."

    }

};


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById(
        "idolModal"
    );

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalCategory =
    document.getElementById(
        "modalCategory"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );


document
    .querySelectorAll(".idol-card")
    .forEach(card => {

        card
            .querySelector("button")
            .addEventListener(
                "click",
                () => {

                    const id =
                        card.dataset.idol;

                    const data =
                        idols[id];

                    if (!data) return;

                    modalCategory.textContent =
                        data.category;

                    modalTitle.textContent =
                        data.title;

                    modalDescription.textContent =
                        data.description;

                    modal.classList.add(
                        "active"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

    });


function closeModal() {

    modal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);

modalOverlay.addEventListener(
    "click",
    closeModal
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


/* =========================================
   FRASES
========================================= */

const quotes = [

    "O Palmeiras é paixão que atravessa gerações.",

    "Avanti Palestra!",

    "Uma história construída com tradição e conquistas.",

    "Verde é a cor da nossa paixão.",

    "Grandes histórias são construídas por grandes gerações.",

    "Palmeiras: tradição, paixão e futebol."

];


const quoteText =
    document.getElementById(
        "quoteText"
    );

const newQuote =
    document.getElementById(
        "newQuote"
    );


newQuote.addEventListener(
    "click",
    () => {

        const current =
            quoteText.textContent;

        let selected;

        do {

            selected =
                quotes[
                    Math.floor(
                        Math.random() *
                        quotes.length
                    )
                ];

        } while (
            selected === current
        );


        quoteText.style.opacity =
            "0";


        setTimeout(() => {

            quoteText.textContent =
                `“${selected}”`;

            quoteText.style.opacity =
                "1";

        }, 200);

    }
);


quoteText.style.transition =
    "opacity .2s ease";


/* =========================================
   BOTÃO HISTÓRIA
========================================= */

const historyButton =
    document.getElementById(
        "historyButton"
    );


historyButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("titulos")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================
   ANIMAÇÃO DOS CARDS
========================================= */

const animatedElements =
    document.querySelectorAll(
        ".trophy-card, .idol-card, .match, .curiosity-grid article, .timeline-item"
    );


const animationObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                animationObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: .1
        }
    );


animatedElements.forEach(element => {

    element.classList.add(
        "animate-item"
    );

    animationObserver.observe(
        element
    );

});


/* =========================================
   ANO
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================
   CONSOLE
========================================= */

console.log(
    "Palmeiras Fan Site carregado."
);
