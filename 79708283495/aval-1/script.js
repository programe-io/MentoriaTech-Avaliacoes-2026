const target=
document.getElementById("target");
const scoreDisplay=
document.getElementById("score");
let  score =0;

function moveTarget(){
    const x=Math.random()*
    (window.innerWidth - 50)

target.style.left= x + "px";
target.style.top= y + "px";
}
target.addEventListener("click",() => {score++;
scoreDisplay.textContent=score;
moveTarget();
});
//começa o jogo
moveTarget();