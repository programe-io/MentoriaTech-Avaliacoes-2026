// Função para o botão de curtir
function curtirPost(botao) {
    const contador = botao.querySelector('.count');
    let totalCurtidas = parseInt(contador.innerText);
    totalCurtidas++;
    contador.innerText = totalCurtidas;
    
    // Efeito de clique rápido
    botao.style.transform = 'scale(1.1)';
    setTimeout(() => {
        botao.style.transform = 'scale(1)';
    }, 100);
}