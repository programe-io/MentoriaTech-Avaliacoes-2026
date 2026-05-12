const botao = document.getElementById("btnMensagem");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {

    mensagem.innerHTML = "Você clicou no botão com sucesso! 🎉";

});