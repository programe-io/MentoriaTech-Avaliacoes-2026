function mostrarMensagem() {
    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem");

    if (nome.trim() === "") {
        mensagem.textContent = "Por favor, digite seu nome!";
        mensagem.style.color = "red";
    } else {
        mensagem.textContent = "Olá, " + nome + "! Seja bem-vindo!";
        mensagem.style.color = "green";
    }
}