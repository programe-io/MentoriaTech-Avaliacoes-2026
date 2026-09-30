// ================================
// MENU MOBILE
// ================================

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});


// Fecha o menu ao clicar em um link

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


// ================================
// TEMA ESCURO
// ================================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeButton.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


// Mantém o tema escolhido

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}


// ================================
// PESQUISA DE PERSONAGENS
// ================================

const searchInput = document.getElementById("searchInput");
const characterCards = document.querySelectorAll(".character-card");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {

    const search = searchInput.value
        .toLowerCase()
        .trim();

    let found = false;

    characterCards.forEach(card => {

        const name = card.dataset.name;

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


// ================================
// MODAL DOS PERSONAGENS
// ================================

const modal = document.getElementById("characterModal");
const modalClose = document.getElementById("modalClose");

const modalName = document.getElementById("modalName");
const modalRole = document.getElementById("modalRole");
const modalDescription = document.getElementById("modalDescription");

const detailsButtons =
    document.querySelectorAll(".details-button");


detailsButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        const card =
            button.closest(".character-card");

        const name =
            card.dataset.character;

        const role =
            card.dataset.role;

        const description =
            card.dataset.description;


        modalName.textContent = name;

        modalRole.textContent = role;

        modalDescription.textContent = description;


        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// Fecha o modal

modalClose.addEventListener("click", closeModal);


// Fecha clicando fora do conteúdo

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


// Fecha com ESC

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


// ================================
// FORMULÁRIO
// ================================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    formMessage.textContent =
        `Obrigado, ${name}! Sua mensagem foi registrada.`;


    contactForm.reset();


    setTimeout(() => {

        formMessage.textContent = "";

    }, 5000);

});


// ================================
// ANIMAÇÃO AO APARECER NA TELA
// ================================

const animatedElements =
    document.querySelectorAll(
        ".character-card, .episode-card, .info-card"
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

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});
