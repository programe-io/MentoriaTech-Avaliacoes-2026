
const botoesCurtir = document.querySelectorAll(".like");

botoesCurtir.forEach((botao) => {
    botao.addEventListener("click", () => {

        if (botao.classList.contains("curtido")) {
            botao.classList.remove("curtido");
            botao.innerHTML = "♡ Curtir";
            botao.style.background = "#f8d4e2";
            botao.style.color = "#a34068";
        } else {
            botao.classList.add("curtido");
            botao.innerHTML = "♥ Curtido!";
            botao.style.background = "#e99ab8";
            botao.style.color = "white";
        }

    });
});
