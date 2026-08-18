function compartilhar() {

    const titulo = document.title;
    const url = window.location.href;

    if (navigator.share) {

        navigator.share({
            title: titulo,
            text: "Confira esta notícia de política.",
            url: url
        });

    } else {

        navigator.clipboard.writeText(url);

        alert("Link da notícia copiado para a área de transferência!");
    }
}


function lerNoticia(titulo) {

    alert(
        "Você selecionou:\n\n" +
        titulo +
        "\n\nEsta é uma notícia demonstrativa."
    );

}