function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "Olá! Você clicou no botão. 🎉";
    mensagem.style.color = "green";
    mensagem.style.fontWeight = "bold";
}

// Adiciona o evento ao botão
document.getElementById("botao").addEventListener("click", mostrarMensagem);