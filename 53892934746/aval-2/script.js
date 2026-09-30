// ==========================================
// MENU MOBILE
// ==========================================

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


// ==========================================
// DADOS DAS ESPECIALIDADES
// ==========================================

const specialties = {

    analises: {

        title: "Análises Clínicas",

        icon: "🧬",

        text:
            "Área da Biomedicina relacionada à realização " +
            "e análise de exames laboratoriais. A atuação " +
            "deve observar a habilitação profissional e " +
            "as normas aplicáveis."

    },


    estetica: {

        title: "Biomedicina Estética",

        icon: "✨",

        text:
            "Área de atuação voltada à estética dentro das " +
            "competências, habilitações profissionais e " +
            "regulamentações aplicáveis à Biomedicina."

    },


    microbiologia: {

        title: "Microbiologia",

        icon: "🔬",

        text:
            "Área dedicada ao estudo dos microrganismos, " +
            "suas características e suas relações com " +
            "diferentes processos biológicos."

    },


    hematologia: {

        title: "Hematologia",

        icon: "🩸",

        text:
            "Área relacionada ao estudo do sangue, células " +
            "sanguíneas e processos relacionados ao " +
            "sistema hematológico."

    },


    imunologia: {

        title: "Imunologia",

        icon: "🧪",

        text:
            "Área dedicada ao estudo do sistema imunológico, " +
            "suas células, mecanismos de defesa e respostas."

    },


    bemestar: {

        title: "Saúde e Bem-estar",

        icon: "❤️",

        text:
            "Área relacionada à promoção da saúde, qualidade " +
            "de vida e cuidados que estejam dentro das " +
            "competências profissionais aplicáveis."

    }

};


// ==========================================
// MODAL
// ==========================================

const modal =
    document.getElementById("modal");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalIcon =
    document.getElementById("modalIcon");

const closeModal =
    document.getElementById("closeModal");

const modalContact =
    document.getElementById("modalContact");


// Abrir especialidade

document.querySelectorAll(".details-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const id =
                button.dataset.specialty;

            const specialty =
                specialties[id];

            if (!specialty) {
                return;
            }

            modalTitle.textContent =
                specialty.title;

            modalText.textContent =
                specialty.text;

            modalIcon.textContent =
                specialty.icon;

            modal.classList.add("active");

            document.body.style.overflow =
                "hidden";

        });

    });


// Fechar modal

function closeSpecialtyModal() {

    modal.classList.remove("active");

    document.body.style.overflow =
        "";

}


closeModal.addEventListener(
    "click",
    closeSpecialtyModal
);


// Clicar fora do modal

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeSpecialtyModal();

    }

});


// Tecla ESC

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeSpecialtyModal();

    }

});


// ==========================================
// BOTÃO "TENHO INTERESSE"
// ==========================================

modalContact.addEventListener("click", () => {

    closeSpecialtyModal();

    document
        .getElementById("contato")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ==========================================
// FORMULÁRIO
// ==========================================

const form =
    document.getElementById("contactForm");

form.addEventListener("submit", event => {

    event.preventDefault();

    const nome =
        document.getElementById("nome")
            .value
            .trim();

    const email =
        document.getElementById("email")
            .value
            .trim();

    const mensagem =
        document.getElementById("mensagem")
            .value
            .trim();


    if (!nome || !email || !mensagem) {

        alert(
            "Por favor, preencha todos os campos."
        );

        return;

    }


    alert(
        `Olá, ${nome}!\n\n` +
        "Sua mensagem foi preenchida com sucesso. " +
        "Para receber mensagens de verdade, " +
        "será necessário conectar este formulário " +
        "a um serviço de envio."
    );


    form.reset();

});


// ==========================================
// ANIMAÇÃO DOS CARDS
// ==========================================

const animatedElements =
    document.querySelectorAll(
        ".specialty-card, .service, .about-image"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(element);

});