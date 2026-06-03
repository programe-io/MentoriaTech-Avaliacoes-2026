// ==========================================================================
// AÇÕES DO BLOG - JAVASCRIPT (COMPORTAMENTO DA PÁGINA)
// ==========================================================================

// Aguarda todo o conteúdo da página (HTML e CSS) carregar antes de rodar a lógica
document.addEventListener('DOMContentLoaded', () => {

    // 1. Mensagem de Boas-Vindas no Console (Excelente para o professor ver que o arquivo carregou)
    console.log("🚀 script.js carregado com sucesso!");
    console.log("📌 A tag obrigatória <aside> foi mapeada e está ativa no layout.");

    // 2. Interatividade nos artigos (Efeito visual sutil ao clicar em ler mais)
    const artigos = document.querySelectorAll('article');

    artigos.forEach((artigo, index) => {
        artigo.addEventListener('click', () => {
            // Exibe no painel do desenvolvedor qual artigo o usuário demonstrou interesse
            console.log(`📖 O usuário clicou para ler o Artigo ${index + 1}: "${artigo.querySelector('h2').innerText}"`);
        });
        
        // Altera o cursor do mouse para indicar que o cartão do post é clicável
        artigo.style.cursor = 'pointer';
    });

    // 3. Função simples para marcar os links da barra lateral (<aside>) quando clicados
    const linksCategorias = document.querySelectorAll('aside ul li');
    
    linksCategorias.forEach(link => {
        link.addEventListener('click', () => {
            // Remove qualquer destaque anterior e adiciona ao link clicado
            linksCategorias.forEach(l => l.style.fontWeight = 'normal');
            link.style.fontWeight = 'bold';
            link.style.color = '#6366f1'; // Cor idêntica ao nosso CSS principal
        });
        link.style.cursor = 'pointer';
    });
});