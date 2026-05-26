document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Interativo da Header (Nav Links)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 2. Menu Interativo Lateral Esquerdo
    const sidebarItems = document.querySelectorAll('.interactive-sidebar-menu li');
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 3. Sistema Dinâmico para Postagens (Criação de elemento <article>)
    const submitBtn = document.querySelector('.submit-btn');
    const textarea = document.querySelector('.post-input-container textarea');
    const feedSection = document.querySelector('.feed-section');

    submitBtn.addEventListener('click', () => {
        const text = textarea.value.trim();

        if (text === '') {
            alert('Insira uma mensagem para publicar!');
            return;
        }

        // Instanciação correta da tag semântica <article>
        const newArticlePost = document.createElement('article');
        newArticlePost.classList.add('post-card', 'glass-effect');
        newArticlePost.style.marginBottom = '20px';
        newArticlePost.style.animation = 'fadeInUp 0.4s ease-out forwards';

        newArticlePost.innerHTML = `
            <div class="post-header">
                <img src="https://pravatar.cc" alt="Juan Loiola">
                <div class="post-info">
                    <h3>Juan Loiola</h3>
                    <span>Agora mesmo</span>
                </div>
                <i class="fa-solid fa-ellipsis-vertical post-options-btn"></i>
            </div>
            <div class="post-body">
                <p>${text}</p>
            </div>
            <div class="post-footer">
                <button class="interaction-trigger like-btn"><i class="fa-regular fa-thumbs-up"></i> <span>Curtir</span></button>
                <button class="interaction-trigger"><i class="fa-regular fa-comment"></i> Comentar</button>
                <button class="interaction-trigger"><i class="fa-regular fa-share-from-square"></i> Compartilhar</button>
            </div>
        `;

        // Insere no início do feed
        feedSection.insertBefore(newArticlePost, feedSection.firstChild);
        textarea.value = '';

        // Ativação do evento de curtir no novo post
        bindLikeEvent(newArticlePost.querySelector('.like-btn'));
    });

    // 4. Lógica de Curtir (Toggle de Estado com Animação)
    function bindLikeEvent(button) {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            const label = button.querySelector('span');
            
            button.classList.toggle('liked');
            
            if (button.classList.contains('liked')) {
                button.style.color = '#1877f2';
                icon.className = 'fa-solid fa-thumbs-up';
                label.textContent = 'Curtido';
                button.style.transform = 'scale(1.1)';
                setTimeout(() => button.style.transform = 'none', 150);
            } else {
                button.style.color = '#65676b';
                icon.className = 'fa-regular fa-thumbs-up';
                label.textContent = 'Curtir';
            }
        });
    }

    // Inicializa curtidas existentes
    document.querySelectorAll('.like-btn').forEach(btn => bindLikeEvent(btn));
});