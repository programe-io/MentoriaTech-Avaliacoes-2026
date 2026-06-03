// Seleciona o botão de alternar tema
const themeToggleBtn = document.getElementById('theme-toggle');

// Verifica se o usuário já tinha uma preferência salva no navegador
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

// Adiciona o evento de clique
themeToggleBtn.addEventListener('click', () => {
    // Verifica o tema atual
    let theme = document.documentElement.getAttribute('data-theme');
    
    // Alterna entre light e dark
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Salva a escolha
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Salva a escolha
    }
});