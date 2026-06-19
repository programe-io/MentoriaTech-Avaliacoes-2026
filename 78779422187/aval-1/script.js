<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pedra Papel Tesoura</title>

<style>
body{
    font-family:Arial;
    text-align:center;
    background:#222;
    color:white;
}

button{
    padding:15px;
    margin:10px;
    font-size:20px;
    cursor:pointer;
    border:none;
    border-radius:10px;
}

#resultado{
    margin-top:20px;
    font-size:24px;
}
</style>
</head>

<body>

<h1>🎮 Pedra, Papel ou Tesoura</h1>

<button onclick="jogar('Pedra')">🪨 Pedra</button>
<button onclick="jogar('Papel')">📄 Papel</button>
<button onclick="jogar('Tesoura')">✂️ Tesoura</button>

<div id="resultado"></div>

<script>

function jogar(escolhaJogador){

const opcoes=[
"Pedra",
"Papel",
"Tesoura"
];

const computador=
opcoes[
Math.floor(
Math.random()*3
)
];

let resultado="";

if(escolhaJogador===computador){
resultado="Empate!";
}

else if(
(escolhaJogador==="Pedra" && computador==="Tesoura")||
(escolhaJogador==="Papel" && computador==="Pedra")||
(escolhaJogador==="Tesoura" && computador==="Papel")
){
resultado="Você venceu!";
}

else{
resultado="Computador venceu!";
}

document.getElementById("resultado").innerHTML=
`
Você escolheu: ${escolhaJogador}<br>
Computador: ${computador}<br><br>
${resultado}
`;

}

</script>

</body>
</html>







