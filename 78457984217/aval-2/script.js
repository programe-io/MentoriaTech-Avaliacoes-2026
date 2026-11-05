// Aguarda o carregamento completo do documento
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links dentro do menu de navegação
    const links = document.querySelectorAll("nav a");

    // Adiciona um evento de clique para cada link
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            // Remove o destaque de todos os outros links antes
            links.forEach(l => l.style.color = "white");
            
            // Aplica uma nova cor temporária ao link clicado
            event.target.style.color = "#2ecc71"; // Verde claro
        });
    });
});
