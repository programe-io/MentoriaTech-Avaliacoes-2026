const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const healthEl = document.getElementById("health");
const waveEl = document.getElementById("wave");
const enemiesLeftEl = document.getElementById("enemies-left");

const GRAVITY = 0.5;
const MAX_FALL_SPEED = 12;
let currentWave = 1;
let enemies = [];
let particles = [];

const platforms = [
    { x: 0, y: 450, width: 800, height: 50 },       
    { x: 150, y: 320, width: 200, height: 15 },     
    { x: 450, y: 320, width: 200, height: 15 },     
    { x: 300, y: 200, width: 200, height: 15 }      
];

const keys = { a: false, d: false, space: false, j: false, k: false };

const player = {
    x: 380, y: 50, width: 32, height: 52, 
    vx: 0, vy: 0, speed: 4.2, jumpForce: 11.5,
    grounded: false, health: 100, direction: 1, 
    
    isAttacking: false, attackTimer: 0, attackDuration: 22, 
    isDefending: false, defenseTimer: 0, parryWindow: 8, 
    hasParryBuff: false, 
    
    update() {
        if (keys.a) { this.vx = -this.speed; this.direction = -1; }
        else if (keys.d) { this.vx = this.speed; this.direction = 1; }
        else { this.vx = 0; }

        if (keys.space && this.grounded) {
            this.vy = -this.jumpForce;
            this.grounded = false;
        }

        if (keys.j && !this.isAttacking && !this.isDefending) {
            this.isAttacking = true;
            this.attackTimer = this.attackDuration;
        }

        if (keys.k && !this.isAttacking) {
            if (!this.isDefending) {
                this.isDefending = true;
                this.defenseTimer = 20; 
            }
        }

        if (this.isAttacking) {
            this.attackTimer--;
            if (this.attackTimer === 10) { 
                this.executeAttack();
            }
            if (this.attackTimer <= 0) this.isAttacking = false;
        }

        if (this.isDefending) {
            this.defenseTimer--;
            if (this.defenseTimer <= 0) this.isDefending = false;
        }

        this.vy += GRAVITY;
        if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;

        this.grounded = false;
        for (let plat of platforms) {
            if (this.x + this.width > plat.x && this.x < plat.x + plat.width) {
                if (this.y + this.height >= plat.y && this.y + this.height - this.vy <= plat.y + 4) {
                    if (this.vy >= 0) {
                        this.vy = 0;
                        this.y = plat.y - this.height; 
                        this.grounded = true;
                    }
                }
            }
        }
        
        if (this.health <= 0) {
            alert("Sua jornada terminou. Você alcançou a Wave " + currentWave);
            resetGame();
        }
    },

    executeAttack() {
        // AUMENTADO: Alcance do ataque estendido para 95px por conta do novo tamanho da lâmina
        let attackRange = 95;
        let attackX = this.direction === 1 ? this.x + this.width : this.x - attackRange;
        let attackY = this.y - 10;
        
        enemies.forEach((enemy) => {
            if (attackX + attackRange > enemy.x && attackX < enemy.x + enemy.width &&
                attackY + 70 > enemy.y && attackY < enemy.y + enemy.height) {
                
                let damage = this.hasParryBuff ? enemy.maxHealth : 25; 
                enemy.health -= damage;
                
                createParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2, this.hasParryBuff ? '#00ffff' : '#ff4757', 18);
                
                enemy.x += this.direction * 40;
                enemy.vy = -3; // Dá um leve empurrão para cima também
            }
        });
        
        this.hasParryBuff = false;
    },

    draw() {
        // CORPO DO PLAYER (Cavaleiro de Armadura)
        ctx.fillStyle = "#34495e"; // Base de metal escuro
        if (this.hasParryBuff) ctx.fillStyle = "#8e44ad"; // Roxo místico pós-parry
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Detalhe da Capa
        ctx.fillStyle = this.isDefending ? "#2980b9" : "#c0392b";
        if(this.direction === 1) {
            ctx.fillRect(this.x - 4, this.y + 10, 4, this.height - 15);
        } else {
            ctx.fillRect(this.x + this.width, this.y + 10, 4, this.height - 15);
        }

        // Visor/Olho brilhante (muda de cor se defendendo ou bufado)
        ctx.fillStyle = "#e67e22";
        if (this.isDefending) ctx.fillStyle = "#00ffff";
        if (this.hasParryBuff) ctx.fillStyle = "#9b59b6";
        let eyeX = this.direction === 1 ? this.x + this.width - 10 : this.x + 4;
        ctx.fillRect(eyeX, this.y + 10, 6, 6);

        // DESENHO DA ESPADA COLOSSAL
        ctx.fillStyle = "#bdc3c7"; // Cor da lâmina (Aço)
        
        if (this.isAttacking) {
            ctx.save();
            ctx.translate(this.x + this.width/2, this.y + this.height/2);
            
            // CÁLCULO INVERTIDO: Vai de cima (-60 graus) para baixo (+90 graus) baseado no timer
            let angleProgress = (this.attackDuration - this.attackTimer) / this.attackDuration;
            let startAngle = -Math.PI / 3; // Começa no alto atrás
            let endAngle = Math.PI / 1.8;   // Termina embaixo na frente
            let currentAngle = startAngle + (endAngle - startAngle) * angleProgress;
            
            ctx.rotate(this.direction * currentAngle);
            
            // Lâmina Grande (Comprimento: 95px, Largura: 20px)
            ctx.fillStyle = "#d2dae2";
            ctx.fillRect(0, -10, this.direction * 95, 20);
            // Cabo da espada
            ctx.fillStyle = "#57606f";
            ctx.fillRect(this.direction * -15, -4, this.direction * 15, 8);
            ctx.restore();
        } else {
            // Guardada nas costas inclinada pesadamente
            ctx.save();
            ctx.translate(this.x + (this.direction === 1 ? 5 : this.width - 5), this.y + 15);
            ctx.rotate(this.direction * -0.4);
            ctx.fillRect(-6, -45, 12, 65); // Espada grande em repouso
            ctx.fillStyle = "#d2dae2";
            ctx.fillRect(-4, -45, 8, 50); 
            ctx.restore();
        }

        // Aura do Parry Perfeito
        if (this.isDefending && this.defenseTimer > 20 - this.parryWindow) {
            ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00ffff";
            ctx.lineWidth = 4;
            ctx.strokeRect(this.x - 6, this.y - 6, this.width + 12, this.height + 12);
            ctx.shadowBlur = 0; // limpa o shadow para o resto do desenho
        }
    }
};

class Enemy {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = type === 'strong' ? 44 : 26;
        this.height = type === 'strong' ? 64 : 42;
        this.type = type; 
        this.maxHealth = type === 'strong' ? 100 : 20;
        this.health = this.maxHealth;
        this.speed = type === 'strong' ? 1.1 : 2.2;
        this.damage = type === 'strong' ? 30 : 10;
        this.vy = 0;
        this.attackCooldown = 0;
    }

    update() {
        if (this.x < player.x) this.x += this.speed;
        else if (this.x > player.x) this.x -= this.speed;

        this.vy += GRAVITY;
        if (this.vy > MAX_FALL_SPEED) this.vy = MAX_FALL_SPEED;
        this.y += this.vy;

        for (let plat of platforms) {
            if (this.x + this.width > plat.x && this.x < plat.x + plat.width) {
                if (this.y + this.height >= plat.y && this.y + this.height - this.vy <= plat.y + 4) {
                    if (this.vy >= 0) {
                        this.vy = 0;
                        this.y = plat.y - this.height; 
                    }
                }
            }
        }

        if (this.attackCooldown > 0) this.attackCooldown--;

        if (this.x + this.width > player.x && this.x < player.x + player.width &&
            this.y + this.height > player.y && this.y < player.y + player.height && this.attackCooldown === 0) {
            
            this.attackCooldown = 45; 

            if (player.isDefending && player.defenseTimer > (20 - player.parryWindow)) {
                player.hasParryBuff = true;
                createParticles(this.x, this.y, '#00ffff', 30); 
                
                if (this.type === 'weak') {
                    this.health = 0; 
                } else {
                    this.health -= 50; 
                    this.x += (player.x > this.x ? -75 : 75); 
                }
            } 
            else if (player.isDefending) {
                player.health -= Math.floor(this.damage * 0.15); // Defesa melhorada para 85% de redução
                createParticles(player.x, player.y, '#ffffff', 6);
            } 
            else {
                player.health -= this.damage; 
                createParticles(player.x, player.y, '#ff4757', 12);
            }
        }
    }

    draw() {
        let dir = (player.x > this.x) ? 1 : -1;

        if (this.type === 'strong') {
            // INIMIGO FORTE: Ogro de Armadura com Chifres
            ctx.fillStyle = "#78281f"; // Corpo vermelho escuro
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Ombreiras/Placas de Metal
            ctx.fillStyle = "#1c2833";
            ctx.fillRect(this.x - 2, this.y + 10, this.width + 4, 12);

            // Chifres Dourados
            ctx.fillStyle = "#f1c40f";
            if (dir === 1) {
                ctx.fillRect(this.x + this.width - 8, this.y - 8, 6, 8);
                ctx.fillRect(this.x + 4, this.y - 4, 4, 4);
            } else {
                ctx.fillRect(this.x + 2, this.y - 8, 6, 8);
                ctx.fillRect(this.x + this.width - 8, this.y - 4, 4, 4);
            }
        } else {
            // INIMIGO FRACO: Assassino das Sombras (Capuz)
            ctx.fillStyle = "#1e272e"; // Capuz cinza quase preto
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
            // Máscara/Olhos brilhantes vermelhos na fenda do capuz
            ctx.fillStyle = "#ff3f34";
            let eyeX = dir === 1 ? this.x + this.width - 8 : this.x + 4;
            ctx.fillRect(eyeX, this.y + 8, 4, 4);
        }
        
        // Barra de Vida Estilizada
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(this.x, this.y - 12, this.width, 5);
        ctx.fillStyle = this.type === 'strong' ? "#e74c3c" : "#e67e22";
        ctx.fillRect(this.x, this.y - 12, this.width * (this.health / this.maxHealth), 5);
    }
}

function createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 7,
            vy: (Math.random() - 0.5) * 7,
            size: Math.random() * 4 + 2,
            life: 25,
            color
        });
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
}

function startWave() {
    enemies = [];
    let numWeak = currentWave * 2;
    let numStrong = Math.floor(currentWave / 2);

    for (let i = 0; i < numWeak; i++) {
        let spawnX = Math.random() > 0.5 ? 40 : 730;
        enemies.push(new Enemy(spawnX, 10, 'weak'));
    }
    for (let i = 0; i < numStrong; i++) {
        let spawnX = Math.random() > 0.5 ? 100 : 660;
        enemies.push(new Enemy(spawnX, 10, 'strong'));
    }
}

function resetGame() {
    player.health = 100;
    currentWave = 1;
    player.x = 380; 
    player.y = 50;  
    player.vy = 0;  
    player.vx = 0;
    player.hasParryBuff = false;
    player.isAttacking = false;
    player.isDefending = false;
    startWave();
}

window.addEventListener("keydown", (e) => {
    let key = e.key.toLowerCase();
    if (key === 'a') keys.a = true;
    if (key === 'd') keys.d = true;
    if (e.key === ' ') keys.space = true;
    if (key === 'j') keys.j = true;
    if (key === 'k') keys.k = true;
});

window.addEventListener("keyup", (e) => {
    let key = e.key.toLowerCase();
    if (key === 'a') keys.a = false;
    if (key === 'd') keys.d = false;
    if (e.key === ' ') keys.space = false;
    if (key === 'j') keys.j = false;
    if (key === 'k') keys.k = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Plataformas customizadas estilizadas (Cor de pedra de masmorra escura)
    ctx.fillStyle = "#1e272e";
    platforms.forEach(plat => {
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
        // Linha superior de destaque na plataforma
        ctx.fillStyle = "#57606f";
        ctx.fillRect(plat.x, plat.y, plat.width, 2);
        ctx.fillStyle = "#1e272e";
    });

    player.update();
    player.draw();

    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        if (enemies[i].health <= 0) {
            createParticles(enemies[i].x, enemies[i].y, '#f1c40f', 15); 
            enemies.splice(i, 1);
        } else {
            enemies[i].draw();
        }
    }

    updateParticles();
    drawParticles();

    if (enemies.length === 0) {
        currentWave++;
        startWave();
    }

    healthEl.innerText = player.health;
    waveEl.innerText = currentWave;
    enemiesLeftEl.innerText = enemies.length;

    requestAnimationFrame(gameLoop);
}

startWave();
gameLoop();