document.addEventListener('DOMContentLoaded', () => {
    // --- 1. MODO ESCURO / CLARO (Dark/Light Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Aplica o tema salvo previamente
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeToggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- 2. SISTEMA DE FILTRO DE CATEGORIAS ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualiza classe ativa nos botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            postCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 3. BARRA DE PESQUISA EM TEMPO REAL ---
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        postCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // --- 4. CONTADOR DE CURTIDAS (LIKES) ---
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const countSpan = btn.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);
            
            // Simula curtir/descurtir
            if (!btn.classList.contains('liked')) {
                countSpan.textContent = currentLikes + 1;
                btn.classList.add('liked');
                btn.style.borderColor = '#ef4444';
            } else {
                countSpan.textContent = currentLikes - 1;
                btn.classList.remove('liked');
                btn.style.borderColor = 'var(--border-color)';
            }
        });
    });

    // --- 5. FORMULÁRIO DE NEWSLETTER ---
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado por se inscrever em nossa newsletter!');
        newsletterForm.reset();
    });
});