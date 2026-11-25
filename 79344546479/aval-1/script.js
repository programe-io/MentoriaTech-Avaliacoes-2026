
let timeA = "Flamengo";
let timeB = "Palmeiras";

let golsA = 0;
let golsB = 0;
let minutos = 0;
let jogoAtivo = true;

// Atualizar placar
function mostrarPlacar() {
    console.log("⚽ PLACAR DA PARTIDA");
    console.log(timeA + ": " + golsA);
    console.log(timeB + ": " + golsB);
    console.log("Tempo: " + minutos + " minutos");
}

// Marcar gol
function fazerGol(time) {

    if (!jogoAtivo) {
        console.log("A partida terminou!");
        return;
    }

    if (time === "A") {
        golsA++;
        console.log("GOOOOOOL DO " + timeA + "!");
    } 
    else if (time === "B") {
        golsB++;
        console.log("GOOOOOOL DO " + timeB + "!");
    }

    mostrarPlacar();
}

// Avançar cronômetro
function avancarTempo() {

    if (!jogoAtivo) return;

    minutos += 5;

    if (minutos >= 90) {
        minutos = 90;
        finalizarPartida();
    }

    mostrarPlacar();
}

// Finalizar partida
function finalizarPartida() {

    jogoAtivo = false;

    console.log("🏁 FIM DE JOGO!");

    if (golsA > golsB) {
        console.log("🏆 VENCEDOR: " + timeA);
    }
    else if (golsB > golsA) {
        console.log("🏆 VENCEDOR: " + timeB);
    }
    else {
        console.log("🤝 A PARTIDA TERMINOU EMPATADA!");
    }

    mostrarPlacar();
}

// Reiniciar partida
function reiniciarPartida() {

    golsA = 0;
    golsB = 0;
    minutos = 0;
    jogoAtivo = true;

    console.log("🔄 PARTIDA REINICIADA!");

    mostrarPlacar();
}

// INICIAR JOGO
console.log("🏟️ BEM-VINDO AO FUTEBOL!");
mostrarPlacar();

// Exemplos de jogadas
fazerGol("A");
avancarTempo();

fazerGol("B");
avancarTempo();

fazerGol("A");
avancarTempo();

