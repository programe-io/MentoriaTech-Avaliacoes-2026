
function mostrarMensagem() {
    document.getElementById("mensagem").textContent =
        "Parabéns! Você começou sua jornada na programação. 🚀";
}

function verificarResposta(resposta) {
    const resultado = document.getElementById("resultado");

    if (resposta === "A") {
        resultado.textContent = "✅ Correto! console.log() mostra mensagens no console.";
        resultado.style.color = "green";
    } else {
        resultado.textContent = "❌ Resposta incorreta. Tente novamente!";
        resultado.style.color = "red";
    }
}
