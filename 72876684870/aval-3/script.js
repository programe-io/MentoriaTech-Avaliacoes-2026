
const arena = document.getElementById("arena");
const target = document.getElementById("target");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");
const recordText = document.getElementById("record");
const message = document.getElementById("message");
const startButton = document.getElementById("start");

let score = 0;
let time = 30;
let playing = false;
let timer = null;

let record = 0;

try {
    record = Number(localStorage.getItem("meuRecorde")) || 0;
} catch (e) {}

recordText.textContent = record;

function moveTarget() {
    const maxX = arena.clientWidth - target.offsetWidth;
    const maxY = arena.clientHeight - target.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    target.style.left = x + "px";
    target.style.top = y + "px";
}

function startGame() {
    if (playing) return;

    score = 0;
    time = 30;
    playing = true;

    scoreText.textContent = score;
    timeText.textContent = time;

    message.textContent = "Vai! Clique rápido! 🔥";
    startButton.textContent = "JOGANDO...";

    target.style.display = "block";
    target.style.width = "55px";
    target.style.height = "55px";

    moveTarget();

    timer = setInterval(() => {
        time--;
        timeText.textContent = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    playing = false;

    clearInterval(timer);

    target.style.display = "none";
    startButton.textContent = "JOGAR NOVAMENTE";

    if (score > record) {
        record = score;

        try {
            localStorage.setItem("meuRecorde", record);
        } catch (e) {}

        recordText.textContent = record;

        message.textContent =
            "🏆 NOVO RECORDE! Você fez " + score + " pontos!";
    } else {
        message.textContent =
            "⏰ Fim de jogo! Você fez " + score + " pontos!";
    }
}

target.addEventListener("click", () => {
    if (!playing) return;

    score++;
    scoreText.textContent = score;

    const size = Math.max(
        25,
        55 - Math.floor(score / 5) * 3
    );

    target.style.width = size + "px";
    target.style.height = size + "px";

    moveTarget();
});

startButton.addEventListener("click", startGame);
