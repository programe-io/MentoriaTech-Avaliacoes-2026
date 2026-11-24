
const display = document.getElementById("display");

function adicionar(valor) {
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
        if (!display.value.trim()) return;

        // Aceita somente expressões matemáticas
        if (!/^[0-9+\-*/.() ]+$/.test(display.value)) {
            throw new Error("Expressão inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + display.value + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        display.value = resultado;

    } catch (erro) {
        display.value = "Erro";
    }
}
