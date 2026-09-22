/* =========================================================
   WERBENNA — PORTFÓLIO FUTURISTA
   SCRIPT.JS
========================================================= */


/* =========================================================
   CURSOR
========================================================= */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

});


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

});


const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


/* =========================================================
   ANIMAÇÃO AO ENTRAR NA TELA
========================================================= */

const animatedElements = document.querySelectorAll(
    ".section-title, .about-grid, .mission, .lab-card, .skill, .tech-card, .timeline-item, .experience-box, .contact-box"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

});


/* =========================================================
   MODAL
========================================================= */

const modal = document.querySelector("#labModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector(".close-modal");

const labButtons = document.querySelectorAll(".lab-button");


function openModal(content) {

    modalContent.innerHTML = content;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeTheModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


closeModal.addEventListener("click", closeTheModal);


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeTheModal();

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeTheModal();

    }

});


/* =========================================================
   LABORATÓRIO — EXPERIÊNCIA WEB
========================================================= */

function webExperiment() {

    openModal(`

        <div class="web-experiment">

            <h2>🌐 Experiência Web</h2>

            <p>
                Agora você pode brincar com uma pequena interface
                e mudar sua aparência em tempo real.
            </p>

            <div class="preview-box" id="previewBox">

                <div>

                    <h3>Minha Interface</h3>

                    <p>
                        Escolha uma cor abaixo.
                    </p>

                </div>

            </div>

            <div>

                <p>
                    <strong>Escolha uma atmosfera:</strong>
                </p>

                <div class="color-controls">

                    <button
                        class="color-purple"
                        data-color="#a855f7"
                        aria-label="Roxo">
                    </button>

                    <button
                        class="color-blue"
                        data-color="#3b82f6"
                        aria-label="Azul">
                    </button>

                    <button
                        class="color-green"
                        data-color="#10b981"
                        aria-label="Verde">
                    </button>

                    <button
                        class="color-pink"
                        data-color="#ec4899"
                        aria-label="Rosa">
                    </button>

                </div>

            </div>

        </div>

    `);


    const previewBox = document.querySelector("#previewBox");

    const colorButtons =
        document.querySelectorAll(".color-controls button");


    colorButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const color = button.dataset.color;

            previewBox.style.background =
                `linear-gradient(
                    135deg,
                    ${color},
                    #050507
                )`;

            previewBox.style.boxShadow =
                `0 0 50px ${color}55`;

        });

    });

}


/* =========================================================
   LABORATÓRIO — PARTÍCULAS
========================================================= */

function particleExperiment() {

    openModal(`

        <div>

            <h2>🧪 Laboratório Criativo</h2>

            <p>
                Clique ou toque dentro do laboratório.
                Cada clique cria uma partícula.
            </p>

            <div
                class="particle-playground"
                id="particlePlayground">
            </div>

            <p>
                Experimente criar várias partículas
                e observe a animação.
            </p>

        </div>

    `);


    const playground =
        document.querySelector("#particlePlayground");


    playground.addEventListener("click", (event) => {

        const particle =
            document.createElement("span");

        particle.className = "play-particle";


        const rect =
            playground.getBoundingClientRect();


        particle.style.left =
            `${event.clientX - rect.left}px`;

        particle.style.top =
            `${event.clientY - rect.top}px`;


        playground.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 1500);

    });

}


/* =========================================================
   LABORATÓRIO — MINI IA
========================================================= */

function aiExperiment() {

    openModal(`

        <div class="ai-chat">

            <h2>🤖 WERB-AI</h2>

            <p>
                Uma pequena simulação de assistente digital
                criada com JavaScript.
            </p>

            <div
                class="chat-messages"
                id="chatMessages">

                <div class="chat-message bot-message">

                    Olá! 👋

                    Eu sou a WERB-AI.

                    Pergunte alguma coisa sobre
                    desenvolvimento web!

                </div>

            </div>

            <div class="chat-input">

                <input
                    id="chatInput"
                    type="text"
                    placeholder="Digite sua mensagem..."
                    autocomplete="off"
                >

                <button id="sendChat">
                    ENVIAR
                </button>

            </div>

        </div>

    `);


    const chatInput =
        document.querySelector("#chatInput");

    const sendChat =
        document.querySelector("#sendChat");

    const chatMessages =
        document.querySelector("#chatMessages");


    function sendMessage() {

        const message =
            chatInput.value.trim();


        if (!message) {

            return;

        }


        /* mensagem do usuário */

        const userMessage =
            document.createElement("div");

        userMessage.className =
            "chat-message user-message";

        userMessage.textContent =
            message;

        chatMessages.appendChild(userMessage);


        chatInput.value = "";


        /* resposta da WERB-AI */

        setTimeout(() => {

            const botMessage =
                document.createElement("div");

            botMessage.className =
                "chat-message bot-message";


            const lowerMessage =
                message.toLowerCase();


            let response =
                "Interessante! 🚀 Continue explorando e transformando suas ideias em código.";


            if (
                lowerMessage.includes("html")
            ) {

                response =
                    "HTML é responsável pela estrutura de uma página web. É como o esqueleto do site! 🧱";

            }


            else if (
                lowerMessage.includes("css")
            ) {

                response =
                    "CSS cuida da aparência: cores, tamanhos, layouts, animações e muito mais. 🎨";

            }


            else if (
                lowerMessage.includes("javascript") ||
                lowerMessage.includes("js")
            ) {

                response =
                    "JavaScript adiciona comportamento e interatividade às páginas. É ele que faz este laboratório funcionar! ⚡";

            }


            else if (
                lowerMessage.includes("werb") ||
                lowerMessage.includes("werbenna")
            ) {

                response =
                    "Werbenna é uma estudante que está construindo sua jornada no desenvolvimento web. 💜";

            }


            else if (
                lowerMessage.includes("oi") ||
                lowerMessage.includes("olá") ||
                lowerMessage.includes("ola")
            ) {

                response =
                    "Oi! 👋 Que bom ter você explorando meu laboratório digital.";

            }


            else if (
                lowerMessage.includes("tecnologia")
            ) {

                response =
                    "Tecnologia é uma ferramenta incrível para transformar ideias em experiências que podem chegar a muitas pessoas. ✦";

            }


            botMessage.textContent =
                response;

            chatMessages.appendChild(botMessage);


            chatMessages.scrollTop =
                chatMessages.scrollHeight;

        }, 500);

    }


    sendChat.addEventListener(
        "click",
        sendMessage
    );


    chatInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                sendMessage();

            }

        }
    );

}


/* =========================================================
   BOTÕES DOS LABORATÓRIOS
========================================================= */

labButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const laboratory =
            button.dataset.lab;


        if (laboratory === "web") {

            webExperiment();

        }


        if (laboratory === "particles") {

            particleExperiment();

        }


        if (laboratory === "ai") {

            aiExperiment();

        }

    });

});


/* =========================================================
   FORMULÁRIO DE CONTATO
========================================================= */

const contactForm =
    document.querySelector("#contactForm");

const formMessage =
    document.querySelector("#formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.querySelector("#name").value.trim();

    const email =
        document.querySelector("#email").value.trim();

    const message =
        document.querySelector("#message").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
            "Preencha todos os campos.";

        return;

    }


    formMessage.textContent =
        `Mensagem preparada, ${name}! ✦`;


    contactForm.reset();

});


/* =========================================================
   EFEITO 3D NOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(
        ".lab-card, .tech-card"
    );


cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();


        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -4;

        const rotateY =
            ((x - centerX) / centerX) * 4;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});


/* =========================================================
   ANIMAÇÃO DE TEXTO DO STATUS
========================================================= */

const status =
    document.querySelector(".system-status");


if (status) {

    const originalText =
        status.innerHTML;


    setInterval(() => {

        status.style.opacity =
            status.style.opacity === "0.35"
                ? "1"
                : "0.35";

    }, 1800);

}


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

const footer =
    document.querySelector("footer");


if (footer) {

    footer.innerHTML =
        footer.innerHTML.replace(
            "© 2026",
            `© ${new Date().getFullYear()}`
        );

}


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c✦ WERBENNA DIGITAL UNIVERSE ONLINE ✦",
    "color:#c084fc;font-size:16px;font-weight:bold;"
);

console.log(
    "Sistema carregado com sucesso."
);