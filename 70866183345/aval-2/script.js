// 1. Seleciona os elementos do HTML usando o ID
const titulo = document.getElementById("meu-titulo");
const botao = document.getElementById("meu-botao");

// 2. Fica "ouvindo" para saber quando o usuário vai clicar no botão
botao.addEventListener("click", function() {
    // 3. Modifica o conteúdo do título quando o clique acontece
    titulo.innerText = "Texto alterado pelo JavaScript! 🎉";
    titulo.style.color = "red"; // Também pode mudar o visual!
});