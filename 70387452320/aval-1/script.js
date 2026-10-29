
function curtir(botao) {
    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.dataset.curtido === "true") {
        curtidas--;
        botao.dataset.curtido = "false";
        botao.style.background = "#a83220";
    } else {
        curtidas++;
        botao.dataset.curtido = "true";
        botao.style.background = "#258447";
    }

    contador.textContent = curtidas;
}
