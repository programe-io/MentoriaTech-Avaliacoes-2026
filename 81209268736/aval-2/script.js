const campoPesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");
const botoesFiltro = document.querySelectorAll(".filtro");

function pesquisarJogos() {
    const texto = campoPesquisa.value.toLowerCase().trim();

    cards.forEach((card) => {
        const nome = card.querySelector("h3").textContent.toLowerCase();
        const categoria = card.dataset.categoria.toLowerCase();

        card.style.display =
            nome.includes(texto) || categoria.includes(texto)
                ? ""
                : "none";
    });
}

campoPesquisa.addEventListener("input", pesquisarJogos);

// Filtrar jogos por categoria
botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        const categoriaEscolhida = botao.dataset.filtro;

        botoesFiltro.forEach((b) => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        cards.forEach((card) => {
            const categoria = card.dataset.categoria;

            card.style.display =
                categoriaEscolhida === "todos" ||
                categoria === categoriaEscolhida
                    ? ""
                    : "none";
        });

        campoPesquisa.value = "";
    });
});

// Sistema de curtidas
document.querySelectorAll(".curtir").forEach((botao) => {
    botao.addEventListener("click", () => {
        const curtidas = Number(botao.dataset.curtidas || 0) + 1;

        botao.dataset.curtidas = curtidas;
        botao.textContent = `❤️ ${curtidas}`;
    });
});

console.log("🎮 GameZone iniciado com sucesso!");
2. Adicione a pesquisa e os filtros no HTML
Coloque este código dentro da seção de jogos, antes dos cards:

