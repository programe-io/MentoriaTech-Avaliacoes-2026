const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach((botao) => {
    let curtidas = 0;

    botao.addEventListener("click", () => {
        curtidas++;

        botao.nextElementSibling.textContent =
            curtidas + " curtidas";

        botao.textContent = "❤️ Curtido!";
    });
});

const seguir = document.getElementById("seguir");

seguir.addEventListener("click", () => {
    if (seguir.textContent === "Seguir") {
        seguir.textContent = "Seguindo ✓";
    } else {
        seguir.textContent = "Seguir";
    }
});
