
// Abrir e fechar menu
function abrirMenu() {
    document.getElementById("menu").classList.toggle("aberto");
}

// Filtrar destinos
function filtrar(tipo, botao) {
    const cards = document.querySelectorAll(".card");

    document.querySelectorAll(".filtros button")
        .forEach(b => b.classList.remove("selecionado"));

    botao.classList.add("selecionado");

    cards.forEach(card => {
        if (tipo === "todos" || card.dataset.tipo === tipo) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Pesquisar destino
function pesquisarDestino() {
    const pesquisa = document.getElementById("busca")
        .value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const texto = card.innerText.toLowerCase();

        card.style.display = texto.includes(pesquisa)
            ? "block" : "none";
    });
}

// Abrir detalhes do destino
function detalhes(titulo, texto) {
    document.getElementById("modalTitulo").innerText = titulo;
    document.getElementById("modalTexto").innerText = texto;

    document.getElementById("modal").style.display = "flex";
}

// Fechar modal
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// Fechar modal clicando fora
document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharModal();
    }
});
