// Seleciona os elementos do HTML
const displayValor = document.getElementById('valor');
const btnDiminuir = document.getElementById('diminuir');
const btnZerar = document.getElementById('zerar');
const btnAumentar = document.getElementById('aumentar');

// Variável para armazenar o valor do contador
let contador = 0;

// Função para atualizar o número na tela
function atualizarTela() {
    displayValor.textContent = contador;
    
    // Altera a cor do número dependendo do valor
    if (contador > 0) {
        displayValor.style.color = '#28a745'; // Verde
    } else if (contador < 0) {
        displayValor.style.color = '#dc3545'; // Vermelho
    } else {
        displayValor.style.color = '#007bff'; // Azul original
    }
}

// Eventos de clique para os botões
btnAumentar.addEventListener('click', function() {
    contador++;
    atualizarTela();
});

btnDiminuir.addEventListener('click', function() {
    contador--;
    atualizarTela();
});

btnZerar.addEventListener('click', function() {
    contador = 0;
    atualizarTela();
});
