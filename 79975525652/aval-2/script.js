document.addEventListener('DOMContentLoaded', () => {
    
    // Sistema de Curtidas (Sal de Proteção)
    const likeButtons = document.querySelectorAll('.btn-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const countSpan = button.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);
            
            if (button.classList.contains('liked')) {
                button.classList.remove('liked');
                countSpan.textContent = currentLikes - 1;
            } else {
                button.classList.add('liked');
                countSpan.textContent = currentLikes + 1;
            }
        });
    });

    // Filtros de Categoria Dinâmicos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.feed-post');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe ativa de todos e adiciona no clicado
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            posts.forEach(post => {
                const category = post.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    post.classList.remove('hidden');
                } else if (category === filterValue || category === 'all') {
                    // Posts marcados como 'all' aparecem em todas as abas (como a intro/conclusão)
                    post.classList.remove('hidden');
                } else {
                    post.classList.add('hidden');
                }
            });
        });
    });
});
