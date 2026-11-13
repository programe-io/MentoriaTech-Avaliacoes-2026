
/* =====================================
   BLOG MUSICAL - MARIA ARAUJO
   JAVASCRIPT
===================================== */

// MÚSICAS DO BLOG

const musicas = [
    {
        titulo: "Minha Música Favorita",
        artista: "Artista Favorito",
        arquivo: "musicas/musica1.mp3"
    },
    {
        titulo: "Melodia do Coração",
        artista: "Artista Especial",
        arquivo: "musicas/musica2.mp3"
    },
    {
        titulo: "No Ritmo da Vida",
        artista: "Minha Playlist",
        arquivo: "musicas/musica3.mp3"
    }
];

// ELEMENTOS DO PLAYER

let indiceAtual = 0;
let tocando = false;
let favoritos = [];

const audio = new Audio();

const tituloMusica = document.getElementById("titulo-musica");
const artistaMusica = document.getElementById("artista-musica");
const botaoPlay = document.getElementById("play");
const botaoAnterior = document.getElementById("anterior");
const botaoProximo = document.getElementById("proximo");
const botaoFavorito = document.getElementById("favorito");

// CARREGAR MÚSICA

function carregarMusica(indice) {

    indiceAtual = indice;

    const musica = musicas[indiceAtual];

    audio.src = musica.arquivo;

    tituloMusica.textContent = musica.titulo;
    artistaMusica.textContent = musica.artista;

    botaoPlay.textContent = "▶ Tocar";

    atualizarFavorito();
}

// TOCAR E PAUSAR

function tocarMusica() {

    if (tocando) {

        audio.pause();

        tocando = false;

        botaoPlay.textContent = "▶ Tocar";

    } else {

        audio.play()
            .then(() => {
                tocando = true;
                botaoPlay.textContent = "⏸ Pausar";
            })
            .catch(() => {
                alert("Não foi possível reproduzir. Verifique o arquivo de áudio!");
            });
    }
}

// PRÓXIMA MÚSICA

function proximaMusica() {

    indiceAtual++;

    if (indiceAtual >= musicas.length) {
        indiceAtual = 0;
    }

    carregarMusica(indiceAtual);

    tocarMusica();
}

// MÚSICA ANTERIOR

function musicaAnterior() {

    indiceAtual--;

    if (indiceAtual < 0) {
        indiceAtual = musicas.length - 1;
    }

    carregarMusica(indiceAtual);

    tocarMusica();
}

// QUANDO A MÚSICA TERMINAR

audio.addEventListener("ended", proximaMusica);

// FAVORITAR MÚSICA

function atualizarFavorito() {

    const favorita = favoritos.includes(indiceAtual);

    botaoFavorito.textContent = favorita
        ? "❤️ Favoritada"
        : "🤍 Favoritar";
}

function favoritarMusica() {

    if (favoritos.includes(indiceAtual)) {

        favoritos = favoritos.filter(
            item => item !== indiceAtual
        );

    } else {

        favoritos.push(indiceAtual);

    }

    atualizarFavorito();

    console.log("Minhas músicas favoritas:", favoritos);
}

// EVENTOS DOS BOTÕES

botaoPlay.addEventListener("click", tocarMusica);

botaoProximo.addEventListener("click", proximaMusica);

botaoAnterior.addEventListener("click", musicaAnterior);

botaoFavorito.addEventListener("click", favoritarMusica);

// PESQUISAR MÚSICAS

const campoPesquisa = document.getElementById("pesquisa");

if (campoPesquisa) {

    campoPesquisa.addEventListener("input", function() {

        const pesquisa = this.value.toLowerCase();

        const resultados = musicas.filter(musica =>
            musica.titulo.toLowerCase().includes(pesquisa) ||
            musica.artista.toLowerCase().includes(pesquisa)
        );

        console.clear();

        console.log("Resultados encontrados:", resultados);
    });
}

// BOAS-VINDAS

window.addEventListener("DOMContentLoaded", function() {

    alert("🎵 Bem-vinda ao meu mundo musical, Maria Araujo! 💜");

    carregarMusica(0);

});

// NOME DA AUTORA

const nomeAutora = document.getElementById("nome-autora");

if (nomeAutora) {
    nomeAutora.textContent = "MARIA ARAUJO";
}
