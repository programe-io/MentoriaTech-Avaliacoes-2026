
let musicas = [
    {
        nome: "Blinding Lights",
        artista: "The Weeknd",
        genero: "Pop",
        capa: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
        nota: 5,
        link: "https://www.youtube.com/results?search_query=The+Weeknd+Blinding+Lights",
        descricao: "Uma música envolvente, com uma sonoridade nostálgica e uma batida contagiante. Ideal para quem gosta de pop moderno."
    },
    {
        nome: "Bohemian Rhapsody",
        artista: "Queen",
        genero: "Rock",
        capa: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
        nota: 5,
        link: "https://www.youtube.com/results?search_query=Queen+Bohemian+Rhapsody",
        descricao: "Uma obra-prima do rock, com mudanças de ritmo, vocais marcantes e uma composição inesquecível."
    },
    {
        nome: "AmarElo",
        artista: "Emicida",
        genero: "Rap",
        capa: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
        nota: 5,
        link: "https://www.youtube.com/results?search_query=Emicida+AmarElo",
        descricao: "Uma música inspiradora que transmite esperança, força e mensagens importantes sobre a vida."
    },
    {
        nome: "Velha Infância",
        artista: "Tribalistas",
        genero: "MPB",
        capa: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        nota: 5,
        link: "https://www.youtube.com/results?search_query=Tribalistas+Velha+Infancia",
        descricao: "Uma canção delicada e romântica, com uma melodia agradável e uma letra cheia de sentimentos."
    },
    {
        nome: "Sweater Weather",
        artista: "The Neighbourhood",
        genero: "Indie",
        capa: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500",
        nota: 4,
        link: "https://www.youtube.com/results?search_query=The+Neighbourhood+Sweater+Weather",
        descricao: "Uma faixa com atmosfera alternativa, instrumental marcante e uma identidade musical única."
    }
];

let categoriaAtual = "Todos";

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

function mostrarMusicas() {
    const lista = document.getElementById("listaMusicas");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    const filtradas = musicas.filter(musica => {
        const categoriaCorreta =
            categoriaAtual === "Todos" ||
            musica.genero === categoriaAtual;

        const pesquisaCorreta =
            musica.nome.toLowerCase().includes(pesquisa) ||
            musica.artista.toLowerCase().includes(pesquisa);

        return categoriaCorreta && pesquisaCorreta;
    });

    if (filtradas.length === 0) {
        lista.innerHTML = "<p>Nenhuma música encontrada.</p>";
        return;
    }

    filtradas.forEach(musica => {
        const card = document.createElement("article");
        card.className = "card";

        const estrelas = "★".repeat(musica.nota) +
            "☆".repeat(5 - musica.nota);

        card.innerHTML = `
            <img
                src="${escapar(musica.capa)}"
                alt="Imagem de ${escapar(musica.nome)}"
                onerror="this.src='https://placehold.co/500x300?text=Musica'"
            >

            <div class="card-info">
                <h3>${escapar(musica.nome)}</h3>

                <p>Artista: ${escapar(musica.artista)}</p>

                <p>Gênero: ${escapar(musica.genero)}</p>

                <div class="estrelas">${estrelas}</div>

                <button>Ver recomendação</button>
            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {
            abrirModal(musica);
        });

        lista.appendChild(card);
    });
}

function filtrar(categoria) {
    categoriaAtual = categoria;
    mostrarMusicas();
}

function abrirModal(musica) {
    const estrelas = "★".repeat(musica.nota) +
        "☆".repeat(5 - musica.nota);

    document.getElementById("detalhesMusica").innerHTML = `
        <h2>${escapar(musica.nome)}</h2>

        <p><strong>Artista:</strong> ${escapar(musica.artista)}</p>

        <p><strong>Gênero:</strong> ${escapar(musica.genero)}</p>

        <p class="estrelas">${estrelas}</p>

        <hr>

        <h3>Por que recomendamos?</h3>

        <p>${escapar(musica.descricao)}</p>

        <p>
            <a href="${escapar(musica.link)}"
               target="_blank"
               rel="noopener noreferrer">
               Ouvir música ↗
            </a>
        </p>
    `;

    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("pesquisa")
    .addEventListener("input", mostrarMusicas);

document.getElementById("formMusica")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const novaMusica = {
            nome: document.getElementById("nomeMusica").value.trim(),
            artista: document.getElementById("artista").value.trim(),
            genero: document.getElementById("genero").value,
            capa: document.getElementById("capa").value.trim() ||
                "https://placehold.co/500x300?text=Musica",
            nota: Number(document.getElementById("nota").value),
            link: document.getElementById("linkMusica").value.trim() ||
                "https://www.youtube.com/",
            descricao: document.getElementById("descricao").value.trim()
        };

        musicas.unshift(novaMusica);

        categoriaAtual = "Todos";

        this.reset();

        mostrarMusicas();

        alert("Sua recomendação musical foi publicada!");

        document.getElementById("recomendacoes")
            .scrollIntoView({ behavior: "smooth" });
    });

document.getElementById("modal")
    .addEventListener("click", function(event) {
        if (event.target === this) {
            fecharModal();
        }
    });

mostrarMusicas();
