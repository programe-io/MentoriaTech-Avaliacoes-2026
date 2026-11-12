const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();

    const filmes = document.querySelectorAll(".filme");

    filmes.forEach(filme => {
        const nome = filme.dataset.nome.toLowerCase();

        filme.style.display = nome.includes(texto)
            ? "block"
            : "none";
    });
});

function detalhes(nome) {
    alert("Você selecionou o filme: " + nome);
}

function mostrarDestaque() {
    alert("🌟 Destaque do dia: Interestelar!");
}