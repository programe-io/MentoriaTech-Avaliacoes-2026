// Lista de jogos
const jogos = [
{
nome: "Minecraft",
categoria: "Aventura"
},

{
nome: "EA Sports FC",
categoria: "Esporte"
},

{
nome: "Fortnite",
categoria: "Battle Royale"
},

{
nome: "Roblox",
categoria: "Criativo"
},

{
nome: "Rocket League",
categoria: "Corrida"
}
];

// Seleciona elementos
const titulo = document.getElementById("titulo");
const categoria = document.getElementById("categoria");
const botao = document.getElementById("mostrar");

// Função
function mostrarJogo(){

const sorteado =
jogos[Math.floor(Math.random()*jogos.length)];

titulo.textContent =
"🎮 " + sorteado.nome;

categoria.textContent =
"Categoria: " + sorteado.categoria;

}

// Evento
botao.addEventListener(
"click",
mostrarJogo
);

// Inicial
mostrarJogo();