// Aguarda o carregamento completo do documento
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links do menu de navegação
    const links = document.querySelectorAll("nav a");

    // Adiciona um evento de clique para cada link
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            // Reseta a cor de todos os links antes
            links.forEach(l => l.style.color = "white");
            
            // Aplica uma cor verde de destaque ao link clicado
            event.target.style.color = "#2ecc71"; 
        });
    });
});
