function mudarCor(){

    const cores = [
        "#00b894",
        "#6c5ce7",
        "#e17055",
        "#0984e3",
        "#d63031",
        "#fdcb6e"
    ];

    const cor = cores[Math.floor(Math.random()*cores.length)];

    document.body.style.background = cor;

    document.getElementById("mensagem").innerHTML =
    "A cor do fundo mudou para " + cor;
}