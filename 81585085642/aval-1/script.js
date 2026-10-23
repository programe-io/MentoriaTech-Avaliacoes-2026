// Gera um número aleatório entre 1 e 100
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

const inputPalpite = document.getElementById('palpite');
const elementoMensagem = document.getElementById('mensagem');
const botaoReiniciar = document.getElementById('reiniciar');

function verificarPalpite() {
    const palpite = Number(inputPalpite.value);

    if (!palpite || palpite < 1 || palpite > 100) {
        elementoMensagem.textContent = 'Por favor, digite um número entre 1 e 100!';
        elementoMensagem.style.color = '#ffcc00';
        return;
    }

    tentativas++;

    if (palpite === numeroAleatorio) {
        elementoMensagem.textContent = `Parabéns! Você acertou o número ${numeroAleatorio} em ${tentativas} tentativas!`;
        elementoMensagem.style.color = '#2ed573';
        fimDeJogo();
    } else if (palpite < numeroAleatorio) {
        elementoMensagem.textContent = 'Muito baixo! Tente um número maior.';
        elementoMensagem.style.color = '#ff4757';
    } else {
        elementoMensagem.textContent = 'Muito alto! Tente um número menor.';
        elementoMensagem.style.color = '#ff4757';
    }

    inputPalpite.value = '';
    inputPalpite.focus();
}

function fimDeJogo() {
    inputPalpite.disabled = true;
    botaoReiniciar.style.display = 'block';
}

function reiniciarJogo() {
    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    inputPalpite.disabled = false;
    inputPalpite.value = '';
    elementoMensagem.textContent = '';
    botaoReiniciar.style.display = 'none';
    inputPalpite.focus();
}
