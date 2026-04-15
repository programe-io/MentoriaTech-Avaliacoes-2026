let minutesDisplay = document.getElementById('minutes');
let secondsDisplay = document.getElementById('seconds');
let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');

let timerInterval;
let totalSeconds = 25 * 60; // 25 minutos convertidos em segundos

function updateDisplay() {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    
    // Adiciona o zero à esquerda se for menor que 10
    minutesDisplay.textContent = mins.toString().padStart(2, '0');
    secondsDisplay.textContent = secs.toString().padStart(2, '0');
}

function startTimer() {
    // Evita criar múltiplos intervalos se o botão for clicado várias vezes
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Tempo esgotado! Hora de uma pausa.");
            return;
        }
        
        totalSeconds--;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null; // Libera a variável para poder iniciar novamente
}

function resetTimer() {
    pauseTimer();
    totalSeconds = 25 * 60;
    updateDisplay();
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);