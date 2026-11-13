
const botoes = document.querySelectorAll(".curtir");

botoes.forEach((botao) => {
    let curtido = false;

    botao.addEventListener("click", () => {
        if (!curtido) {
            botao.innerHTML = "❤️ Curtido!";
            botao.style.backgroundColor = "#e60026";
            botao.style.color = "white";
            curtido = true;
        } else {
            botao.innerHTML = "🤍 Curtir";
            botao.style.backgroundColor = "white";
            botao.style.color = "black";
            curtido = false;
        }
    });
});
