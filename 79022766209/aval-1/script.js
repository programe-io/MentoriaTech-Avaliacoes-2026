// BOTÃO VER NOTÍCIAS

function verNoticias() {
    document.getElementById("noticias").scrollIntoView({
        behavior: "smooth"
    });
}


// FILTRO DE CATEGORIAS

function filtrar(categoria) {

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        if (
            categoria === "todos" ||
            card.dataset.categoria === categoria
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


// PESQUISA

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", function () {

    const texto = pesquisa.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const titulo = card.querySelector("h3")
            .textContent
            .toLowerCase();

        const descricao = card.querySelector("p")
            .textContent
            .toLowerCase();

        if (
            titulo.includes(texto) ||
            descricao.includes(texto)
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


// MODO ESCURO / CLARO

const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("claro");

    if (document.body.classList.contains("claro")) {
        botaoTema.textContent = "☀️";
    } else {
        botaoTema.textContent = "🌙";
    }

});


// BOTÃO LER NOTÍCIA

function lerNoticia(botao) {

    const card = botao.closest(".card");
    const titulo = card.querySelector("h3").textContent;

    alert(
        "Você selecionou a notícia:\n\n" +
        titulo +
        "\n\nAqui você pode colocar a página completa da notícia."
    );
}