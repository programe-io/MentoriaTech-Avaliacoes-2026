/* ==========================================
   CYBER MACHINES
   JAVASCRIPT SYSTEM
========================================== */


/* ==========================================
   ELEMENTOS
========================================== */

const loadingScreen =
    document.getElementById("loadingScreen");

const loaderProgress =
    document.getElementById("loaderProgress");

const loaderText =
    document.getElementById("loaderText");

const mobileMenu =
    document.getElementById("mobileMenu");

const navigation =
    document.getElementById("navigation");

const themeButton =
    document.getElementById("themeButton");

const connectButton =
    document.getElementById("connectButton");

const exploreButton =
    document.getElementById("exploreButton");

const storyButton =
    document.getElementById("storyButton");

const battleButton =
    document.getElementById("battleButton");

const systemButton =
    document.getElementById("systemButton");

const modal =
    document.getElementById("modal");

const modalClose =
    document.getElementById("modalClose");

const modalButton =
    document.getElementById("modalButton");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalData =
    document.getElementById("modalData");


/* ==========================================
   LOADING
========================================== */

let loading = 0;

const loadingTimer =
    setInterval(() => {

        loading +=
            Math.floor(
                Math.random() * 8
            ) + 3;


        if (loading >= 100) {

            loading = 100;

            clearInterval(
                loadingTimer
            );

            setTimeout(() => {

                loadingScreen.classList.add(
                    "hidden"
                );

            }, 500);

        }


        loaderProgress.style.width =
            `${loading}%`;

        loaderText.textContent =
            `${loading}%`;

    }, 100);


/* ==========================================
   PARTICLES
========================================== */

const particleContainer =
    document.getElementById(
        "particles"
    );


function createParticles() {

    const amount = 45;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.classList.add(
            "particle"
        );


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${4 + Math.random() * 8}s`;


        particle.style.animationDelay =
            `${Math.random() * 8}s`;


        particle.style.opacity =
            Math.random();


        particleContainer.appendChild(
            particle
        );

    }

}

createParticles();


/* ==========================================
   MOBILE MENU
========================================== */

mobileMenu.addEventListener(
    "click",
    () => {

        navigation.classList.toggle(
            "show"
        );


        if (
            navigation.classList.contains(
                "show"
            )
        ) {

            mobileMenu.textContent =
                "×";

        } else {

            mobileMenu.textContent =
                "☰";

        }

    }
);


/* ==========================================
   FECHAR MENU
========================================== */

document
    .querySelectorAll(
        ".navigation a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "show"
                    );

                    mobileMenu.textContent =
                        "☰";

                }
            );

        }
    );


/* ==========================================
   TEMA
========================================== */

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-theme"
        );


        if (
            document.body.classList.contains(
                "light-theme"
            )
        ) {

            themeButton.textContent =
                "☾";

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            themeButton.textContent =
                "☀";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    }
);


/* ==========================================
   RECUPERAR TEMA
========================================== */

const savedTheme =
    localStorage.getItem(
        "theme"
    );


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light-theme"
    );

    themeButton.textContent =
        "☾";

}


/* ==========================================
   MODAL
========================================== */

function openModal(
    title,
    message,
    data = ""
) {

    modalTitle.textContent =
        title;

    modalText.textContent =
        message;

    modalData.innerHTML =
        data;

    modal.classList.add(
        "show"
    );

}


function closeModal() {

    modal.classList.remove(
        "show"
    );

}


/* ==========================================
   CONECTAR
========================================== */

connectButton.addEventListener(
    "click",
    () => {

        openModal(
            "CONNECTION ESTABLISHED",
            "Conexão com a Cyber Defense Network estabelecida.",
            `
                > connection: ONLINE<br>
                > encryption: ACTIVE<br>
                > signal: 100%<br>
                > status: AUTHENTICATED
            `
        );

        connectButton.textContent =
            "ONLINE";

        connectButton.style.color =
            "#00e676";

        connectButton.style.borderColor =
            "#00e676";

    }
);


/* ==========================================
   EXPLORAR ROBÔS
========================================== */

exploreButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("robots")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* ==========================================
   HISTÓRIA
========================================== */

storyButton.addEventListener(
    "click",
    () => {

        openModal(
            "THE MACHINE ERA",
            "No ano de 2049, sistemas robóticos avançados passaram a operar de forma independente. Novas unidades foram criadas para proteger cidades, explorar territórios e enfrentar ameaças desconhecidas.",
            `
                > YEAR: 2049<br>
                > AI CORE: ACTIVE<br>
                > ROBOT NETWORK: ONLINE<br>
                > THREAT LEVEL: UNKNOWN
            `
        );

    }
);


/* ==========================================
   SELEÇÃO DE ROBÔS
========================================== */

const robotCards =
    document.querySelectorAll(
        ".robot-card"
    );


const robotDatabase = {

    Aegis: {

        type:
            "DEFENSE CLASS",

        armor:
            "92%",

        speed:
            "67%",

        power:
            "88%",

        mode:
            "ARMORED VEHICLE"

    },

    Volt: {

        type:
            "SPEED CLASS",

        armor:
            "58%",

        speed:
            "98%",

        power:
            "76%",

        mode:
            "SPORT VEHICLE"

    },

    Titan: {

        type:
            "HEAVY CLASS",

        armor:
            "99%",

        speed:
            "42%",

        power:
            "97%",

        mode:
            "HEAVY TRUCK"

    }

};


robotCards.forEach(
    card => {

        const button =
            card.querySelector(
                ".card-button"
            );


        button.addEventListener(
            "click",
            () => {

                robotCards.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                card.classList.add(
                    "selected"
                );


                const robot =
                    card.dataset.robot;


                const data =
                    robotDatabase[
                        robot
                    ];


                openModal(
                    `UNIT: ${robot.toUpperCase()}`,
                    `Unidade ${robot} selecionada para inspeção.`,
                    `
                        > CLASS: ${data.type}<br>
                        > ARMOR: ${data.armor}<br>
                        > SPEED: ${data.speed}<br>
                        > POWER: ${data.power}<br>
                        > ALT MODE: ${data.mode}<br>
                        > STATUS: READY
                    `
                );

            }
        );

    }
);


/* ==========================================
   VEÍCULOS
========================================== */

const transformButtons =
    document.querySelectorAll(
        ".transform-button"
    );


transformButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const mode =
                    button.dataset.mode;


                const originalText =
                    button.textContent;


                button.textContent =
                    "TRANSFORMANDO...";


                button.disabled =
                    true;


                const card =
                    button.closest(
                        ".vehicle-card"
                    );


                card.style.transform =
                    "scale(0.98)";


                setTimeout(
                    () => {

                        card.style.transform =
                            "scale(1)";


                        openModal(
                            "TRANSFORMATION COMPLETE",
                            `${mode} está pronto para operação.`,
                            `
                                > TRANSFORMATION: 100%<br>
                                > ENGINE: ONLINE<br>
                                > ARMOR: ACTIVE<br>
                                > SYSTEM: READY
                            `
                        );


                        button.textContent =
                            originalText;

                        button.disabled =
                            false;

                    },
                    900
                );

            }
        );

    }
);


/* ==========================================
   BATALHA
========================================== */

battleButton.addEventListener(
    "click",
    () => {

        openModal(
            "BATTLE SIMULATION",
            "Simulação de combate preparada.",
            `
                > ENEMY: UNKNOWN<br>
                > TERRAIN: URBAN<br>
                > WEATHER: CLEAR<br>
                > UNIT: READY<br>
                > SIMULATION: STANDBY
            `
        );

    }
);


/* ==========================================
   SISTEMA
========================================== */

systemButton.addEventListener(
    "click",
    () => {

        openModal(
            "SYSTEM INFORMATION",
            "Todos os sistemas principais estão funcionando normalmente.",
            `
                > CORE: ONLINE<br>
                > DATABASE: ONLINE<br>
                > AI: ACTIVE<br>
                > TRANSFORMATION: ENABLED<br>
                > SECURITY: ACTIVE
            `
        );

    }
);


/* ==========================================
   MODAL CONTROLES
========================================== */

modalClose.addEventListener(
    "click",
    closeModal
);


modalButton.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
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


/* ==========================================
   CONTADORES
========================================== */

const counters =
    document.querySelectorAll(
        "[data-counter]"
    );


function animateCounter(
    element
) {

    const target =
        Number(
            element.dataset.counter
        );

    let current = 0;

    const increment =
        Math.max(
            1,
            Math.ceil(
                target / 60
            )
        );


    const timer =
        setInterval(
            () => {

                current += increment;


                if (
                    current >= target
                ) {

                    current =
                        target;

                    clearInterval(
                        timer
                    );

                }


                element.textContent =
                    current;

            },
            25
        );

}


/* ==========================================
   OBSERVER
========================================== */

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        animateCounter(
                            entry.target
                        );

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.5
        }
    );


counters.forEach(
    counter => {

        counterObserver.observe(
            counter
        );

    }
);


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements =
    document.querySelectorAll(
        ".robot-card, .vehicle-card, .about-layout, .battle-content"
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
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* ==========================================
   NAVBAR ACTIVE
========================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".navigation a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current =
            "home";


        sections.forEach(
            section => {

                const top =
                    section.offsetTop - 200;


                if (
                    window.scrollY >= top
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* ==========================================
   PARALLAX DO ROBÔ
========================================== */

const heroRobot =
    document.querySelector(
        ".hero-robot"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!heroRobot) return;


        const scroll =
            window.scrollY;


        if (
            scroll < 800
        ) {

            heroRobot.style.marginTop =
                `${scroll * 0.08}px`;

        }

    }
);


/* ==========================================
   EFEITO 3D NOS CARDS
========================================== */

robotCards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 35;


                const rotateY =
                    (centerX - x) / 35;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* ==========================================
   EFEITO NO ROBÔ PRINCIPAL
========================================== */

const robotCore =
    document.querySelector(
        ".torso-core"
    );


setInterval(
    () => {

        if (!robotCore) return;


        robotCore.style.transform =
            "translate(-50%, -50%) rotate(180deg)";


        setTimeout(
            () => {

                robotCore.style.transform =
                    "translate(-50%, -50%) rotate(360deg)";

            },
            500
        );

    },
    3000
);


/* ==========================================
   LOG DO SISTEMA
========================================== */

console.log(
    "%c CYBER MACHINES ",
    `
    background:#00a8ff;
    color:#001018;
    padding:8px;
    font-size:18px;
    font-weight:bold;
    `
);

console.log(
    "%cSystem initialized successfully.",
    `
    color:#00e676;
    font-size:12px;
    `
);
