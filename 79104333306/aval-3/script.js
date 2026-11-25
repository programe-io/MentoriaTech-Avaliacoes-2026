
// Botão de seguir

let seguir = document.getElementById("seguir");

seguir.addEventListener("click", function() {

    if (seguir.innerHTML == "Seguir") {
        seguir.innerHTML = "Seguindo";
        seguir.style.backgroundColor = "gray";
    } else {
        seguir.innerHTML = "Seguir";
        seguir.style.backgroundColor = "darkred";
    }

});

// Botões de curtir

let botoes = document.querySelectorAll(".curtir");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        let contador = botao.nextElementSibling;

        let numero = Number(contador.innerHTML.split(" ")[0]);

        if (botao.innerHTML == "♡ Curtir") {

            numero = numero + 1;
            botao.innerHTML = "♥ Curtido";

        } else {

            numero = numero - 1;
            botao.innerHTML = "♡ Curtir";

        }

        contador.innerHTML = numero + " curtidas";

    });

});
