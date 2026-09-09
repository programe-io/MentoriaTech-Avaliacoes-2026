// Selecionando os elementos do DOM
const btnClick = document.getElementById('btn-click');
const btnToggle = document.getElementById('btn-toggle');
const btnReset = document.getElementById('btn-reset');
const clickCounter = document.getElementById('click-counter');
const statusText = document.getElementById('status-text');
const feedbackMessage = document.getElementById('feedback-message');

// Variáveis de controle
let count = 0;
let isOnline = true;

// 1. Função do botão "Clique Aqui"
btnClick.addEventListener('click', function() {
    count++;
    clickCounter.textContent = count;
    feedbackMessage.style.color = '#34d399';
    feedbackMessage.textContent = `Sucesso! Você clicou ${count} vez(es).`;
});

// 2. Função do botão "Alternar Status"
btnToggle.addEventListener('click', function() {
    isOnline = !isOnline;
    if (isOnline) {
        statusText.textContent = "Ativo";
        statusText.style.color = "#34d399";
        feedbackMessage.style.color = '#38bdf8';
        feedbackMessage.textContent = "O sistema foi ativado.";
    } else {
        statusText.textContent = "Pausado";
        statusText.style.color = "#f87171";
        feedbackMessage.style.color = '#f87171';
        feedbackMessage.textContent = "O sistema foi pausado.";
    }
});

// 3. Função do botão "Zerar Tudo"
btnReset.addEventListener('click', function() {
    count = 0;
    isOnline = true;
    clickCounter.textContent = count;
    statusText.textContent = "Ativo";
    statusText.style.color = "#34d399";
    feedbackMessage.style.color = '#fbbf24';
    feedbackMessage.textContent = "Tudo foi reiniciado para o estado original!";
});