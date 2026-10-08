const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach((botao) => {

    botao.addEventListener("click", () => {

        botao.classList.toggle("liked");

        if (botao.classList.contains("liked")) {
            botao.textContent = "♥ Curtido";
        } else {
            botao.textContent = "♡ Curtir";
        }

    });

});