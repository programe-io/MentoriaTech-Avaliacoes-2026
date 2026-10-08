const botoesCurtir = document.querySelectorAll(".like");

botoesCurtir.forEach((botao) => {
    botao.addEventListener("click", () => {
        if (botao.textContent.includes("♡")) {
            botao.textContent = "♥ Curtido";
            botao.style.color = "#e1306c";
        } else {
            botao.textContent = "♡ Curtir";
            botao.style.color = "#222";
        }
    });
});