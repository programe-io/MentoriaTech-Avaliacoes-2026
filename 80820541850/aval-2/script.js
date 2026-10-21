// Função para curtir/descurtir
function toggleLike(btn) {
    const countSpan = btn.querySelector('.count');
    let count = parseInt(countSpan.textContent);
    const isLiked = btn.classList.contains('liked');

    if (isLiked) {
        btn.classList.remove('liked');
        btn.innerHTML = '🤍 <span class="count">' + (count - 1) + '</span>';
    } else {
        btn.classList.add('liked');
        btn.innerHTML = '❤️ <span class="count">' + (count + 1) + '</span>';
    }
}

// Navegação ativa
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});