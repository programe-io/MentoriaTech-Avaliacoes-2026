/* =========================================
   INK REALM
   JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const loadingScreen =
    document.getElementById("loadingScreen");

const loadingProgress =
    document.getElementById("loadingProgress");

const menuButton =
    document.getElementById("menuButton");

const navigation =
    document.getElementById("navigation");

const startButton =
    document.getElementById("startButton");

const adventureButton =
    document.getElementById("adventureButton");

const finalButton =
    document.getElementById("finalButton");

const learnButton =
    document.getElementById("learnButton");

const modal =
    document.getElementById("gameModal");

const modalClose =
    document.getElementById("modalClose");

const modalCancel =
    document.getElementById("modalCancel");

const modalStart =
    document.getElementById("modalStart");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const locationMessage =
    document.getElementById("locationMessage");


/* =========================================
   LOADING SCREEN
========================================= */

let loadingValue = 0;

const loadingInterval =
    setInterval(() => {

        loadingValue +=
            Math.floor(
                Math.random() * 12
            ) + 5;

        if (loadingValue >= 100) {

            loadingValue = 100;

            clearInterval(
                loadingInterval
            );

            setTimeout(() => {

                loadingScreen.classList.add(
                    "hidden"
                );

            }, 400);

        }

        loadingProgress.style.width =
            `${loadingValue}%`;

    }, 180);


/* =========================================
   MENU MOBILE
========================================= */

if (menuButton) {

    menuButton.addEventListener(
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

                menuButton.textContent = "✕";

            } else {

                menuButton.textContent = "☰";

            }

        }
    );

}


/* =========================================
   FECHAR MENU
========================================= */

document
    .querySelectorAll(".navigation a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navigation.classList.remove(
                    "show"
                );

                menuButton.textContent = "☰";

            }
        );

    });


/* =========================================
   MODAL
========================================= */

function openModal(
    title = "PREPARE-SE!",
    message =
        "Sua aventura está prestes a começar."
) {

    modalTitle.textContent =
        title;

    modalText.textContent =
        message;

    modal.classList.add(
        "show"
    );

}


function closeModal() {

    modal.classList.remove(
        "show"
    );

}


/* =========================================
   BOTÕES PRINCIPAIS
========================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            openModal(
                "AVENTURA!",
                "Você está pronto para entrar no Ink Realm?"
            );

        }
    );

}


if (adventureButton) {

    adventureButton.addEventListener(
        "click",
        () => {

            openModal(
                "A AVENTURA COMEÇA!",
                "Escolha uma região no mapa para continuar."
            );

            setTimeout(() => {

                closeModal();

                document
                    .getElementById("adventure")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }, 1500);

        }
    );

}


if (finalButton) {

    finalButton.addEventListener(
        "click",
        () => {

            openModal(
                "BEM-VINDO!",
                "Prepare-se para explorar um mundo desenhado à mão."
            );

        }
    );

}


if (learnButton) {

    learnButton.addEventListener(
        "click",
        () => {

            openModal(
                "SOBRE O PROJETO",
                "Este projeto demonstra como criar uma experiência web temática usando HTML, CSS e JavaScript puro."
            );

        }
    );

}


/* =========================================
   FECHAR MODAL
========================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}

if (modalCancel) {

    modalCancel.addEventListener(
        "click",
        closeModal
    );

}


if (modal) {

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

}


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
   MAPA
========================================= */

const mapLocations =
    document.querySelectorAll(
        ".map-location"
    );


mapLocations.forEach(
    location => {

        location.addEventListener(
            "click",
            () => {

                mapLocations.forEach(
                    item => {

                        item.classList.remove(
                            "active-location"
                        );

                    }
                );

                location.classList.add(
                    "active-location"
                );


                const selectedLocation =
                    location.dataset.location;


                locationMessage.innerHTML = `

                    <span>
                        LOCAL SELECIONADO
                    </span>

                    <strong>
                        ${selectedLocation.toUpperCase()}
                    </strong>

                `;


                locationMessage.animate(
                    [
                        {
                            transform:
                                "scale(0.95)",
                            opacity: 0.5
                        },

                        {
                            transform:
                                "scale(1)",
                            opacity: 1
                        }
                    ],
                    {
                        duration: 300
                    }
                );

            }
        );

    }
);


/* =========================================
   CHEFÕES
========================================= */

const bossButtons =
    document.querySelectorAll(
        ".boss-button"
    );


bossButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const boss =
                    button.dataset.boss;

                openModal(
                    `DESAFIO: ${boss.toUpperCase()}`,
                    `Você escolheu enfrentar ${boss}. Prepare-se para a batalha!`
                );

            }
        );

    }
);


/* =========================================
   PERSONAGENS
========================================= */

const characterCards =
    document.querySelectorAll(
        ".character-card"
    );


characterCards.forEach(
    card => {

        const button =
            card.querySelector(
                "button"
            );


        button.addEventListener(
            "click",
            () => {

                characterCards.forEach(
                    item => {

                        item.classList.remove(
                            "active-character"
                        );

                    }
                );


                card.classList.add(
                    "active-character"
                );


                const character =
                    card.dataset.character;


                openModal(
                    `${character.toUpperCase()} SELECIONADO`,
                    `Você escolheu ${character}. Este personagem está pronto para a aventura!`
                );

            }
        );

    }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".boss-card, .character-card, .about-content, .map"
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
            threshold: 0.15
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   NAVBAR ATIVA
========================================= */

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
            "";

        sections.forEach(
            section => {

                const top =
                    section.offsetTop - 180;

                const bottom =
                    top +
                    section.offsetHeight;


                if (
                    window.scrollY >= top &&
                    window.scrollY < bottom
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
                    ) === `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =========================================
   EFEITO PARALLAX
========================================= */

const heroCharacter =
    document.querySelector(
        ".hero-character"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!heroCharacter) return;

        const scroll =
            window.scrollY;


        if (scroll < 800) {

            heroCharacter.style.marginTop =
                `${scroll * 0.12}px`;

        }

    }
);


/* =========================================
   EFEITO NOS CARDS
========================================= */

const cards =
    document.querySelectorAll(
        ".boss-card"
    );


cards.forEach(
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
                    perspective(700px)
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


/* =========================================
   CLIQUE NO LOGO
========================================= */

const logo =
    document.querySelector(
        ".logo"
    );


if (logo) {

    logo.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   ANIMAÇÃO DE TÍTULOS
========================================= */

const titles =
    document.querySelectorAll(
        ".section-heading h2"
    );


titles.forEach(
    title => {

        title.addEventListener(
            "mouseenter",
            () => {

                title.animate(
                    [
                        {
                            transform:
                                "rotate(0deg)"
                        },

                        {
                            transform:
                                "rotate(-2deg)"
                        },

                        {
                            transform:
                                "rotate(1deg)"
                        },

                        {
                            transform:
                                "rotate(0deg)"
                        }
                    ],
                    {
                        duration: 400
                    }
                );

            }
        );

    }
);


/* =========================================
   CONSOLE
========================================= */

console.log(
    "%c☕ INK REALM",
    `
    color:#a5231d;
    font-size:28px;
    font-weight:bold;
    `
);

console.log(
    "%cProjeto carregado com sucesso!",
    `
    color:#30271d;
    font-size:14px;
    `
);