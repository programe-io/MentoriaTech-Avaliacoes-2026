const jogos = [
    {
        nome: "Minecraft",
        categoria: "aventura",
        descricao: "Explore mundos e construa suas aventuras."
    },
    {
        nome: "Fortnite",
        categoria: "acao",
        descricao: "Entre na batalha e mostre suas habilidades."
    },
    {
        nome: "Cyberpunk",
        categoria: "aventura",
        descricao: "Descubra um futuro cheio de ação."
    },
    {
        nome: "Forza Horizon",
        categoria: "corrida",
        descricao: "Acelere em corridas emocionantes."
    }
];

// Pesquisa de jogos
function pesquisarJogos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        const nome = card.querySelector("h3")
            .textContent.toLowerCase();

        card.style.display = nome.includes(pesquisa)
            ? "block"
            : "none";
    });
}

// Filtro por categoria
function filtrarJogos(categoria) {
    document.querySelectorAll(".card").forEach(card => {
        if (categoria === "todos") {
            card.style.display = "block";
            return;
        }

        card.style.display =
            card.dataset.categoria === categoria
                ? "block"
                : "none";
    });
}

// Botão de boas-vindas
function boasVindas() {
    alert("Bem-vindo ao GameZone! 🎮");
}

// Mostrar mensagem ao carregar a página
console.log("GameZone carregado com sucesso!");