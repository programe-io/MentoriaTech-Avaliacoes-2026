let valor = 0;

function atualizar() {
    document.getElementById("contador").textContent = valor;
}

function incrementar() {
    valor++;
    atualizar();
}

function decrementar() {
    valor--;
    atualizar();
}

function resetar() {
    valor = 0;
    atualizar();
}