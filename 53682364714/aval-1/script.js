let expressao = "";

const tela = document.getElementById("tela");

function atualizar() {
    tela.value = expressao || "0";
\}

function adicionar(valor) {
    expressao += valor;
    atualizar();
\}

function limpar() {
    expressao = "";
    atualizar();
\}

function apagar() {
    expressao = expressao.slice(0, -1);
    atualizar();
\}

function calcular() {
    try {
        if (!expressao || !/^[0-9+\\-*/.() ]+\$/.test(expressao)) {
            throw new Error();
        \}

        const resultado = Function(
            '"use strict"; return (' + expressao + ')'
        )();

        if (!Number.isFinite(resultado)) {
            throw new Error();
        \}

        expressao = String(Number(resultado.toPrecision(12)));
        atualizar();

    \} catch {
        tela.value = "Erro";
        expressao = "";
    \}
\}$0