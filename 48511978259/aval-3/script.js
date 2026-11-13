const botoes = document.querySelectorAll(".like");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        botao.classList.toggle("ativo");

        if (botao.classList.contains("ativo")) {
            botao.textContent = "♥";
        } else {
            botao.textContent = "♡";
        }

    });

});

