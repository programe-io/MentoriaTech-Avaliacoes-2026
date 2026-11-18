
let timeCasa = "Flamengo";
let timeVisitante = "Real Madrid";

let golsCasa = 0;
let golsVisitante = 0;

let minuto = 0;

// Função para adicionar gol
function golCasa() {
    golsCasa++;
    atualizarPlacar();

    console.log("GOOOOOOL DO " + timeCasa + "!");
}

function golVisitante() {
    golsVisitante++;
    atualizarPlacar();

    console.log("GOOOOOOL DO " + timeVisitante + "!");
}

// Atualizar placar
function atualizarPlacar() {
    console.log("----------------------");
    console.log(timeCasa + " " + golsCasa +
        " x " + golsVisitante + " " + timeVisitante);
    console.log("Minuto: " + minuto + "'");
    console.log("----------------------");
}

// Cronômetro
function passarMinuto() {
    minuto++;
    console.log("Tempo de jogo: " + minuto + "'");
}

// Mostrar resultado
function resultadoFinal() {
    console.log("FIM DE JOGO!");

    if (golsCasa > golsVisitante) {
        console.log("Vitória do " + timeCasa + "!");
    } else if (golsVisitante > golsCasa) {
        console.log("Vitória do " + timeVisitante + "!");
    } else {
        console.log("O jogo terminou empatado!");
    }

    atualizarPlacar();
}

// Simulação de uma partida
golCasa();
passarMinuto();

golVisitante();
passarMinuto();

golCasa();
passarMinuto();

resultadoFinal();
