// Adiciona interação simples de curtir nos posts
document.addEventListener('DOMContentLoaded', () => {
    const likeBtns = document.querySelectorAll('.like-btn');

    likeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('fa-regular')) {
                btn.classList.remove('fa-regular', 'fa-heart');
                btn.classList.add('fa-solid', 'fa-heart');
                btn.style.color = '#ff3040';
                btn.style.transform = 'scale(1.2)';
            } else {
                btn.classList.remove('fa-solid', 'fa-heart');
                btn.classList.add('fa-regular', 'fa-heart');
                btn.style.color = 'inherit';
                btn.style.transform = 'scale(1)';
            }
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
});
