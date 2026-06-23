const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Estados Globais do Jogo
let score = 0;
let lives = 3;
let isPlaying = false;
let linePower = 1; // 1: Normal, 2: Cerol, 3: Chilena
let powerTimer = 0;

// Sistema de Inputs Híbrido (Teclado + Mouse/Touch)
const keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
const pointer = { x: null, y: null, active: false };

window.addEventListener("keydown", e => { if (e.key in keys) keys[e.key] = true; });
window.addEventListener("keyup", e => { if (e.key in keys) keys[e.key] = false; });

function updatePointer(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    pointer.x = x - player.width / 2;
    pointer.y = y - player.height / 2;
    pointer.active = true;
}

canvas.addEventListener("mousedown", updatePointer);
canvas.addEventListener("mousemove", e => { if (pointer.active) updatePointer(e); });
window.addEventListener("mouseup", () => pointer.active = false);
canvas.addEventListener("touchstart", updatePointer);
canvas.addEventListener("touchmove", updatePointer);
window.addEventListener("touchend", () => pointer.active = false);

// Configuração do Jogador (Pipa Amarela)
const player = {
    x: 150, 
    y: canvas.height / 2,
    width: 44, 
    height: 44, 
    speed: 8
};

let clouds = [];
let enemyKites = [];
let items = [];

// Classe Nuvens com Efeito Parallax (Fundo e Frente)
class Cloud {
    constructor() {
        this.layer = Math.random() > 0.5 ? 1 : 2; // Camada 1 (fundo) ou Camada 2 (frente)
        this.x = canvas.width + 100;
        this.y = Math.random() * (canvas.height * 0.5);
        this.size = 30 + Math.random() * 40;
        this.speed = this.layer === 1 ? 0.8 : 1.8; 
    }
    update() { this.x -= this.speed; }
    draw() {
        ctx.fillStyle = this.layer === 1 ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 0.6, this.y - this.size * 0.3, this.size * 1.2, 0, Math.PI * 2);
        ctx.arc(this.x + this.size * 1.3, this.y, this.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Classe das Pipas Oponentes
class EnemyKite {
    constructor() {
        this.x = canvas.width + 60;
        this.y = Math.random() * (canvas.height - 200) + 50;
        this.width = 40;
        this.height = 40;
        this.speed = 3 + Math.random() * 3;
        this.color = `hsl(${Math.random() * 360}, 85%, 55%)`;
        this.isCut = false;
        this.fallAngle = 0;
        this.cutPointY = null; // Ponto onde a linha se rompe fisicamente
    }
    update() {
        if (!this.isCut) {
            this.x -= this.speed;
            this.y += Math.sin(this.x / 40) * 2.5; // Movimento oscilatório no vento
        } else {
            // Física de queda para pipa cortada ("avoada")
            this.x -= 1;
            this.y += 3.5;
            this.fallAngle += 0.07;
        }
    }
    draw() {
        ctx.save();
        if (this.isCut) {
            ctx.translate(this.x + this.width/2, this.y + this.height/2);
            ctx.rotate(this.fallAngle);
            ctx.translate(-(this.x + this.width/2), -(this.y + this.height/2));
        }

        // Renderização da Linha Inimiga
        ctx.lineWidth = 1;
        if (!this.isCut) {
            ctx.strokeStyle = "rgba(255,255,255,0.15)";
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2, this.y + this.height);
            ctx.lineTo(this.x + 300, canvas.height); 
            ctx.stroke();
        } else if (this.cutPointY !== null) {
            // Pedaço de linha solta balançando na pipa avuada
            ctx.strokeStyle = "rgba(255,255,255,0.3)";
            ctx.beginPath();
            ctx.moveTo(this.x + this.width/2, this.y + this.height);
            ctx.quadraticCurveTo(this.x + 20, this.y + this.height + 40, this.x + Math.sin(Date.now()/100)*10, this.y + 120);
            ctx.stroke();
        }

        // Desenho da Pipa Inimiga (Losango)
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.isCut ? 0 : 5; // Brilho neon sutil se estiver viva
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height/2);
        ctx.lineTo(this.x + this.width/2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height/2);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0; 

        // Rabiola
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2, this.y + this.height);
        ctx.quadraticCurveTo(this.x + this.width + 5, this.y + this.height + 15, this.x - 5, this.y + this.height + 45);
        ctx.stroke();

        ctx.restore();
    }
}

// Classe de Carretéis de Linha (Power-ups)
class PowerUp {
    constructor() {
        this.x = canvas.width + 50;
        this.y = Math.random() * (canvas.height - 200) + 80;
        this.size = 28;
        this.speed = 3.5;
        this.type = Math.random() > 0.55 ? 3 : 2; // Cerol (2) ou Chilena (3)
    }
    update() { this.x -= this.speed; }
    draw() {
        const glowColor = this.type === 3 ? "#ff3d00" : "#ffeb3b";
        ctx.save();
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 10;
        
        // Linha enrolada brilhante
        ctx.fillStyle = glowColor;
        ctx.fillRect(this.x, this.y + 4, this.size, this.size - 8);
        
        // Laterais de madeira do carretel
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#8d6e63";
        ctx.fillRect(this.x - 4, this.y, 4, this.size);
        ctx.fillRect(this.x + this.size, this.y, 4, this.size);
        ctx.restore();
    }
}

// Desenha a Pipa do Jogador e sua Linha Dinâmica
function drawPlayer() {
    let lineColors = ["rgba(255,255,255,0.5)", "#ffeb3b", "#ff3d00"];
    let glowBlurs = [0, 8, 15];

    // Desenha Linha do Player com efeito Neon baseado no Power-up ativo
    ctx.save();
    ctx.strokeStyle = lineColors[linePower - 1];
    ctx.shadowColor = lineColors[linePower - 1];
    ctx.shadowBlur = glowBlurs[linePower - 1];
    ctx.lineWidth = linePower > 1 ? 3 : 1.5;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height); // Linha sai da ponta inferior esquerda da tela
    ctx.lineTo(player.x + player.width / 2, player.y + player.height);
    ctx.stroke();
    ctx.restore();

    // Corpo da Pipa (Losango)
    ctx.fillStyle = "#ffeb3b";
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x + player.width, player.y + player.height / 2);
    ctx.lineTo(player.x + player.width / 2, player.y + player.height);
    ctx.lineTo(player.x, player.y + player.height / 2);
    ctx.closePath();
    ctx.fill();

    // Varetas internas (Estrutura)
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width/2, player.y); ctx.lineTo(player.x + player.width/2, player.y + player.height);
    ctx.moveTo(player.x, player.y + player.height/2); ctx.lineTo(player.x + player.width, player.y + player.height/2);
    ctx.stroke();

    // Rabiola de fitas vermelhas
    ctx.strokeStyle = "#ff3333";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(player.x + player.width/2, player.y + player.height);
    ctx.quadraticCurveTo(player.x - 25, player.y + player.height + 20, player.x - 50, player.y + player.height + 55);
    ctx.stroke();
}

// Movimentação por teclado ou touch suave
function movePlayer() {
    if (keys.ArrowUp && player.y > 0) player.y -= player.speed;
    if (keys.ArrowDown && player.y < canvas.height - player.height) player.y += player.speed;
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;

    if (pointer.active) {
        player.x += (pointer.x - player.x) * 0.18;
        player.y += (pointer.y - player.y) * 0.18;
    }
}

function checkCollision(r1, r2) {
    return r1.x < r2.x + (r2.width || r2.size) &&
           r1.x + r1.width > r2.x &&
           r1.y < r2.y + (r2.height || r2.size) &&
           r1.y + r1.height > r2.y;
}

// Sistema de Combate e "Cortar Linha"
function runCombatLogic(kite, idx) {
    if (kite.isCut) return;

    if (checkCollision(player, kite)) {
        // Corta se o jogador estiver acima do oponente OU se estiver com linha especial ativa (Cerol/Chilena)
        if (player.y < kite.y + 16 || linePower > 1) {
            score += 10;
            document.getElementById("score").innerText = score;
            kite.isCut = true;
            kite.cutPointY = kite.y + kite.height / 2; // Salva o ponto do corte
        } else {
            // Jogador foi cortado
            lives--;
            enemyKites.splice(idx, 1);
            document.getElementById("lives").innerText = lives;
            if (lives <= 0) endGame();
        }
    }
}

// Loop Principal (Aproximadamente 60 FPS)
function gameLoop() {
    if (!isPlaying) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    
    // Renderiza nuvens distantes (Camada 1 do Parallax)
    clouds.filter(c => c.layer === 1).forEach(c => { c.update(); c.draw(); });
    
    drawPlayer();

    // Timer de duração da linha especial
    if (linePower > 1) {
        powerTimer--;
        if (powerTimer <= 0) { linePower = 1; updateUIStrings(); }
    }

    // Gerador de objetos (Nuvens, Pipas Inimigas e Itens)
    if (Math.random() < 0.007 && clouds.length < 5) clouds.push(new Cloud());
    if (Math.random() < 0.015 && enemyKites.length < 5) enemyKites.push(new EnemyKite());
    if (Math.random() < 0.004 && items.length < 1) items.push(new PowerUp());

    // Renderiza nuvens próximas (Camada 2 do Parallax com dano de colisão)
    for (let i = clouds.length - 1; i >= 0; i--) {
        if (clouds[i].layer === 2) { clouds[i].update(); clouds[i].draw(); }
        
        if (clouds[i].layer === 2 && checkCollision(player, clouds[i])) {
            lives--; clouds.splice(i, 1);
            document.getElementById("lives").innerText = lives;
            if (lives <= 0) endGame();
            continue;
        }
        if (clouds[i].x < -160) clouds.splice(i, 1);
    }

    // Processa Pipas Inimigas
    for (let i = enemyKites.length - 1; i >= 0; i--) {
        enemyKites[i].update(); enemyKites[i].draw();
        runCombatLogic(enemyKites[i], i);
        if (enemyKites[i].x < -60 || enemyKites[i].y > canvas.height + 100) enemyKites.splice(i, 1);
    }

    // Processa Carretéis de Linhas Fortes
    for (let i = items.length - 1; i >= 0; i--) {
        items[i].update(); items[i].draw();
        if (checkCollision(player, items[i])) {
            linePower = items[i].type;
            powerTimer = 450; // Tempo ativo do carretel
            updateUIStrings();
            items.splice(i, 1);
            continue;
        }
        if (items[i].x < -50) items.splice(i, 1);
    }

    requestAnimationFrame(gameLoop);
}

// Atualiza o texto das linhas na tela
function updateUIStrings() {
    const label = document.getElementById("lineType");
    if (linePower === 1) { label.innerText = "Comum"; label.className = "value text-normal"; }
    else if (linePower === 2) { label.innerText = "Cerol!"; label.className = "value text-cerol"; }
    else if (linePower === 3) { label.innerText = "Chilena!!"; label.className = "value text-chilena"; }
}

// Encerra a partida
function endGame() {
    isPlaying = false;
    document.getElementById("finalScore").innerText = score;
    document.getElementById("modalTitle").innerText = "Linha Cortada!";
    document.getElementById("modalDesc").innerText = "Você não resistiu à pressão das linhas adversárias.";
    document.getElementById("gameOverStats").style.display = "block";
    document.getElementById("startBtn").innerText = "Subir Outra Pipa";
    document.getElementById("gameModal").style.opacity = "1";
    document.getElementById("gameModal").style.pointerEvents = "auto";
}

// Reseta e Inicia a Partida
function initGame() {
    score = 0; lives = 3; linePower = 1; powerTimer = 0;
    clouds = []; enemyKites = []; items = [];
    player.x = 150; player.y = canvas.height / 2;
    pointer.active = false;

    document.getElementById("score").innerText = score;
    document.getElementById("lives").innerText = lives;
    updateUIStrings();

    document.getElementById("gameModal").style.opacity = "0";
    document.getElementById("gameModal").style.pointerEvents = "none";
    isPlaying = true;
    gameLoop();
}

// Evento do botão de iniciar
document.getElementById("startBtn").addEventListener("click", initGame);