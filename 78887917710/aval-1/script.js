
function mostrarMensagem() {

    const mensagem = document.getElementById("mensagem");

    mensagem.innerHTML = "🔥 SEU COSMO ESTÁ ARDENDO! 🔥";

    mensagem.style.textShadow = "0 0 15px gold";

    mensagem.style.transform = "scale(1.1)";

    setTimeout(() => {
        mensagem.style.transform = "scale(1)";
    }, 300);
}
