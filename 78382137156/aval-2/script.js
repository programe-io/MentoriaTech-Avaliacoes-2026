
const botoes = document.querySelectorAll(".curtir");

botoes.forEach((botao) => {

    botao.addEventListener("click", () => {

        if (botao.classList.contains("curtido")) {
            botao.classList.remove("curtido");
            botao.innerHTML = "♡ Curtir";
            botao.style.backgroundColor = "#ffdc78";
        } else {
            botao.classList.add("curtido");
            botao.innerHTML = "❤️ Curtido";
            botao.style.backgroundColor = "#ff9e9e";
        }

    });

});
