
// FUNÇÃO DE BOAS-VINDAS
function boasVindas() {
    alert("🚀 Bem-vindo ao meu site!");
}

// MUDAR A COR DO FUNDO
function mudarCor() {
    const cores = [
        "#090979",
        "#ff0000",
        "#00aa00",
        "#800080",
        "#ff6600"
    ];

    const corAleatoria = Math.floor(
        Math.random() * cores.length
    );

    document.body.style.background =
        cores[corAleatoria];
}

// MOSTRAR MENSAGEM
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML =
        "🎉 JavaScript está funcionando!";

    mensagem.style.color = "yellow";
}

// RELÓGIO DIGITAL
function atualizarRelogio() {
    const agora = new Date();

    const horario = agora.toLocaleTimeString("pt-BR");

    document.getElementById("relogio").innerHTML =
        horario;
}

setInterval(atualizarRelogio, 1000);

atualizarRelogio();
