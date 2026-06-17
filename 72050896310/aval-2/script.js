const gameWindow = document.getElementById('gameWindow');
const world = document.getElementById('world'); 
const scoreDisplay = document.getElementById('score');
const coinsDisplay = document.getElementById('coins');
const velocityDisplay = document.getElementById('velocity-v'); 
const victoryScreen = document.getElementById('victoryScreen'); 
const flag = document.getElementById('flag');

const GRAVITY = 0.6;
let score = 0;
let coins = 0;
let keys = {};
let cameraX = 0;
let gameOver = false;

window.addEventListener('keydown', (e) => { 
    if (!gameOver) keys[e.key.toLowerCase()] = true; 
});
window.addEventListener('keyup', (e) => { 
    keys[e.key.toLowerCase()] = false; 
});

class Mario {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'mario';
        world.appendChild(this.element);

        this.width = 32;
        this.height = 44;
        this.x = 100;
        this.y = 200;
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
        this.jumpForce = 13;
        this.grounded = false;
    }

    update() {
        if (gameOver) {
            this.vx = 0;
            velocityDisplay.innerText = "0";
            return;
        }

        if (keys['arrowright'] || keys['d']) {
            this.vx = this.speed;
            this.element.classList.remove('facing-left');
        } else if (keys['arrowleft'] || keys['a']) {
            this.vx = -this.speed;
            this.element.classList.add('facing-left');
        } else {
            this.vx = 0;
        }

        velocityDisplay.innerText = Math.abs(this.vx);

        if ((keys['arrowup'] || keys['w'] || keys[' ']) && this.grounded) {
            this.vy = -this.jumpForce;
            this.grounded = false;
        }

        this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = 0;

        if (this.y > gameWindow.clientHeight) {
            this.die();
        }

        if (this.x >= 2600 && !gameOver) {
            triggerVictory();
        }
    }

    die() {
        alert("Você morreu! Reiniciando a fase...");
        this.x = 100;
        this.y = 200;
        this.vx = 0;
        this.vy = 0;
        goombas.forEach(g => g.reset());
    }

    draw() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}

class Obstacle {
    constructor(x, y, width, height, type) {
        this.element = document.createElement('div');
        this.element.className = type;
        if (type === 'block') this.element.innerText = '?';
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        world.appendChild(this.element);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.isHit = false;
    }
}

class Goomba {
    constructor(startX, startY) {
        this.startX = startX;
        this.startY = startY;
        this.element = document.createElement('div');
        this.element.className = 'goomba';
        world.appendChild(this.element);
        this.width = 30;
        this.height = 30;
        this.reset();
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        this.vx = -1.5;
        this.alive = true;
        this.element.style.display = 'block';
    }

    update() {
        if (!this.alive || gameOver) return;
        this.x += this.vx;

        obstacles.forEach(obs => {
            if (this.x < obs.x + obs.width && this.x + this.width > obs.x &&
                this.y < obs.y + obs.height && this.y + this.height > obs.y) {
                this.vx *= -1;
                this.x += this.vx;
            }
        });
    }

    draw() {
        if (!this.alive) return;
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}

const player = new Mario();

const obstacles = [
    new Obstacle(0, 380, 700, 60, 'platform'),
    new Obstacle(850, 380, 650, 60, 'platform'),
    new Obstacle(1650, 380, 1500, 60, 'platform'),

    new Obstacle(250, 240, 40, 40, 'block'),
    new Obstacle(290, 240, 40, 40, 'block'),
    new Obstacle(1000, 220, 40, 40, 'block'),
    new Obstacle(1800, 240, 40, 40, 'block'),

    new Obstacle(500, 310, 60, 70, 'pipe'),
    new Obstacle(1150, 290, 60, 90, 'pipe'),
    new Obstacle(2100, 310, 60, 70, 'pipe')
];

const goombas = [
    new Goomba(400, 350),
    new Goomba(1050, 350),
    new Goomba(1350, 350),
    new Goomba(1900, 350)
];

function handleCollisions() {
    player.grounded = false;

    obstacles.forEach(obj => {
        if (player.x < obj.x + obj.width && player.x + player.width > obj.x &&
            player.y < obj.y + obj.height && player.y + player.height > obj.y) {
            
            let overlapX = Math.min(player.x + player.width - obj.x, obj.x + obj.width - player.x);
            let overlapY = Math.min(player.y + player.height - obj.y, obj.y + obj.height - player.y);

            if (overlapX < overlapY) {
                if (player.x + player.width / 2 > obj.x + obj.width / 2) player.x += overlapX;
                else player.x -= overlapX;
                player.vx = 0;
            } else {
                if (player.y + player.height / 2 > obj.y + obj.height / 2) {
                    player.y += overlapY;
                    player.vy = 0;

                    if (obj.type === 'block' && !obj.isHit) {
                        obj.isHit = true;
                        obj.element.classList.add('hit');
                        coins++;
                        score += 200;
                        coinsDisplay.innerText = `x${String(coins).padStart(2, '0')}`;
                        scoreDisplay.innerText = String(score).padStart(6, '0');
                    }
                } else {
                    player.y -= overlapY;
                    player.vy = 0;
                    player.grounded = true;
                }
            }
        }
    });

    goombas.forEach(goomba => {
        if (!goomba.alive || gameOver) return;

        if (player.x < goomba.x + goomba.width && player.x + player.width > goomba.x &&
            player.y < goomba.y + goomba.height && player.y + player.height > goomba.y) {
            
            let marioBottom = player.y + player.height;
            if (player.vy > 0 && (marioBottom - player.vy) <= goomba.y + 12) {
                goomba.alive = false;
                goomba.element.style.display = 'none';
                score += 100;
                scoreDisplay.innerText = String(score).padStart(6, '0');
                player.vy = -8;
            } else {
                player.die();
            }
        }
    });
}

function triggerVictory() {
    gameOver = true;
    keys = {}; 
    flag.style.top = '220px'; 
    victoryScreen.style.display = 'block'; 
}

function gameLoop() {
    player.update();
    goombas.forEach(g => g.update());
    handleCollisions();

    if (player.x > 300) {
        cameraX = player.x - 300;
    } else {
        cameraX = 0;
    }
    
    if (cameraX > 2100) cameraX = 2100;
    world.style.transform = `translateX(${-cameraX}px)`;

    player.draw();
    goombas.forEach(g => g.draw());

    requestAnimationFrame(gameLoop);
}

gameLoop();