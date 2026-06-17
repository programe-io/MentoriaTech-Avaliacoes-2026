// 1. Sistema de Curtidas dos Artigos
const botoes = document.querySelectorAll('.btn-curtir');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const contador = botao.querySelector('span');
        // Soma +1 ao número atual
        let totalCurtidas = parseInt(contador.textContent);
        contador.textContent = totalCurtidas + 1;
        
        // Efeito visual rápido ao clicar
        botao.style.transform = 'scale(0.95)';
        setTimeout(() => {
            botao.style.transform = 'scale(1)';
        }, 100);
    });
});

// 2. Destacar Categoria Ativa no Menu (Nav)
const linksMenu = document.querySelectorAll('nav a');

linksMenu.forEach(link => {
    link.addEventListener('click', (event) => {
        // Remove o destaque de todos os links
        linksMenu.forEach(l => l.style.color = '#45f3ff');
        
        // Adiciona a cor branca neon no link clicado
        event.target.style.color = '#fff';
    });
});
