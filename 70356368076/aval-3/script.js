const jogador = document.getElementById("jogador");
const bola = document.getElementById("bola");
const golsTexto = document.getElementById("gols");
const mensagem = document.getElementById("mensagem");
const campo = document.getElementById("campo");

let x = 45;
let y = 70;
let bx = 50;
let by = 55;
let gols = 0;
let chutando = false;

function atualizar() {
    jogador.style.left = x + "%";
    jogador.style.top = y + "%";

    bola.style.left = bx + "%";
    bola.style.top = by + "%";
}

function mover(dx, dy) {
    x = Math.max(2, Math.min(92, x + dx));
    y = Math.max(10, Math.min(90, y + dy));

    // Jogador encosta na bola
    if (Math.abs(x - bx) < 9 && Math.abs(y - by) < 9) {
        bx = x + 3;
        by = y - 3;
    }

    atualizar();
}

function chutar() {
    if (chutando) return;

    if (
        Math.abs(x - bx) < 12 &&
        Math.abs(y - by) < 15
    ) {
        chutando = true;
        mensagem.textContent = "CHUTOU!!! ⚽";

        let destinoX = bx;
        let destinoY = by - 45;

        bola.style.transition = "0.5s";
        bx = destinoX;
        by = Math.max(2, destinoY);

        atualizar();

        if (by <= 12 && bx >= 35 && bx <= 65) {
            gols++;

            golsTexto.textContent = gols;
            mensagem.textContent = "GOOOOOOOL!!! 🏆🔥";
        }

        setTimeout(() => {
            bx = 50;
            by = 55;
            atualizar();
            chutando = false;
        }, 800);

    } else {
        mensagem.textContent = "Chegue perto da bola!";
    }
}

// Controles do teclado
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") mover(0, -3);
    if (event.key === "ArrowDown") mover(0, 3);
    if (event.key === "ArrowLeft") mover(-3, 0);
    if (event.key === "ArrowRight") mover(3, 0);

    if (event.code === "Space") {
        event.preventDefault();
        chutar();
    }
});

// Iniciar jogo
atualizar();