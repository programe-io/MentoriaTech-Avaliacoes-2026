const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreText = document.getElementById("score");

let playerX = 230;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", function(e){

    if(gameOver) return;

    if(e.key=="ArrowLeft"){
        playerX-=20;
    }

    if(e.key=="ArrowRight"){
        playerX+=20;
    }

    if(playerX<0) playerX=0;
    if(playerX>460) playerX=460;

    player.style.left=playerX+"px";

});

function meteor(){

    if(gameOver) return;

    const m = document.createElement("div");
    m.classList.add("meteor");

    let x = Math.random()*460;

    m.style.left=x+"px";
    m.style.top="-40px";

    game.appendChild(m);

    let y=-40;

    const fall = setInterval(()=>{

        if(gameOver){
            clearInterval(fall);
            return;
        }

        y+=5;
        m.style.top=y+"px";

        let mx=x;
        let my=y;

        if(
            mx < playerX+40 &&
            mx+40 > playerX &&
            my+40 > 540
        ){

            clearInterval(fall);
            gameOver=true;

            alert("Game Over!\nPontuação: "+score);

        }

        if(y>620){
            clearInterval(fall);
            game.removeChild(m);

            score++;
            scoreText.innerHTML=score;
        }

    },20);

}

setInterval(meteor,900);