
const resultado = document.getElementById("resultado");
const operacao = document.getElementById("operacao");
const listaHistorico = document.getElementById("listaHistorico");

let valorAtual = "0";
let valorAnterior = null;
let operadorAtual = null;
let reiniciarDisplay = false;
let historico = [];

function atualizarDisplay() {
    resultado.textContent = valorAtual;
}

function adicionarNumero(numero) {

    if (valorAtual === "Erro") {
        valorAtual = "0";
    }

    if (reiniciarDisplay) {
        valorAtual = "0";
        reiniciarDisplay = false;
    }

    if (numero === "." && valorAtual.includes(".")) {
        return;
    }

    if (valorAtual === "0" && numero !== ".") {
        valorAtual = numero;
    } else {
        valorAtual += numero;
    }

    atualizarDisplay();
}

function adicionarOperador(operador) {

    if (valorAtual === "Erro") return;

    if (operadorAtual && !reiniciarDisplay) {
        calcular();
    }

    valorAnterior = Number(valorAtual);
    operadorAtual = operador;

    operacao.textContent =
        valorAtual + " " + simbolo(operador);

    reiniciarDisplay = true;
}

function simbolo(operador) {
    const simbolos = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return simbolos[operador];
}

function calcular() {

    if (operadorAtual === null || valorAnterior === null) {
        return;
    }

    const numero2 = Number(valorAtual);

    let total;

    switch (operadorAtual) {

        case "+":
            total = valorAnterior + numero2;
            break;

        case "-":
            total = valorAnterior - numero2;
            break;

        case "*":
            total = valorAnterior * numero2;
            break;

        case "/":
            if (numero2 === 0) {
                valorAtual = "Erro";
                operacao.textContent = "Divisão por zero";
                valorAnterior = null;
                operadorAtual = null;
                reiniciarDisplay = true;
                atualizarDisplay();
                return;
            }

            total = valorAnterior / numero2;
            break;

    }

    const expressao =
        valorAnterior + " " +
        simbolo(operadorAtual) + " " +
        numero2;

    total = Number(total.toPrecision(12));

    valorAtual = String(total);

    operacao.textContent = expressao + " =";

    adicionarHistorico(expressao, total);

    valorAnterior = null;
    operadorAtual = null;

    reiniciarDisplay = true;

    atualizarDisplay();
}

function limpar() {

    valorAtual = "0";
    valorAnterior = null;
    operadorAtual = null;
    reiniciarDisplay = false;

    operacao.textContent = "";

    atualizarDisplay();
}

function apagar() {

    if (reiniciarDisplay || valorAtual === "Erro") {
        valorAtual = "0";
        reiniciarDisplay = false;
    } else {
        valorAtual = valorAtual.slice(0, -1);

        if (valorAtual === "" || valorAtual === "-") {
            valorAtual = "0";
        }
    }

    atualizarDisplay();
}

function porcentagem() {

    if (valorAtual === "Erro") return;

    valorAtual = String(
        Number(valorAtual) / 100
    );

    atualizarDisplay();

}

function inverterSinal() {

    if (valorAtual === "Erro") return;

    if (valorAtual !== "0") {

        valorAtual = String(
            Number(valorAtual) * -1
        );

    }

    atualizarDisplay();

}

function adicionarHistorico(expressao, total) {

    historico.unshift({
        expressao,
        total
    });

    historico = historico.slice(0, 10);

    mostrarHistorico();

}

function mostrarHistorico() {

    listaHistorico.innerHTML = "";

    if (historico.length === 0) {

        listaHistorico.innerHTML =
            '<p class="vazio">Nenhuma operação realizada.</p>';

        return;
    }

    historico.forEach(item => {

        const div = document.createElement("div");

        div.className = "item-historico";

        const expressao = document.createElement("span");
        expressao.textContent = item.expressao;

        const valor = document.createElement("span");
        valor.textContent = item.total;

        div.append(expressao, valor);

        listaHistorico.appendChild(div);

    });

}

function limparHistorico() {

    historico = [];

    mostrarHistorico();

}

// Controle pelo teclado

document.addEventListener("keydown", function(event) {

    const tecla = event.key;

    if (/^[0-9]$/.test(tecla)) {
        adicionarNumero(tecla);
    }

    if (tecla === ".") {
        adicionarNumero(".");
    }

    if (["+", "-", "*", "/"].includes(tecla)) {
        adicionarOperador(tecla);
    }

    if (tecla === "Enter" || tecla === "=") {
        event.preventDefault();
        calcular();
    }

    if (tecla === "Backspace") {
        apagar();
    }

    if (tecla === "Escape") {
        limpar();
    }

    if (tecla === "%") {
        porcentagem();
    }

});
