
const display = document.getElementById("display");

function adicionar(valor) {
    if (display.value === "0" || display.value === "Erro") {
        display.value = valor;
    } else {
        display.value += valor;
    }
}

function limpar() {
    display.value = "0";
}

function apagar() {
    display.value = display.value.slice(0, -1) || "0";
}

function calcular() {
    try {
        const expressao = display.value;

        if (!/^[0-9+\-*/%.() ]+$/.test(expressao)) {
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

document.addEventListener("keydown", (event) => {
    if (/^[0-9+\-*/%.()]$/.test(event.key)) {
        adicionar(event.key);
    } else if (event.key === "Enter") {
        calcular();
    } else if (event.key === "Backspace") {
        apagar();
    } else if (event.key === "Escape") {
        limpar();
    }
});
