let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let statusText = document.getElementById('status');
let startBtn = document.getElementById('start');

let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

function updateDisplay() {
    // Formata os números para terem sempre dois dígitos (ex: 09 ao invés de 9)
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (isRunning) return; // Evita múltiplos intervalos rodando
    isRunning = true;

    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                alert("Tempo esgotado! Descanse um pouco.");
                resetTimer();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    minutes = 25;
    seconds = 0;
    updateDisplay();
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);