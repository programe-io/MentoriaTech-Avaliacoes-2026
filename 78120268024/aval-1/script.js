document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.textContent = '🌙';
        \} else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        \}
    \});

    const likeBtn = document.getElementById('like-btn');
    const likeCountElement = document.getElementById('like-count');
    let likes = 0;

    likeBtn.addEventListener('click', () => {
        likes++;
        likeCountElement.textContent = likes;
        
        likeBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            likeBtn.style.transform = 'none';
        \}, 100);
    \});
\});$0