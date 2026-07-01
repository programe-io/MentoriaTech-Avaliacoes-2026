// =======================================
// NEON RUNNER ULTIMATE
// PARTE 1
// =======================================

// ---------- CANVAS ----------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const bg = document.getElementById("bg");
const bgCtx = bg.getContext("2d");

function resize(){

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    bg.width = innerWidth;
    bg.height = innerHeight;
}

resize();

addEventListener("resize",resize);

// ---------- HUD ----------
const scoreEl = document.getElementById("score");
const coinsEl = document.getElementById("coins");
const levelEl = document.getElementById("level");
const livesEl = document.getElementById("lives");
const comboEl = document.getElementById("combo");
const speedEl = document.getElementById("speed");
const powerEl = document.getElementById("power");

const menu = document.getElementById("menu");
const gameOver = document.getElementById("gameOver");

const finalScore =
document.getElementById("finalScore");

const finalCoins =
document.getElementById("finalCoins");

// ---------- CONFIG ----------
let running = false;

let score = 0;
let coins = 0;

let level = 1;

let speed = 8;

let combo = 0;

let lives = 3;

let currentPower = "Nenhum";

// ---------- PISTAS ----------
const lanes = [
    () => canvas.width * 0.3,
    () => canvas.width * 0.5,
    () => canvas.width * 0.7
];

let currentLane = 1;

// ---------- INPUT ----------
let leftPressed = false;
let rightPressed = false;
let jumpPressed = false;

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft")
        leftPressed = true;

    if(e.key==="ArrowRight")
        rightPressed = true;

    if(
        e.key==="ArrowUp" ||
        e.code==="Space"
    ){
        jumpPressed = true;
    }
});

document.addEventListener("keyup",(e)=>{

    if(e.key==="ArrowLeft")
        leftPressed = false;

    if(e.key==="ArrowRight")
        rightPressed = false;
});

// ---------- PLAYER ----------
const player = {

    x:0,

    y:0,

    size:28,

    color:"#00ffff",

    shape:"square",

    vy:0,

    jumping:false
};

player.x = lanes[1]();
player.y = canvas.height - 160;

// ---------- MENU ----------
document.getElementById("startBtn")
.onclick = ()=>{

    player.color =
    document.getElementById(
        "playerColor"
    ).value;

    player.shape =
    document.getElementById(
        "playerShape"
    ).value;

    menu.style.display = "none";

    running = true;
};

// ---------- ARRAYS ----------
const obstacles = [];

const coinList = [];

const particles = [];

const powerUps = [];

const stars = [];

// ---------- BACKGROUND ----------
for(let i=0;i<120;i++){

    stars.push({

        x:Math.random()*innerWidth,

        y:Math.random()*innerHeight,

        size:Math.random()*3 + 1,

        speed:Math.random()*2 + 0.5
    });
}

// ---------- SPAWN ----------
function spawnObstacle(){

    obstacles.push({

        lane:
        Math.floor(
            Math.random()*3
        ),

        y:-100,

        size:
        45 +
        Math.random()*25
    });
}

function spawnCoin(){

    coinList.push({

        lane:
        Math.floor(
            Math.random()*3
        ),

        y:-60,

        rot:0
    });
}

function spawnPowerUp(){

    const types = [

        "shield",

        "magnet",

        "turbo"
    ];

    powerUps.push({

        lane:
        Math.floor(
            Math.random()*3
        ),

        y:-80,

        type:
        types[
            Math.floor(
                Math.random()*types.length
            )
        ]
    });
}

// ---------- TIMERS ----------
setInterval(()=>{

    if(running)
        spawnObstacle();

},900);

setInterval(()=>{

    if(running)
        spawnCoin();

},650);

setInterval(()=>{

    if(running)
        spawnPowerUp();

},7000);

// ---------- POWERUPS ----------
let shield = false;

let magnet = false;

let turbo = false;

function activatePower(type){

    currentPower = type;

    powerEl.textContent = type;

    if(type==="shield")
        shield = true;

    if(type==="magnet")
        magnet = true;

    if(type==="turbo")
        turbo = true;

    setTimeout(()=>{

        shield = false;

        magnet = false;

        turbo = false;

        currentPower = "Nenhum";

        powerEl.textContent =
        "Nenhum";

    },8000);
}

// ---------- PARTICLES ----------
function createExplosion(x,y,color){

    for(let i=0;i<20;i++){

        particles.push({

            x,
            y,

            vx:
            (Math.random()-0.5)*8,

            vy:
            (Math.random()-0.5)*8,

            life:40,

            color
        });
    }
}

// ---------- COLLISION ----------
function collideRect(a,b){

    return (

        Math.abs(a.x-b.x) < 40 &&

        Math.abs(a.y-b.y) < 40
    );
}

// ---------- LEVEL SYSTEM ----------
function updateDifficulty(){

    level =
    1 +
    Math.floor(
        score / 500
    );

    speed =
    8 +
    (level * 0.6);

    if(turbo)
        speed += 5;

    if(speed > 35)
        speed = 35;
}

// ---------- PLAYER UPDATE ----------
function updatePlayer(){

    if(leftPressed){

        currentLane =
        Math.max(
            0,
            currentLane - 1
        );

        leftPressed = false;
    }

    if(rightPressed){

        currentLane =
        Math.min(
            2,
            currentLane + 1
        );

        rightPressed = false;
    }

    if(
        jumpPressed &&
        !player.jumping
    ){

        player.vy = -18;

        player.jumping = true;

        jumpPressed = false;
    }

    player.x += (

        lanes[currentLane]() -

        player.x

    ) * 0.25;

    player.vy += 0.9;

    player.y += player.vy;

    if(
        player.y >
        canvas.height - 160
    ){

        player.y =
        canvas.height - 160;

        player.vy = 0;

        player.jumping = false;
    }
}
// =======================================
// NEON RUNNER ULTIMATE
// PARTE 2
// =======================================

// ---------- DRAW BACKGROUND ----------
function drawBackground(){

    bgCtx.fillStyle = "#050515";
    bgCtx.fillRect(
        0,
        0,
        bg.width,
        bg.height
    );

    for(const s of stars){

        s.y += s.speed;

        if(s.y > bg.height){

            s.y = -10;
            s.x = Math.random()*bg.width;
        }

        bgCtx.fillStyle = "cyan";

        bgCtx.fillRect(
            s.x,
            s.y,
            s.size,
            s.size
        );
    }
}

// ---------- DRAW LANES ----------
function drawLanes(){

    ctx.strokeStyle =
    "rgba(0,255,255,.15)";

    ctx.lineWidth = 6;

    lanes.forEach(l=>{

        const x = l();

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(
            x,
            canvas.height
        );

        ctx.stroke();
    });
}

// ---------- PLAYER DRAW ----------
function drawPlayer(){

    ctx.save();

    ctx.fillStyle =
    player.color;

    ctx.shadowBlur = 20;

    ctx.shadowColor =
    player.color;

    const x = player.x;
    const y = player.y;
    const s = player.size;

    ctx.beginPath();

    switch(player.shape){

        case "circle":

            ctx.arc(
                x,
                y,
                s,
                0,
                Math.PI*2
            );

        break;

        case "triangle":

            ctx.moveTo(x,y-s);

            ctx.lineTo(
                x-s,
                y+s
            );

            ctx.lineTo(
                x+s,
                y+s
            );

            ctx.closePath();

        break;

        case "diamond":

            ctx.moveTo(x,y-s);

            ctx.lineTo(x-s,y);

            ctx.lineTo(x,y+s);

            ctx.lineTo(x+s,y);

            ctx.closePath();

        break;

        default:

            ctx.rect(
                x-s,
                y-s,
                s*2,
                s*2
            );
    }

    ctx.fill();

    ctx.restore();
}

// ---------- UPDATE OBSTACLES ----------
function updateObstacles(){

    for(
        let i=obstacles.length-1;
        i>=0;
        i--
    ){

        const o =
        obstacles[i];

        o.y += speed;

        const ox =
        lanes[o.lane]();

        ctx.fillStyle =
        "#ff3333";

        ctx.fillRect(

            ox-o.size/2,

            o.y-o.size/2,

            o.size,

            o.size
        );

        if(
            collideRect(
                player,
                {
                    x:ox,
                    y:o.y
                }
            )
        ){

            if(shield){

                shield = false;

                obstacles.splice(i,1);

                continue;
            }

            lives--;

            combo = 0;

            createExplosion(
                ox,
                o.y,
                "#ff0000"
            );

            obstacles.splice(i,1);

            if(
                lives <= 0
            ){

                endGame();

                return;
            }
        }

        if(
            o.y >
            canvas.height + 100
        ){

            obstacles.splice(i,1);
        }
    }
}

// ---------- UPDATE COINS ----------
function updateCoins(){

    for(
        let i=coinList.length-1;
        i>=0;
        i--
    ){

        const c =
        coinList[i];

        c.y += speed;

        c.rot += 0.2;

        let cx =
        lanes[c.lane]();

        if(magnet){

            cx +=
            (
                player.x-cx
            )*0.08;
        }

        ctx.save();

        ctx.translate(
            cx,
            c.y
        );

        ctx.rotate(
            c.rot
        );

        ctx.fillStyle =
        "gold";

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            14,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.restore();

        if(
            collideRect(
                player,
                {
                    x:cx,
                    y:c.y
                }
            )
        ){

            coins++;

            combo++;

            score +=
            50 +
            combo*2;

            createExplosion(
                cx,
                c.y,
                "gold"
            );

            coinList.splice(i,1);

            continue;
        }

        if(
            c.y >
            canvas.height+60
        ){

            combo = 0;

            coinList.splice(i,1);
        }
    }
}

// ---------- POWERUPS ----------
function updatePowerUps(){

    for(
        let i=powerUps.length-1;
        i>=0;
        i--
    ){

        const p =
        powerUps[i];

        p.y += speed;

        const px =
        lanes[p.lane]();

        ctx.fillStyle =
        "#00ffff";

        ctx.beginPath();

        ctx.arc(
            px,
            p.y,
            18,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.fillStyle =
        "#000";

        ctx.font =
        "12px Arial";

        ctx.textAlign =
        "center";

        ctx.fillText(
            p.type[0]
            .toUpperCase(),
            px,
            p.y+4
        );

        if(
            collideRect(
                player,
                {
                    x:px,
                    y:p.y
                }
            )
        ){

            activatePower(
                p.type
            );

            createExplosion(
                px,
                p.y,
                "#00ffff"
            );

            powerUps.splice(i,1);

            continue;
        }

        if(
            p.y >
            canvas.height+60
        ){

            powerUps.splice(i,1);
        }
    }
}

// ---------- PARTICLES ----------
function updateParticles(){

    for(
        let i=particles.length-1;
        i>=0;
        i--
    ){

        const p =
        particles[i];

        p.x += p.vx;

        p.y += p.vy;

        p.life--;

        ctx.fillStyle =
        p.color;

        ctx.fillRect(
            p.x,
            p.y,
            4,
            4
        );

        if(
            p.life <= 0
        ){

            particles.splice(i,1);
        }
    }
}

// ---------- HUD ----------
function updateHUD(){

    scoreEl.textContent =
    Math.floor(score);

    coinsEl.textContent =
    coins;

    levelEl.textContent =
    level;

    speedEl.textContent =
    Math.floor(speed);

    livesEl.textContent =
    lives;

    comboEl.textContent =
    combo;
}

// ---------- GAME OVER ----------
function endGame(){

    running = false;

    finalScore.textContent =
    Math.floor(score);

    finalCoins.textContent =
    coins;

    gameOver.style.display =
    "flex";
}

// ---------- MAIN UPDATE ----------
function update(){

    if(!running)
        return;

    score += 0.5;

    updateDifficulty();

    updatePlayer();
}

// ---------- LOOP ----------
function loop(){

    drawBackground();

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    update();

    drawLanes();

    updateObstacles();

    updateCoins();

    updatePowerUps();

    updateParticles();

    drawPlayer();

    updateHUD();

    requestAnimationFrame(
        loop
    );
}

loop();