// Seleciona os elementos do HTML através do DOM
const spanContador = document.getElementById('contador');
const btnDiminuir = document.getElementById('diminuir');
const btnResetar = document.getElementById('resetar');
const btnAumentar = document.getElementById('aumentar');

// Inicializa o valor da contagem
let valorAtual = 0;

// Função para atualizar o texto na tela
function atualizarTela() {
    spanContador.textContent = valorAtual;
}

// Evento para o botão de aumentar
btnAumentar.addEventListener('click', function() {
    valorAtual++;
    atualizarTela();
});

// Evento para o botão de diminuir
btnDiminuir.addEventListener('click', function() {
    valorAtual--;
    atualizarTela();
});

// Evento para o botão de resetar
btnResetar.addEventListener('click', function() {
    valorAtual = 0;
    atualizarTela();
});
