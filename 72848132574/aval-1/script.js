
const tela = document.getElementById("tela");

function adicionar(valor) {
    if (tela.value === "Erro") {
        tela.value = "0";
    }

    if (tela.value === "0" && !"+-*/%.".includes(valor)) {
        tela.value = valor;
    } else {
        tela.value += valor;
    }
}

function limpar() {
    tela.value = "0";
}

function apagar() {
    tela.value = tela.value.slice(0, -1);

    if (tela.value === "") {
        tela.value = "0";
    }
}

function calcular() {
    try {
        let expressao = tela.value;

        // Permite apenas operações matemáticas
        if (!/^[0-9+\-*/%.() ]+$/.test(expressao)) {
            throw new Error("Expressão inválida");
        }

        let resultado = Function(
            '"use strict"; return (' + expressao + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error("Resultado inválido");
        }

        tela.value = Number(
            resultado.toPrecision(12)
        ).toString();

    } catch (erro) {
        tela.value = "Erro";
    }
}

// Permite usar o teclado do computador
document.addEventListener("keydown", function(event) {
    if ("0123456789+-*/%.".includes(event.key)) {
        adicionar(event.key);
    }

    if (event.key === "Enter") {
        calcular();
    }

    if (event.key === "Backspace") {
        apagar();
    }

    if (event.key === "Escape") {
        limpar();
    }
});
