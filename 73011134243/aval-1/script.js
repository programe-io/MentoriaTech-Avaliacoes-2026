
const visor = document.getElementById("visor");

function adicionar(valor) {
    visor.value += valor;
}

function limpar() {
    visor.value = "";
}

function apagar() {
    visor.value = visor.value.slice(0, -1);
}

function calcular() {
    try {
        if (!/^[0-9+\-*/.() ]+$/.test(visor.value)) {
            throw new Error("Expressão inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + visor.value + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        visor.value = resultado;
    } catch {
        visor.value = "Erro";
    }
}
