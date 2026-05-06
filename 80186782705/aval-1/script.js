// Seleciona o elemento pelo ID
const botao = document.getElementById('btn-alerta');

// Adiciona um evento de clique
botao.addEventListener('click', () => {
    alert('Olá! O JavaScript está funcionando perfeitamente no seu projeto.');
    
    // Mudando a cor de fundo do aside como exemplo de manipulação DOM
    const aside = document.querySelector('aside');
    aside.style.backgroundColor = '#e0f7fa';
});