// Mensagem de boas-vindas ao carregar a página
window.onload = function() {
    console.log("Página carregada com sucesso!");
};

// Função para mostrar uma mensagem
function mostrarMensagem() {
    alert("Olá! Você clicou no botão. 🚀");
}

// Alterar o texto de um elemento
function mudarTexto() {
    const titulo = document.querySelector("h1");
    titulo.textContent = "Meu Site em JavaScript!";
}

// Exemplo de interação com botão
const botao = document.querySelector("#botao");

if (botao) {
    botao.addEventListener("click", mostrarMensagem);
}