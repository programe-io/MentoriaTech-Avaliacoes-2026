
const pesquisa = document.querySelector("#pesquisa");
const botoesFiltro = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".game-card");
const semResultados = document.querySelector("#sem-resultados");

let filtroAtual = "todos";

// Pesquisa e filtros
function filtrarJogos() {
    const termo = pesquisa.value.toLowerCase().trim();
    let encontrados = 0;

    cards.forEach((card) => {
        const categoria = card.dataset.category;
        const conteudo = card.textContent.toLowerCase();

        const combinaFiltro =
            filtroAtual === "todos" || categoria === filtroAtual;

        const combinaPesquisa = conteudo.includes(termo);
        const mostrar = combinaFiltro && combinaPesquisa;

        card.hidden = !mostrar;

        if (mostrar) encontrados++;
    });

    semResultados.hidden = encontrados > 0;
}

pesquisa.addEventListener("input", filtrarJogos);

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtroAtual = botao.dataset.filter;

        botoesFiltro.forEach((item) => {
            item.classList.remove("active");
        });

        botao.classList.add("active");
        filtrarJogos();
    });
});

// Botões de curtir
document.querySelectorAll(".like-btn").forEach((botao) => {
    botao.addEventListener("click", () => {
        const curtiu = botao.classList.toggle("liked");

        botao.textContent = curtiu ? "♥ Curtido" : "♡ Curtir";
        botao.setAttribute("aria-pressed", String(curtiu));
    });
});

// Formulário demonstrativo
document.querySelector("#formulario").addEventListener("submit", (evento) => {
    evento.preventDefault();

    document.querySelector("#mensagem").textContent =
        "Inscrição demonstrativa realizada! 🎮";

    evento.target.reset();
});

// Atualiza o ano automaticamente
document.querySelector("#ano").textContent = new Date().getFullYear();
