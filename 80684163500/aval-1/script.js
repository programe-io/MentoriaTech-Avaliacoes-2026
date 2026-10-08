const botoesCurtir = document.querySelectorAll(".like");

botoesCurtir.forEach(function (botao) {

    botao.addEventListener("click", function () {

        botao.classList.toggle("ativo");

        if (botao.classList.contains("ativo")) {
            botao.textContent = "♥";
        } else {
            botao.textContent = "♡";
        }

    });

});