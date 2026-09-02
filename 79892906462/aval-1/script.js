/* =========================================
   ⚽ FUTEBOL ARENA - SCRIPT.JS
   ========================================= */

// =========================================
// MODO ESCURO
// =========================================

function toggleTheme() {
    document.body.classList.toggle("dark");

    const themeButton = document.querySelector(".theme-btn");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeButton.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}


// Recuperar tema salvo
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");

        const themeButton = document.querySelector(".theme-btn");

        if (themeButton) {
            themeButton.textContent = "☀️";
        }
    }
}


// =========================================
// CRONÔMETRO DA PARTIDA
// =========================================

let seconds = 0;
let timer = null;


// Atualizar relógio
function updateClock() {

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(secs).padStart(2, "0");

    const clock = document.getElementById("clock");

    if (clock) {
        clock.textContent =
            `${formattedMinutes}:${formattedSeconds}`;
    }
}


// Iniciar partida
function startGame() {

    // Evita criar vários cronômetros ao mesmo tempo
    if (timer !== null) {
        return;
    }

    addEvent("🟢 Partida iniciada!");

    timer = setInterval(() => {

        seconds++;

        updateClock();

    }, 1000);
}


// Pausar partida
function pauseGame() {

    if (timer === null) {
        return;
    }

    clearInterval(timer);

    timer = null;

    addEvent("⏸️ Partida pausada.");
}


// Resetar partida
function resetGame() {

    clearInterval(timer);

    timer = null;

    seconds = 0;

    updateClock();

    const events = document.getElementById("events");

    if (events) {
        events.innerHTML = `
            <div class="event">
                Nenhum evento registrado.
            </div>
        `;
    }
}


// =========================================
// EVENTOS DA PARTIDA
// =========================================

function addEvent(text) {

    const events = document.getElementById("events");

    if (!events) {
        return;
    }


    // Se ainda não houver eventos
    if (
        events.innerText.includes(
            "Nenhum evento registrado"
        )
    ) {
        events.innerHTML = "";
    }


    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formattedMinutes =
        String(minutes).padStart(2, "0");

    const formattedSeconds =
        String(secs).padStart(2, "0");


    const eventElement =
        document.createElement("div");

    eventElement.className = "event";


    eventElement.innerHTML = `
        <strong>
            ${formattedMinutes}:${formattedSeconds}
        </strong>
        — ${text}
    `;


    // Coloca o evento mais recente no topo
    events.prepend(eventElement);
}


// =========================================
// GOL
// =========================================

function addGoal() {

    addEvent("⚽ Gol do Palmeiras!");

}


// =========================================
// CARTÃO
// =========================================

function addRedCard() {

    addEvent("🟥 Cartão vermelho!");

}


// =========================================
// ATUALIZAÇÃO DOS JOGOS
// =========================================

function atualizarJogos() {

    const button = document.querySelector(
        '[onclick="atualizarJogos()"]'
    );


    if (!button) {
        return;
    }


    const originalText = button.textContent;

    button.textContent =
        "🔄 Atualizando...";

    button.disabled = true;


    setTimeout(() => {

        button.textContent =
            "✅ Jogos atualizados!";

        button.disabled = false;


        setTimeout(() => {

            button.textContent =
                originalText;

        }, 2000);

    }, 1000);
}


// =========================================
// EFEITO NOS BOTÕES
// =========================================

document.addEventListener("click", function(event) {

    const button =
        event.target.closest("button");

    if (!button) {
        return;
    }

    button.style.transform =
        "scale(0.95)";

    setTimeout(() => {

        button.style.transform =
            "";

    }, 100);
});


// =========================================
// INICIALIZAÇÃO
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTheme();

        updateClock();

    }
);