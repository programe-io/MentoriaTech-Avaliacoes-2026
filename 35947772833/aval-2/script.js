// Mensagem de boas-vindas ao carregar a página
window.onload = function () {
    alert("Bem-vindo ao site!");
};

// Função para alterar o conteúdo principal
function mudarConteudo(texto) {
    document.getElementById("conteudo").innerHTML = texto;
}