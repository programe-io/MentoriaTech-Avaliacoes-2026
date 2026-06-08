// 1. Seleciona o elemento h1 da página
const titulo = document.querySelector('h1');

// 2. Adiciona um evento de clique ao título
titulo.addEventListener('click', () => {
    // Altera a cor do texto para verde limão
    titulo.style.color = '#00cc66';
    
    // Exibe um alerta no navegador
    alert('Você interagiu com a página usando JavaScript!');
});
