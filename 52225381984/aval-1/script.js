// 1. Funcionalidade de Alternância de Tema (Modo Escuro / Claro)
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Verifica se o usuário já tinha uma preferência salva
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// 2. Interceptação e Validação do Formulário de Contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede a página de recarregar
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Simula uma resposta de sucesso enviada ao usuário
    alert(`Obrigado pelo contato, ${name}! Sua mensagem foi enviada com sucesso para análise.`);
    
    contactForm.reset(); // Limpa os campos do formulário
});
