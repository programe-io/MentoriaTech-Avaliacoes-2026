
// Mensagem de boas-vindas no console

console.log("Bem-vindo à continuação do blog Web e Internet!");

// Destacar o link da navegação ao clicar

const links = document.querySelectorAll("nav a");

links.forEach(function(link) {

    link.addEventListener("click", function() {

        links.forEach(function(item) {
            item.classList.remove("selecionado");
        });

        link.classList.add("selecionado");

    });

});

// Mostrar mensagem ao clicar no título do banner

const titulo = document.querySelector(".banner h2");

titulo.addEventListener("click", function() {

    alert("Continue aprendendo sobre a Web e a Internet!");

});

// Mostrar ano atual no rodapé

const rodape = document.querySelector("footer");

const ano = new Date().getFullYear();

const mensagem = document.createElement("p");

mensagem.textContent = "Ano atual: " + ano;

rodape.appendChild(mensagem);
