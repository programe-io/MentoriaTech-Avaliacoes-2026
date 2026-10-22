
function mostrarMensagem() {
    alert("Bem-vindo ao Conecta Escola! 📚 Vamos aprender juntos!");
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.dataset.curtido === "true") {
        curtidas--;
        botao.dataset.curtido = "false";
        botao.style.background = "#ffca28";
    } else {
        curtidas++;
        botao.dataset.curtido = "true";
        botao.style.background = "#ff8a80";
    }

    contador.textContent = curtidas;
}
