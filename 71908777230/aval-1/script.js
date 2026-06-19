const moto = document.getElementById("moto");
const obstaculo = document.getElementById("obstaculo");
const scoreElement = document.getElementById("score");

let posMoto = 180;
let posObstaculoY = -50;
let posObstaculoX = Math.floor(Math.random() * 360);
let score = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && posMoto > 0) {
        posMoto -= 20;
    }

    if (e.key === "ArrowRight" && posMoto < 360) {
        posMoto += 20;
    }

    moto.style.left = posMoto + "px";
});

function atualizarJogo() {
    posObstaculoY += 5;

    if (posObstaculoY > 500) {
        posObstaculoY = -50;
        posObstaculoX = Math.floor(Math.random() * 360);

        score++;
        scoreElement.textContent = score;
    }

    obstaculo.style.top = posObstaculoY + "px";
    obstaculo.style.left = posObstaculoX + "px";

    // Colisão
    if (
        posObstaculoY > 420 &&
        Math.abs(posMoto - posObstaculoX) < 40
    ) {
        alert("Game Over! Pontuação: " + score);
        location.reload();
    }

    requestAnimationFrame(atualizarJogo);
}

atualizarJogo();