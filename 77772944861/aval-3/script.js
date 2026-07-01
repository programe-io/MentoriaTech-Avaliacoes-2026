// Mensagem exibida quando a página carregar
alert("Bem-vindo ao Meu Site!");

// Seleciona o título
const titulo = document.querySelector(".titulo");

// Altera o texto ao clicar
titulo.addEventListener("click", function() {
    titulo.innerHTML = "Você clicou no título!";
    });

    // Seleciona a imagem
    const imagem = document.querySelector("img");

    // Exibe uma mensagem ao clicar na imagem
    imagem.addEventListener("click", function() {
        alert("Você clicou na imagem!");
        });