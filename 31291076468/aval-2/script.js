// ========================================
// MENU MOBILE
// ========================================

const menuToggle =
    document.getElementById("menuToggle");

const nav =
    document.getElementById("nav");


menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {

        menuToggle.textContent = "✕";

    } else {

        menuToggle.textContent = "☰";

    }

});


// Fecha o menu quando clicar em um link

const navLinks =
    document.querySelectorAll(".nav a");


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


// ========================================
// TEMA ESCURO
// ========================================

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// Verifica tema salvo

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}


// ========================================
// PESQUISA DE ÁREAS
// ========================================

const searchInput =
    document.getElementById("searchInput");

const areaCards =
    document.querySelectorAll(".area-card");

const noResults =
    document.getElementById("noResults");


searchInput.addEventListener("input", () => {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let found = false;


    areaCards.forEach(card => {

        const name =
            card.dataset.name
                .toLowerCase();


        if (name.includes(search)) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    if (found) {

        noResults.style.display = "none";

    } else {

        noResults.style.display = "block";

    }

});


// ========================================
// MODAL
// ========================================

const modal =
    document.getElementById("areaModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalLabel =
    document.getElementById("modalLabel");

const modalDescription =
    document.getElementById("modalDescription");


const detailsButtons =
    document.querySelectorAll(".details-button");


detailsButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();


        const card =
            button.closest(".area-card");


        const title =
            card.dataset.title;

        const description =
            card.dataset.description;


        modalTitle.textContent =
            title;

        modalDescription.textContent =
            description;


        modalLabel.textContent =
            "ÁREA DO JORNALISMO";


        modal.classList.add("active");


        document.body.style.overflow =
            "hidden";

    });

});


// ========================================
// FECHAR MODAL
// ========================================

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


// ========================================
// FORMULÁRIO
// ========================================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    formMessage.textContent =
        `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;


    contactForm.reset();


    setTimeout(() => {

        formMessage.textContent = "";

    }, 5000);

});


// ========================================
// ANIMAÇÕES
// ========================================

const animatedElements =
    document.querySelectorAll(
        ".area-card, .skill, .stat-card, .career-step"
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
            threshold: 0.15
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    observer.observe(element);

});


// ========================================
// ANO AUTOMÁTICO
// ========================================

const currentYear =
    new Date().getFullYear();

console.log(
    `Site de Jornalismo - ${currentYear}`
);
