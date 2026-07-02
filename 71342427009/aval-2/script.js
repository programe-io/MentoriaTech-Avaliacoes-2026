const curiosidades = [
    "O cinema surgiu em 1895.",
    "Avatar é um dos filmes de maior bilheteria da história.",
    "Jurassic World usa efeitos especiais impressionantes.",
    "Vingadores: Ultimato arrecadou bilhões de dólares."
];

const texto = document.querySelector("#curiosidades p");
const botao = document.getElementById("trocar");

botao.addEventListener("click", function () {
    const indice = Math.floor(Math.random() * curiosidades.length);
    texto.textContent = curiosidades[indice];
});

const botoes = document.querySelectorAll(".card button");

botoes.forEach(function(botao){
    botao.addEventListener("click", function(){
        const titulo = this.parentElement.querySelector("h2").textContent;
        const genero = this.parentElement.querySelector("h3").textContent;

        alert("Filme: " + titulo + "\n" + genero);
    });
});