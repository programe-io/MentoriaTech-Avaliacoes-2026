const btn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Verifica se já existe uma preferência salva
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
    }
    // Salva a escolha para a próxima vez que abrir o site
    localStorage.setItem('theme', theme);
});