// Este código JavaScript interage com a página quando ela é carregada
document.addEventListener("DOMContentLoaded", function() {
    console.log("Blog da Rafaela carregado com sucesso!");

    // Adiciona uma mensagem de boas-vindas interativa ao clicar no título principal
    const tituloPrincipal = document.querySelector(".hero h1");
    
    if (tituloPrincipal) {
        tituloPrincipal.addEventListener("click", function() {
            alert("Bem-vinda ao blog cyberpunk da Rafaela! 🚀✨");
        });
    }
});