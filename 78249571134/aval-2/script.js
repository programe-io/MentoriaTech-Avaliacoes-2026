// Rolar para os vídeos

function scrollToVideos() {

    document.getElementById("videos").scrollIntoView({
        behavior: "smooth"
    });

}


// Botão principal

function exploreBeauty() {

    document.getElementById("tendencias").scrollIntoView({
        behavior: "smooth"
    });

}


// Categorias

function showCategory(category) {

    alert(
        "✦ LUMINA BEAUTY\n\n" +
        "Você selecionou: " + category +
        "\n\nNovos conteúdos dessa categoria estão chegando!"
    );

}


// Vídeos

function watchVideo(video) {

    alert(
        "▶️ LUMINA BEAUTY\n\n" +
        "Vídeo selecionado:\n" +
        video +
        "\n\nAqui você pode conectar posteriormente um vídeo do YouTube ou outro player."
    );

}


// Artigos

function readArticle(event, article) {

    event.preventDefault();

    alert(
        "✦ BEAUTY BLOG\n\n" +
        "Artigo: " + article +
        "\