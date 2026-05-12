const botao = document.getElementById("botao");

botao.addEventListener("click", () => {
    const cores = ["#e74c3c", "#2ecc71", "#9b59b6", "#f1c40f", "#1abc9c"];
    
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    document.body.style.backgroundColor = corAleatoria;
});