// Gera um número aleatório entre 1 e 100
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

const inputPalpite = document.getElementById('palpite');
const btnChutar = document.getElementById('btnChutar');
const mensagem = document.getElementById('mensagem');
const btnReiniciar = document.getElementById('btnReiniciar');

function verificarChute() {
    const palpite = Number(inputPalpite.value);
    tentativas++;

    if (!palpite || palpite < 1 || palpite > 100) {
        mensagem.textContent = 'Digite um número válido entre 1 e 100!';
        mensagem.style.color = '#ff6b6b';
        return;
    }

    if (palpite === numeroAleatorio) {
        mensagem.textContent = `Parabéns! Você acertou o número ${numeroAleatorio} em ${tentativas} tentativas!`;
        mensagem.style.color = '#4ecca3';
        fimDeJogo();
    } else if (palpite < numeroAleatorio) {
        mensagem.textContent = 'Muito baixo! Tente um número maior.';
        mensagem.style.color = '#f1c40f';
    } else {
        mensagem.textContent = 'Muito alto! Tente um número menor.';
        mensagem.style.color = '#f1c40f';
    }

    inputPalpite.value = '';
    inputPalpite.focus();
}

function fimDeJogo() {
    inputPalpite.disabled = true;
    btnChutar.classList.add('oculto');
    btnReiniciar.classList.remove('oculto');
}

function reiniciarJogo() {
    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    inputPalpite.disabled = false;
    inputPalpite.value = '';
    mensagem.textContent = '';
    btnChutar.classList.remove('oculto');
    btnReiniciar.classList.add('oculto');
    inputPalpite.focus();
}

btnChutar.addEventListener('click', verificarChute);
inputPalpite.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verificarChute();
    }
});
btnReiniciar.addEventListener('click', reiniciarJogo);
