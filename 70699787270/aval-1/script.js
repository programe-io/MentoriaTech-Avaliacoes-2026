// Seleciona o botão de alterar tema e o corpo da página
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

// Adiciona um evento de clique para alternar entre o modo claro e o escuro
themeToggleBtn.addEventListener('click', () => {
    // Verifica qual é o tema atual através do atributo 'data-theme' no elemento <body>
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        // Altera para o modo escuro
        body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Modo Claro';
    } else {
        // Altera para o modo claro
        body.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '🌙 Modo Escuro';
    }
});