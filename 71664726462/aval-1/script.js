const botao = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
    mensagem.textContent = "Bem-vindo ao meu portfólio!";
});