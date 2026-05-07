// Seleciona o botão pelo ID
const botao = document.getElementById("meuBotao");

// Adiciona um evento de clique
botao.addEventListener("click", function() {
    alert("Você clicou no botão!");
});

// Exemplo de função que muda o texto da página
function mudarTexto() {
    const titulo = document.getElementById("titulo");
    titulo.innerText = "Texto alterado com JavaScript!";
}