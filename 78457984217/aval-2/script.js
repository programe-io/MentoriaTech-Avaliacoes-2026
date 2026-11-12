const visor = document.getElementById("visor");

function adicionar(valor) {
    if (visor.value === "0" || visor.value === "Erro") {
        visor.value = valor === "." ? "0." : valor;
    } else {
        visor.value += valor;
    }
}

function limpar() {
    visor.value = "0";
}

function apagar() {
    visor.value = visor.value.slice(0, -1) || "0";
}

function calcular() {
    try {
        const expressao = visor.value;

        if (!/^[0-9+\-*/.() ]+$/.test(expressao)) {
            throw new Error("Expressão inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + expressao + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        visor.value = Number(resultado.toFixed(10)).toString();

    } catch {
        visor.value = "Erro";
    }
}