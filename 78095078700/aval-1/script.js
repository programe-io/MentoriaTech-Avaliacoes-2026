// Selecionando os elementos do HTML para o JS manipular
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const statusText = document.getElementById('status');

let timer; // Variável que guardará o intervalo
let minutes = 25;
let seconds = 0;
let isRunning = false; // Trava para não criar vários timers ao mesmo tempo

/**
 * Atualiza o que aparece na tela do usuário
 */
function updateDisplay() {
    // String().padStart(2, '0') garante que sempre existam 2 números (ex: 05)
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

/**
 * Inicia a contagem regressiva (O DROP)
 */
function startTimer() {
    if (isRunning) return; // Se já estiver rodando, não faz nada
    
    isRunning = true;
    statusText.textContent = "FOCO TOTAL NA PARTIDA!";
    statusText.style.color = "#ff8c00";

    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                // Quando o tempo acaba
                clearInterval(timer);
                isRunning = false;
                alert("BOOYAH! Hora de lootear (descanso)!");
                resetTimer();
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000); // Executa a cada 1 segundo (1000ms)
}

/**
 * Pausa o cronômetro (O LOOT)
 */
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    statusText.textContent = "PAUSADO NO COVE";
    statusText.style.color = "#ffff00";
}

/**
 * Reseta tudo para o padrão inicial
 */
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    statusText.textContent = "MODO: TREINO DE ELITE";
    statusText.style.color = "#fff";
    updateDisplay();
}