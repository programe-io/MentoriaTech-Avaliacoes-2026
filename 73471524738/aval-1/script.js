// Funcionalidade de Alternar Tema (Dark Mode / Light Mode)
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});

// Validação Básica e Envio do Formulário de Contato
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede a página de recarregar
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Obrigado pelo contato, ${name}! Sua mensagem foi enviada com sucesso.`);
        contactForm.reset(); // Limpa os campos do formulário
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});
