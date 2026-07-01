const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const trackNameElement = document.getElementById("track-name");
const speedDisplay = document.getElementById("speed-display");
const progressBar = document.getElementById("progress-bar");
const menuScreen = document.getElementById("menu");
const gameOverScreen = document.getElementById("game-over");
const hud = document.getElementById("hud");

let gameActive = false;
let score = 0;
let distanceTraveled = 0;
const maxDistance = 1500; 
let currentSpeed = 0;
let targetSpeed = 6.8; 
let trackOffset = 0;

let currentTrack = 1;
// Mapeamento exclusivo para comandos A e D
let keys = { a: false, d: false, A: false, D: false };

const lanes = [-36, 0, 36]; 

const player = {
    x: canvas.width / 2 - 38,
    y: canvas.height - 95,
    width: 76,
    height: 62,
    speed: 7.0
};

const trackStyles = {
    1: { name: "Coastline Highway", asphalt: "#282a30", grass: "#e1cf9b", zebra1: "#e63946", zebra2: "#f8f9fa" },
    2: { name: "Cyber City Lights", asphalt: "#14131c", grass: "#040308", zebra1: "#00f0ff", zebra2: "#ff0066" },
    3: { name: "Deep Midnight Run", asphalt: "#1b1d21", grass: "#0f160d", zebra1: "#ffb703", zebra2: "#f8f9fa" }
};

let obstacles = [];

function startGame(trackId) {
    currentTrack = trackId;
    trackNameElement.innerText = trackStyles[trackId].name;
    menuScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    hud.style.display = "flex";
    
    resetGame();
    gameActive = true;
    gameLoop();
}

function resetGame() {
    obstacles = [];
    score = 0;
    distanceTraveled = 0;
    currentSpeed = 0;
    player.x = canvas.width / 2 - 38;
    progressBar.style.width = "0%";
    scoreElement.innerText = score;
}

function restartGame() {
    gameOverScreen.style.display = "none";
    resetGame();
    gameActive = true;
    gameLoop();
}

function backToMenu() {
    gameOverScreen.style.display = "none";
    hud.style.display = "none";
    menuScreen.style.display = "flex";
    gameActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function spawnObstacle() {
    if (obstacles.length < 2 && Math.random() < 0.022) {
        let randomLaneIndex = Math.floor(Math.random() * lanes.length);
        let selectedLaneOffset = lanes[randomLaneIndex];

        let laneOccupied = obstacles.some(obs => obs.laneOffset === selectedLaneOffset && obs.y < 240);

        if (!laneOccupied) {
            const colors = ["#1062de", "#e05310", "#8b10de", "#0fa851"];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];

            obstacles.push({
                scale: 0.05,
                laneOffset: selectedLaneOffset,
                y: 160,
                width: 78,
                height: 56,
                speed: 1.2 + Math.random() * 0.4,
                color: randomColor
            });
        }
    }
}

window.addEventListener("keydown", (e) => { if (e.key in keys) keys[e.key] = true; });
window.addEventListener("keyup", (e) => { if (e.key in keys) keys[e.key] = false; });

function updatePhysics() {
    if (currentSpeed < targetSpeed) currentSpeed += 0.08;
    speedDisplay.innerText = Math.floor(currentSpeed * 28);

    distanceTraveled += currentSpeed * 0.05;
    let progressPct = Math.min((distanceTraveled / maxDistance) * 100, 100);
    progressBar.style.width = `${progressPct}%`;

    trackOffset += currentSpeed;
    if (trackOffset > 40) trackOffset = 0;

    if (keys.a || keys.A) player.x -= player.speed;
    if (keys.d || keys.D) player.x += player.speed;

    let leftBoundary = (canvas.width / 2) - 235;
    let rightBoundary = (canvas.width / 2) + 235 - player.width;

    if (player.x < leftBoundary) player.x = leftBoundary;
    if (player.x > rightBoundary) player.x = rightBoundary;
}

function drawModernTree(x, y, size, isNeon) {
    if (size < 4) return;
    let trunkGrad = ctx.createLinearGradient(x, y, x + size/6, y);
    trunkGrad.addColorStop(0, "#3e2d20");
    trunkGrad.addColorStop(1, "#21160e");
    ctx.fillStyle = trunkGrad;
    ctx.fillRect(x - size/12, y - size, size/6, size);

    let leavesGrad = ctx.createRadialGradient(x, y - size, 0, x, y - size, size/2);
    if (isNeon) {
        leavesGrad.addColorStop(0, "#00ffcc");
        leavesGrad.addColorStop(1, "#004433");
    } else {
        leavesGrad.addColorStop(0, "#2dc01e");
        leavesGrad.addColorStop(1, "#0a5c03");
    }
    ctx.fillStyle = leavesGrad;
    ctx.beginPath();
    ctx.arc(x, y - size, size/2, 0, Math.PI * 2);
    ctx.fill();
}

function drawTrack() {
    let style = trackStyles[currentTrack];
    ctx.fillStyle = style.grass;
    ctx.fillRect(0, 160, canvas.width, canvas.height - 160);

    for (let i = 160; i < canvas.height; i += 4) {
        let progress = (i - 160) / (canvas.height - 160);
        let perspectiveWidth = progress * 480; 
        let laneWidth = progress * 16;
        
        let centerX = canvas.width / 2;
        let leftEdge = centerX - perspectiveWidth / 2;
        let rightEdge = centerX + perspectiveWidth / 2;

        let colorToggle = Math.floor((i + trackOffset) / 20) % 2 === 0;
        
        let asphaltGrad = ctx.createLinearGradient(leftEdge, i, rightEdge, i);
        asphaltGrad.addColorStop(0, "rgba(0,0,0,0.2)");
        asphaltGrad.addColorStop(0.15, style.asphalt);
        asphaltGrad.addColorStop(0.85, style.asphalt);
        asphaltGrad.addColorStop(1, "rgba(0,0,0,0.2)");
        
        ctx.fillStyle = asphaltGrad;
        ctx.fillRect(leftEdge, i, perspectiveWidth, 4);

        ctx.fillStyle = colorToggle ? style.zebra1 : style.zebra2;
        ctx.fillRect(leftEdge - laneWidth, i, laneWidth, 4);
        ctx.fillRect(rightEdge, i, laneWidth, 4);

        if (colorToggle && progress > 0.25) {
            let treeSize = progress * 42;
            drawModernTree(leftEdge - treeSize - 5, i, treeSize, currentTrack === 2);
            drawModernTree(rightEdge + treeSize + 5, i, treeSize, currentTrack === 2);
        }

        if (colorToggle && progress > 0.4) {
            ctx.fillStyle = "rgba(255,255,255,0.5)";
            ctx.fillRect(centerX - perspectiveWidth/6, i, 1.5 * progress, 4);
            ctx.fillRect(centerX + perspectiveWidth/6, i, 1.5 * progress, 4);
        }
    }
}

function drawPlayer() {
    ctx.save();
    
    // Sombra do chassi
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.beginPath();
    ctx.ellipse(player.x + player.width/2, player.y + player.height - 6, player.width/2 + 6, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // SKIN DO SEU CARRO: Pintura Vermelha Metálica Vetorial 
    let carGrad = ctx.createLinearGradient(player.x, player.y, player.x + player.width, player.y);
    carGrad.addColorStop(0, "#7a000e");
    carGrad.addColorStop(0.3, "#e6001a");
    carGrad.addColorStop(0.5, "#ff334b");
    carGrad.addColorStop(0.7, "#e6001a");
    carGrad.addColorStop(1, "#7a000e");
    
    ctx.fillStyle = carGrad;
    ctx.beginPath();
    ctx.roundRect(player.x, player.y + 14, player.width, player.height - 16, 12);
    ctx.fill();

    // Aerofólio Premium Traseiro
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(player.x + 4, player.y + 14, player.width - 8, 4);
    ctx.fillRect(player.x + 8, player.y + 10, 8, 4);
    ctx.fillRect(player.x + player.width - 16, player.y + 10, 8, 4);
    ctx.fillRect(player.x + 6, player.y + 8, player.width - 12, 3);

    // Interior do Cockpit (Bancos esportivos)
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.roundRect(player.x + 18, player.y + 16, 16, 12, [4, 4, 0, 0]);
    ctx.roundRect(player.x + player.width - 34, player.y + 16, 16, 12, [4, 4, 0, 0]);
    ctx.fill();

    // Para-brisa Aerodinâmico Curvo Espelhado
    let glassGrad = ctx.createLinearGradient(player.x, player.y, player.x, player.y + 12);
    glassGrad.addColorStop(0, "rgba(210, 245, 255, 0.85)");
    glassGrad.addColorStop(1, "rgba(120, 190, 245, 0.4)");
    ctx.fillStyle = glassGrad;
    ctx.beginPath();
    ctx.roundRect(player.x + 14, player.y + 3, player.width - 28, 11, [8, 8, 0, 0]);
    ctx.fill();

    // Rodas Modernas de Perfil Baixo
    ctx.fillStyle = "#111115";
    ctx.fillRect(player.x + 2, player.y + player.height - 22, 10, 22);
    ctx.fillRect(player.x + player.width - 12, player.y + player.height - 22, 10, 22);

    // Lanternas de LED Neon Contínuas
    ctx.fillStyle = "#ff003c";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff003c";
    ctx.fillRect(player.x + 8, player.y + 20, player.width - 16, 3);

    ctx.restore();

    // Placa Embutida
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(player.x + player.width/2 - 14, player.y + 28, 28, 8);
}

function updateAndDrawObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        
        obs.scale += 0.016;
        obs.y += currentSpeed * (obs.scale * 1.45);
        
        let progress = (obs.y - 160) / (canvas.height - 160);
        let centerX = canvas.width / 2;
        
        obs.x = centerX + (obs.laneOffset * (progress * 4.62));

        let currentWidth = obs.width * obs.scale;
        let currentHeight = obs.height * obs.scale;

        if (obs.y > 160) {
            ctx.save();
            
            // Sombra do inimigo
            ctx.fillStyle = "rgba(0,0,0,0.35)";
            ctx.beginPath();
            ctx.ellipse(obs.x, obs.y + currentHeight - 2, currentWidth/1.8, 5 * obs.scale, 0, 0, Math.PI * 2);
            ctx.fill();

            // SKIN DOS INIMIGOS: Superesportivo Coupe Modernizado por Gradientes
            let bodyGrad = ctx.createLinearGradient(obs.x - currentWidth/2, obs.y, obs.x + currentWidth/2, obs.y);
            bodyGrad.addColorStop(0, "rgba(0,0,0,0.3)");
            bodyGrad.addColorStop(0.2, obs.color);
            bodyGrad.addColorStop(0.8, obs.color);
            bodyGrad.addColorStop(1, "rgba(0,0,0,0.3)");
            
            ctx.fillStyle = bodyGrad;
            ctx.beginPath();
            ctx.roundRect(obs.x - currentWidth/2, obs.y, currentWidth, currentHeight, 8 * obs.scale);
            ctx.fill();
            
            // Faixas de Corrida (Racing Stripes) no teto/capô
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fillRect(obs.x - 4 * obs.scale, obs.y, 3 * obs.scale, currentHeight);
            ctx.fillRect(obs.x + 2 * obs.scale, obs.y, 3 * obs.scale, currentHeight);

            // Vidro Traseiro Panorâmico Fumê
            ctx.fillStyle = "#070e17";
            ctx.beginPath();
            ctx.roundRect(obs.x - currentWidth/3, obs.y + currentHeight/4, (currentWidth/3)*2, currentHeight/2.8, 3 * obs.scale);
            ctx.fill();

            // Faróis de LED Traseiros Vermelhos Nitidos
            ctx.fillStyle = "#ff1a1a";
            ctx.fillRect(obs.x - currentWidth/2 + 4 * obs.scale, obs.y + currentHeight/6, 10 * obs.scale, 3 * obs.scale);
            ctx.fillRect(obs.x + currentWidth/2 - 14 * obs.scale, obs.y + currentHeight/6, 10 * obs.scale, 3 * obs.scale);

            ctx.restore();
        }

        if (obs.scale > 0.78) {
            let obsLeft = obs.x - currentWidth/2;
            let obsRight = obs.x + currentWidth/2;
            let obsTop = obs.y;
            let obsBottom = obs.y + currentHeight;

            if (player.x < obsRight && player.x + player.width > obsLeft &&
                player.y < obsBottom && player.y + player.height > obsTop) {
                gameActive = false;
                gameOverScreen.style.display = "flex";
            }
        }

        if (obs.y > canvas.height) {
            obstacles.splice(i, 1);
            score += 20; 
            scoreElement.innerText = score;
        }
    }
}

function gameLoop() {
    if (!gameActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePhysics();
    drawTrack();
    drawPlayer();
    spawnObstacle();
    updateAndDrawObstacles();

    requestAnimationFrame(gameLoop);
}