// Elementos da interface
const canvas = document.getElementById('tabuleiro');
const ctx = canvas.getContext('2d');
const textoPontuacao = document.getElementById('pontuacao');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Configurações da grade
const tamanhoBloco = 20;
const totalBlocos = canvas.width / tamanhoBloco; // 400 / 20 = 20 blocos

// Variáveis de estado do jogo
let cobrinha = [];
let comidinha = { x: 0, y: 0 };
let direcao = 'DIREITA';
let proximaDirecao = 'DIREITA';
let pontuacao = 0;
let loopJogo = null;
let jogoAtivo = false;

// Configura os ouvintes de eventos
function inicializarEventos() {
    document.addEventListener('keydown', mudarDirecao);
    btnReiniciar.addEventListener('click', reiniciarJogo);
}

// Inicia ou reinicia o estado do jogo
function reiniciarJogo() {
    // Para o loop anterior, se houver
    if (loopJogo) clearInterval(loopJogo);

    // Estado inicial da cobra (3 blocos de comprimento)
    cobrinha = [
        { x: 5 * tamanhoBloco, y: 10 * tamanhoBloco },
        { x: 4 * tamanhoBloco, y: 10 * tamanhoBloco },
        { x: 3 * tamanhoBloco, y: 10 * tamanhoBloco }
    ];

    direcao = 'DIREITA';
    proximaDirecao = 'DIREITA';
    pontuacao = 0;
    textoPontuacao.textContent = pontuacao;
    jogoAtivo = true;

    gerarComida();
    
    // Atualiza o jogo a cada 100ms
    loopJogo = setInterval(atualizarJogo, 100);
}

// Gera a posição da comida em um local aleatório
function gerarComida() {
    comidinha = {
        x: Math.floor(Math.random() * totalBlocos) * tamanhoBloco,
        y: Math.floor(Math.random() * totalBlocos) * tamanhoBloco
    };

    // Garante que a comida não apareça em cima do corpo da cobra
    const colidiuComCobra = cobrinha.some(segmento => segmento.x === comidinha.x && segmento.y === comidinha.y);
    if (colidiuComCobra) {
        gerarComida();
    }
}

// Controla a mudança de direção impedindo inversão direta de 180°
function mudarDirecao(evento) {
    const TECLA = evento.key;

    if ((TECLA === 'ArrowLeft' || TECLA === 'a') && direcao !== 'DIREITA') {
        proximaDirecao = 'ESQUERDA';
    } else if ((TECLA === 'ArrowUp' || TECLA === 'w') && direcao !== 'BAIXO') {
        proximaDirecao = 'CIMA';
    } else if ((TECLA === 'ArrowRight' || TECLA === 'd') && direcao !== 'ESQUERDA') {
        proximaDirecao = 'DIREITA';
    } else if ((TECLA === 'ArrowDown' || TECLA === 's') && direcao !== 'CIMA') {
        proximaDirecao = 'BAIXO';
    }
}

// Loop principal de lógica e desenho
function atualizarJogo() {
    if (!jogoAtivo) return;

    direcao = proximaDirecao;

    // Calcula a nova posição da cabeça
    const cabeca = { x: cobrinha[0].x, y: cobrinha[0].y };

    if (direcao === 'DIREITA') cabeca.x += tamanhoBloco;
    if (direcao === 'ESQUERDA') cabeca.x -= tamanhoBloco;
    if (direcao === 'CIMA') cabeca.y -= tamanhoBloco;
    if (direcao === 'BAIXO') cabeca.y += tamanhoBloco;

    // Checa colisões com bordas ou com o próprio corpo
    if (checarColisao(cabeca)) {
        finalizarJogo();
        return;
    }

    // Adiciona a nova cabeça ao início da cobra
    cobrinha.unshift(cabeca);

    // Checa se comeu a comida
    if (cabeca.x === comidinha.x && cabeca.y === comidinha.y) {
        pontuacao += 10;
        textoPontuacao.textContent = pontuacao;
        gerarComida();
    } else {
        // Remove a cauda para manter o tamanho correto se não comeu
        cobrinha.pop();
    }

    desenhar();
}

// Verifica colisão com as paredes do canvas ou auto-colisão
function checarColisao(cabeca) {
    const colidiuParede = 
        cabeca.x < 0 || 
        cabeca.x >= canvas.width || 
        cabeca.y < 0 || 
        cabeca.y >= canvas.height;

    const colidiuCorpo = cobrinha.some(segmento => segmento.x === cabeca.x && segmento.y === cabeca.y);

    return colidiuParede || colidiuCorpo;
}

// Renderiza os elementos no Canvas
function desenhar() {
    // Limpa a tela
    ctx.fillStyle = '#181824';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a Comida
    ctx.fillStyle = '#ff4757';
    ctx.fillRect(comidinha.x, comidinha.y, tamanhoBloco - 1, tamanhoBloco - 1);

    // Desenha a Cobra
    cobrinha.forEach((segmento, indice) => {
        // A cabeça tem uma cor levemente diferente do corpo
        ctx.fillStyle = (indice === 0) ? '#2ed573' : '#7bed9f';
        ctx.fillRect(segmento.x, segmento.y, tamanhoBloco - 1, tamanhoBloco - 1);
    });
}

// Finaliza a partida
function finalizarJogo() {
    jogoAtivo = false;
    clearInterval(loopJogo);

    // Mensagem na tela
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff4757';
    ctx.font = 'bold 24px Segoe UI';
    ctx.textAlign = 'center';
    ctx.fillText('FIM DE JOGO!', canvas.width / 2, canvas.height / 2 - 10);

    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Segoe UI';
    ctx.fillText(`Pontuação Final: ${pontuacao}`, canvas.width / 2, canvas.height / 2 + 20);
}

// Execução inicial
inicializarEventos();
reiniciarJogo();