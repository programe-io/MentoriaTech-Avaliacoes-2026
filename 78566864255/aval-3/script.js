```javascript
const botao = document.getElementById("btnAprender");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", function() {
    mensagem.textContent = "🎉 Parabéns! Sua jornada de aprendizado começa agora!";
    botao.textContent = "Continue aprendendo! 📚";
});
