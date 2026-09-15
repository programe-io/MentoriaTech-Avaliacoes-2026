function mostrarCuriosidade() {
    const curiosidades = [
        "A Fórmula 1 é uma das categorias mais importantes do automobilismo mundial.",
        "As corridas de F1 são realizadas em diversos países.",
        "Os carros de Fórmula 1 são projetados para atingir velocidades muito altas.",
        "A Ferrari é uma das equipes mais tradicionais da Fórmula 1.",
        "O campeonato é disputado por pilotos e equipes ao longo de uma temporada."
    ];

    const numero = Math.floor(Math.random() * curiosidades.length);

    document.getElementById("curiosidade").textContent = curiosidades[numero];
}
