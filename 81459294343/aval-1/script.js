
function mostrarMensagem() {
    const mensagens = [
        "Oinc! Vamos pular nas poças de lama! 🐷",
        "Que dia maravilhoso para brincar! 🌈",
        "George está brincando com seu dinossauro! 🦖",
        "A família Pig deseja um dia feliz! 💗"
    ];

    const sorteio = Math.floor(Math.random() * mensagens.length);

    document.getElementById("mensagem").textContent =
        mensagens[sorteio];
}

function enviarRecado() {
    const nome = document.getElementById("nome").value.trim();
    const recado = document.getElementById("recado").value.trim();
    const resultado = document.getElementById("resultado");

    if (nome === "" || recado === "") {
        resultado.textContent = "Preencha seu nome e seu recado!";
        return;
    }

    resultado.textContent =
        "Oinc, " + nome + "! Seu recadinho foi recebido! 💗";

    document.getElementById("nome").value = "";
    document.getElementById("recado").value = "";
}
