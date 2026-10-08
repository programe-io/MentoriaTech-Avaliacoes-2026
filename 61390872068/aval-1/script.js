// Selecionando os elementos do DOM
const valorContador = document.getElementById('contador');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnResetar = document.getElementById('btn-resetar');
const btnAumentar = document.getElementById('btn-aumentar');

// Variável que guarda o estado do contador
let contador = 0;

// Função para atualizar a cor do texto baseado no valor
function atualizarCor() {
    if (contador > 0) {
        valorContador.style.color = '#27ae60'; // Verde para positivo
    } else if (contador < 0) {
        valorContador.style.color = '#e74c3c'; // Vermelho para negativo
    } else {
        valorContador.style.color = '#2c3e50'; // Cor padrão para zero
    }
}

// Evento de clique para Aumentar
btnAumentar.addEventListener('click', () => {
    contador++;
    valorContador.textContent = contador;
    atualizarCor();
});

// Evento de clique para Diminuir
btnDiminuir.addEventListener('click', () => {
    contador--;
    valorContador.textContent = contador;
    atualizarCor();
});

// Evento de clique para Resetar
btnResetar.addEventListener('click', () => {
    contador = 0;
    valorContador.textContent = contador;
    atualizarCor();
});
