const jogos = [
    {
        nome: "Minecraft",
        categoria: "Aventura",
        descricao: "Explore mundos e construa suas próprias aventuras."
    },
    {
        nome: "Free Fire",
        categoria: "Ação",
        descricao: "Entre na batalha e lute pela sobrevivência."
    },
    {
        nome: "Fortnite",
        categoria: "Ação",
        descricao: "Construa, explore e enfrente outros jogadores."
    },
    {
        nome: "Roblox",
        categoria: "Aventura",
        descricao: "Descubra experiências criadas por jogadores."
    }
];

// Pesquisa de jogos
function pesquisarJogos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const cards = document.querySelectorAll(".game-card");

    cards.forEach((card) => {
        const nome = card.querySelector("h3").textContent.toLowerCase();

        card.style.display = nome.includes(pesquisa)
            ? ""
            : "none";
    });
}

// Curtir jogos
document.querySelectorAll(".curtir").forEach((botao) => {
    botao.addEventListener("click", () => {
        const curtidas = Number(botao.dataset.curtidas || 0) + 1;

        botao.dataset.curtidas = curtidas;
        botao.textContent = `❤️ ${curtidas}`;
    });
});

// Mensagem de boas-vindas no console
console.log("🎮 GameZone carregado com sucesso!");
console.log("Jogos disponíveis:", jogos);