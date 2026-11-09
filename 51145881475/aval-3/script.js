
const musicas = [
    {
        nome: "Bohemian Rhapsody",
        banda: "Queen",
        estilo: "Classic Rock",
        emoji: "👑",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        nome: "Highway to Hell",
        banda: "AC/DC",
        estilo: "Hard Rock",
        emoji: "🔥",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        nome: "Nothing Else Matters",
        banda: "Metallica",
        estilo: "Heavy Metal",
        emoji: "🤘",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        nome: "Smells Like Teen Spirit",
        banda: "Nirvana",
        estilo: "Alternative Rock",
        emoji: "🎸",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        nome: "Sweet Child O' Mine",
        banda: "Guns N' Roses",
        estilo: "Hard Rock",
        emoji: "🌹",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        nome: "Another Brick in the Wall",
        banda: "Pink Floyd",
        estilo: "Classic Rock",
        emoji: "🎧",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        nome: "American Idiot",
        banda: "Green Day",
        estilo: "Punk Rock",
        emoji: "⚡",
        audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    }
];

let favoritos = JSON.parse(
    localStorage.getItem("rockFavoritos")
) || [];

function mostrarSecao(id) {
    document.querySelectorAll("main section").forEach(secao => {
        secao.classList.add("escondido");
    });

    document.getElementById(id).classList.remove("escondido");
}

function mostrarInicio() {
    mostrarSecao("inicio");
    exibirMusicas(musicas, "destaques");
}

function mostrarMusicas() {
    mostrarSecao("musicas");
    exibirMusicas(musicas, "listaMusicas");
}

function mostrarBandas() {
    mostrarSecao("bandas");
}

function mostrarFavoritos() {
    mostrarSecao("favoritos");

    const lista = musicas.filter(musica =>
        favoritos.includes(musica.nome)
    );

    exibirMusicas(lista, "listaFavoritos");
}

function exibirMusicas(lista, elemento) {
    const container = document.getElementById(elemento);
    container.innerHTML = "";

    if (lista.length === 0) {
        container.textContent = "Nenhuma música encontrada.";
        return;
    }

    lista.forEach(musica => {
        const card = document.createElement("div");
        card.className = "card";

        const capa = document.createElement("div");
        capa.className = "capa";
        capa.textContent = musica.emoji;

        const titulo = document.createElement("h3");
        titulo.textContent = musica.nome;

        const banda = document.createElement("p");
        banda.textContent = musica.banda;

        const estilo = document.createElement("p");
        estilo.textContent = musica.estilo;

        const ouvir = document.createElement("button");
        ouvir.textContent = "▶ Ouvir";
        ouvir.onclick = () => tocarMusica(musica);

        const favorito = document.createElement("button");
        favorito.textContent = favoritos.includes(musica.nome)
            ? "❤️"
            : "🤍";

        favorito.onclick = () => alternarFavorito(musica.nome);

        card.append(capa, titulo, banda, estilo, ouvir, favorito);
        container.appendChild(card);
    });
}

function tocarMusica(musica) {
    const audio = document.getElementById("audio");

    document.getElementById("musicaAtual").textContent =
        musica.nome;

    document.getElementById("bandaAtual").textContent =
        musica.banda;

    audio.src = musica.audio;
    audio.play().catch(() => {
        alert("Não foi possível reproduzir o áudio.");
    });
}

function alternarFavorito(nome) {
    if (favoritos.includes(nome)) {
        favoritos = favoritos.filter(item => item !== nome);
    } else {
        favoritos.push(nome);
    }

    localStorage.setItem(
        "rockFavoritos",
        JSON.stringify(favoritos)
    );

    if (!document.getElementById("favoritos").classList.contains("escondido")) {
        mostrarFavoritos();
    } else if (!document.getElementById("musicas").classList.contains("escondido")) {
        mostrarMusicas();
    } else {
        mostrarInicio();
    }
}

function pesquisarMusicas() {
    const termo = document.getElementById("pesquisa")
        .value.toLowerCase();

    const resultado = musicas.filter(musica =>
        musica.nome.toLowerCase().includes(termo) ||
        musica.banda.toLowerCase().includes(termo)
    );

    exibirMusicas(resultado, "listaMusicas");
}

function filtrarCategoria() {
    const categoria = document.getElementById("categoria").value;

    const resultado = categoria === "Todas"
        ? musicas
        : musicas.filter(musica => musica.estilo === categoria);

    exibirMusicas(resultado, "listaMusicas");
}

mostrarInicio();
