// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", () => {

    console.log("Página carregada com sucesso!");

    // Botão de boas-vindas
    const botao = document.getElementById("btn");

    if (botao) {
        botao.addEventListener("click", () => {
            alert("Bem-vindo! Obrigado por visitar o site.");
        });
    }

    // Contador de cliques
    const contador = document.getElementById("contador");
    let cliques = 0;

    if (contador) {
        contador.addEventListener("click", () => {
            cliques++;
            contador.textContent = `Cliques: ${cliques}`;
        });
    }

    // Atualiza o ano do rodapé automaticamente
    const ano = document.getElementById("ano");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

});