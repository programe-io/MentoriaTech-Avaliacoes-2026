function curtir(botao) {
    if (botao.innerHTML.includes("🤍")) {
        botao.innerHTML = "❤️ Curtido";
    } else {
        botao.innerHTML = "🤍 Curtir";
    }
}
