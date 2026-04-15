let timer; // Variável que armazenará o intervalo
let seconds = 0;
let minutes = 0;
let hours = 0;

function start() {
    // Evita que múltiplos intervalos sejam criados se clicar várias vezes
    if (!timer) {
        timer = setInterval(run, 1000);
    }
}

function pause() {
    clearInterval(timer);
    timer = null; // Reseta a variável para permitir o "re-start"
}

function reset() {
    pause();
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('display').innerText = "00:00:00";
}

function run() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes == 60) {
        minutes = 0;
        hours++;
    }

    // Formatação para sempre ter dois dígitos (ex: 01, 02...)
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById('display').innerText = `${h}:${m}:${s}`;
}