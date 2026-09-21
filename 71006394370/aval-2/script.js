/* =========================================================
   FERNANDES PORTFOLIO
   JavaScript
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const header = document.getElementById("header");
const nav = document.getElementById("nav");
const menuButton = document.getElementById("menuButton");

const modal = document.getElementById("projectModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalAction = document.getElementById("modalAction");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const contactForm = document.getElementById("contactForm");
const copyEmail = document.getElementById("copyEmail");

const year = document.getElementById("year");


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

year.textContent = new Date().getFullYear();


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

menuButton.addEventListener("click", () => {

    nav.classList.toggle("open");

    menuButton.classList.toggle("active");

});


/* Fechar menu ao clicar em um link */

document.querySelectorAll(".nav-link, .nav-contact").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.classList.remove("active");

    });

});


/* =========================================================
   NAVEGAÇÃO ATIVA
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

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
   PROJETOS
========================================================= */

const projects = {

    portfolio: {

        number: "PROJETO 01 / WEB",

        title: "Portfólio pessoal",

        description:
            "Um website desenvolvido para apresentar a trajetória, os conhecimentos, interesses e projetos de Fernandes. A proposta utiliza uma interface moderna, responsiva e focada em experiência do usuário.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ]

    },

    sistema: {

        number: "PROJETO 02 / SISTEMA",

        title: "Sistema de estudos",

        description:
            "Conceito de uma plataforma para ajudar estudantes a organizar tarefas, acompanhar atividades e estruturar sua rotina de estudos.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "UI/UX"
        ]

    },

    laboratorio: {

        number: "PROJETO 03 / EXPERIMENTO",

        title: "Laboratório Web",

        description:
            "Ambiente criado para experimentar novas interfaces, animações, componentes e ideias relacionadas ao desenvolvimento web.",

        technologies: [
            "Front-end",
            "JavaScript",
            "CSS",
            "Experimentos"
        ]

    }

};


/* =========================================================
   ABRIR MODAL
========================================================= */

document.querySelectorAll(".project-button").forEach(button => {

    button.addEventListener("click", () => {

        const projectId = button.dataset.project;

        const project = projects[projectId];

        if (!project) return;

        modalNumber.textContent = project.number;

        modalTitle.textContent = project.title;

        modalDescription.textContent = project.description;

        modalTech.innerHTML = "";

        project.technologies.forEach(technology => {

            const tag = document.createElement("span");

            tag.textContent = technology;

            modalTech.appendChild(tag);

        });

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    });

});


/* =========================================================
   FECHAR MODAL
========================================================= */

function closeModal() {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", closeModal);

modalAction.addEventListener("click", closeModal);


/* ESC PARA FECHAR */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* =========================================================
   COPIAR E-MAIL
========================================================= */

copyEmail.addEventListener("click", async () => {

    const email = document.getElementById("emailText").textContent.trim();

    try {

        await navigator.clipboard.writeText(email);

        showToast("E-mail copiado para a área de transferência!");

        copyEmail.textContent = "Copiado ✓";

        setTimeout(() => {

            copyEmail.textContent = "Copiar e-mail";

        }, 2500);

    } catch (error) {

        showToast("Não foi possível copiar o e-mail.");

    }

});


/* =========================================================
   FORMULÁRIO
========================================================= */

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        showToast("Preencha todos os campos.");

        return;

    }

    if (!isValidEmail(email)) {

        showToast("Digite um e-mail válido.");

        return;

    }

    const button = contactForm.querySelector(".submit-button");

    const originalHTML = button.innerHTML;

    button.innerHTML = `
        <span>Enviando...</span>
        <span>...</span>
    `;

    button.disabled = true;


    /*
       Aqui você pode conectar futuramente
       o formulário a um backend ou serviço
       de envio de mensagens.
    */

    setTimeout(() => {

        button.innerHTML = `
            <span>Mensagem enviada ✓</span>
            <span>✓</span>
        `;

        showToast(`Obrigado pela mensagem, ${name}!`);

        contactForm.reset();

        setTimeout(() => {

            button.innerHTML = originalHTML;

            button.disabled = false;

        }, 3000);

    }, 1200);

});


/* =========================================================
   VALIDAR E-MAIL
========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("active");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("active");

    }, 3500);

}


/* =========================================================
   FECHAR MENU QUANDO CLICAR FORA
========================================================= */

document.addEventListener("click", event => {

    const clickedInsideNav = nav.contains(event.target);

    const clickedMenuButton = menuButton.contains(event.target);

    if (
        nav.classList.contains("open") &&
        !clickedInsideNav &&
        !clickedMenuButton
    ) {

        nav.classList.remove("open");

        menuButton.classList.remove("active");

    }

});


/* =========================================================
   EFEITO DE MOVIMENTO NO CARD DE CÓDIGO
========================================================= */

const visualCard = document.querySelector(".visual-card");

if (visualCard && window.innerWidth > 900) {

    document.addEventListener("mousemove", event => {

        const x = (window.innerWidth / 2 - event.clientX) / 80;

        const y = (window.innerHeight / 2 - event.clientY) / 100;

        visualCard.style.transform = `
            perspective(1000px)
            rotateY(${x}deg)
            rotateX(${y}deg)
        `;

    });

}


/* =========================================================
   SMOOTH SCROLL PERSONALIZADO
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId = anchor.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight = header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c Fernandes Portfolio ",
    "background:#d8ff3e;color:#07090d;font-size:16px;font-weight:bold;padding:8px;"
);

console.log(
    "Website desenvolvido com HTML, CSS e JavaScript."
);
