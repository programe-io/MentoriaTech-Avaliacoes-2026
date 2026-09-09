// =============================
// TEMA ESCURO
// =============================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }
});


// =============================
// BOTÃO COMEÇAR
// =============================

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
    document.getElementById("sobre").scrollIntoView({
        behavior: "smooth"
    });
});


// =============================
// CONTADOR
// =============================

let number = 0;

const counter = document.getElementById("counter");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");

increase.addEventListener("click", () => {
    number++;
    updateCounter();
});

decrease.addEventListener("click", () => {
    number--;
    updateCounter();
});

reset.addEventListener("click", () => {
    number = 0;
    updateCounter();
});

function updateCounter() {
    counter.textContent = number;

    // Pequena animação
    counter.style.transform = "scale(1.15)";

    setTimeout(() => {
        counter.style.transform = "scale(1)";
    }, 150);
}


// =============================
// BOTÃO DE CONTATO
// =============================

const contactButton = document.getElementById("contactButton");

contactButton.addEventListener("click", () => {
    alert("Obrigado por visitar o site! 💜");
});
