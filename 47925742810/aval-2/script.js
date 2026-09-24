let contador = 0;

const botao = document.getElementById("curtirBtn");

const numero = document.getElementById("contador");


botao.addEventListener("click", function() {

    contador++;

    numero.textContent = contador + " curtidas";

    botao.textContent = "💚 Curtido";

});


const botoes = document.querySelectorAll(".curtir");


botoes.forEach(function(botaoAtual) {

    botaoAtual.addEventListener("click", function() {

        if (botaoAtual.id !== "curtirBtn") {

            botaoAtual.textContent = "💚 Curtido";

        }

    });

});