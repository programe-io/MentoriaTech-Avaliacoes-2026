
const musicas = [
    {
        nome: "Summer",
        artista: "Artista Eletrônico",
        capa: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300",
        arquivo: "musicas/summer.mp3"
    },
    {
        nome: "Rock Star",
        artista: "Banda de Rock",
        capa: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300",
        arquivo: "musicas/rock.mp3"
    },
    {
        nome: "Funk Brasil",
        artista: "Artista Brasileiro",
        capa: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300",
        arquivo: "musicas/funk.mp3"
    },
    {
        nome: "Rap Life",
        artista: "Artista de Rap",
        capa: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300",
        arquivo: "musicas/rap.mp3"
    }
];

let atual = 0;
let favoritas = [];

const audio = document.getElementById("audio");
const botaoPlay = document.getElementById("botao-play");

function tocarMusica(indice) {
    atual = indice;

    audio.src = musicas[atual].arquivo;

    document.getElementById("nome-atual").textContent =
        musicas[atual].nome;

    document.getElementById("artista-atual").textContent =
        musicas[atual].artista;

    document.getElementById("capa-atual").src =
        musicas[atual].capa;

    audio.play().then(() => {
        botaoPlay.textContent = "⏸";
    }).catch(() => {
        alert("Não foi possível tocar. Confira se o arquivo MP3 existe na pasta musicas.");
        botaoPlay.textContent = "▶";
    });
}

function playPause() {
    if (!audio.src) {
        tocarMusica(0);
        return;
    }

    if (audio.paused) {
        audio.play();
        botaoPlay.textContent = "⏸";
    } else {
        audio.pause();
        botaoPlay.textContent = "▶";
    }
}

function proximaMusica() {
    atual++;

    if (atual >= musicas.length) {
        atual = 0;
    }

    tocarMusica(atual);
}

function musicaAnterior() {
    atual--;

    if (atual < 0) {
        atual = musicas.length - 1;
    }

    tocarMusica(atual);
}

function favoritar() {
    const musica = musicas[atual];

    if (!favoritas.includes(musica.nome)) {
        favoritas.push(musica.nome);
        atualizarFavoritas();
        alert("Música adicionada aos favoritos!");
    } else {
        favoritas = favoritas.filter(
            nome => nome !== musica.nome
        );
        atualizarFavoritas();
        alert("Música removida dos favoritos!");
    }
}

function atualizarFavoritas() {
    const lista = document.getElementById("lista-favoritas");

    lista.innerHTML = "";

    favoritas.forEach(nome => {
        const item = document.createElement("li");
        item.textContent = "❤️ " + nome;
        lista.appendChild(item);
    });
}

function pesquisarMusicas() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    document.querySelectorAll(".musica[data-nome]").forEach(card => {
        const nome = card.dataset.nome.toLowerCase();

        card.style.display = nome.includes(pesquisa)
            ? "block"
            : "none";
    });
}

document.getElementById("volume").addEventListener("input", function() {
    audio.volume = this.value;
});

audio.addEventListener("timeupdate", function() {
    if (audio.duration) {
        const porcentagem =
            (audio.currentTime / audio.duration) * 100;

        document.getElementById("progresso").value = porcentagem;
    }
});

document.getElementById("progresso").addEventListener("input", function() {
    if (audio.duration) {
        audio.currentTime = (this.value / 100) * audio.duration;
    }
});

audio.addEventListener("ended", proximaMusica);
