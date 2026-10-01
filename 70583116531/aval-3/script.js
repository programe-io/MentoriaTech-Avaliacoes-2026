// =====================================
// ELEMENTOS
// =====================================

const exploreButton =
    document.getElementById("exploreButton");

const randomButton =
    document.getElementById("randomButton");

const discoveryButton =
    document.getElementById("discoveryButton");

const modal =
    document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const loadingProgress =
    document.getElementById(
        "loadingProgress"
    );

const loadingText =
    document.getElementById(
        "loadingText"
    );


// =====================================
// ABRIR MODAL
// =====================================

function openModal(
    title,
    text
) {

    modalTitle.textContent =
        title;

    modalText.textContent =
        text;

    loadingProgress.style.width =
        "0%";

    loadingText.textContent =
        "INICIALIZANDO SISTEMA...";

    modal.classList.add("show");

    startLoading();
}


// =====================================
// FECHAR MODAL
// =====================================

closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove(
            "show"
        );

    }
);


modal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modal
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            modal.classList.remove(
                "show"
            );

        }

    }
);


// =====================================
// BARRA DE CARREGAMENTO
// =====================================

function startLoading() {

    let progress = 0;

    const messages = [

        "CONECTANDO AO NEONVERSE...",

        "SINCRONIZANDO SATÉLITES...",

        "ANALISANDO DADOS QUÂNTICOS...",

        "MAPEANDO SISTEMA ESTELAR...",

        "ACESSO CONCLUÍDO."

    ];


    const interval =
        setInterval(
            function () {

                progress +=
                    Math.floor(
                        Math.random() * 8
                    ) + 3;


                if (progress >= 100) {

                    progress = 100;

                    clearInterval(
                        interval
                    );

                }


                loadingProgress.style.width =
                    progress + "%";


                const index =
                    Math.min(
                        Math.floor(
                            progress / 20
                        ),
                        messages.length - 1
                    );


                loadingText.textContent =
                    messages[index];

            },
            180
        );

}


// =====================================
// BOTÃO EXPLORAR
// =====================================

exploreButton.addEventListener(
    "click",
    function () {

        openModal(

            "EXPLORAÇÃO INICIADA",

            "A nave NEONVERSE está estabelecendo conexão com o sistema Kepler-91. Todos os sensores foram ativados."

        );

    }
);


// =====================================
// DESCOBERTA ALEATÓRIA
// =====================================

const discoveries = [

    {
        title:
            "PLANETA NEXUS",

        text:
            "Um mundo azul localizado a 42 anos-luz. Os dados indicam uma atmosfera surpreendentemente semelhante à da Terra."
    },

    {
        title:
            "SINAL DESCONHECIDO",

        text:
            "Uma sequência matemática foi detectada no espaço profundo. A origem do sinal ainda não foi determinada."
    },

    {
        title:
            "BURACO NEGRO PX-91",

        text:
            "Um dos objetos mais extremos já observados. Seus campos gravitacionais distorcem até mesmo a luz."
    },

    {
        title:
            "AURELION",

        text:
            "Um planeta coberto por oceanos de plasma e tempestades elétricas que duram centenas de anos."
    }

];


randomButton.addEventListener(
    "click",
    function () {

        const randomIndex =
            Math.floor(
                Math.random() *
                discoveries.length
            );

        const discovery =
            discoveries[randomIndex];


        openModal(
            discovery.title,
            discovery.text
        );

    }
);


// =====================================
// ANALISAR SINAL
// =====================================

discoveryButton.addEventListener(
    "click",
    function () {

        openModal(

            "SINAL DETECTADO",

            "A inteligência artificial encontrou padrões matemáticos complexos dentro do sinal. Uma análise profunda está sendo iniciada."

        );

    }
);


// =====================================
// ANIMAÇÃO DOS NÚMEROS
// =====================================

const numbers =
    document.querySelectorAll(
        ".stat-number"
    );


numbers.forEach(
    function (element) {

        element.addEventListener(
            "mouseenter",
            function () {

                element.style.textShadow =
                    "0 0 25px #00f5ff";

            }
        );


        element.addEventListener(
            "mouseleave",
            function () {

                element.style.textShadow =
                    "";

            }
        );

    }
);


// =====================================
// CARDS DE PLANETAS
// =====================================

const planetCards =
    document.querySelectorAll(
        ".planet-card"
    );


planetCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const name =
                    card.querySelector(
                        "h3"
                    ).textContent;


                const description =
                    card.querySelector(
                        "p"
                    ).textContent;


                openModal(
                    name,
                    description
                );

            }
        );

    }
);


// =====================================
// NAVEGAÇÃO MOBILE
// =====================================

const menuButton =
    document.getElementById(
        "menuButton"
    );

const navigation =
    document.querySelector(
        ".navigation"
    );


menuButton.addEventListener(
    "click",
    function () {

        if (
            navigation.style.display ===
            "flex"
        ) {

            navigation.style.display =
                "";

        } else {

            navigation.style.display =
                "flex";

            navigation.style.position =
                "absolute";

            navigation.style.top =
                "80px";

            navigation.style.left =
                "0";

            navigation.style.right =
                "0";

            navigation.style.padding =
                "25px";

            navigation.style.flexDirection =
                "column";

            navigation.style.background =
                "#05060d";

            navigation.style.borderBottom =
                "1px solid rgba(255,255,255,.1)";

        }

    }
);
