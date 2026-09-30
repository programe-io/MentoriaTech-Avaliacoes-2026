// ==========================================
// MENU MOBILE
// ==========================================

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {

    menu.classList.toggle("active");

});


// Fecha o menu ao clicar em uma opção

const menuLinks = document.querySelectorAll("#menu a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        menu.classList.remove("active");

    });

});


// ==========================================
// ESPECIALIDADES
// ==========================================

const specialties = {

    estetica: {
        icon: "✨",
        title: "Odontologia Estética",

        text:
            "A odontologia estética reúne procedimentos " +
            "destinados a melhorar a aparência e a harmonia " +
            "do sorriso. A indicação de cada procedimento " +
            "depende da avaliação individual do paciente."
    },

    clareamento: {
        icon: "🦷",
        title: "Clareamento Dental",

        text:
            "O clareamento dental é um procedimento que " +
            "pode modificar a tonalidade dos dentes. O " +
            "tratamento deve ser realizado de acordo com " +
            "avaliação e orientação odontológica."
    },

    implante: {
        icon: "🦷",
        title: "Implantodontia",

        text:
            "A implantodontia é a área da odontologia " +
            "relacionada ao planejamento e tratamento com " +
            "implantes dentários para reabilitação oral."
    },

    ortodontia: {
        icon: "😁",
        title: "Ortodontia",

        text:
            "A ortodontia trabalha com diagnóstico, " +
            "prevenção e tratamento de alterações na " +
            "posição dos dentes e na relação das arcadas."
    },

    prevencao: {
        icon: "🪥",
        title: "Prevenção",

        text:
            "A prevenção odontológica busca manter a saúde " +
            "bucal por meio de acompanhamento profissional, " +
            "higiene adequada e cuidados preventivos."
    },

    saudebucal: {
        icon: "❤️",
        title: "Saúde Bucal",

        text:
            "O acompanhamento da saúde bucal permite " +
            "avaliar as necessidades de cada paciente e " +
            "orientar cuidados para manutenção da saúde oral."
    }

};


// ==========================================
// MODAL
// ==========================================

const modal = document.getElementById("modal");

const closeModal =
    document.getElementById("closeModal");

const modalIcon =
    document.getElementById("modalIcon");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");


const specialtyButtons =
    document.querySelectorAll(".more-button");


specialtyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const specialtyName =
            button.dataset.specialty;

        const specialty =
            specialties[specialtyName];

        if (!specialty) {
            return;
        }

        modalIcon.textContent =
            specialty.icon;

        modalTitle.textContent =
            specialty.title;

        modalText.textContent =
            specialty.text;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// ==========================================
// FECHAR MODAL
// ==========================================

function closeSpecialtyModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


closeModal.addEventListener(
    "click",
    closeSpecialtyModal
);


// Fechar clicando fora da janela

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        closeSpecialtyModal();

    }

});


// Fechar usando ESC

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeSpecialtyModal();

    }

});


// ==========================================
// FORMULÁRIO
// ==========================================

const form =
    document.getElementById("contactForm");


form.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        message === ""
    ) {

        alert(
            "Por favor, preencha todos os campos."
        );

        return;

    }


    alert(
        "Obrigado, " +
        name +
        "!\n\n" +
        "Sua mensagem foi enviada com sucesso."
    );


    form.reset();

});


// ==========================================
// MÁSCARA DE TELEFONE
// ==========================================

const phoneInput =
    document.getElementById("phone");


phoneInput.addEventListener("input", function () {

    let value =
        phoneInput.value.replace(/\D/g, "");


    if (value.length > 11) {

        value = value.substring(0, 11);

    }


    if (value.length <= 10) {

        value =
            value.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

        value =
            value.replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );

    } else {

        value =
            value.replace(
                /^(\d{2})(\d)/,
                "($1) $2"
            );

        value =
            value.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );

    }


    phoneInput.value = value;

});


// ==========================================
// ANIMAÇÃO DOS CARDS
// ==========================================

const animatedElements =
    document.querySelectorAll(
        ".specialty-card, .about-image, .gallery-grid img"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


animatedElements.forEach(function (element) {

    observer.observe(element);

});


// ==========================================
// ESTILO DA ANIMAÇÃO
// ==========================================

const animationStyle =
    document.createElement("style");


animationStyle.textContent = `

    .specialty-card,
    .about-image,
    .gallery-grid img {

        opacity: 0;

        transform: translateY(25px);

        transition:
            opacity .7s ease,
            transform .7s ease;

    }

    .specialty-card.visible,
    .about-image.visible,
    .gallery-grid img.visible {

        opacity: 1;

        transform: translateY(0);

    }

`;


document.head.appendChild(animationStyle);