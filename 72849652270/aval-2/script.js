/* =========================================
   BANCO DE DADOS DOS ALIENS
========================================= */

const aliens = {

    chama: {

        name: "Chama",

        symbol: "🔥",

        description:
            "Uma forma capaz de controlar e produzir fogo, sendo extremamente poderosa em combates.",

        color: "#ff5a1f"

    },

    "quatro-bracos": {

        name: "Quatro Braços",

        symbol: "💪",

        description:
            "Uma forma alienígena extremamente forte, especializada em força física e resistência.",

        color: "#ff3030"

    },

    xlr8: {

        name: "XLR8",

        symbol: "⚡",

        description:
            "Uma forma extremamente veloz, capaz de se movimentar em velocidades impressionantes.",

        color: "#00d9ff"

    },

    diamante: {

        name: "Diamante",

        symbol: "💎",

        description:
            "Uma forma cristalina altamente resistente capaz de produzir estruturas cristalinas.",

        color: "#4ee7ff"

    },

    insectoide: {

        name: "Insectoide",

        symbol: "🦋",

        description:
            "Uma forma especializada em voo, mobilidade aérea e utilização de ataques à distância.",

        color: "#bdff00"

    },

    aquatico: {

        name: "Aquático",

        symbol: "🌊",

        description:
            "Uma forma adaptada ao ambiente aquático, com grande capacidade de movimentação na água.",

        color: "#00b7ff"

    }

};


/* =========================================
   ELEMENTOS DA PÁGINA
========================================= */

const alienCards =
    document.querySelectorAll(".alien-card");

const selectedName =
    document.getElementById("selectedName");

const selectedDescription =
    document.getElementById("selectedDescription");

const alienDisplay =
    document.getElementById("alienDisplay");

const alienSymbol =
    document.querySelector(".alien-symbol");

const transformButton =
    document.getElementById("transformButton");

const transformationModal =
    document.getElementById("transformationModal");

const transformationText =
    document.getElementById("transformationText");

const transformationAlien =
    document.getElementById("transformationAlien");

const closeModal =
    document.getElementById("closeModal");

const startButton =
    document.getElementById("startButton");

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.querySelector(".navigation");


/* =========================================
   ALIEN SELECIONADO
========================================= */

let selectedAlien = null;


/* =========================================
   SELEÇÃO DE ALIEN
========================================= */

alienCards.forEach(card => {

    card.addEventListener("click", () => {

        const alienId =
            card.dataset.alien;

        const alien =
            aliens[alienId];

        if (!alien) {
            return;
        }

        selectedAlien = alienId;


        /* Remove seleção anterior */

        alienCards.forEach(item => {

            item.classList.remove("selected");

        });


        /* Adiciona seleção */

        card.classList.add("selected");


        /* Atualiza interface */

        selectedName.textContent =
            alien.name;

        selectedDescription.textContent =
            alien.description;

        alienSymbol.textContent =
            alien.symbol;


        /* Atualiza cor */

        alienDisplay.style.borderColor =
            alien.color;

        alienDisplay.style.boxShadow =
            `0 0 40px ${alien.color}55`;

        alienSymbol.style.color =
            alien.color;


        /* Animação */

        alienDisplay.classList.remove("active");

        setTimeout(() => {

            alienDisplay.classList.add("active");

        }, 50);

    });

});


/* =========================================
   BOTÃO TRANSFORMAR
========================================= */

transformButton.addEventListener("click", () => {

    if (!selectedAlien) {

        alert(
            "Selecione um alienígena primeiro!"
        );

        return;
    }


    const alien =
        aliens[selectedAlien];


    startTransformation(alien);

});


/* =========================================
   TRANSFORMAÇÃO
========================================= */

function startTransformation(alien) {

    transformationText.textContent =
        "TRANSFORMAÇÃO!";

    transformationAlien.textContent =
        `Forma selecionada: ${alien.name}`;


    transformationModal.classList.add("show");


    /* Efeito sonoro eletrônico */

    playTransformationSound();

}


/* =========================================
   FECHAR MODAL
========================================= */

closeModal.addEventListener("click", () => {

    transformationModal.classList.remove(
        "show"
    );

});


/* Fecha clicando fora */

transformationModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            transformationModal
        ) {

            transformationModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   BOTÃO INICIAL
========================================= */

startButton.addEventListener("click", () => {

    document
        .getElementById("omnitrix")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* =========================================
   MENU MOBILE
========================================= */

menuButton.addEventListener("click", () => {

    navigation.classList.toggle(
        "active"
    );

});


/* Fecha menu ao clicar em link */

document
    .querySelectorAll(".navigation a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove(
                "active"
            );

        });

    });


/* =========================================
   EFEITO SONORO
========================================= */

function playTransformationSound() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) {
        return;
    }

    const audioContext =
        new AudioContext();


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type =
        "sawtooth";


    oscillator.frequency.setValueAtTime(
        120,
        audioContext.currentTime
    );


    oscillator.frequency.exponentialRampToValueAtTime(
        700,
        audioContext.currentTime + 0.5
    );


    gain.gain.setValueAtTime(
        0.001,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.25,
        audioContext.currentTime + 0.05
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.8
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.8
    );

}


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * ESC fecha o modal
         */

        if (
            event.key === "Escape"
        ) {

            transformationModal.classList.remove(
                "show"
            );

        }


        /*
         * ENTER transforma
         */

        if (
            event.key === "Enter" &&
            selectedAlien
        ) {

            startTransformation(
                aliens[selectedAlien]
            );

        }

    }
);


/* =========================================
   ANIMAÇÃO DOS CARDS
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

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


document
    .querySelectorAll(".alien-info")
    .forEach(card => {

        card.style.opacity =
            "0";

        card.style.transform =
            "translateY(30px)";

        card.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(card);

    });


/* =========================================
   MENSAGEM NO CONSOLE
========================================= */

console.log(
    "%c OMNITRIX SYSTEM ONLINE ",
    "background:#8cff00;color:#000;font-size:18px;font-weight:bold;"
);

console.log(
    "Sistema desenvolvido com HTML, CSS e JavaScript."
);
