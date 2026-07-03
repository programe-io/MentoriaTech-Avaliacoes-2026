const jogos = [
"Minecraft",
"Valorant",
"Elden Ring",
"Cyberpunk 2077",
"Terraria",
"Hollow Knight"
];

function jogoAleatorio(){

let numero = Math.floor(Math.random()*jogos.length);

alert("🎮 Hoje você pode jogar: " + jogos[numero]);

}

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup",()=>{

const texto = pesquisa.value.toLowerCase();

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

const nome = card.innerText.toLowerCase();

if(nome.includes(texto)){
card.style.display="block";
}else{
card.style.display="none";
}

});

});