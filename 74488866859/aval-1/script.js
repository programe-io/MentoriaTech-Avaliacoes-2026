// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao site de Turismo!");
};

// Botão para mostrar dica aleatória
function mostrarDica() {
    const dicas = [
        "Leve protetor solar ☀️",
        "Beba bastante água 💧",
        "Respeite a cultura local 🌎",
        "Planeje seu roteiro 🗺️"
    ];

    const random = Math.floor(Math.random() * dicas.length);
    document.getElementById("dica").innerText = dicas[random];
}

// Mudar cor do fundo
function mudarCor() {
    const cores = ["#e0f7fa", "#ffe0b2", "#e1bee7", "#c8e6c9"];
    const random = Math.floor(Math.random() * cores.length);
    document.body.style.background = cores[random];
}