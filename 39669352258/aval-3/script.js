// Selecionando elementos utilizando o getElementById e querySelector
const titulo = document.getElementById("titulo-principal");
const paragrafo = document.querySelector(".descricao");
const botao = document.querySelector("#meu-botao");

console.log("Título atual:", titulo.textContent);

// Adicionando interatividade com eventos para alterar o DOM dinamicamente
botao.addEventListener("click", function() {
    titulo.textContent = "Título Alterado com Sucesso via JavaScript!";
        paragrafo.textContent = "O DOM permitiu modificar o conteúdo e o estado da página em tempo de execução.";
        });
        