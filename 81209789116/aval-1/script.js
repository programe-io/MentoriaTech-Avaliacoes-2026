// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
    console.log("Bem-vindo à Style Feet!");

    // Seleciona todos os botões
    const botoes = document.querySelectorAll("button");

    // Adiciona evento de clique em cada botão
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].addEventListener("click", comprarProduto);
    }
}

// Função executada ao clicar no botão
function comprarProduto(evento) {

    // Botão clicado
    const botao = evento.target;

    // Nome do produto
    const produto = botao.parentElement.querySelector("h3").textContent;

    // Mensagem
    alert("Compra realizada!\nProduto: " + produto);

    // Altera o botão
    botao.textContent = "Comprado";
    botao.style.backgroundColor = "#28a745";
    botao.style.color = "#ffffff";

    // Desabilita o botão
    botao.disabled = true;
}