
const botoes = document.querySelectorAll(".like");

botoes.forEach((botao) => {
    let curtido = false;
    let contador = 0;

    botao.addEventListener("click", () => {
        curtido = !curtido;

        if (curtido) {
            contador++;
            botao.style.background = "#e63939";
            botao.firstChild.textContent = "♥ Curtido ";
        } else {
            contador--;
            botao.style.background = "transparent";
            botao.firstChild.textContent = "♡ Curtir ";
        }

        botao.querySelector("b").textContent = contador;
    });
});

console.log("AUTO STYLE iniciado com sucesso!");
