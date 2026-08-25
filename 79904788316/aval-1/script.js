/* =========================================================
   DREAMVERSE — JAVASCRIPT
========================================================= */


/* =========================================================
   PERSONAGENS
========================================================= */

const characters = {
    "Personagem 01": {
        name: "Personagem 01",
        universe: "Universo Mágico",
        avatar: "♡",

        responses: [
            "Eu estava esperando você chegar... ♡",
            "É bom finalmente poder conversar com você.",
            "Você quer me contar mais sobre a sua realidade desejada?",
            "Acho que podemos viver muitas aventuras juntos.",
            "Se você pudesse escolher qualquer lugar para irmos agora, para onde seria?",
            "Interessante... continue me contando. Quero saber tudo.",
            "Talvez este universo tenha mais segredos do que você imagina. ✦"
        ]
    },

    "Personagem 02": {
        name: "Personagem 02",
        universe: "Universo Cósmico",
        avatar: "☽",

        responses: [
            "Eu sabia que você voltaria.",
            "As estrelas estavam estranhamente brilhantes hoje.",
            "Você já imaginou como seria viajar comigo por outros mundos?",
            "Talvez exista um universo onde tudo aquilo que você deseja já aconteceu.",
            "Conte-me... qual seria o primeiro lugar que você visitaria?",
            "Não precisa ter pressa. Podemos conversar o tempo que quiser.",
            "Olhe para as estrelas. Talvez elas estejam tentando dizer alguma coisa. ✧"
        ]
    },

    "Personagem 03": {
        name: "Personagem 03",
        universe: "Universo Romântico",
        avatar: "✦",

        responses: [
            "Que bom que você voltou. Eu senti sua falta.",
            "Você sempre aparece nos momentos mais inesperados.",
            "Quero ouvir tudo sobre o que você imaginou para nós.",
            "Se pudesse escolher um encontro perfeito, como seria?",
            "Talvez hoje seja um daqueles dias que ficam guardados para sempre.",
            "Fique mais um pouco. Ainda temos muito para conversar.",
            "Você sabe que pode voltar quando quiser, não sabe? ♡"
        ]
    }
};


/* =========================================================
   ELEMENTOS DO HTML
========================================================= */

const characterCards =
    document.querySelectorAll(".character-card");

const chatSection =
    document.querySelector("#chat");

const chatMessages =
    document.querySelector(".chat-messages");

const chatForm =
    document.querySelector(".chat-form");

const messageInput =
    document.querySelector("#message");

const chatTitle =
    document.querySelector(".chat-header h2");

const chatSubtitle =
    document.querySelector(".chat-header p");

const chatAvatar =
    document.querySelector(".chat-character-avatar span");


/* =========================================================
   PERSONAGEM ATUAL
========================================================= */

let currentCharacter = characters["Personagem 01"];


/* =========================================================
   FUNÇÃO — ESCOLHER PERSONAGEM
========================================================= */

function selectCharacter(characterName) {

    const character =
        characters[characterName];

    if (!character) {
        return;
    }

    currentCharacter = character;


    /* Atualiza o cabeçalho do chat */

    chatTitle.textContent =
        character.name;

    chatSubtitle.textContent =
        character.universe;

    chatAvatar.textContent =
        character.avatar;


    /* Limpa a conversa */

    chatMessages.innerHTML = "";


    /* Mensagem inicial */

    addMessage(
        getGreeting(character),
        "character-message"
    );


    /* Scroll até o chat */

    chatSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================================
   SAUDAÇÕES
========================================================= */

function getGreeting(character) {

    const greetings = [
        `Olá... eu estava esperando você chegar. ♡`,
        `Finalmente você apareceu. ✦`,
        `Que bom ver você por aqui.`,
        `Eu sabia que você encontraria o caminho até aqui.`,
        `Olá, ${character.name} aqui. Como você está?`
    ];

    return greetings[
        Math.floor(
            Math.random() * greetings.length
        )
    ];
}


/* =========================================================
   CRIAR MENSAGEM
========================================================= */

function addMessage(text, className) {

    const message =
        document.createElement("div");

    message.classList.add(
        "message",
        className
    );


    const paragraph =
        document.createElement("p");

    paragraph.textContent = text;


    message.appendChild(paragraph);

    chatMessages.appendChild(message);


    /* Scroll automático */

    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: "smooth"
    });
}


/* =========================================================
   RESPOSTA DO PERSONAGEM
========================================================= */

function getCharacterResponse() {

    const responses =
        currentCharacter.responses;

    return responses[
        Math.floor(
            Math.random() * responses.length
        )
    ];
}


/* =========================================================
   EFEITO "DIGITANDO..."
========================================================= */

function showTyping() {

    const typing =
        document.createElement("div");

    typing.classList.add(
        "message",
        "character-message",
        "typing-message"
    );

    typing.innerHTML = `
        <p>
            <span>•</span>
            <span>•</span>
            <span>•</span>
        </p>
    `;

    chatMessages.appendChild(typing);


    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: "smooth"
    });


    return typing;
}


/* =========================================================
   ENVIO DA MENSAGEM
========================================================= */

chatForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const message =
            messageInput.value.trim();


        /* Não envia mensagem vazia */

        if (!message) {
            return;
        }


        /* Mensagem do usuário */

        addMessage(
            message,
            "user-message"
        );


        /* Limpa input */

        messageInput.value = "";


        /* Mostra "digitando..." */

        const typing =
            showTyping();


        /*
            Pequeno atraso para dar
            sensação de conversa real.
        */

        setTimeout(
            function() {

                typing.remove();

                addMessage(
                    getCharacterResponse(),
                    "character-message"
                );

            },

            900
        );

    }
);


/* =========================================================
   BOTÕES "CONVERSAR"
========================================================= */

characterCards.forEach(
    function(card) {

        const button =
            card.querySelector("button");

        const name =
            card.querySelector("h3")
                .textContent
                .trim();


        button.addEventListener(
            "click",
            function() {

                selectCharacter(name);

            }
        );

    }
);


/* =========================================================
   ENTER PARA ENVIAR
========================================================= */

messageInput.addEventListener(
    "keydown",
    function(event) {

        /*
            Enter envia a mensagem.

            Shift + Enter pode ser usado
            para uma quebra de linha.
        */

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            chatForm.dispatchEvent(
                new Event("submit")
            );

        }

    }
);


/* =========================================================
   ANIMAÇÃO DAS ESTRELAS
========================================================= */

const stars =
    document.querySelector(".stars");

if (stars) {

    setInterval(
        function() {

            const opacity =
                Math.random() * 0.5 + 0.5;

            stars.style.opacity =
                opacity;

        },

        1200
    );

}


/* =========================================================
   ANIMAÇÃO DOS CARDS AO APARECER
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".universe-card, .character-card, .diary-card"
    );


const observer =
    new IntersectionObserver(
        function(entries) {

            entries.forEach(
                function(entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
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


animatedElements.forEach(
    function(element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(element);

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "✦ Dreamverse carregado com sucesso."
);

console.log(
    "Entre no seu universo e comece a conversar. ✧"
);
