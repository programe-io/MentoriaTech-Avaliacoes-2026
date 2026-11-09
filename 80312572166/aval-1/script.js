document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnMensagem");
    const mensagem = document.getElementById("mensagemOculta");

    botao.addEventListener("click", () => {
        if (mensagem.classList.contains("hidden")) {
            mensagem.classList.remove("hidden");
            mensagem.classList.add("visible");
            botao.textContent = "Fechar mensagem";
        } else {
            mensagem.classList.remove("visible");
            mensagem.classList.add("hidden");
            botao.textContent = "Clique para ver uma saudação";
        }
    });
});
