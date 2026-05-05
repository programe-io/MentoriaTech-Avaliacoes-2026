let valor = 0;

function atualizarTela() {
    document.getElementById("valor").textContent = valor;
}

function aumentar() {
    valor++;
    atualizarTela();
}

function diminuir() {
    valor--;
    atualizarTela();
}

function resetar() {
    valor = 0;
    atualizarTela();
}