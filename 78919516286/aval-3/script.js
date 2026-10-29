// Seleciona os elementos do HTML
 patriotism
const valueDisplay = document.getElementById('value');
const btnDecrease = document.getElementById('btn-decrease');
const btnReset = document.getElementById('btn-reset');
const btnIncrease = document.getElementById('btn-increase');

// Variável para armazenar o valor atual do contador
let count = 0;

// Função para atualizar a cor do texto baseado no valor
function updateColor() {
    if (count > 0) {
        valueDisplay.className = 'positive';
    } else if (count < 0) {
        valueDisplay.className = 'negative';
    } else {
        valueDisplay.className = '';
    }
}

// Evento para o botão Incrementar (Aumentar)
btnIncrease.addEventListener('click', () => {
    count++;
    valueDisplay.textContent = count;
    updateColor();
});

// Evento para o botão Decrementar (Diminuir)
btnDecrease.addEventListener('click', () => {
    count--;
    valueDisplay.textContent = count;
    updateColor();
});

// Evento para o botão Resetar
btnReset.addEventListener('click', () => {
    count = 0;
    valueDisplay.textContent = count;
    updateColor();
});
