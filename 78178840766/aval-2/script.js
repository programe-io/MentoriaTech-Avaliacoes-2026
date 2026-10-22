const visor = document.getElementById("visor");

let valorAtual = "0";
let valorAnterior = null;
let operador = null;
let iniciarNovo = false;

function atualizarVisor() {
    visor.value = valorAtual.replace(".", ",");
}

function digitar(valor) {
    if (iniciarNovo) {
        valorAtual = valor === "." ? "0." : valor;
        iniciarNovo = false;
    } else if (valor === ".") {
        if (!valorAtual.includes(".")) {
            valorAtual += ".";
        }
    } else {
        valorAtual =
            valorAtual === "0" ? valor : valorAtual + valor;
    }

    atualizarVisor();
}

function limpar() {
    valorAtual = "0";
    valorAnterior = null;
    operador = null;
    iniciarNovo = false;
    atualizarVisor();
}

function escolherOperador(op) {
    if (operador !== null && !iniciarNovo) {
        calcular();
    }

    valorAnterior = Number(valorAtual);
    operador = op;
    iniciarNovo = true;
}

function calcular() {
    if (operador === null || valorAnterior === null) {
        return;
    }

    const atual = Number(valorAtual);
    let resultado;

    switch (operador) {
        case "+":
            resultado = valorAnterior + atual;
            break;

        case "−":
            resultado = valorAnterior - atual;
            break;

        case "×":
            resultado = valorAnterior * atual;
            break;

        case "÷":
            if (atual === 0) {
                valorAtual = "Erro";
                valorAnterior = null;
                operador = null;
                iniciarNovo = true;
                atualizarVisor();
                return;
            }

            resultado = valorAnterior / atual;
            break;
    }

    valorAtual = String(
        Number(resultado.toPrecision(12))
    );

    valorAnterior = null;
    operador = null;
    iniciarNovo = true;
    atualizarVisor();
}

function porcentagem() {
    valorAtual = String(Number(valorAtual) / 100);
    atualizarVisor();
}

function sinal() {
    if (valorAtual !== "0" && valorAtual !== "Erro") {
        valorAtual = String(-Number(valorAtual));
        atualizarVisor();
    }
}