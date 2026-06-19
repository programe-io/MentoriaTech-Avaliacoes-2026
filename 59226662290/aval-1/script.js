// Exibe uma mensagem de boas-vindas quando a página é carregada
window.addEventListener("load", () => {
    console.log("Bem-vindo à página temática do Flamengo!");
});

// Seleciona o botão
const botao = document.querySelector(".botao");

// Adiciona um evento de clique
if (botao) {
    botao.addEventListener("click", (event) => {
        event.preventDefault();

        alert(
            "Saudações Rubro-Negras! 🔴⚫\n\n" +
            "O Flamengo é um dos clubes mais tradicionais e populares do futebol brasileiro."
        );
    });
}

// Atualiza automaticamente o ano no rodapé (caso exista um elemento com id="ano")
const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}