const pista = document.getElementById("pista");
const carro = document.getElementById("carro");

let faixa = 1;
let pontos = 0;
let recorde = Number(localStorage.getItem("recordeCorrida")) || 0;

let jogando = false;
let obstaculos = [];
let intervalo;
let animacao;
let velocidade = 4;

document.getElementById("recorde").textContent = recorde;

function atualizarCarro() {
    const larguraFaixa = pista.clientWidth / 3;

    carro.style.left =
        (faixa * larguraFaixa + larguraFaixa / 2 - 20) + "px";
}

function mover(direcao) {
    if (!jogando) return;

    faixa = Math.max(0, Math.min(2, faixa + direcao));

    atualizarCarro();
}

function iniciar() {
    if (jogando) return;

    jogando = true;
    pontos = 0;
    velocidade = 4;
    faixa = 1;

    obstaculos.forEach(o => o.elemento.remove());
    obstaculos = [];

    document.getElementById("pontos").textContent = "0";
    document.getElementById("mensagem").textContent = "Boa corrida!";

    document.getElementById("inicio").style.display = "none";

    atualizarCarro();

    intervalo = setInterval(criarObstaculo, 1100);
    animacao = requestAnimationFrame(atualizarJogo);
}

function criarObstaculo() {
    if (!jogando) return;

    const elemento = document.createElement("div");

    elemento.className = "obstaculo";
    elemento.textContent = "🚙";

    const faixaObstaculo = Math.floor(Math.random() * 3);
    const larguraFaixa = pista.clientWidth / 3;

    elemento.style.left =
        (faixaObstaculo * larguraFaixa + larguraFaixa / 2 - 20) + "px";

    elemento.style.top = "-50px";

    pista.appendChild(elemento);

    obstaculos.push({
        elemento,
        faixa: faixaObstaculo,
        y: -50,
        contou: false
    });
}

function atualizarJogo() {
    if (!jogando) return;

    const alturaCarro = carro.offsetTop;
    const alturaObstaculo = 40;

    obstaculos.forEach(obstaculo => {
        obstaculo.y += velocidade;

        obstaculo.elemento.style.top = obstaculo.y + "px";

        const colidiu =
            obstaculo.faixa === faixa &&
            obstaculo.y + alturaObstaculo > alturaCarro &&
            obstaculo.y < alturaCarro + 40;

        if (colidiu) {
            terminar();
            return;
        }

        if (!obstaculo.contou && obstaculo.y > pista.clientHeight) {
            obstaculo.contou = true;
            pontos += 10;

            document.getElementById("pontos").textContent = pontos;

            if (pontos % 50 === 0) {
                velocidade += 0.5;
            }
        }
    });

    if (!jogando) return;

    obstaculos = obstaculos.filter(o => {
        if (o.y > pista.clientHeight + 50) {
            o.elemento.remove();
            return false;
        }

        return true;
    });

    animacao = requestAnimationFrame(atualizarJogo);
}

function terminar() {
    jogando = false;

    clearInterval(intervalo);
    cancelAnimationFrame(animacao);

    if (pontos > recorde) {
        recorde = pontos;
        localStorage.setItem("recordeCorrida", recorde);
        document.getElementById("recorde").textContent = recorde;
    }

    document.getElementById("mensagem").textContent =
        "🏆 Sua pontuação: " + pontos;

    const inicio = document.getElementById("inicio");

    inicio.innerHTML = `
        <h2>💥 FIM DE JOGO!</h2>
        <p>Pontuação: ${pontos}</p>
        <button onclick="iniciar()">JOGAR NOVAMENTE</button>
    `;

    inicio.style.display = "flex";
}

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "a") {
        mover(-1);
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        mover(1);
    }
});