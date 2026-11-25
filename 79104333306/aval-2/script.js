
// Botao de curtir

let botoes = document.querySelectorAll(".curtir");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        let post = botao.parentElement.parentElement;

        let contador = post.querySelector(".contador");

        let numero = Number(contador.innerHTML.split(" ")[0]);

        if (botao.innerHTML == "♡") {

            numero++;
            botao.innerHTML = "♥";
            botao.style.color = "red";

        } else {

            numero--;
            botao.innerHTML = "♡";
            botao.style.color = "white";

        }

        contador.innerHTML = numero + " curtidas";

    });

});


// Botao de publicar comentario

let enviar = document.querySelectorAll(".enviar");

enviar.forEach(function(botao) {

    botao.addEventListener("click", function() {

        let post = botao.parentElement;

        let campo = post.querySelector(".campo-comentario");

        let comentarios = post.querySelector(".comentarios");

        if (campo.value != "") {

            comentarios.innerHTML +=
            "<p><b>Você:</b> " + campo.value + "</p>";

            campo.value = "";

        }

    });

});
