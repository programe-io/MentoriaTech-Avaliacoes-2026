// ================================
// RELÓGIO E DATA
// ================================

function atualizarData() {

    const agora = new Date();

    const opcoes = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    const data = agora.toLocaleDateString("pt-BR", opcoes);

    const elementoData = document.querySelector(".data");

    if (elementoData) {
        elementoData.textContent = data.toUpperCase();
    }
}

atualizarData();


// ================================
// MENU
// ================================

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        linksMenu.forEach(function(item) {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");

        alert("Você selecionou: " + this.textContent);
    });

});


// ================================
// BOTÃO DE NOTÍCIA
// ================================

const titulo = document.querySelector(".texto-manchete h1");

if (titulo) {

    titulo.addEventListener("click", function() {

        alert(
            "Você está lendo a principal notícia do Brasil Agora."
        );

    });

}


// ================================
// CARDS DE NOTÍCIAS
// ================================

const cards = document.querySelectorAll(".card");

cards.forEach(function(card) {

    card.addEventListener("click", function() {

        const tituloCard =
            card.querySelector("h3").textContent;

        alert(
            "Notícia selecionada:\n\n" +
            tituloCard
        );

    });

});


// ================================
// MODO ESCURO
// ================================

const botaoTema = document.createElement("button");

botaoTema.textContent = "🌙 Modo escuro";

botaoTema.classList.add("botao-tema");

document.body.appendChild(botaoTema);

botaoTema.addEventListener("click", function() {

    document.body.classList.toggle("modo-escuro");

    if (
        document.body.classList.contains("modo-escuro")
    ) {
        botaoTema.textContent = "☀️ Modo claro";
    } else {
        botaoTema.textContent = "🌙 Modo escuro";
    }

});


// ================================
// MENSAGEM AO CARREGAR
// ================================

window.addEventListener("load", function() {

    console.log(
        "Portal Brasil Agora carregado com sucesso!"
    );

});