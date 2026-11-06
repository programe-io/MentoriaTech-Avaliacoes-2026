// Seleciona o botão de alternar tema
const toggleButton = document.getElementById('theme-toggle');

// Adiciona um evento de clique ao botão
toggleButton.addEventListener('click', () => {
    // Alterna a classe 'dark-mode' no corpo da página (body)
    document.body.classList.toggle('dark-mode');
});
