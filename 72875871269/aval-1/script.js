
const display = document.getElementById("display");

function adicionar(valor) {
    if (display.value === "Erro") {
        display.value = "";
    }

    display.value += valor;
}

function limpar() {
    display.value = "";
}

function apagar() {
    display.value = display.value.slice(0, -1);
}

function calcular() {
    try {
        const expressao = display.value;

        if (!expressao || !/^[0-9+\-*/.() ]+$/.test(expressao)) {
            throw new Error("Expressão inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + expressao + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        display.value = Number(
            resultado.toPrecision(12)
        ).toString();

    } catch {
        display.value = "Erro";
    }
}
