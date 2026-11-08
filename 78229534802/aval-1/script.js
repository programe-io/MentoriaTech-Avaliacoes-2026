// Seleciona todos os cartões da página
const cartoes = document.querySelectorAll('.card');

// Adiciona um evento de clique para cada um deles
cartoes.forEach(cartao => {
    cartao.addEventListener('click', () => {
        // Remove o destaque de qualquer outro cartão que já esteja ativo
        cartoes.forEach(c => c.style.transform = 'scale(1)');
        
        // Aplica um efeito de zoom sutil no cartão clicado
        cartao.style.transform = 'scale(1.05)';
        cartao.style.transition = 'transform 0.3s ease';
        
        // Pega o texto do título (h3) de dentro do cartão clicado
        const titulo = cartao.querySelector('h3').innerText;
        
        // Exibe uma mensagem dinâmica na tela
        alert(`Você selecionou o módulo de: ${titulo}!`);
    });
});
