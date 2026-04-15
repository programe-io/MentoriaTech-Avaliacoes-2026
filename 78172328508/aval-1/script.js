// --- Lógica do Relógio ---
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR');
    document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);

// --- Lógica do Cronômetro ---
let timer;
let seconds = 0;

function startTimer() {
    if (timer) return; // Evita múltiplos intervalos
    timer = setInterval(() => {
        seconds++;
        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds % 3600) / 60);
        let secs = seconds % 60;
        
        document.getElementById('timer-display').textContent = 
            `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    document.getElementById('timer-display').textContent = "00:00:00";
}
