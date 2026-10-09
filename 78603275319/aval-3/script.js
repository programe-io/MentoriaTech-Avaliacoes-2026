// Seleciona os elementos do HTML
const contadorElemento = document.getElementById('contador');
const btnDiminuir = document.getElementById('btnDiminuir');
const btnZerar = document.getElementById('btnZerar');
const btnAumentar = document.getElementById('btnAumentar');

// Variável para armazenar o valor
let valor = 0;

// Atualiza o texto na tela
function atualizarTela() {
    contadorElemento.textContent = valor;
}

// Evento para aumentar
btnAumentar.addEventListener('click', () => {
    valor++;
    atualizarTela();
});

// Evento para diminuir
btnDiminuir.addEventListener('click', () => {
    valor--;
    atualizarTela();
});

// Evento para zerar
btnZerar.addEventListener('click', () => {
    valor = 0;
    atualizarTela();
});
