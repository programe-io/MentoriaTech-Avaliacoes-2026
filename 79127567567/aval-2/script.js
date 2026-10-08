// Seleciona todos os botões de curtir
const botoesCurtir = document.querySelectorAll(".curtir");


botoesCurtir.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Encontra o post correspondente
        const post = botao.closest(".post");

        // Encontra o contador de curtidas
        const contador = post.querySelector(".contador");

        // Pega o número atual
        let numeroCurtidas = parseInt(
            contador.textContent
        );


        // Verifica se já está curtido
        if (botao.classList.contains("curtido")) {

            numeroCurtidas--;

            botao.classList.remove("curtido");

            botao.textContent = "♡";

        } else {

            numeroCurtidas++;

            botao.classList.add("curtido");

            botao.textContent = "♥";
        }


        // Atualiza o número
        contador.textContent =
            numeroCurtidas + " curtidas";

    });

});


// Botões de seguir
const botoesSeguir = document.querySelectorAll(
    ".sugestao button"
);


botoesSeguir.forEach(function(botao) {

    botao.addEventListener("click", function() {

        if (botao.textContent === "Seguir") {

            botao.textContent = "Seguindo";

        } else {

            botao.textContent = "Seguir";

        }

    });

});


// Botões de comentários
const botoesComentarios = document.querySelectorAll(
    ".comentarios"
);


botoesComentarios.forEach(function(botao) {

    botao.addEventListener("click", function() {

        alert("Área de comentários selecionada!");

    });

});