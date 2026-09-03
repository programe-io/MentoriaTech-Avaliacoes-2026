// ================================
// MODO ESCURO
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


// Recuperar tema salvo

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";
}


// ================================
// MODAL DOS POSTS
// ================================

const modal = document.getElementById("postModal");

const modalTitle = document.getElementById("modalTitle");


function openPost(title) {

    modalTitle.textContent = title;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closePost() {

    modal.classList.remove("active");

    document.body.style.overflow = "auto";
}


// Fechar clicando fora do modal

modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        closePost();

    }

});


// Fechar com a tecla ESC

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closePost();

    }

});
