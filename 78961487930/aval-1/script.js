
// LISTA DE CURIOSIDADES
const curiosidades = [
    "Três Graças é uma novela da TV Globo.",
    "A novela apresenta histórias de drama e mistério.",
    "Os personagens enfrentam vários conflitos.",
    "A trama possui segredos e reviravoltas.",
    "Cada personagem tem uma história especial!"
];

// FUNÇÃO PARA MOSTRAR CURIOSIDADES
function mostrarCuriosidade() {
    const numero = Math.floor(
        Math.random() * curiosidades.length
    );

    document.getElementById("curiosidade").innerText =
        curiosidades[numero];
}

// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Blog Três Graças!");
});

// EFEITO NOS CARTÕES DOS PERSONAGENS
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", function() {
        const nome = card.querySelector("h3").innerText;

        alert("Você selecionou: " + nome);
    });
});

// MENU DE NAVEGAÇÃO
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", function() {
        console.log("Você acessou: " + link.innerText);
    });
});
