// Seleciona o botão de alternar tema pelo ID
const themeBtn = document.getElementById('theme-btn');

// Adiciona o evento de clique ao botão
themeBtn.addEventListener('click', () => {
    // Alterna a classe 'dark-mode' no elemento body
    document.body.classList.toggle('dark-mode');
});
