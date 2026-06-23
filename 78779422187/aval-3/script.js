// Lista de jogos online
const jogos = [
{
nome: "Fortnite",
tipo: "Battle Royale",
jogadores: "Online"
},

{
nome: "Roblox",
tipo: "Criativo",
jogadores: "Multiplayer"
},

{
nome: "Minecraft",
tipo: "Sobrevivência",
jogadores: "Servidor Online"
},

{
nome: "Rocket League",
tipo: "Esporte",
jogadores: "Competitivo"
},

{
nome: "EA Sports FC",
tipo: "Futebol",
jogadores: "Online"
}
];

// Elementos
const titulo =
document.getElementById("nome");

const categoria =
document.getElementById("tipo");

const modo =
document.getElementById("modo");

const botao =
document.getElementById("buscar");

// Função
function mostrarJogo(){

const jogo =
jogos[
Math.floor(
Math.random() *
jogos.length
)
];

titulo.textContent =
"🎮 " + jogo.nome;

categoria.textContent =
"Categoria: " + jogo.tipo;

modo.textContent =
"Modo: " + jogo.jogadores;

}

// Clique
botao.addEventListener(
"click",
mostrarJogo
);

// Inicial
mostrarJogo();