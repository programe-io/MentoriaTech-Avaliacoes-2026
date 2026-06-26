const botao = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
    mensagem.textContent =
        "🇧🇷 Que venha o hexa! A torcida brasileira segue apoiando a Seleção!";
});