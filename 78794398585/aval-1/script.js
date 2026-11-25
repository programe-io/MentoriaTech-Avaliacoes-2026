
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent =
        "O Homem-Aranha é Peter Parker, um dos maiores heróis da Marvel! 🕷️";

    mensagem.style.animation = "none";
    void mensagem.offsetWidth;
    mensagem.style.animation = "aparecer 1s ease";
}
