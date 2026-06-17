const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const txtScore = document.getElementById("txtScore");
const telaOverlay = document.getElementById("telaOverlay");
const textoOverlay = document.getElementById("textoOverlay");
const subtextoOverlay = document.getElementById("subtextoOverlay");
const btnAcao = document.getElementById("btnAcao");

// Estados de Fluxo
let jogoAtivo = false;
let primeiroInicio = true;
let score = 0;
let listaObstaculos = [];
let frameId;

// Configurações Globais Ajustáveis
const CONFIG = {
    gravidade: 0.6,
    velocidadeInicial: 6,
    velocidadeMaxima: 12,
    frequenciaObstaculo: 0.015, // Chance de surgir por frame
    chaoY: 260
};

let velocidadeAtual = CONFIG.velocidadeInicial;

// Objeto do "Bicho" (Personagem)
const bicho = {
    x: 80,
    y: CONFIG.chaoY - 40,
    largura: 40,
    altura: 40,
    velocidadeY: 0,
    puloForca: -12,
    estaNoChao: true,
    corpoCor: "#F0932B", // Laranja
    detalheCor: "#FFF",

    atualizar() {
        // Aplica física de gravidade
        this.velocidadeY += CONFIG.gravidade;
        this.y += this.velocidadeY;

        // Impede o bicho de afundar no chão
        if (this.y >= CONFIG.chaoY - this.altura) {
            this.y = CONFIG.chaoY - this.altura;
            this.velocidadeY = 0;
            this.estaNoChao = true;
        }
    },

    pular() {
        if (this.estaNoChao && jogoAtivo) {
            this.velocidadeY = this.puloForca;
            this.estaNoChao = false;
        }
    },

    desenhar() {
        ctx.save();
        // Desenha o corpo do bicho (Formato de gatinho/bicho fofo)
        ctx.fillStyle = this.corpoCor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);

        // Orelhas
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 10, this.y - 10);
        ctx.lineTo(this.x + 15, this.y);
        ctx.moveTo(this.x + this.largura, this.y);
        ctx.lineTo(this.x + this.largura - 10, this.y - 10);
        ctx.lineTo(this.x + this.largura - 15, this.y);
        ctx.fill();

        // Olhos
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x + this.largura - 15, this.y + 10, 4, 6);
        ctx.fillRect(this.x + this.largura - 28, this.y + 10, 4, 6);

        // Bochechas fofas
        ctx.fillStyle = "#FF7675";
        ctx.fillRect(this.x + this.largura - 10, this.y + 18, 6, 4);

        // Patinhas
        ctx.fillStyle = this.detalheCor;
        ctx.fillRect(this.x + 5, this.y + this.altura - 5, 8, 5);
        ctx.fillRect(this.x + this.largura - 13, this.y + this.altura - 5, 8, 5);

        ctx.restore();
    }
};

/* ==========================================================================
   CONTROLES (ESPAÇO / CLIQUE)
   ========================================================================== */
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        if (!jogoAtivo) {
            gerenciarBotao();
        } else {
            bicho.pular();
        }
    }
});

// Permite pular clicando no próprio Canvas
canvas.addEventListener("mousedown", () => {
    if (jogoAtivo) bicho.pular();
});

/* ==========================================================================
   GERENCIAMENTO DE OBSTÁCULOS
   ========================================================================== */
function gerarObstaculo() {
    // Evita acumular obstáculos colados
    if (listaObstaculos.length > 0) {
        let ultimo = listaObstaculos[listaObstaculos.length - 1];
        if (canvas.width - ultimo.x < 220) return; 
    }

    if (Math.random() < CONFIG.frequenciaObstaculo) {
        let tipos = ['cactus', 'pedra'];
        let tipoEscolhido = tipos[Math.floor(Math.random() * tipos.length)];
        
        let obs = {
            x: canvas.width,
            y: 0,
            largura: 0,
            altura: 0,
            tipo: tipoEscolhido
        };

        if (tipoEscolhido === 'cactus') {
            obs.largura = 25;
            obs.altura = 40 + Math.random() * 20; // Alturas variadas
            obs.y = CONFIG.chaoY - obs.altura;
        } else {
            obs.largura = 35;
            obs.altura = 25;
            obs.y = CONFIG.chaoY - obs.altura;
        }
        listaObstaculos.push(obs);
    }
}

function desenharObstaculo(obs) {
    ctx.save();
    if (obs.tipo === 'cactus') {
        ctx.fillStyle = "#26DE81"; // Verde Claro
        ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
        // Troncos laterais do Cactus
        ctx.fillRect(obs.x - 5, obs.y + 12, obs.largura + 10, 8);
        ctx.fillRect(obs.x - 5, obs.y + 5, 5, 8);
        ctx.fillRect(obs.x + obs.largura, obs.y + 2, 5, 12);
    } else {
        ctx.fillStyle = "#778CA3"; // Cinza Pedra
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.altura);
        ctx.lineTo(obs.x + obs.largura / 2, obs.y);
        ctx.lineTo(obs.x + obs.largura, obs.y + obs.altura);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
}

/* ==========================================================================
   MECÂNICAS DO LOOP PRINCIPAL
   ========================================================================== */
function iniciarNovoJogo() {
    score = 0;
    listaObstaculos = [];
    velocidadeAtual = CONFIG.velocidadeInicial;
    bicho.y = CONFIG.chaoY - bicho.altura;
    bicho.velocidadeY = 0;
    bicho.estaNoChao = true;
    jogoAtivo = true;
    primeiroInicio = false;
    
    telaOverlay.style.display = "none";
    loop();
}

function loop() {
    if (!jogoAtivo) return;

    // Limpa a tela
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Desenha o chão de terra
    ctx.fillStyle = "#8B5A2B";
    ctx.fillRect(0, CONFIG.chaoY, canvas.width, canvas.height - CONFIG.chaoY);
    ctx.fillStyle = "#2E8B57"; // Linha de grama superior
    ctx.fillRect(0, CONFIG.chaoY, canvas.width, 6);

    // 2. Atualiza e desenha o Bicho
    bicho.atualizar();
    bicho.desenhar();

    // 3. Processa Obstáculos
    gerarObstaculo();

    for (let i = listaObstaculos.length - 1; i >= 0; i--) {
        let obs = listaObstaculos[i];
        obs.x -= velocidadeAtual;
        desenharObstaculo(obs);

        // Verifica Colisão (AABB)
        if (bicho.x < obs.x + obs.largura &&
            bicho.x + bicho.largura > obs.x &&
            bicho.y < obs.y + obs.altura &&
            bicho.y + bicho.altura > obs.y) {
            finalizarJogo();
        }

        // Remove do array se saiu da tela
        if (obs.x + obs.largura < 0) {
            listaObstaculos.splice(i, 1);
        }
    }

    // 4. Pontuação e Aumento de velocidade progressiva
    score++;
    txtScore.innerText = String(score).padStart(5, '0');
    if (score % 500 === 0 && velocidadeAtual < CONFIG.velocidadeMaxima) {
        velocidadeAtual += 0.5;
    }

    frameId = requestAnimationFrame(loop);
}

function finalizarJogo() {
    jogoAtivo = false;
    cancelAnimationFrame(frameId);
    
    textoOverlay.innerText = "FIM DE JOGO";
    subtextoOverlay.innerText = `Você sobreviveu por ${score} pontos!`;
    btnAcao.innerText = "TENTAR DE NOVO";
    telaOverlay.style.display = "flex";
}

function gerenciarBotao() {
    iniciarNovoJogo();
}