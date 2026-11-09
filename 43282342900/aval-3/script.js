
function curtir(botao) {
    if (botao.textContent === "❤️ Curtir") {
        botao.textContent = "💖 Curtido!";
        botao.style.background = "#e91e63";
    } else {
        botao.textContent = "❤️ Curtir";
        botao.style.background = "#ff7300";
    }
}

alert("Bem-vindo ao Mundo da Risada! 😂");
