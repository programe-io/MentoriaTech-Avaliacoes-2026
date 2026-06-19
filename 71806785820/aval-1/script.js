function scrollToCollection() {
    document.getElementById("colecao")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function showTrend() {
    const trends = [
        "Tons neutros e minimalistas.",
        "Alfaiataria moderna com cortes amplos.",
        "Looks monocromáticos elegantes.",
        "Streetwear com peças oversized.",
        "Tecidos sustentáveis e ecológicos.",
        "Acessórios metálicos em destaque."
    ];

    const randomTrend =
        trends[Math.floor(Math.random() * trends.length)];

    document.getElementById("trendText").textContent = randomTrend;
}