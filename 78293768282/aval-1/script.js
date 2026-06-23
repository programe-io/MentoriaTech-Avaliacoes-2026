const cenario = document.getElementById('cenario');
const macaco = document.getElementById('macaco');
const txtPontos = document.getElementById('pontos');
const txtVidas = document.getElementById('vidas');
const telaGameOver = document.getElementById('tela-gameover');
const txtPontosFinais = document.getElementById('pontos-finais');

// Configurações do Jogo
const larguraCenario = 400;
const larguraMacaco = 60;
let macacoX = 170;
let pontos = 0;
let vidas = 3;
let jogoAtivo = true;

// Velocidades e Balanço
let velocidadeBananaBase = 3.5;
let velocidadeMacaco = 6; // Velocidade por pixel por frame
let intervaloCriacao = 1400; 

// Controle de Inputs ativos (Teclado e Toque)
let teclasPressionadas = {};
let toqueMovimento = 0; // -1 esquerda, 1 direita, 0 parado

// Loop Principal de Atualização do Macaco (Garante suavidade de 60fps)
function atualizarJogo() {
    if (!jogoAtivo) return;

    // Verifica teclado ou botões touch
    if (teclasPressionadas['ArrowLeft'] || toqueMovimento === -1) {
        macacoX -= velocidadeMacaco;
    }
    if (teclasPressionadas['ArrowRight'] || toqueMovimento === 1) {
        macacoX += velocidadeMacaco;
    }

    // Mantém dentro dos limites da tela
    if (macacoX < 0) macacoX = 0;
    if (macacoX > larguraCenario - larguraMacaco) macacoX = larguraCenario - larguraMacaco;

    macaco.style.left = macacoX + 'px';

    requestAnimationFrame(atualizarJogo);
}

// Ouvintes do Teclado
document.addEventListener('keydown', (e) => { teclasPressionadas[e.key] = true; });
document.addEventListener('keyup', (e) => { teclasPressionadas[e.key] = false; });

// Ouvintes para botões na tela (Celular/Mouse)
function moverEsquerda() { toqueMovimento = -1; }
function moverDireita() { toqueMovimento = 1; }
function pararMovimento() { toqueMovimento = 0; }

// Adiciona eventos para parar de mover quando soltar o clique/toque
document.querySelectorAll('.btn-toque').forEach(botao => {
    botao.addEventListener('mouseup', pararMovimento);
    botao.addEventListener('mouseleave', pararMovimento);
    botao.addEventListener('touchend', pararMovimento);
});

// Criar efeito flutuante de "+1"
function criarPopDePonto(x, y) {
    const pop = document.createElement('div');
    pop.classList.add('ponto-pop');
    pop.innerText = '+1';
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    cenario.appendChild(pop);
    setTimeout(() => pop.remove(), 600);
}

// Piscar a tela em vermelho ao errar
function efeitoDano() {
    document.body.classList.add('dano');
    setTimeout(() => document.body.classList.remove('dano'), 100);
}

// Sistema de Bananas
function criarBanana() {
    if (!jogoAtivo) return;

    const banana = document.createElement('div');
    banana.classList.add('banana');
    banana.innerText = '🍌';
    
    let xAleatorio = Math.floor(Math.random() * (larguraCenario - 40));
    let bananaY = -40;
    
    // Configuração de queda e rotação única para cada banana
    let velocidadeQueda = velocidadeBananaBase + (Math.random() * 1.2); // Variação leve
    let anguloAtual = 0;
    let velocidadeRotacao = (Math.random() - 0.5) * 5; // Gira para esquerda ou direita

    banana.style.left = xAleatorio + 'px';
    cenario.appendChild(banana);

    function cair() {
        if (!jogoAtivo) {
            banana.remove();
            return;
        }

        bananaY += velocidadeQueda;
        anguloAtual += velocidadeRotacao;
        
        banana.style.top = bananaY + 'px';
        banana.style.transform = `rotate(${anguloAtual}deg)`;

        // Colisão Aprimorada (Hitbox mais justa)
        if (bananaY >= 415 && bananaY <= 465) {
            let bananaX = xAleatorio;
            if (bananaX + 35 >= macacoX && bananaX <= macacoX + larguraMacaco) {
                pontos++;
                txtPontos.innerText = pontos;
                criarPopDePonto(bananaX, bananaY);
                banana.remove();
                
                // Dificuldade progressiva suave por banana coletada
                velocidadeBananaBase += 0.12; 
                return;
            }
        }

        // Passou direto (Errou)
        if (bananaY > 500) {
            banana.remove();
            vidas--;
            txtVidas.innerText = vidas;
            efeitoDano();

            if (vidas <= 0) {
                gameOver();
            }
            return;
        }

        requestAnimationFrame(cair);
    }

    requestAnimationFrame(cair);
}

let loopCriacaoBanana;

function iniciarLoops() {
    loopCriacaoBanana = setInterval(criarBanana, intervaloCriacao);
    requestAnimationFrame(atualizarJogo);
}

function gameOver() {
    jogoAtivo = false;
    txtPontosFinais.innerText = pontos;
    telaGameOver.style.display = 'flex';
    clearInterval(loopCriacaoBanana);
}

function reiniciarJogo() {
    document.querySelectorAll('.banana').forEach(b => b.remove());
    pontos = 0;
    vidas = 3;
    velocidadeBananaBase = 3.5;
    macacoX = 170;
    jogoAtivo = true;
    teclasPressionadas = {};
    toqueMovimento = 0;
    
    txtPontos.innerText = pontos;
    txtVidas.innerText = vidas;
    telaGameOver.style.display = 'none';

    clearInterval(loopCriacaoBanana);
    iniciarLoops();
}

// Início do Game
window.onload = () => {
    iniciarLoops();
};