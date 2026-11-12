let pontos = 0;
let tempo = 30;
let intervalo;
let gerador;
let jogando = false;

const campo = document.getElementById("campo");

function iniciarJogo() {
    pontos = 0;
    tempo = 30;
    jogando = true;

    document.getElementById("pontos").textContent = pontos;
    document.getElementById("tempo").textContent = tempo;
    document.getElementById("resultado").textContent = "";

    campo.innerHTML = "";

    intervalo = setInterval(() => {
        tempo--;

        document.getElementById("tempo").textContent = tempo;

        if (tempo <= 0) {
            terminarJogo();
        }
    }, 1000);

    criarZumbi();

    gerador = setInterval(criarZumbi, 900);
}

function criarZumbi() {
    if (!jogando) return;

    const zumbi = document.createElement("button");

    zumbi.className = "zumbi";
    zumbi.textContent = "🧟";

    const maxX = campo.clientWidth - 55;
    const maxY = campo.clientHeight - 55;

    zumbi.style.left = Math.random() * maxX + "px";
    zumbi.style.top = Math.random() * maxY + "px";

    zumbi.onclick = () => {
        if (!jogando) return;

        pontos += 10;

        document.getElementById("pontos").textContent = pontos;

        zumbi.remove();
    };

    campo.appendChild(zumbi);

    setTimeout(() => {
        zumbi.remove();
    }, 1800);
}

function terminarJogo() {
    jogando = false;

    clearInterval(intervalo);
    clearInterval(gerador);

    campo.innerHTML = `
        <div id="inicio">
            <h2>FIM DE JOGO! 🧟</h2>
            <p>Você conseguiu ${pontos} pontos!</p>
            <button onclick="iniciarJogo()">JOGAR NOVAMENTE</button>
        </div>
    `;

    document.getElementById("resultado").textContent =
        pontos >= 100 ? "🏆 EXCELENTE SOBREVIVENTE!" : "☠️ Tente novamente!";
}