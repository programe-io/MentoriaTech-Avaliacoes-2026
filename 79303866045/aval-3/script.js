
// LISTA DE TUTORIAIS DE JOGOS
const tutoriais = [
    {
        nome: "Minecraft",
        categoria: "Sobrevivência",
        nivel: "Iniciante",
        descricao: "Aprenda a sobreviver, construir casas e encontrar diamantes.",
        link: "https://www.youtube.com/results?search_query=tutorial+minecraft"
    },

    {
        nome: "Free Fire",
        categoria: "Battle Royale",
        nivel: "Intermediário",
        descricao: "Aprenda a melhorar sua mira e suas estratégias.",
        link: "https://www.youtube.com/results?search_query=tutorial+free+fire"
    },

    {
        nome: "Fortnite",
        categoria: "Battle Royale",
        nivel: "Avançado",
        descricao: "Aprenda construções, edições e técnicas de combate.",
        link: "https://www.youtube.com/results?search_query=tutorial+fortnite"
    },

    {
        nome: "GTA V",
        categoria: "Ação",
        nivel: "Iniciante",
        descricao: "Descubra missões, veículos e segredos do jogo.",
        link: "https://www.youtube.com/results?search_query=tutorial+gta+5"
    },

    {
        nome: "Roblox",
        categoria: "Aventura",
        nivel: "Iniciante",
        descricao: "Aprenda a criar jogos e explorar diferentes mundos.",
        link: "https://www.youtube.com/results?search_query=tutorial+roblox"
    },

    {
        nome: "God of War",
        categoria: "Aventura",
        nivel: "Intermediário",
        descricao: "Aprenda técnicas de combate e estratégias para derrotar inimigos.",
        link: "https://www.youtube.com/results?search_query=tutorial+god+of+war"
    }
];

// EXIBIR TUTORIAIS
function mostrarTutoriais(lista = tutoriais) {
    const area = document.getElementById("tutoriais");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<h3>Nenhum tutorial encontrado!</h3>";
        return;
    }

    lista.forEach(tutorial => {
        area.innerHTML += `
            <div class="card">
                <h2>🎮 ${tutorial.nome}</h2>

                <p>
                    <strong>Categoria:</strong>
                    ${tutorial.categoria}
                </p>

                <p>
                    <strong>Nível:</strong>
                    ${tutorial.nivel}
                </p>

                <p>${tutorial.descricao}</p>

                <a href="${tutorial.link}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="botao">
                   Assistir tutorial
                </a>
            </div>
        `;
    });
}

// PESQUISAR TUTORIAIS
function pesquisarTutorial() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const resultados = tutoriais.filter(tutorial =>
        tutorial.nome.toLowerCase().includes(pesquisa) ||
        tutorial.categoria.toLowerCase().includes(pesquisa)
    );

    mostrarTutoriais(resultados);
}

// FILTRAR POR NÍVEL
function filtrarNivel(nivel) {
    if (nivel === "Todos") {
        mostrarTutoriais();
        return;
    }

    const resultados = tutoriais.filter(tutorial =>
        tutorial.nivel === nivel
    );

    mostrarTutoriais(resultados);
}

// CONTAR TUTORIAIS
function contarTutoriais() {
    alert(
        "Temos " + tutoriais.length +
        " tutoriais disponíveis no site! 🎮"
    );
}

// CARREGAR AO ABRIR O SITE
document.addEventListener("DOMContentLoaded", () => {
    mostrarTutoriais();
    console.log("Tutoriais carregados com sucesso!");
});
