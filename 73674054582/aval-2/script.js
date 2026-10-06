// --- CONTROLE DE ABAS ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// --- 1. CALCULADORA DE IMC ---
document.getElementById('calcBtn').addEventListener('click', () => {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultDiv = document.getElementById('imcResult');

    if (!peso || !altura || altura <= 0) {
        resultDiv.textContent = 'Por favor, insira valores válidos!';
        resultDiv.style.color = 'red';
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    let classificacao = '';

    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 25) classificacao = 'Peso normal';
    else if (imc < 30) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';

    resultDiv.textContent = `IMC: ${imc} (${classificacao})`;
    resultDiv.style.color = '#2c3e50';
});

// --- 2. JOGO DA VELHA ---
const cells = document.querySelectorAll('.cell');
const statusJogo = document.getElementById('statusJogo');
const restartBtn = document.getElementById('restartBtn');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]            // Diagonais
];

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !isGameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();
    });
});

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') continue;
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusJogo.textContent = `Jogador ${currentPlayer} Venceu! 🎉`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusJogo.textContent = 'Empate!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusJogo.textContent = `Vez do Jogador: ${currentPlayer}`;
}

restartBtn.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusJogo.textContent = `Vez do Jogador: ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
});

// --- 3. BLOCO DE NOTAS ---
const notaInput = document.getElementById('notaInput');
const salvarNotaBtn = document.getElementById('salvarNotaBtn');
const listaNotas = document.getElementById('listaNotas');

// Carregar notas salvas ao iniciar
document.addEventListener('DOMContentLoaded', carregarNotas);

salvarNotaBtn.addEventListener('click', () => {
    const textoNota = notaInput.value.trim();
    if (!textoNota) return;

    let notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
    notas.push(textoNota);
    localStorage.setItem('minhasNotas', JSON.stringify(notas));

    notaInput.value = '';
    carregarNotas();
});

function carregarNotas() {
    listaNotas.innerHTML = '';
    let notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];

    notas.forEach((nota, index) => {
        const item = document.createElement('div');
        item.classList.add('nota-item');
        item.innerHTML = `
            <span>${nota}</span>
            <button onclick="removerNota(${index})">X</button>
        `;
        listaNotas.appendChild(item);
    });
}

function removerNota(index) {
    let notas = JSON.parse(localStorage.getItem('minhasNotas')) || [];
    notas.splice(index, 1);
    localStorage.setItem('minhasNotas', JSON.stringify(notas));
    carregarNotas();
}