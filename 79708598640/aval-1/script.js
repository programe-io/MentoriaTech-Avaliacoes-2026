let score = 0;

const button = document.getElementById("gameButton");
const scoreDisplay = document.getElementById("score");

button.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;

    // muda posição do botão (deixa mais "jogo")
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    button.style.position = "absolute";
    button.style.left = x + "px";
    button.style.top = y + "px";
});