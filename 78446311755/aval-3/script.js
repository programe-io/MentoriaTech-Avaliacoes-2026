
function responder(correta) {
    const resultado = document.getElementById("resultado");

    if (correta) {
        resultado.textContent =
            "Parabéns! Você acertou! 🎉";
        resultado.style.color = "#15803d";
    } else {
        resultado.textContent =
            "Tente novamente! Pense nos benefícios da tecnologia.";
        resultado.style.color = "#b91c1c";
    }
}
