function mostrarDica() {

    const dicas = [
        "Beba pelo menos 2 litros de água por dia.",
        "Consuma frutas diariamente.",
        "Evite alimentos ultraprocessados.",
        "Prefira alimentos integrais.",
        "Faça refeições equilibradas."
    ];

    const aleatoria = Math.floor(
        Math.random() * dicas.length
    );

    document.getElementById("dica").innerHTML =
        "💡 Dica: " + dicas[aleatoria];
}