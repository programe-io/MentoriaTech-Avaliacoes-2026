// Sistema de contador de curtidas
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const countSpan = button.querySelector('.like-count');
        let currentLikes = parseInt(countSpan.textContent);
        currentLikes++;
        countSpan.textContent = currentLikes;
    \});
\});

// Botão para alternar o modo escuro
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');$0