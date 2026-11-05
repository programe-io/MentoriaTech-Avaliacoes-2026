// Espera a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. FUNCIONALIDADE: Barra de Progresso de Leitura
    const barraProgresso = document.getElementById("barra-progresso");

    window.addEventListener("scroll", () => {
        // Calcula o quanto o usuário scrollou em pixels
        const pixelsScrollados = document.documentElement.scrollTop;
        // Calcula a altura máxima scrollável da página
        const alturaMaximaContudo = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Transforma em porcentagem (0 a 100)
        const porcentagemLida = (pixelsScrollados / alturaMaximaContudo) * 100;
        
        // Aplica a largura na barra do topo
        barraProgresso.style.width = `${porcentagemLida}%`;
    });

    // 2. FUNCIONALIDADE: Alternador de Modo Escuro (Dark Mode)
    const botaoDarkMode = document.getElementById("janela-toggle-dark");
    
    botaoDarkMode.addEventListener("click", () => {
        // Liga/Desliga a classe 'dark-mode' no corpo do HTML
        document.body.classList.toggle("dark-mode");
    });

    // 3. FUNCIONALIDADE: Efeito visual ao passar o mouse nos tópicos (H2)
    const titulosDestaque = document.querySelectorAll("h2");
    
    titulosDestaque.forEach(titulo => {
        titulo.style.transition = "transform 0.2s ease, color 0.2s ease";
        
        titulo.addEventListener("mouseenter", () => {
            titulo.style.transform = "translateX(10px)";
        });
        
        titulo.addEventListener("mouseleave", () => {
            titulo.style.transform = "translateX(0px)";
        });
    });
});
