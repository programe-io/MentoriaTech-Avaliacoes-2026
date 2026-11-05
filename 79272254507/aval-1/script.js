// Aguarda o HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // FUNCIONALIDADE 1: ALTERNADOR DE MODO ESCURO
    // ==========================================================================
    const themeButton = document.getElementById("theme-toggle");
    
    themeButton.addEventListener("click", () => {
        // Liga/Desliga a classe 'dark-mode' na tag <body>
        document.body.classList.toggle("dark-mode");
        
        // Efeito visual rápido de clique no botão
        themeButton.style.transform = "scale(0.9)";
        setTimeout(() => themeButton.style.transform = "scale(1)", 100);
    });

    // ==========================================================================
    // FUNCIONALIDADE 2: CONTADOR DINÂMICO DE TEMPO DE LEITURA
    // ==========================================================================
    const blogContent = document.getElementById("blog-content");
    const readingTimeElement = document.getElementById("reading-time");

    if (blogContent && readingTimeElement) {
        // Pega todo o texto de dentro do artigo
        const text = blogContent.innerText;
        
        // Divide o texto por espaços em branco para contar as palavras reais
        const wordsArray = text.trim().split(/\s+/);
        const wordCount = wordsArray.length;
        
        // Um adulto lê em média 200 palavras por minuto
        const wordsPerMinute = 200;
        const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
        
        // Injeta o resultado dinamicamente na página
        readingTimeElement.innerText = `⏱️ Tempo estimado de leitura: ${readingTimeMinutes} min`;
    }
});
