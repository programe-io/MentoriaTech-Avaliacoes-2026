// Mensagem ao carregar a página
window.onload = function() {
    console.log("Página carregada com sucesso!");
};

// Função para exibir uma mensagem
function mostrarMensagem() {
    alert("Bem-vindo ao meu site!");
}

// Altera o título do artigo ao clicar nele
document.addEventListener("DOMContentLoaded", function() {
    const titulo = document.querySelector("article h2");

    titulo.addEventListener("click", function() {
        this.textContent = "Você clicou no título!";
    });
});