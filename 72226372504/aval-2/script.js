// 1. Interatividade do Botão de Alternar Tema (Claro / Escuro)
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

themeToggleBtn.addEventListener('click', () => {
    // Altera a classe no body
    bodyElement.classList.toggle('dark-theme');
    
    // Altera o texto do botão visualmente
    if (bodyElement.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = '☀️ Modo Claro';
    } else {
        themeToggleBtn.textContent = '🌓 Alternar Tema';
    }
});

// 2. Interatividade nos Botões de "Ler Mais" dos artigos
const readMoreButtons = document.querySelectorAll('.btn-read');

readMoreButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Encontra o título do artigo clicado
        const articleTitle = event.target.parentElement.querySelector('h3').textContent;
        
        // Simula a abertura do artigo com um alerta customizado
        alert(`Você clicou para ler o artigo: "${articleTitle}". Em breve o conteúdo completo estará disponível!`);
    });
});
