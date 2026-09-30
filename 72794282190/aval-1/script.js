/* =========================================================
   DIÁRIO DE UMA PAIXÃO
   JAVASCRIPT PRINCIPAL
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

const readMore = document.getElementById("readMore");
const extraStory = document.getElementById("extraStory");

const quoteButton = document.getElementById("quoteButton");
const newQuote = document.getElementById("newQuote");

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");

const characterModal = document.getElementById("characterModal");
const modalClose = document.getElementById("modalClose");

const modalLabel = document.getElementById("modalLabel");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const newsletterForm = document.getElementById("newsletterForm");
const email = document.getElementById("email");
const formMessage = document.getElementById("formMessage");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   HEADER AO ROLAR
========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================================
   MENU MOBILE
========================================================= */

menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Fecha o menu ao clicar em um link */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================================
   LER MAIS
========================================================= */

readMore.addEventListener("click", () => {

    extraStory.classList.toggle("open");

    if (extraStory.classList.contains("open")) {

        readMore.innerHTML =
            'Ler menos <span>↑</span>';

    } else {

        readMore.innerHTML =
            'Ler mais <span>→</span>';

    }

});


/* =========================================================
   FRASES
========================================================= */

const quotes = [

    {
        text: "Algumas histórias de amor são eternas porque nunca deixam de ser lembradas.",
        author: "— Diário de uma Paixão"
    },

    {
        text: "O tempo pode mudar muitas coisas, mas algumas lembranças permanecem.",
        author: "— Uma história sobre memórias"
    },

    {
        text: "Há sentimentos que encontram uma maneira de permanecer.",
        author: "— Diário de uma Paixão"
    },

    {
        text: "Às vezes, o coração se lembra daquilo que o mundo tentou fazer esquecer.",
        author: "— Uma história de amor"
    },

    {
        text: "Uma grande história pode continuar viva mesmo depois que o tempo passa.",
        author: "— Diário de uma Paixão"
    }

];


let currentQuote = 0;


function showQuote() {

    currentQuote++;

    if (currentQuote >= quotes.length) {
        currentQuote = 0;
    }

    quoteText.style.opacity = "0";

    setTimeout(() => {

        quoteText.textContent =
            quotes[currentQuote].text;

        quoteAuthor.textContent =
            quotes[currentQuote].author;

        quoteText.style.opacity = "1";

    }, 250);

}


newQuote.addEventListener("click", showQuote);


/*
   Botão "Uma frase" do hero
   leva o usuário até a seção de frases.
*/

quoteButton.addEventListener("click", () => {

    document
        .getElementById("frases")
        .scrollIntoView({
            behavior: "smooth"
        });

    setTimeout(showQuote, 700);

});


/* =========================================================
   PERSONAGENS / MODAL
========================================================= */

const characters = {

    noah: {
        label: "Ryan Gosling",
        title: "Noah Calhoun",
        description:
            "Noah é apresentado como um jovem apaixonado, determinado e disposto a lutar pelo relacionamento que considera importante. Sua história com Allie atravessa diferentes momentos de suas vidas."
    },

    allie: {
        label: "Rachel McAdams",
        title: "Allie Hamilton",
        description:
            "Allie é uma jovem de origem privilegiada que vive uma intensa história de amor durante um verão. Ao longo da narrativa, ela precisa lidar com escolhas, expectativas familiares e sentimentos."
    },

    duke: {
        label: "James Garner",
        title: "Duke",
        description:
            "Duke é o homem que narra uma história de amor para uma mulher em uma casa de repouso. A narrativa conduz o público pelas memórias de Noah e Allie."
    },

    lon: {
        label: "James Marsden",
        title: "Lon Hammond",
        description:
            "Lon é um personagem ligado à vida adulta de Allie e representa uma das escolhas que ela precisa considerar quando sua vida toma um rumo diferente."
    }

};


const characterButtons =
    document.querySelectorAll(".character-button");


characterButtons.forEach(button => {

    button.addEventListener("click", event => {

        const card =
            event.target.closest(".character-card");

        const characterName =
            card.dataset.character;

        const character =
            characters[characterName];

        if (!character) return;

        modalLabel.textContent =
            character.label;

        modalTitle.textContent =
            character.title;

        modalDescription.textContent =
            character.description;

        characterModal.classList.add("active");

        characterModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    });

});


/* =========================================================
   FECHAR MODAL
========================================================= */

function closeModal() {

    characterModal.classList.remove("active");

    characterModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


/* Fecha clicando fora do conteúdo */

characterModal.addEventListener("click", event => {

    if (
        event.target.classList.contains(
            "modal-overlay"
        )
    ) {
        closeModal();
    }

});


/* Fecha pressionando ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
    }

});


/* =========================================================
   TIMELINE
========================================================= */

const timelineItems =
    document.querySelectorAll(".timeline-item");


timelineItems.forEach(item => {

    item.addEventListener("click", () => {

        timelineItems.forEach(
            timeline =>
                timeline.classList.remove("active")
        );

        item.classList.add("active");

    });

});


/* =========================================================
   NEWSLETTER
========================================================= */

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const emailValue =
        email.value.trim();


    if (emailValue === "") {

        formMessage.textContent =
            "Digite seu e-mail.";

        return;

    }


    /*
       Validação simples de e-mail.
    */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(emailValue)) {

        formMessage.textContent =
            "Digite um e-mail válido.";

        return;

    }


    formMessage.textContent =
        "Inscrição realizada com sucesso!";


    email.value = "";

});


/* =========================================================
   ANIMAÇÃO DE REVELAÇÃO
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-header, .intro-content, .story-grid, .character-card, .timeline-item, .gallery-item, .newsletter-content"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ANIMAÇÃO DOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(".character-card");


cards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.08}s`;

});


/* =========================================================
   ANO DO FOOTER
========================================================= */

currentYear.textContent =
    new Date().getFullYear();


/* =========================================================
   EFEITO SUAVE NO TEXTO DA QUOTE
========================================================= */

quoteText.style.transition =
    "opacity 0.25s ease";


/* =========================================================
   LOG NO CONSOLE
========================================================= */

console.log(
    "Diário de uma Paixão — projeto carregado com sucesso."
);