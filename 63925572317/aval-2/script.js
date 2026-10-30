
// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {
    console.log("Bem-vindo ao meu site!");

    alert("Olá! Seja bem-vindo(a) ao meu site! 💗");
});

// FUNÇÃO DO BOTÃO
function mostrarMensagem() {
    alert("Você é incrível! Nunca deixe de acreditar em você! ✨");
}

// MUDAR A COR DO FUNDO
function mudarCor() {
    const cores = [
        "#ffe4ef",
        "#e9c5ff",
        "#ffd6e7",
        "#fce4ec",
        "#f3d5ff"
    ];

    const corAleatoria = Math.floor(
        Math.random() * cores.length
    );

    document.body.style.background = cores[corAleatoria];
}

// MOSTRAR E ESCONDER TEXTO
function mostrarTexto() {
    const texto = document.getElementById("mensagem");

    if (texto.style.display === "none") {
        texto.style.display = "block";
    } else {
        texto.style.display = "none";
    }
}

// RELÓGIO DIGITAL
function atualizarRelogio() {
    const agora = new Date();

    const horario = agora.toLocaleTimeString("pt-BR");

    const relogio = document.getElementById("relogio");

    if (relogio) {
        relogio.innerHTML = horario;
    }
}

setInterval(atualizarRelogio, 1000);

// ANIMAÇÃO DOS BOTÕES
document.querySelectorAll("button").forEach(botao => {
    botao.addEventListener("click", function() {
        console.log("Botão clicado!");
    });
});

// MENSAGEM NO CONSOLE
console.log("JavaScript carregado com sucesso! 💗");
