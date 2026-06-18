const btn = document.getElementById("btn");
const mensagem = document.getElementById("mensagem");

const cores = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff"
];

btn.addEventListener("click", () => {
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    document.body.style.backgroundColor = corAleatoria;
    mensagem.textContent = "A cor foi alterada!";
});