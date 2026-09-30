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


                function update() {

                    current += increment;

                    if (
                        current < target
                    ) {

                        counter.textContent =
                            Math.floor(current);

                        requestAnimationFrame(
                            update
                        );

                    } else {

                        counter.textContent =
                            target;

                    }

                }

                update();

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

    counterObserver.observe(
        counter
    );

});


/* =========================================
   DADOS DOS PERSONAGENS
========================================= */

const characters = {

    dean: {

        role:
            "WINCHESTER / CAÇADOR",

        name:
            "Dean Winchester",

        description:
            "Dean Winchester é o irmão mais velho de Sam. Experiente caçador, ele cresceu enfrentando ameaças sobrenaturais e desenvolveu uma forte dedicação à família. Seu Impala 1967 é um dos elementos mais reconhecíveis da série."

    },


    sam: {

        role:
            "WINCHESTER / CAÇADOR",

        name:
            "Sam Winchester",

        description:
            "Sam é o irmão mais novo de Dean. Inteligente e determinado, frequentemente pesquisa a origem das criaturas e fenômenos enfrentados pelos irmãos, contribuindo para encontrar soluções para os casos."

    },


    castiel: {

        role:
            "ANJO",

        name:
            "Castiel",

        description:
            "Castiel é um anjo que entra na vida dos Winchester e gradualmente se torna um dos principais aliados dos irmãos. Sua relação com Dean e Sam evolui ao longo da série."

    },


    bobby: {

        role:
            "CAÇADOR",

        name:
            "Bobby Singer",

        description:
            "Bobby Singer é um experiente caçador e pesquisador do sobrenatural. Ele se torna uma figura paterna para Sam e Dean e uma importante fonte de conhecimento durante suas investigações."

    }

};


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById(
        "characterModal"
    );

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalRole =
    document.getElementById(
        "modalRole"
    );

const modalName =
    document.getElementById(
        "modalName"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );


document
    .querySelectorAll(".character-card")
    .forEach(card => {

        card
            .querySelector("button")
            .addEventListener(
                "click",
                () => {

                    const id =
                        card.dataset.character;

                    const data =
                        characters[id];

                    if (!data) return;

                    modalRole.textContent =
                        data.role;

                    modalName.textContent =
                        data.name;

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
   PESQUISA DE TEMPORADAS
========================================= */

const seasonSearch =
    document.getElementById(
        "seasonSearch"
    );

const seasonFilter =
    document.getElementById(
        "seasonFilter"
    );

const seasonCards =
    document.querySelectorAll(
        ".season-card"
    );

const noResults =
    document.getElementById(
        "noResults"
    );


function filterSeasons() {

    const search =
        seasonSearch.value
            .toLowerCase()
            .trim();

    const selectedSeason =
        seasonFilter.value;

    let visible = 0;


    seasonCards.forEach(card => {

        const title =
            card
                .querySelector("h3")
                .textContent
                .toLowerCase();

        const description =
            card
                .querySelector("p")
                .textContent
                .toLowerCase();

        const number =
            card.dataset.season;


        const matchesSearch =
            title.includes(search) ||
            description.includes(search);


        const matchesSeason =
            selectedSeason === "all" ||
            number === selectedSeason;


        if (
            matchesSearch &&
            matchesSeason
        ) {

            card.style.display =
                "grid";

            visible++;

        } else {

            card.style.display =
                "none";

        }

    });


    noResults.style.display =
        visible === 0
            ? "block"
            : "none";

}


seasonSearch.addEventListener(
    "input",
    filterSeasons
);

seasonFilter.addEventListener(
    "change",
    filterSeasons
);


/* =========================================
   FRASES
========================================= */

const quotes = [

    "Saving people. Hunting things.",

    "Family don't end in blood.",

    "Carry on, my wayward son.",

    "Driver picks the music. Shotgun shuts his cakehole.",

    "The road so far.",

    "We have work to do.",

    "Always keep fighting."

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

        let quote;

        do {

            quote =
                quotes[
                    Math.floor(
                        Math.random() *
                        quotes.length
                    )
                ];

        } while (
            quote === current
        );


        quoteText.style.opacity =
            "0";


        setTimeout(() => {

            quoteText.textContent =
                `"${quote}"`;

            quoteText.style.opacity =
                "1";

        }, 200);

    }
);


quoteText.style.transition =
    "opacity .2s ease";


/* =========================================
   BOTÃO DA HISTÓRIA
========================================= */

const storyButton =
    document.getElementById(
        "storyButton"
    );


storyButton.addEventListener(
    "click",
    () => {

        document
            .getElementById(
                "personagens"
            )
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================
   ANIMAÇÕES
========================================= */

const animatedElements =
    document.querySelectorAll(
        ".character-card, .creature-card, .season-card"
    );


const observer =
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

                observer.unobserve(
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

    observer.observe(element);

});


/* =========================================
   ANO AUTOMÁTICO
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================
   CONSOLE
========================================= */

console.log(
    "Supernatural Fan Site carregado."
);
