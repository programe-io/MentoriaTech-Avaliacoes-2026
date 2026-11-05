// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona o rodapé
    const footer = document.querySelector("footer");

    // Cria um parágrafo
    const mensagem = document.createElement("p");

    // Mostra o ano atual
    mensagem.textContent = "© " + new Date().getFullYear() +
        " - Meu Blog. Todos os direitos reservados.";

    // Adiciona a mensagem ao rodapé
    footer.appendChild(mensagem);

    // Seleciona os links do menu
    const links = document.querySelectorAll("nav a");

    // Adiciona efeito ao clicar nos links
    links.forEach(function (link) {
        link.addEventListener("click", function () {
            console.log("Você clicou em: " + link.textContent);
        });
    });

});