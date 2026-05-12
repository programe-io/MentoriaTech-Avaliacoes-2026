vconst botao = document.getElementById("btnCor");

botao.addEventListener("click", () => {

    const cores = [
        "#ffadad",
        "#ffd6a5",
        "#fdffb6",
        "#caffbf",
        "#9bf6ff",
        "#a0c4ff",
        "#bdb2ff"
    ];

    const corAleatoria =
        cores[Math.floor(Math.random() * cores.length)];

    document.body.style.backgroundColor = corAleatoria;
});