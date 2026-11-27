

// Selecionar todos os botões de curtir
const botoesCurtir = document.querySelectorAll(".like-button");

// Adicionar interação de curtida
botoesCurtir.forEach((botao) => {

    botao.addEventListener("click", () => {

        const icone = botao.querySelector("i");

        if (icone.classList.contains("bx-heart")) {
            icone.classList.remove("bx-heart");
            icone.classList.add("bxs-heart");
            icone.classList.add("text-red-500");
        } else {
            icone.classList.remove("bxs-heart");
            icone.classList.remove("text-red-500");
            icone.classList.add("bx-heart");
        }

    });

});

// Interação dos botões de seguir
const botoesSeguir = document.querySelectorAll("aside button");

botoesSeguir.forEach((botao) => {

    botao.addEventListener("click", () => {

        if (botao.textContent.trim() === "Seguir") {
            botao.textContent = "Seguindo";
        } else if (botao.textContent.trim() === "Seguindo") {
            botao.textContent = "Seguir";
        }

    });

});
