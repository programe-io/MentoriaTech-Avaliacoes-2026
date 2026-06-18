function trocarCor() {
    const cores = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#6c5ce7"
    ];

    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    document.body.style.backgroundColor = corAleatoria;
}