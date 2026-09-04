// Funcionalidade de Pesquisa em Tempo Real dos Jogos
const searchInput = document.getElementById('searchInput');
const postsGrid = document.getElementById('postsGrid');
const postCards = postsGrid.getElementsByClassName('post-card');

searchInput.addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase().trim();

    Array.from(postCards).forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        
        if (title.includes(term)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
        }
    });
});

// Mensagem interativa ao clicar nos links de leitura
const readMoreLinks = document.querySelectorAll('.read-more');

readMoreLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const postTitle = this.closest('.post-body').querySelector('h3').textContent;
        alert(`Você está abrindo o artigo completo sobre: "${postTitle}"\n(Desenvolvido por Micaely Nunes)`);
    });
});