
const musicas = [
    "musica1.mp3",
    "musica2.mp3",
    "musica3.mp3"
];

function tocarMusica(numero) {
    const player = document.getElementById("player");

    player.src = musicas[numero];

    player.load();
    player.play();
}
