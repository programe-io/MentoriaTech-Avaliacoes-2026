/* ============================
   PLAYLIST
============================ */

const musicas = [
    {
        titulo: "Sweet Dreams",
        artista: "Pink Collection",
        emoji: "🌸",
        arquivo: "musicas/sweet-dreams.mp3"
    },

    {
        titulo: "Butterfly",
        artista: "Dream Music",
        emoji: "🦋",
        arquivo: "musicas/butterfly.mp3"
    },

    {
        titulo: "Moonlight",
        artista: "Night Vibes",
        emoji: "🌙",
        arquivo: "musicas/moonlight.mp3"
    },

    {
        titulo: "Shine",
        artista: "Pink Stars",
        emoji: "💎",
        arquivo: "musicas/shine.mp3"
    },

    {
        titulo: "Flowers",
        artista: "Lovely Songs",
        emoji: "🌷",
        arquivo: "musicas/flowers.mp3"
    }
];


let musicaAtual = 0;

const audio = new Audio();

audio.volume = 0.8;


/* ELEMENTOS */

const titulo =
    document.getElementById("music-title");

const artista =
    document.getElementById("music-artist");

const capa =
    document.getElementById("player-cover");

const botaoPlay =
    document.getElementById("play-button");

const progresso =
    document.getElementById("progress");

const tempoAtual =
    document.getElementById("current-time");

const duracao =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");


/* ============================
   SELECIONAR MÚSICA
============================ */

function selecionarMusica(indice) {

    musicaAtual = indice;

    carregarMusica();

    audio.play();

    botaoPlay.textContent = "⏸";
}


/* ============================
   CARREGAR MÚSICA
============================ */

function carregarMusica() {

    const musica = musicas[musicaAtual];

    titulo.textContent = musica.titulo;

    artista.textContent = musica.artista;

    capa.textContent = musica.emoji;

    audio.src = musica.arquivo;

    progresso.value = 0;

    tempoAtual.textContent = "0:00";

    duracao.textContent = "0:00";
}


/* ============================
   PLAY / PAUSE
============================ */

function alternarMusica() {

    if (!audio.src) {

        carregarMusica();
    }

    if (audio.paused) {

        audio.play();

        botaoPlay.textContent = "⏸";

    } else {

        audio.pause();

        botaoPlay.textContent = "▶";
    }
}


/* ============================
   PRÓXIMA MÚSICA
============================ */

function proximaMusica() {

    musicaAtual++;

    if (musicaAtual >= musicas.length) {
        musicaAtual = 0;
    }

    carregarMusica();

    audio.play();

    botaoPlay.textContent = "⏸";
}


/* ============================
   MÚSICA ANTERIOR
============================ */

function musicaAnterior() {

    musicaAtual--;

    if (musicaAtual < 0) {
        musicaAtual = musicas.length - 1;
    }

    carregarMusica();

    audio.play();

    botaoPlay.textContent = "⏸";
}


/* ============================
   BARRA DE PROGRESSO
============================ */

audio.addEventListener("loadedmetadata", function() {

    duracao.textContent =
        formatarTempo(audio.duration);

});


audio.addEventListener("timeupdate", function() {

    if (!audio.duration) {
        return;
    }

    const porcentagem =
        (audio.currentTime / audio.duration) * 100;

    progresso.value = porcentagem;

    tempoAtual.textContent =
        formatarTempo(audio.currentTime);

});


progresso.addEventListener("input", function() {

    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        (progresso.value / 100) * audio.duration;

});


/* ============================
   VOLUME
============================ */

volume.addEventListener("input", function() {

    audio.volume = volume.value;

});


/* ============================
   TERMINOU A MÚSICA
============================ */

audio.addEventListener("ended", function() {

    proximaMusica();

});


/* ============================
   FORMATAR TEMPO
============================ */

function formatarTempo(segundos) {

    if (isNaN(segundos)) {
        return "0:00";
    }

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return (
        minutos +
        ":" +
        String(segundosRestantes).padStart(2, "0")
    );
}