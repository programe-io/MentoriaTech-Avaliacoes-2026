// Seleciona todos os botões da página
const botoes = document.querySelectorAll(".btn");

// Adiciona a função de clique em cada botão
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
            alert("Você curtiu esse post!");
                });
                });
                