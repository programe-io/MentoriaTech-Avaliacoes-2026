let golsA = 0;
let golsB = 0;

let segundos = 0;
let intervalo = null;
let jogoAtivo = false;

function atualizarPlacar() {
    document.getElementById("timeA").innerText = golsA;
    document.getElementById("timeB").innerText = golsB;
}

function golA() {
    if (jogoAtivo) {
        golsA++;
        atualizarPlacar();
    }
}

function golB() {
    if (jogoAtivo) {
        golsB++;
        atualizarPlacar();
    }
}

function atualizarTempo() {
    let min = Math.floor(segundos / 60);
    let seg = segundos % 60;

    document.getElementById("tempo").innerText =
        String(min).padStart(2, "0") + ":" + String(seg).padStart(2, "0");
}

function iniciar() {
    if (!jogoAtivo) {
        jogoAtivo = true;

        intervalo = setInterval(() => {
            segundos++;
            atualizarTempo();

            if (segundos >= 90 * 60) { // 90 minutos simulados
                clearInterval(intervalo);
                jogoAtivo = false;
                alert("Fim de jogo! ⚽");
            }
        }, 1000);
    }
}

function resetar() {
    clearInterval(intervalo);

    golsA = 0;
    golsB = 0;
    segundos = 0;
    jogoAtivo = false;

    atualizarPlacar();
    atualizarTempo();
}