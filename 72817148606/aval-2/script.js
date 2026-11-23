
const display = document.getElementById("display");

// Adicionar números e operadores
function adicionar(valor) {
    display.value += valor;
}

// Limpar o visor
function limpar() {
    display.value = "";
}

// Apagar o último caractere
function apagar() {
    display.value = display.value.slice(0, -1);
}

// Realizar o cálculo
function calcular() {
    try {
        if (display.value === "") {
            return;
        }

        const expressao = display.value;

        // Aceitar somente operações matemáticas
        if (!/^[0-9+\-*/.() ]+$/.test(expressao)) {
            throw new Error("Expressão inválida");
        }

        const resultado = Function(
            '"use strict"; return (' + expressao + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        display.value = resultado;

    } catch (erro) {
        display.value = "Erro";
    }
}
