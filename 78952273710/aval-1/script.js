
// Efeito de boas-vindas

window.addEventListener("load", function() {
    console.log("Bem-vindo ao blog do Matuê!");
});

// Efeito nas músicas

const faixas = document.querySelectorAll(".faixa");

faixas.forEach(function(faixa) {

    faixa.addEventListener("click", function() {

        const nome = faixa.querySelector("p").innerText;

        alert("🎵 Você selecionou: " + nome);

    });

});

// Efeito de clique nas fotos

const fotos = document.querySelectorAll(".galeria img");

fotos.forEach(function(foto) {

    foto.addEventListener("click", function() {

        alert("Foto selecionada da galeria do Matuê!");

    });

});
