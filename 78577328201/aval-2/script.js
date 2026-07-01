const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const statusElement = document.getElementById("status");

// Configurações Globais de Física
const GRAVITY = 0.6;
const FRICTION = 0.85;
let score = 0;
let gameActive = true;
let cameraX = 0;

// Estado do Teclado
const keys = { right: false, left: false, up: false };

// Objeto do Jogador
const player = {
    x: 100,
    y: 300,
    width: 30,
    height: 40,
    speed: 5,
    velX: 0,
    velY: 0,
    jumping: false,
    powerMode: "PEQUENO",
    color: "#e52521"
};

// Listas de Objetos do Cenário
let platforms = [
    { x: -200, y: 400, width: 2200, height: 40, type: "floor" },
    { x: 400, y: 280, width: 120, height: 30, type: "brick" },
    { x: 600, y: 180, width: 40, height: 30, type: "blockWithItem", hasItem: true },
    { x: 640, y: 180, width: 120, height: 30, type: "brick" },
    { x: 900, y: 280, width: 200, height: 30, type: "brick" }
];

let coins = [
    { x: 430, y: 230, width: 15, height: 15, collected: false },
    { x: 680, y: 130, width: 15, height: 15, collected: false },
    { x: 720, y: 130, width: 15, height: 15, collected: false },
    { x: 950, y: 230, width: 15, height: 15, collected: false }
];

let enemies = [
    { x: 550, y: 370, width: 30, height: 30, speed: 1.5, direction: -1, color: "#744700" },
    { x: 1050, y: 370, width: 30, height: 30, speed: 2, direction: -1, color: "#744700" }
];

let items = [];

// Captura de comandos do teclado (Suporta Setas e WASD)
window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = true;
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = true;
    if (e.code === "ArrowUp" || e.code === "Space" || e.code === "KeyW") keys.up = true;
});

window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
    if (e.code === "ArrowUp" || e.code === "Space" || e.code === "KeyW") keys.up = false;
});

// Detector de colisão básica AABB
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Geração Procedural e Infinita do Mapa
function generateInfiniteMap() {
    if (platforms.length === 0) return;
    
    let lastPlat = platforms[platforms.length - 1];
    
    // Se o jogador se aproximar do fim do mapa carregado, gera novos blocos
    if (lastPlat.x < player.x + 1000) {
        let nextX = lastPlat.x + lastPlat.width + Math.random() * 60 + 50;
        let nextWidth = Math.random() * 150 + 120;
        let nextY = Math.random() * 140 + 180;

        // Adiciona bloco de plataforma aérea
        platforms.push({ x: nextX, y: nextY, width: nextWidth, height: 30, type: "brick" });
        
        // Sempre gera um chão plano abaixo para evitar quedas injustas imediatas
        platforms.push({ x: nextX - 50, y: 400, width: nextWidth + 150, height: 40, type: "floor" });

        // Chance de spawnar bloco surpresa com cogumelo
        if (Math.random() > 0.5) {
            platforms.push({ x: nextX + 40, y: nextY - 90, width: 35, height: 30, type: "blockWithItem", hasItem: true });
        }

        // Chance de spawnar moedas
        if (Math.random() > 0.3) {
            coins.push({ x: nextX + nextWidth / 2, y: nextY - 45, width: 15, height: 15, collected: false });
            coins.push({ x: nextX + nextWidth / 2 + 25, y: nextY - 45, width: 15, height: 15, collected: false });
        }

        // Chance de spawnar inimigos
        if (Math.random() > 0.4) {
            enemies.push({ x: nextX + nextWidth / 2, y: 370, width: 30, height: 30, speed: 1.5 + Math.random(), direction: -1, color: "#744700" });
        }
    }
}

function update() {
    if (!gameActive) return;

    // Movimentação Horizontal com Inércia/Atrito
    if (keys.right) {
        player.velX = player.speed;
    } else if (keys.left) {
        player.velX = -player.speed;
    } else {
        player.velX *= FRICTION; // Desliza suavemente até parar
        if (Math.abs(player.velX) < 0.1) player.velX = 0;
    }

    // Gravidade
    player.velY += GRAVITY;
    
    player.x += player.velX;
    player.y += player.velY;

    // Impede o jogador de voltar para trás da câmera fixa
    if (player.x < cameraX) {
        player.x = cameraX;
        player.velX = 0;
    }

    // Queda no abismo
    if (player.y > canvas.height) {
        gameOver();
        return;
    }

    // Scroll Dinâmico da Câmera
    if (player.x > cameraX + canvas.width / 2) {
        cameraX = player.x - canvas.width / 2;
    }

    // Tratamento de Colisão com Plataformas
    player.jumping = true;
    platforms.forEach(plat => {
        if (checkCollision(player, plat)) {
            
            // 1. Colisão por Cima (Pisar)
            if (player.x + player.width - 6 > plat.x && player.x + 6 < plat.x + plat.width &&
                player.y + player.height - player.velY <= plat.y + 8 && player.velY >= 0) {
                player.jumping = false;
                player.velY = 0;
                player.y = plat.y - player.height;
            }
            // 2. Colisão por Baixo (Bater a Cabeça)
            else if (player.x + player.width - 6 > plat.x && player.x + 6 < plat.x + plat.width &&
                     player.y - player.velY >= plat.y + plat.height - 12 && player.velY < 0) {
                player.velY = 1; 
                player.y = plat.y + plat.height;

                if (plat.type === "blockWithItem" && plat.hasItem) {
                    plat.hasItem = false;
                    plat.type = "brickUsed";
                    items.push({ x: plat.x + 4, y: plat.y - 30, width: 26, height: 26, velY: -5, speed: 2, color: "#ff4500" });
                }
            }
            // 3. Colisões Laterais
            else if (player.x + player.width - player.velX <= plat.x + 5) {
                player.x = plat.x - player.width;
                player.velX = 0;
            } else if (player.x - player.velX >= plat.x + plat.width - 5) {
                player.x = plat.x + plat.width;
                player.velX = 0;
            }
        }
    });

    // Pulo mecânico
    if (keys.up && !player.jumping) {
        player.velY = -12;
        player.jumping = true;
    }

    // Atualização de Itens (Cogumelos)
    items.forEach((item, index) => {
        item.velY += GRAVITY;
        item.y += item.velY;
        item.x += item.speed;

        platforms.forEach(plat => {
            if (item.x + item.width > plat.x && item.x < plat.x + plat.width &&
                item.y + item.height - item.velY <= plat.y + 8 && item.velY >= 0) {
                item.velY = 0;
                item.y = plat.y - item.height;
            }
        });

        if (checkCollision(player, item)) {
            player.powerMode = "GRANDE";
            player.height = 55; 
            statusElement.innerText = "SUPER GRANDE";
            statusElement.style.color = "#ffcc00";
            score += 500;
            scoreElement.innerText = score;
            items.splice(index, 1);
        }
    });

    // Coleta de Moedas
    coins.forEach(coin => {
        if (!coin.collected && checkCollision(player, coin)) {
            coin.collected = true;
            score += 100;
            scoreElement.innerText = score;
        }
    });

    // Lógica e Movimentação dos Inimigos
    enemies.forEach((enemy, index) => {
        enemy.x += enemy.speed * enemy.direction;

        platforms.forEach(plat => {
            if (checkCollision(enemy, plat) && enemy.y + enemy.height - 5 > plat.y) {
                if (enemy.direction > 0 && enemy.x + enemy.width - enemy.speed <= plat.x + 5) {
                    enemy.direction = -1;
                } else if (enemy.direction < 0 && enemy.x - enemy.speed >= plat.x + plat.width - 5) {
                    enemy.direction = 1;
                }
            }
        });

        if (checkCollision(player, enemy)) {
            if (player.velY > 0 && player.y + player.height - player.velY < enemy.y + 12) {
                score += 200;
                scoreElement.innerText = score;
                player.velY = -8; 
                enemies.splice(index, 1);
            } else {
                if (player.powerMode === "GRANDE") {
                    player.powerMode = "PEQUENO";
                    player.height = 40; 
                    statusElement.innerText = "PEQUENO";
                    statusElement.style.color = "#ff4500";
                    enemy.direction *= -1; 
                    player.x += (player.x < enemy.x) ? -50 : 50; 
                } else {
                    gameOver();
                }
            }
        }
    });

    generateInfiniteMap();

    // Otimização de Memória
    platforms = platforms.filter(plat => plat.x + plat.width > cameraX - 400);
    coins = coins.filter(coin => !coin.collected && coin.x > cameraX - 400);
    enemies = enemies.filter(enemy => enemy.x > cameraX - 400);
    items = items.filter(item => item.x > cameraX - 400);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-cameraX, 0);

    // Renderiza Plataformas
    platforms.forEach(plat => {
        if (plat.type === "floor") {
            ctx.fillStyle = "#744700"; 
            ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
            ctx.fillStyle = "#4a9c2d"; 
            ctx.fillRect(plat.x, plat.y, plat.width, 10);
        } else if (plat.type === "brick") {
            ctx.fillStyle = "#b84600";
            ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
            ctx.strokeStyle = "#fc9c5c";
            ctx.lineWidth = 2;
            ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);
        } else if (plat.type === "blockWithItem") {
            ctx.fillStyle = "#fc9c24"; 
            ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 18px Arial";
            ctx.fillText("?", plat.x + 12, plat.y + 22);
        } else if (plat.type === "brickUsed") {
            ctx.fillStyle = "#747474"; 
            ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
            ctx.strokeStyle = "#444";
            ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);
        }
    });

    // Renderiza Moedas
    coins.forEach(coin => {
        if (!coin.collected) {
            ctx.fillStyle = "#fcc424";
            ctx.beginPath();
            ctx.arc(coin.x + 7, coin.y + 7, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });

    // Renderiza Itens
    items.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(item.x + 13, item.y + 11, 13, Math.PI, 0, false);
        ctx.fill();
        ctx.fillStyle = "#fce4a0"; 
        ctx.fillRect(item.x + 6, item.y + 11, 14, 15);
    });

    // Renderiza Inimigos
    enemies.forEach(enemy => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = "#fff";
        ctx.fillRect(enemy.x + 4, enemy.y + 6, 6, 8);
        ctx.fillRect(enemy.x + 20, enemy.y + 6, 6, 8);
        ctx.fillStyle = "#000";
        ctx.fillRect(enemy.x + 6, enemy.y + 8, 3, 4);
        ctx.fillRect(enemy.x + 21, enemy.y + 8, 3, 4);
    });

    // Renderiza Jogador (Mario)
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.fillStyle = "#0020c2";
    ctx.fillRect(player.x + 4, player.y + (player.height * 0.55), player.width - 8, player.height * 0.45);
    
    ctx.fillStyle = "#fff";
    let eyeOffset = (keys.left || player.velX < -0.5) ? 4 : 20;
    ctx.fillRect(player.x + eyeOffset, player.y + 8, 6, 6);

    ctx.restore(); 
}

function gameOver() {
    gameActive = false;
    alert("GAME OVER! Você coletou " + score + " pontos!");
    document.location.reload();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();