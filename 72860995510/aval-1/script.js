
const display = document.getElementById("display");

// Adiciona números e operadores
function adicionar(valor) {
    display.value += valor;
}

// Limpa a tela
function limpar() {
    display.value = "";
}

// Apaga o último caractere
function apagar() {
    display.value = display.value.slice(0, -1);
}

// Realiza o cálculo
function calcular() {
    try {
        if (display.value.trim() === "") {
            return;
        }

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

        display.value = Number(
            resultado.toPrecision(12)
        ).toString();

    } catch (erro) {
        display.value = "Erro";
    }
}
