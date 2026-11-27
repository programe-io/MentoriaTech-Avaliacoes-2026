
function curtir(botao) {
    if (botao.textContent === "Curtir") {
        botao.textContent = "Curtido!";
        botao.style.backgroundColor = "green";
    } else {
        botao.textContent = "Curtir";
        botao.style.backgroundColor = "#263b5e";
    }
}
