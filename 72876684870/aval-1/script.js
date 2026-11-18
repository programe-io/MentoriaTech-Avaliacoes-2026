
const resultado = document.getElementById("resultado");

function adicionar(valor) {
    resultado.value += valor;
}

function limpar() {
    resultado.value = "";
}

function apagar() {
    resultado.value = resultado.value.slice(0, -1);
}

function calcular() {
    try {
        if (resultado.value === "") {
            return;
        }

        // Aceita apenas operações matemáticas básicas
        if (!/^[0-9+\-*/.() ]+$/.test(resultado.value)) {
            throw new Error("Expressão inválida");
        }

        const conta = Function(
            '"use strict"; return (' + resultado.value + ')'
        )();

        if (!Number.isFinite(conta)) {
            throw new Error("Resultado inválido");
        }

        resultado.value = Number(conta.toPrecision(12)).toString();

    } catch (erro) {
        resultado.value = "Erro";
    }
}
