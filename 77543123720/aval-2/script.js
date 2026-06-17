const canvas = document.getElementById("jogoCanvas") || document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Elementos adaptados dinamicamente para o layout
const txtScore = document.getElementById("txtScore") || document.getElementById("txtPontos");
const btnAcao = document.getElementById("btnAcao") || document.getElementById("btnReiniciar");
const telaOverlay = document.getElementById("telaOverlay");
const textoOverlay = document.getElementById("textoOverlay");
const subtextoOverlay = document.getElementById("subtextoOverlay");

// Estados de Fluxo
let jogoAtivo = false;
let primeiroInicio = true;
let score = 0;
let frameContadorPontos = 0; 
let listaObstaculos = [];
let frameId;

// Paleta de Cores dos Cenários
const CENARIOS = {
    normal: {
        chaoTerra: "#8B5A2B", 
        chaoGrama: "#2E8B57"  
    },
    espacial: {
        chaoTerra: "#2C1A4D", 
        chaoGrama: "#00FFDD"  
    }
};

// Configurações Globais Ajustáveis
const CONFIG = {
    gravidade: 0.6,
    velocidadeInicial: 5, 
    velocidadeMaxima: 16, 
    frequenciaObstaculo: 0.02, 
    chaoY: 260
};

let velocidadeAtual = CONFIG.velocidadeInicial;

// Sistema de monitoramento de teclas pressionadas
const teclas = {
    esquerda: false,
    direita: false
};

// Objeto do "Gato" (Personagem) com Movimentação, Habilidades e Buffs
const bicho = {
    x: 80,
    y: CONFIG.chaoY - 40,
    largura: 40,
    altura: 40,
    velocidadeX: 5,         // Velocidade de corrida lateral
    velocidadeY: 0,
    puloForca: -11, 
    estaNoChao: true,
    corpoCor: "#F0932B", 
    detalheCor: "#FFF",

    // --- PROPRIEDADES DAS HABILIDADES ---
    pulosDisponiveis: 2,    
    dashAtivo: false,       
    dashTempo: 0,           
    dashCooldown: 0,        

    // --- ESTADOS DOS PODERES DAS FRUTAS ---
    invencivelTempo: 0,     
    piscandoFrame: 0,       

    atualizar() {
        // --- MOVIMENTAÇÃO LATERAL (NOVO) ---
        if (teclas.esquerda) {
            this.x -= this.velocidadeX;
        }
        if (teclas.direita) {
            this.x += this.velocidadeX;
        }

        // Limitadores de tela (Garante que o gato não saia do cenário lateralmente)
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width - this.largura) this.x = canvas.width - this.largura;

        // --- ATUALIZAÇÃO DE TIMERS E PULO ---
        if (this.dashCooldown > 0) this.dashCooldown--;
        if (this.invencivelTempo > 0) this.invencivelTempo--;

        if (this.dashAtivo) {
            this.dashTempo--;
            this.velocidadeY = 0; 
            if (this.dashTempo <= 0) {
                this.dashAtivo = false;
            }
        } else {
            this.velocidadeY += CONFIG.gravidade;
            this.y += this.velocidadeY;
        }

        if (this.y >= CONFIG.chaoY - this.altura) {
            this.y = CONFIG.chaoY - this.altura;
            this.velocidadeY = 0;
            this.estaNoChao = true;
            this.pulosDisponiveis = 2; 
        }
    },

    pular() {
        if (!jogoAtivo) return;

        if (this.estaNoChao) {
            this.velocidadeY = this.puloForca;
            this.estaNoChao = false;
            this.pulosDisponiveis--; 
        } else if (this.pulosDisponiveis > 0 && !this.dashAtivo) {
            this.velocidadeY = this.puloForca * 0.9; 
            this.pulosDisponiveis--; 
        }
    },

    usarDash() {
        if (this.dashCooldown === 0 && jogoAtivo) {
            this.dashAtivo = true;
            this.dashTempo = 12;      
            this.dashCooldown = 90;   
        }
    },

    desenhar() {
        ctx.save();
        
        this.piscandoFrame++;
        if (this.invencivelTempo > 0) {
            ctx.fillStyle = this.piscandoFrame % 6 < 3 ? "#FFD700" : "#FF6B81";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#FFD700";
        } else if (this.dashAtivo) {
            ctx.fillStyle = "rgba(52, 152, 219, 0.5)"; 
            ctx.fillRect(this.x - 15, this.y, this.largura, this.altura);
            ctx.fillStyle = "#3498db"; 
        } else {
            ctx.fillStyle = this.corpoCor;
        }

        ctx.fillRect(this.x, this.y, this.largura, this.altura);

        // Orelhas de Gato
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

        // Barra de Recarga (Cooldown) do Dash
        if (this.dashCooldown > 0 && this.invencivelTempo <= 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(this.x, this.y - 15, this.largura, 4);
            ctx.fillStyle = "#3498db";
            let progressoBarra = (1 - (this.dashCooldown / 90)) * this.largura;
            ctx.fillRect(this.x, this.y - 15, progressoBarra, 4);
        }

        // Barra de Duração da Invencibilidade (Morango)
        if (this.invencivelTempo > 0) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.fillRect(this.x, this.y - 15, this.largura, 5);
            ctx.fillStyle = "#FFD700"; 
            let larguraInven = (this.invencivelTempo / 600) * this.largura;
            ctx.fillRect(this.x, this.y - 15, larguraInven, 5);
        }
    }
};

/* ==========================================================================
   CONTROLES DE TECLADO (ATUALIZADO COM ESCUTA PARA MOVIMENTAÇÃO LATERAL)
   ========================================================================= */
document.addEventListener("keydown", (e) => {
    // Pulo
    if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        if (!jogoAtivo) {
            gerenciarBotao();
        } else {
            bicho.pular(); 
        }
    }
    // Dash
    if (e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "KeyE") {
        e.preventDefault();
        bicho.usarDash();
    }
    // Movimentação Horizontal (Pressionar)
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        teclas.esquerda = true;
    }
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        teclas.direita = true;
    }
});

document.addEventListener("keyup", (e) => {
    // Movimentação Horizontal (Soltar)
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        teclas.esquerda = false;
    }
    if (e.code === "ArrowRight" || e.code === "KeyD") {
        teclas.direita = false;
    }
});

canvas.addEventListener("mousedown", () => {
    if (jogoAtivo) bicho.pular();
});

/* ==========================================================================
   GERENCIAMENTO DE ELEMENTOS (OBSTÁCULOS E FRUTAS)
   ========================================================================== */
function gerarObstaculo() {
    if (listaObstaculos.length > 0) {
        let ultimo = listaObstaculos[listaObstaculos.length - 1];
        let distanciaMinima = 150 + (velocidadeAtual * 8); 
        if (canvas.width - ultimo.x < distanciaMinima) return; 
    }

    if (Math.random() < CONFIG.frequenciaObstaculo) {
        let tipos = ['cactus', 'pedra', 'ave'];
        let tipoEscolhido = tipos[Math.floor(Math.random() * tipos.length)];
        
        criarObjetoEmTela(tipoEscolhido);
    }
}

function criarObjetoEmTela(tipo) {
    let obs = {
        x: canvas.width,
        y: 0,
        largura: 0,
        altura: 0,
        tipo: tipo,
        animacaoFrame: 0 
    };

    if (tipo === 'cactus') {
        obs.largura = 25;
        obs.altura = 40 + Math.random() * 20; 
        obs.y = CONFIG.chaoY - obs.altura;
    } else if (tipo === 'pedra') {
        obs.largura = 35;
        obs.altura = 25;
        obs.y = CONFIG.chaoY - obs.altura;
    } else if (tipo === 'ave') {
        obs.largura = 30;
        obs.altura = 20;
        obs.y = CONFIG.chaoY - 55 - Math.random() * 65; 
    } else if (tipo === 'fruta_lenta' || tipo === 'fruta_invencivel') {
        obs.largura = 20;
        obs.altura = 20;
        obs.y = CONFIG.chaoY - 50 - Math.random() * 70; 
    }
    listaObstaculos.push(obs);
}

function desenharObstaculo(obs) {
    ctx.save();
    
    let corCactus = score >= 300 ? "#00FFDD" : "#26DE81";
    let corPedra = score >= 300 ? "#A55EEA" : "#778CA3";
    let corAve = score >= 300 ? "#FF7675" : "#FF4757";

    if (obs.tipo === 'cactus') {
        ctx.fillStyle = corCactus; 
        ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
        ctx.fillRect(obs.x - 5, obs.y + 12, obs.largura + 10, 8);
        ctx.fillRect(obs.x - 5, obs.y + 5, 5, 8);
        ctx.fillRect(obs.x + obs.largura, obs.y + 2, 5, 12);
    } else if (obs.tipo === 'pedra') {
        ctx.fillStyle = corPedra; 
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y + obs.altura);
        ctx.lineTo(obs.x + obs.largura / 2, obs.y);
        ctx.lineTo(obs.x + obs.largura, obs.y + obs.altura);
        ctx.closePath();
        ctx.fill();
    } else if (obs.tipo === 'ave') {
        ctx.fillStyle = corAve;
        ctx.fillRect(obs.x, obs.y, obs.largura, obs.altura);
        ctx.fillStyle = "#FFF"; ctx.fillRect(obs.x + 4, obs.y + 4, 4, 4);
        ctx.fillStyle = "#FFA500"; ctx.fillRect(obs.x - 4, obs.y + 6, 4, 4);

        obs.animacaoFrame++;
        ctx.fillStyle = score >= 300 ? "#FDA7DF" : "#FF6B81";
        if (Math.floor(obs.animacaoFrame / 10) % 2 === 0) {
            ctx.fillRect(obs.x + 10, obs.y - 6, 8, 8);
        } else {
            ctx.fillRect(obs.x + 10, obs.y + obs.altura - 2, 8, 8);
        }
    } else if (obs.tipo === 'fruta_lenta') {
        ctx.beginPath();
        ctx.arc(obs.x + 10, obs.y + 10, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#26DE81"; 
        ctx.fill();
        ctx.beginPath();
        ctx.arc(obs.x + 10, obs.y + 10, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#FF4757"; 
        ctx.fill();
        ctx.fillStyle = "#78E08F";
        ctx.fillRect(obs.x + 8, obs.y - 4, 4, 5);
    } else if (obs.tipo === 'fruta_invencivel') {
        ctx.fillStyle = "#FF6B81";
        ctx.beginPath();
        ctx.moveTo(obs.x + 10, obs.y + 20); 
        ctx.lineTo(obs.x, obs.y + 4);
        ctx.lineTo(obs.x + 20, obs.y + 4);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#26DE81";
        ctx.fillRect(obs.x + 4, obs.y, 12, 4);
    }
    
    ctx.restore();
}

/* ==========================================================================
   MECÂNICAS DO LOOP PRINCIPAL - CAT JUMP
   ========================================================================== */
function iniciarNovoJogo() {
    score = 0;
    frameContadorPontos = 0;
    listaObstaculos = [];
    velocidadeAtual = CONFIG.velocidadeInicial;
    bicho.x = 80; // Inicializa na posição padrão
    bicho.y = CONFIG.chaoY - bicho.altura;
    bicho.velocidadeY = 0;
    bicho.estaNoChao = true;
    bicho.pulosDisponiveis = 2;
    bicho.dashAtivo = false;
    bicho.dashCooldown = 0;
    bicho.invencivelTempo = 0; 
    
    // Reseta estado das teclas
    teclas.esquerda = false;
    teclas.direita = false;

    jogoAtivo = true;
    primeiroInicio = false;
    
    if (telaOverlay) telaOverlay.style.display = "none";
    if (btnAcao && !telaOverlay) btnAcao.style.display = "none";
    
    loop();
}

function loop() {
    if (!jogoAtivo) return;

    let cenarioAtual = score >= 300 ? CENARIOS.espacial : CENARIOS.normal;

    if (score >= 300) {
        ctx.fillStyle = "#110A24";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(100, 40, 2, 2); ctx.fillRect(250, 80, 3, 3);
        ctx.fillRect(400, 30, 2, 2); ctx.fillRect(550, 90, 2, 2);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.fillStyle = cenarioAtual.chaoTerra;
    ctx.fillRect(0, CONFIG.chaoY, canvas.width, canvas.height - CONFIG.chaoY);
    ctx.fillStyle = cenarioAtual.chaoGrama; 
    ctx.fillRect(0, CONFIG.chaoY, canvas.width, 6);

    bicho.atualizar();
    bicho.desenhar();
    gerarObstaculo();

    for (let i = listaObstaculos.length - 1; i >= 0; i--) {
        let obs = listaObstaculos[i];
        
        let modVelocidade = obs.tipo === 'ave' ? 1.15 : 1.0;
        obs.x -= bicho.dashAtivo ? (velocidadeAtual * 1.5) : (velocidadeAtual * modVelocidade);
        
        desenharObstaculo(obs);

        // Sistema de colisão
        if (bicho.x < obs.x + obs.largura &&
            bicho.x + bicho.largura > obs.x &&
            bicho.y < obs.y + obs.altura &&
            bicho.y + bicho.altura > obs.y) {
            
            if (obs.tipo === 'fruta_lenta') {
                velocidadeAtual = Math.max(4, velocidadeAtual - 3);
                listaObstaculos.splice(i, 1); 
                continue;
            } 
            else if (obs.tipo === 'fruta_invencivel') {
                bicho.invencivelTempo = 600;
                listaObstaculos.splice(i, 1); 
                continue;
            } 
            else {
                if (bicho.invencivelTempo > 0) {
                    score += 50; 
                    listaObstaculos.splice(i, 1);
                } else if (!bicho.dashAtivo) {
                    finalizarJogo();
                }
            }
        }

        if (obs.x + obs.largura < 0) {
            listaObstaculos.splice(i, 1);
        }
    }

    // Sistema de Pontos Cadenciados
    frameContadorPontos++;
    if (frameContadorPontos >= 10) {
        score++;
        frameContadorPontos = 0; 
        
        if (txtScore) txtScore.innerText = String(score).padStart(5, '0');
        
        // Aumenta a velocidade base e gera fruta a cada 100 pontos
        if (score % 100 === 0 && velocidadeAtual < CONFIG.velocidadeMaxima) {
            velocidadeAtual += 0.4;
            
            let frutasEspeciais = ['fruta_lenta', 'fruta_invencivel'];
            let frutaSorteada = frutasEspeciais[Math.floor(Math.random() * frutasEspeciais.length)];
            criarObjetoEmTela(frutaSorteada);
        }
    }

    frameId = requestAnimationFrame(loop);
}

function finalizarJogo() {
    jogoAtivo = false;
    cancelAnimationFrame(frameId);
    
    if (telaOverlay && textoOverlay && subtextoOverlay && btnAcao) {
        textoOverlay.innerText = "FIM DE JOGO";
        subtextoOverlay.innerText = `Você sobreviveu por ${score} pontos!`;
        btnAcao.innerText = "TENTAR DE NOVO";
        telaOverlay.style.display = "flex";
    } else if (btnAcao) {
        btnAcao.innerText = `FIM DE JOGO (${score} pts) - JOGAR DE NOVO`;
        btnAcao.style.display = "block";
    }
}

function gerenciarBotao() {
    iniciarNovoJogo();
}

if (btnAcao) {
    btnAcao.onclick = gerenciarBotao;
}
