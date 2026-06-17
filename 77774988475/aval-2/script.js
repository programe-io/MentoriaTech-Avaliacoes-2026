const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurações do Jogo
let gameRunning = false;
let score = 0;
let currentWave = 1;
const maxWaves = 10;

// Entidades
let player;
let bullets = [];
let enemies = [];
let particles = [];
let keys = {};
let mouse = { x: 0, y: 0, pressed: false };

// Arsenal (5 Armas com comportamentos diferentes)
const weapons = [
    { name: "Pistola", fireRate: 300, bulletSpeed: 10, damage: 25, spread: 0.05, count: 1, color: '#f1c40f', lastShot: 0 },
    { name: "Escopeta", fireRate: 800, bulletSpeed: 8, damage: 15, spread: 0.4, count: 5, color: '#e67e22', lastShot: 0 },
    { name: "Metralhadora", fireRate: 100, bulletSpeed: 12, damage: 12, spread: 0.15, count: 1, color: '#e74c3c', lastShot: 0 },
    { name: "Sniper", fireRate: 1200, bulletSpeed: 20, damage: 100, spread: 0, count: 1, color: '#3498db', lastShot: 0 },
    { name: "Plasma", fireRate: 200, bulletSpeed: 7, damage: 35, spread: 0.02, count: 1, color: '#9b59b6', lastShot: 0, radius: 8 }
];
let currentWeaponIndex = 0;

// Eventos de Controle (Teclado e Mouse)
window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if(['1','2','3','4','5'].includes(e.key)) {
        selectWeapon(parseInt(e.key) - 1);
    }
});
window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener('mousedown', e => { if(e.button === 0) mouse.pressed = true; });
canvas.addEventListener('mouseup', e => { if(e.button === 0) mouse.pressed = false; });

// Vincula os cliques dos botões de armas do HTML
for (let i = 0; i < 5; i++) {
    document.getElementById(`btn-${i}`).addEventListener('click', () => selectWeapon(i));
}

document.getElementById('start-btn').addEventListener('click', startGame);

// Troca de Armas
function selectWeapon(index) {
    currentWeaponIndex = index;
    const buttons = document.querySelectorAll('.weapon-btn');
    buttons.forEach((btn, i) => {
        if(i === index) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

// Classe do Jogador
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 18;
        this.speed = 4;
        this.hp = 100;
        this.angle = 0;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Corpo do jogador
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#2ed573';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Arma gráfica do jogador
        ctx.fillStyle = '#747d8c';
        ctx.fillRect(0, -5, 25, 10);
        ctx.restore();
    }
    update() {
        if (keys['w'] || keys['arrowup']) this.y -= this.speed;
        if (keys['s'] || keys['arrowdown']) this.y += this.speed;
        if (keys['a'] || keys['arrowleft']) this.x -= this.speed;
        if (keys['d'] || keys['arrowright']) this.x += this.speed;

        // Limites do cenário
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));

        // Rotacionar em direção ao mouse
        this.angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);

        if (mouse.pressed) this.shoot();
    }
    shoot() {
        const now = Date.now();
        const weapon = weapons[currentWeaponIndex];
        if (now - weapon.lastShot > weapon.fireRate) {
            for (let i = 0; i < weapon.count; i++) {
                const spreadAngle = this.angle + (Math.random() - 0.5) * weapon.spread;
                bullets.push(new Bullet(
                    this.x + Math.cos(this.angle) * 20, 
                    this.y + Math.sin(this.angle) * 20, 
                    spreadAngle, 
                    weapon
                ));
            }
            weapon.lastShot = now;
        }
    }
}

// Classe dos Projéteis (Balas)
class Bullet {
    constructor(x, y, angle, weapon) {
        this.x = x;
        this.y = y;
        this.speed = weapon.bulletSpeed;
        this.damage = weapon.damage;
        this.color = weapon.color;
        this.radius = weapon.radius || 4;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
    }
}

// Classe dos Inimigos
class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type; 
        this.radius = type.radius;
        this.speed = type.speed;
        this.hp = type.hp;
        this.maxHp = type.hp;
        this.color = type.color;
        this.damage = type.damage;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Barra de Vida Individual do Inimigo
        if (this.hp < this.maxHp) {
            const barW = this.radius * 2;
            const barH = 4;
            ctx.fillStyle = '#ff4757';
            ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, barW, barH);
            ctx.fillStyle = '#2ed573';
            ctx.fillRect(this.x - this.radius, this.y - this.radius - 10, barW * (this.hp / this.maxHp), barH);
        }
    }
    update() {
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }
}

// Classe de Partículas (Efeito Visual de Explosão/Impacto)
class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
    }
}

// Geração de Inimigos (Dificuldade Progressiva até a Fase 10)
function spawnWave() {
    enemies = [];
    bullets = [];
    
    const enemyTypes = [
        { hp: 20 + currentWave * 5, speed: 1.5 + currentWave * 0.1, radius: 15, damage: 10, color: '#ff6b6b' },     // Normal
        { hp: 50 + currentWave * 10, speed: 0.8 + currentWave * 0.05, radius: 22, damage: 20, color: '#95a5a6' },   // Tanque
        { hp: 15 + currentWave * 3, speed: 2.5 + currentWave * 0.1, radius: 11, damage: 8, color: '#e67e22' }       // Veloz
    ];

    const totalEnemies = 5 + currentWave * 4;

    for (let i = 0; i < totalEnemies; i++) {
        let typeIdx = 0;
        if(currentWave >= 3) typeIdx = Math.floor(Math.random() * 2);
        if(currentWave >= 6) typeIdx = Math.floor(Math.random() * 3);
        
        // Spawn nas bordas externas da tela para não surgir em cima do jogador
        let x, y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? -30 : canvas.width + 30;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? -30 : canvas.height + 30;
        }
        
        enemies.push(new Enemy(x, y, {...enemyTypes[typeIdx]}));
    }
    updateUI();
}

function createExplosion(x, y, color) {
    for(let i = 0; i < 8; i++) particles.push(new Particle(x, y, color));
}

function updateUI() {
    document.getElementById('ui-wave').innerText = currentWave;
    document.getElementById('ui-hp').innerText = Math.max(0, Math.floor(player.hp));
    document.getElementById('ui-enemies').innerText = enemies.length;
    document.getElementById('ui-score').innerText = score;
}

// Loop Principal de Atualização de Tela (Renderização)
function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Jogador
    player.update();
    player.draw();

    // Partículas
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
    }

    // Gerenciamento de Balas
    for (let bIdx = bullets.length - 1; bIdx >= 0; bIdx--) {
        const b = bullets[bIdx];
        b.update();
        b.draw();

        if (b.x < 0 || b.x > canvas.width || b.y < 0 || b.y > canvas.height) {
            bullets.splice(bIdx, 1);
            continue;
        }

        // Colisão: Balas vs Inimigos
        for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
            const e = enemies[eIdx];
            const dist = Math.hypot(b.x - e.x, b.y - e.y);
            if (dist < b.radius + e.radius) {
                e.hp -= b.damage;
                createExplosion(b.x, b.y, e.color);
                bullets.splice(bIdx, 1);

                if (e.hp <= 0) {
                    createExplosion(e.x, e.y, '#ff4757');
                    enemies.splice(eIdx, 1);
                    score += 100 * currentWave;
                }
                updateUI();
                break;
            }
        }
    }

    // Gerenciamento de Inimigos
    for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
        const e = enemies[eIdx];
        e.update();
        e.draw();

        // Colisão: Inimigo vs Jogador (Ataque por contato)
        const dist = Math.hypot(player.x - e.x, player.y - e.y);
        if (dist < player.radius + e.radius) {
            player.hp -= e.damage * 0.05; 
            updateUI();
            
            if (player.hp <= 0) {
                gameOver(false);
            }
        }
    }

    // Condição de mudança de Fase / Vitória
    if (enemies.length === 0) {
        if (currentWave < maxWaves) {
            currentWave++;
            spawnWave();
        } else {
            gameOver(true);
        }
    }

    requestAnimationFrame(gameLoop);
}

// Inicializa o Estado Inicial
function startGame() {
    document.getElementById('screen-overlay').style.display = 'none';
    player = new Player(canvas.width / 2, canvas.height / 2);
    score = 0;
    currentWave = 1;
    selectWeapon(0);
    gameRunning = true;
    spawnWave();
    gameLoop();
}

// Tela de Finalização
function gameOver(victory) {
    gameRunning = false;
    const overlay = document.getElementById('screen-overlay');
    const title = document.getElementById('overlay-title');
    const desc = document.getElementById('overlay-desc');
    const btn = document.getElementById('start-btn');

    overlay.style.display = 'flex';
    if (victory) {
        title.innerText = "VITÓRIA TOTAL!";
        title.style.color = "#2ed573";
        desc.innerHTML = `Parabéns! Você sobreviveu às ${maxWaves} fases!<br>Pontuação Final: <strong>${score}</strong>`;
    } else {
        title.innerText = "GAME OVER";
        title.style.color = "#ff4757";
        desc.innerHTML = `Você caiu na Fase ${currentWave}.<br>Pontuação Final: <strong>${score}</strong>`;
    }
    btn.innerText = "JOGAR NOVAMENTE";
}