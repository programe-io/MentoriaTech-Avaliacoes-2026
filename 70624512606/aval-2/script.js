
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    alert("Olá! Seja bem-vindo(a) à página pessoal da Victoria! 💗");
});

// Botão para mostrar uma mensagem
function mostrarMensagem() {
    alert("Oi! Eu sou Victoria, estudante da 2ª série do CETIFT Francisca Trindade! 🌷");
}

// Mudar a cor de fundo
function mudarCor() {
    const cores = ["#fff0f6", "#f3e8ff", "#e0f2fe", "#fef3c7"];

    const corAleatoria = Math.floor(Math.random() * cores.length);

    document.body.style.backgroundColor = cores[corAleatoria];
}

// Mostrar data atual
function mostrarData() {
    const data = new Date();

    document.getElementById("data").innerHTML =
        "Hoje é: " + data.toLocaleDateString("pt-BR");
}
