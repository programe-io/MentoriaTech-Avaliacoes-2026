<script src="script.js">
// ===== 1. MENU MOBILE =====
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.onclick = () => {
    navbar.classList.toggle('active');
}

// Fecha menu quando clica num link
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
    }
});

// ===== 2. QUIZ FUNCIONANDO =====
let pontos = 0;
const totalPerguntas = document.querySelectorAll('.pergunta').length;

document.querySelectorAll('.pergunta').forEach(pergunta => {
    const opcoes = pergunta.querySelectorAll('input');
    
    opcoes.forEach(input => {
        input.onclick = () => {
            // Se já respondeu essa pergunta, não conta ponto de novo
            if(pergunta.classList.contains('respondida')) return;
            
            pergunta.classList.add('respondida');
            const todasOpcoes = pergunta.querySelectorAll('.opcao');
            
            // Pinta tudo
            if(input.parentElement.classList.contains('correta')){
                input.parentElement.style.background = '#2ecc71'; // Verde
                input.parentElement.style.color = '#fff';
                pontos++;
            } else {
                input.parentElement.style.background = '#e74c3c'; // Vermelho
                input.parentElement.style.color = '#fff';
                // Mostra qual era a certa
                pergunta.querySelector('.correta').style.background = '#2ecc71';
                pergunta.querySelector('.correta').style.color = '#fff';
            }
            
            // Desabilita os outros inputs da mesma pergunta
            opcoes.forEach(op => op.disabled = true);
            
            // Se respondeu tudo, mostra resultado
            if(document.querySelectorAll('.pergunta.respondida').length === totalPerguntas){
                setTimeout(mostrarResultado, 500);
            }
        }
    });
});

function mostrarResultado() {
    const porcentagem = (pontos / totalPerguntas) * 100;
    let mensagem = '';
    
    if(porcentagem == 100) mensagem = 'Caçador nível Men of Letters! Você é o Chuck?';
    else if(porcentagem >= 70) mensagem = 'Quase um Winchester! Falta pouco pra caçar sozinho.';
    else if(porcentagem >= 50) mensagem = 'Nível Bobby Singer. Dá pro gasto na caçada.';
    else mensagem = 'Idjit! Hora de maratonar SPN de novo na Prime Video.';
    
    alert(`Você acertou ${pontos} de ${totalPerguntas}!\n${mensagem}`);
}

// ===== 3. TOCAR CARRY ON WAYWARD SON =====
const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Troca pelo link da música
audio.volume = 0.3;

// Cria botão flutuante pra música
const btnMusica = document.createElement('button');
btnMusica.innerHTML = '▶️ Carry On';
btnMusica.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px;
    background: #d35400;
    color: #fff;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    z-index: 1000;
    font-weight: bold;
`;
document.body.appendChild(btnMusica);

let tocando = false;
btnMusica.onclick = () => {
    if(tocando){
        audio.pause();
        btnMusica.innerHTML = '▶️ Carry On';
    } else {
        audio.play();
        btnMusica.innerHTML = '⏸️ Pausar';
    }
    tocando = !tocando;
}

// ===== 4. SCROLL SUAVE NOS LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(ancora => {
    ancora.onclick = function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// ===== 5. EASTER EGG: DIGITA "idjits" =====
let sequencia = '';
const palavraSecreta = 'idjits';

document.addEventListener('keydown', (e) => {
    sequencia += e.key.toLowerCase();
    sequencia = sequencia.slice(-palavraSecreta.length);
    
    if(sequencia === palavraSecreta){
        alert('Bitch! Jerk! Achou o easter egg dos Winchesters!');
        document.body.style.backgroundImage = "url('dean.jpg')";
    }
});

console.log('Supernatural JS carregado. Salvar pessoas, caçar bugs, o negócio da família.');
</script>