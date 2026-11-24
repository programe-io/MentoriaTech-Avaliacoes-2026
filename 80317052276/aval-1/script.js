
function pesquisar() {
    const termo = document.getElementById("pesquisa")
        .value.toLowerCase().trim();

    const noticias = document.querySelectorAll(".card");
    let encontrados = 0;

    noticias.forEach(function(card) {
        const texto = card.innerText.toLowerCase();

        if (texto.includes(termo)) {
            card.style.display = "block";
            encontrados++;
        } else {
            card.style.display = "none";
        }
    });

    const resultado = document.getElementById("resultado");

    if (termo === "") {
        noticias.forEach(card => card.style.display = "block");
        resultado.innerText = "Digite algo para pesquisar.";
    } else if (encontrados === 0) {
        resultado.innerText = "Nenhuma notícia encontrada.";
    } else {
        resultado.innerText = encontrados + " notícia(s) encontrada(s).";
    }
}
