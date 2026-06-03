// Aguarda todo o HTML carregar antes de rodar o script
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. FUNCIONALIDADE DO BOTÃO (Contador de Curtidas)
    // ==========================================
    const botao = document.querySelector("button");
    let cliques = 0;

    if (botao) {
        botao.innerText = "👍 Curtir este post (0)";
        
        botao.addEventListener("click", () => {
            cliques++;
            botao.innerText = `👍 Curtido! (${cliques})`;
            
            // Adiciona um efeito rápido de feedback visual
            botao.style.transform = "scale(1.1)";
            setTimeout(() => botao.style.transform = "scale(1)", 150);
        });
    }

    // ==========================================
    // 2. MENSAGEM DINÂMICA NO CABEÇALHO
    // ==========================================
    const headerParagraph = document.querySelector("header p");
    
    if (headerParagraph) {
        const horaAtual = new Date().getHours();
        let saudacao = "";

        if (horaAtual >= 5 && horaAtual < 12) {
            saudacao = "Bom dia! ";
        } else if (horaAtual >= 12 && horaAtual < 18) {
            saudacao = "Boa tarde! ";
        } else {
            saudacao = "Boa noite! ";
        }

        // Adiciona a saudação antes do texto original do HTML
        headerParagraph.innerText = saudacao + headerParagraph.innerText;
    }

    // ==========================================
    // 3. EFEITO NO MENU AO ROLAR A PÁGINA (Scroll)
    // ==========================================
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        // Se o usuário rolar a página mais de 50 pixels para baixo
        if (window.scrollY > 50) {
            header.style.backgroundColor = "#0f171e"; // Fica um pouco mais escuro
            header.style.transition = "background-color 0.3s ease";
        } else {
            header.style.backgroundColor = "#1a252f"; // Volta à cor original do CSS
        }
    });

});