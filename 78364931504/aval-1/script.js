function abrir(botao) {

    let texto = botao.nextElementSibling;

    if (texto.style.display === "block") {
        texto.style.display = "none";
        botao.textContent = "Continuar lendo";
    } else {
        texto.style.display = "block";
        botao.textContent = "Ler menos";
    }

}