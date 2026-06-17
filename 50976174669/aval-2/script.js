const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

function toggleLike(button) {
    const countSpan = button.querySelector('.like-count');
    let currentLikes = parseInt(countSpan.textContent);
    
    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        countSpan.textContent = currentLikes - 1;
    } else {
        button.classList.add('liked');
        countSpan.textContent = currentLikes + 1;
    }
}