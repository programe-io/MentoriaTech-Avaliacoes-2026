
// FUNÇÃO DE SAUDAÇÃO
function saudacao() {
    alert("Olá! Seja bem-vindo ao meu site! 💗");
}

// ALTERAR A COR DO FUNDO
function mudarCor() {
    const cores = ["#fce4ec", "#e1bee7", "#bbdefb", "#c8e6c9"];

    const corAleatoria = Math.floor(Math.random() * cores.length);

    document.body.style.backgroundColor = cores[corAleatoria];
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

// MOSTRAR DATA E HORA
function mostrarData() {
    const agora = new Date();

    document.getElementById("data").innerHTML =
        agora.toLocaleString("pt-BR");
}
