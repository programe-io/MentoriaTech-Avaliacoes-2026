const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreText = document.getElementById("score");

let score = 0;
let gameOver = false;

const player = {
    x:100,
    y:100,
    size:35,
    speed:5
};

const coin = {
    x:Math.random()*850,
    y:Math.random()*450,
    size:20
};

const enemies = [];

function createEnemies(){

    enemies.length = 0;

    for(let i=0;i<3;i++){
        enemies.push({
            x:Math.random()*850,
            y:Math.random()*450,
            size:30,
            speed:2+Math.random()*2
        });
    }
}

createEnemies();

const keys = {};

document.addEventListener("keydown",(e)=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",(e)=>{
    keys[e.key]=false;
});

const restartBtn = document.createElement("button");
restartBtn.innerText = "RECOMEÇAR";

restartBtn.style.position = "absolute";
restartBtn.style.left = "50%";
restartBtn.style.top = "60%";
restartBtn.style.transform = "translate(-50%,-50%)";
restartBtn.style.display = "none";

document.body.appendChild(restartBtn);

restartBtn.addEventListener("click",restartGame);

function restartGame(){

    score = 0;
    scoreText.textContent = score;

    gameOver = false;

    player.x = 100;
    player.y = 100;

    coin.x = Math.random()*850;
    coin.y = Math.random()*450;

    createEnemies();

    restartBtn.style.display = "none";
}

function movePlayer(){

    if(keys["w"] || keys["ArrowUp"])
        player.y -= player.speed;

    if(keys["s"] || keys["ArrowDown"])
        player.y += player.speed;

    if(keys["a"] || keys["ArrowLeft"])
        player.x -= player.speed;

    if(keys["d"] || keys["ArrowRight"])
        player.x += player.speed;

    player.x = Math.max(0,Math.min(canvas.width-player.size,player.x));
    player.y = Math.max(0,Math.min(canvas.height-player.size,player.y));
}

function collide(a,b){

    return (
        a.x < b.x+b.size &&
        a.x+a.size > b.x &&
        a.y < b.y+b.size &&
        a.y+a.size > b.y
    );
}

function updateEnemies(){

    enemies.forEach(enemy=>{

        let dx = player.x-enemy.x;
        let dy = player.y-enemy.y;

        let dist = Math.sqrt(dx*dx+dy*dy);

        enemy.x += (dx/dist)*enemy.speed;
        enemy.y += (dy/dist)*enemy.speed;

        if(collide(player,enemy)){
            gameOver = true;
        }
    });
}

function collectCoin(){

    if(collide(player,coin)){

        score++;
        scoreText.textContent = score;

        coin.x = Math.random()*850;
        coin.y = Math.random()*450;

        if(score % 5 === 0){

            enemies.push({
                x:Math.random()*850,
                y:Math.random()*450,
                size:30,
                speed:2+Math.random()*3
            });
        }
    }
}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(
        coin.x+coin.size/2,
        coin.y+coin.size/2,
        coin.size/2,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.fillStyle = "#00A2FF";
    ctx.fillRect(
        player.x,
        player.y,
        player.size,
        player.size
    );

    ctx.fillStyle = "red";

    enemies.forEach(enemy=>{
        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.size,
            enemy.size
        );
    });

    if(gameOver){

        restartBtn.style.display = "block";

        ctx.fillStyle = "white";
        ctx.font = "bold 60px Arial";
        ctx.fillText("GAME OVER",250,220);

        ctx.font = "30px Arial";
        ctx.fillText("Pontuação: "+score,350,280);
    }
}
function gameLoop(){

    if(!gameOver){
        movePlayer();
        updateEnemies();
        collectCoin();
    }

    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();