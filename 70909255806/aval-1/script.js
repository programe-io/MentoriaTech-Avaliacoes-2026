// --- CONFIGURAÇÃO INICIAL DO CONTADOR ---
let contador = 0;

// Selecionando os elementos da página HTML usando o DOM
const elementoValor = document.getElementById('valor');
const botaoDiminuir = document.getElementById('btn-diminuir');
const botaoResetar = document.getElementById('btn-resetar');
const botaoAumentar = document.getElementById('btn-aumentar');

// --- FUNÇÃO PARA ATUALIZAR A COR E O TEXTO ---
function atualizarDisplay() {
    elementoValor.textContent = contador;
    
    // Mudando a cor do texto dinamicamente baseado no valor
    if (contador > 0) {
        elementoValor.style.color = '#2ecc71'; // Verde para positivo
    } else if (contador < 0) {
        elementoValor.style.color = '#e74c3c'; // Vermelho para negativo
    } else {
        elementoValor.style.color = '#333333'; // Cinza/Preto para zero
    }
}

// --- OUVINTES DE EVENTOS (EVENT LISTENERS) ---

// Evento para o botão de Aumentar
botaoAumentar.addEventListener('click', () => {
    contador++;
    atualizarDisplay();
});

// Evento para o botão de Diminuir
botaoDiminuir.addEventListener('click', () => {
    contador--;
    atualizarDisplay();
});

// Evento para o botão de Resetar
botaoResetar.addEventListener('click', () => {
    contador = 0;
    atualizarDisplay();
});