// Aguarda a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona os elementos do HTML que vamos animar
    const card = document.querySelector('.card');
    const nameHeader = document.querySelector('h1');

    // 1. Efeito ao passar o mouse (Hover Interativo)
    card.addEventListener('mouseenter', () => {
        // Aumenta a sombra ciano, dando um efeito de "neon aceso"
        card.style.boxShadow = "0 12px 35px rgba(0, 255, 255, 0.6)";
        card.style.transform = "scale(1.02)"; // Dá um leve zoom
        card.style.transition = "all 0.3s ease"; // Deixa o movimento suave
    });

    card.addEventListener('mouseleave', () => {
        // Volta ao estado original quando o mouse sai
        card.style.boxShadow = "0 8px 24px rgba(0, 255, 255, 0.2)";
        card.style.transform = "scale(1)";
    });

    // 2. Efeito de Clique no Nome (Byel Cardoso)
    nameHeader.style.cursor = "pointer"; // Transforma o cursor em "mãozinha"
    
    nameHeader.addEventListener('click', () => {
        // Cria uma explosão rápida de cor ciano no fundo do cartão
        card.style.backgroundColor = "#004444";
        
        // Exibe uma mensagem secreta no console do navegador (F12)
        console.log("Olá, Byel! JavaScript funcionando com sucesso. 🚀");

        // Depois de 300 milissegundos (0.3 segundos), volta à cor escura normal
        setTimeout(() => {
            card.style.backgroundColor = "#1e1e1e";
        }, 300);
    });
});