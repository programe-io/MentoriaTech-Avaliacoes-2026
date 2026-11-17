const display = document.getElementById("display");

// Adiciona números e operadores
function adicionar(valor) {
    display.value += valor;
\}

// Limpa a tela
function limpar() {
    display.value = "";
\}

// Apaga o último caractere
function apagar() {
    display.value = display.value.slice(0, -1);
\}

// Realiza o cálculo
function calcular() {
    try {
        if (!display.value || !/^[0-9+\\-*/.() ]+\$/.test(display.value)) {
            display.value = "Erro";
            return;
        \}

        const resultado = Function(
            '"use strict"; return (' + display.value + ')'
        )();

        if (!Number.isFinite(resultado)) {
            display.value = "Erro";
        \} else {
            display.value = resultado;
        \}

    \} catch (erro) {
        display.value = "Erro";
    \}
\}$0