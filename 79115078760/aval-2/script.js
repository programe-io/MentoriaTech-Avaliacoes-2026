
// Curiosidades sobre Free Fire

const curiosidades = [
    "Free Fire foi desenvolvido pela Garena.",
    "Bermuda é um dos mapas clássicos do jogo.",
    "O jogo possui diversos personagens com habilidades diferentes.",
    "Existem vários modos de jogo além do Battle Royale.",
    "O trabalho em equipe pode ajudar nas partidas."
];

function mostrarCuriosidade() {

    const numero = Math.floor(
        Math.random() * curiosidades.length
    );

    document.getElementById("curiosidade").textContent =
        curiosidades[numero];
}
