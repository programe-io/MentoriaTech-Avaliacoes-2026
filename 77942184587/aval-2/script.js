function mostrarMensagem(projeto) {
    alert("Você selecionou o projeto: " + projeto);
}

function mostrarContato() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent =
        "Valeu por visitar meu blog! 🚀 Continue acompanhando meus projetos.";
}