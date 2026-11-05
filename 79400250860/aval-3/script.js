
// ==============================
// ELEMENTOS DO SITE
// ==============================

const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card");

const player = document.getElementById("player");
const video = document.getElementById("video");
const playerTitle = document.getElementById("playerTitle");

// ==============================
// CATÁLOGO DE CONTEÚDOS
// ==============================

const catalogo = {
    bunny: {
        titulo: "Big Buck Bunny",
        categoria: "Animação",
        idioma: "Áudio original",
        ano: "2008",
        descricao: "Uma divertida animação em um mundo cheio de aventuras.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },

    sintel: {
        titulo: "Sintel",
        categoria: "Fantasia",
        idioma: "Áudio original",
        ano: "2010",
        descricao: "Uma aventura fantástica em busca de um dragão.",
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
    }
};

// ==============================
// PESQUISAR FILMES
// ==============================

function searchMovies() {

    const pesquisa = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {

        const titulo = card.dataset.title.toLowerCase();

        if (titulo.includes(pesquisa)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}

searchInput.addEventListener("input", searchMovies);

// ==============================
// ABRIR PLAYER
// ==============================

function playMovie(id) {

    const filme = catalogo[id];

    if (!filme) {
        showInfo("Conteúdo ainda não disponível para reprodução.");
        return;
    }

    playerTitle.textContent = filme.titulo;

    video.src = filme.video;

    player.style.display = "block";

    player.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    video.play().catch(() => {
        showInfo("Clique no botão de reprodução do player.");
    });

}

// ==============================
// FECHAR PLAYER
// ==============================

function closePlayer() {

    video.pause();

    video.removeAttribute("src");

    video.load();

    player.style.display = "none";

}

// ==============================
// MOSTRAR INFORMAÇÕES
// ==============================

function showInfo(nome) {

    const filme = Object.values(catalogo).find(
        item => item.titulo === nome
    );

    if (!filme) {
        alert(nome);
        return;
    }

    alert(
        "🎬 " + filme.titulo +
        "\n\nCategoria: " + filme.categoria +
        "\nAno: " + filme.ano +
        "\nIdioma: " + filme.idioma +
        "\n\n" + filme.descricao
    );

}

// ==============================
// FAVORITOS
// ==============================

let favoritos = JSON.parse(
    localStorage.getItem("galaxyFavoritos") || "[]"
);

function toggleFavorite(nome) {

    if (favoritos.includes(nome)) {

        favoritos = favoritos.filter(
            item => item !== nome
        );

        alert("Removido dos favoritos!");

    } else {

        favoritos.push(nome);

        alert("Adicionado aos favoritos! ❤️");

    }

    localStorage.setItem(
        "galaxyFavoritos",
        JSON.stringify(favoritos)
    );

}

// ==============================
// MOSTRAR FAVORITOS
// ==============================

function showFavorites() {

    if (favoritos.length === 0) {

        alert("Você ainda não possui favoritos.");

        return;

    }

    alert(
        "❤️ SEUS FAVORITOS:\n\n" +
        favoritos.join("\n")
    );

}

// ==============================
// FILTRAR POR CATEGORIA
// ==============================

function filterCategory(categoria) {

    cards.forEach(card => {

        const tipo = card.dataset.category || "";

        if (
            categoria === "todos" ||
            tipo.toLowerCase() === categoria.toLowerCase()
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}

// ==============================
// FILTRAR IDIOMA
// ==============================

function filterLanguage(idioma) {

    cards.forEach(card => {

        const idiomaCard = card.dataset.language || "";

        card.style.display =
            idiomaCard.toLowerCase() === idioma.toLowerCase()
            ? ""
            : "none";

    });

}

// ==============================
// INICIALIZAÇÃO
// ==============================

console.log("🎬 GALAXY PLAY iniciado!");

console.log("🚀 Sistema de streaming carregado!");

