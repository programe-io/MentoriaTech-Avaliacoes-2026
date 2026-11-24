
const resultado = document.getElementById("resultado");
const expressao = document.getElementById("expressao");

let valorAtual = "0";
let valorAnterior = null;
let operador = null;
let novoNumero = true;

function atualizarTela() {
    resultado.value = valorAtual;
}

function adicionar(valor) {

    if ("+-*/".includes(valor)) {

        if (operador !== null && !novoNumero) {
            calcular();
        }

        valorAnterior = Number(valorAtual);
        operador = valor;
        expressao.textContent = valorAtual + " " + valor;
        novoNumero = true;

        return;
    }

    if (valor === ".") {

        if (novoNumero) {
            valorAtual = "0.";
            novoNumero = false;
        } else if (!valorAtual.includes(".")) {
            valorAtual += ".";
        }

    } else {

        if (novoNumero || valorAtual === "0") {
            valorAtual = valor;
            novoNumero = false;
        } else if (valorAtual.length < 15) {
            valorAtual += valor;
        }
    }

    atualizarTela();
}

function calcular() {

    if (operador === null || valorAnterior === null) {
        return;
    }

    const segundoValor = Number(valorAtual);
    let resultadoFinal;

    switch (operador) {

        case "+":
            resultadoFinal = valorAnterior + segundoValor;
            break;

        case "-":
            resultadoFinal = valorAnterior - segundoValor;
            break;

        case "*":
            resultadoFinal = valorAnterior * segundoValor;
            break;

        case "/":
            if (segundoValor === 0) {
                valorAtual = "Erro";
                limparOperacao();
                atualizarTela();
                return;
            }
            resultadoFinal = valorAnterior / segundoValor;
            break;
    }

    expressao.textContent =
        valorAnterior + " " + operador + " " + segundoValor + " =";

    valorAtual = String(
        Number(resultadoFinal.toPrecision(12))
    );

    limparOperacao();
    novoNumero = true;

    atualizarTela();
}

function limparOperacao() {
    valorAnterior = null;
    operador = null;
}

function limpar() {

    valorAtual = "0";
    limparOperacao();
    novoNumero = true;

    expressao.textContent = "";

    atualizarTela();
}

function apagar() {

    if (novoNumero) return;

    valorAtual = valorAtual.slice(0, -1);

    if (valorAtual === "" || valorAtual === "-") {
        valorAtual = "0";
        novoNumero = true;
    }

    atualizarTela();
}

function porcentagem() {

    if (valorAtual === "Erro") return;

    valorAtual = String(Number(valorAtual) / 100);

    atualizarTela();
}

document.addEventListener("keydown", function(event) {

    if (/^[0-9.]$/.test(event.key)) {
        adicionar(event.key);
    }

    else if ("+-*/".includes(event.key)) {
        adicionar(event.key);
    }

    else if (event.key === "Enter" || event.key === "=") {
        calcular();
    }

    else if (event.key === "Backspace") {
        apagar();
    }

    else if (event.key === "Escape") {
        limpar();
    }

});
