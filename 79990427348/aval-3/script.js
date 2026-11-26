function curtir(botao) {
    if (botao.innerText === "♡") {
        botao.innerText = "♥";
        botao.classList.add("liked");
    } else {
        botao.innerText = "♡";
        botao.classList.remove("liked");
    }
}