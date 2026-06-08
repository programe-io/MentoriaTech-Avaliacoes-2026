// Captura o botão de alternar tema do HTML
const toggleBtn = document.getElementById('theme-toggle');

// Adiciona o evento de clique para alternar o modo escuro
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Altera o texto do botão dinamicamente
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = 'Alternar Modo Claro';
    } else {
        toggleBtn.textContent = 'Alternar Modo Escuro';
    }
});
