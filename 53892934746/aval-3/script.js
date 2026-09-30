// =====================================
// MENU MOBILE
// =====================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

});


// Fecha o menu ao clicar em um link

document.querySelectorAll("#nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

    });

});


// =====================================
// ESPECIALIDADES
// =====================================

const specialties = {

    estetica: {
        title: "Odontologia Estética",
        icon: "✨",

        description:
            "Área da odontologia voltada para procedimentos " +
            "que buscam melhorar a aparência e a harmonia " +
            "do sorriso, sempre considerando a avaliação " +
            "e indicação profissional."
    },


    clareamento: {
        title: "Clareamento Dental",
        icon: "🦷",

        description:
            "Procedimento odontológico destinado à alteração " +
            "da tonalidade dos dentes, realizado de acordo " +
            "com avaliação profissional e indicação adequada."
    },


    implantes: {
        title: "Implantodontia",
        icon: "🦷",

        description:
            "Área da odontologia relacionada ao planejamento " +
            "e tratamento com implantes dentários para " +
            "reabilitação oral."
    },


    ortodontia: {
        title: "Ortodontia",
        icon: "😁",

        description:
            "Área odontológica relacionada ao diagnóstico, " +
            "prevenção e tratamento das alterações de " +
            "posição dos dentes e da relação das arcadas."
    },


    prevencao: {
        title: "Prevenção Odontológica",
        icon: "🪥",

        description:
            "A prevenção busca preservar a saúde bucal por " +
            "meio de acompanhamento profissional, higiene " +
            "adequada e cuidados preventivos."
    },


    saude: {
        title: "Saúde Bucal",
        icon: "❤️",

        description:
            "Acompanhamento odontológico destinado à manutenção " +
            "da saúde oral e identificação de necessidades " +
            "de tratamento."
    }

};


// =====================================
// MODAL
// =====================================

const modal =
    document.getElementById("modal");

const modalTitle =
    document.getElementById("modalTitle");

const modalIcon =
    document.getElementById("modalIcon");

const modalDescription =
    document.getElementById("modalDescription");

const closeModal =
    document.getElementById("closeModal");


// Abrir modal

document.querySelectorAll(".details")
    .forEach(button => {

        button.addEventListener("click", () => {

            const specialtyId =
                button.dataset.specialty;

            const specialty =
                specialties[specialtyId];

            if (!specialty) {
                return;
            }

            modalTitle.textContent =
                specialty.title;

            modalIcon.textContent =
                specialty.icon;

            modalDescription.textContent =
                specialty.description;

            modal.classList.add("active");

            document.body.style.overflow =
                "hidden";

        });

    });


// Fechar modal

function closeSpecialtyModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


closeModal.addEventListener(
    "click",
    closeSpecialtyModal
);


// Clicar fora

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeSpecialtyModal();

    }

});


// ESC

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeSpecialtyModal();

    }

});


// =====================================
// FORMULÁRIO
// =====================================

const form =
    document.getElementById("contactForm");

form.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name")
            .value
            .trim();

    const email =
        document.getElementById("email")
            .value
            .trim();

    const phone =
        document.getElementById("phone")
            .value
            .trim();

    const message =
        document.getElementById("message")
            .value
            .trim();


    if (!name || !email || !phone || !message) {

        alert(
            "Preencha todos os campos antes de enviar."
        );

        return;

    }


    alert(
        `Olá, ${name}!\n\n` +
        "Sua mensagem foi registrada neste exemplo " +
        "de site.\n\n" +
        "Para receber mensagens reais, conecte " +
        "o formulário a um serviço de backend ou " +
        "WhatsApp."
    );


    form.reset();

});


// =====================================
// ANIMAÇÃO AO ROLAR
// =====================================

const elements =
    document.querySelectorAll(
        ".card, .about-image, .gallery-grid img"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


elements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(element);

});


// Adiciona a animação quando o elemento aparece

const style =
    document.createElement("style");

style.textContent = `
    .show {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(style);