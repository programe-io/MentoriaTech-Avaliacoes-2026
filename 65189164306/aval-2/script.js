document.addEventListener('DOMContentLoaded', () => {

    // 1. SISTEMA DE FILTRO DINÂMICO DE CATEGORIAS
    const filterItems = document.querySelectorAll('.nav-item');
    const posts = document.querySelectorAll('.post-card');

    filterItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Alterar aba ativa no menu
            filterItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const filterValue = item.getAttribute('data-filter');

            // Filtrar os posts com uma animação simples
            posts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                if (filterValue === 'all' || postCategory === filterValue) {
                    post.style.display = 'block';
                    setTimeout(() => post.style.opacity = '1', 50);
                } else {
                    post.style.opacity = '0';
                    post.style.display = 'none';
                }
            });
        });
    });

    // 2. SISTEMA INTERATIVO DE LIKES
    const likeButtons = document.querySelectorAll('.btn-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = this.querySelector('.like-count');
            let currentLikes = parseInt(countSpan.textContent);
            
            // Simulação simples de dar/remover like
            if (!this.classList.contains('liked')) {
                this.classList.add('liked');
                countSpan.textContent = currentLikes + 1;
                this.style.borderColor = '#9e0c0c';
                this.style.color = '#9e0c0c';
            } else {
                this.classList.remove('liked');
                countSpan.textContent = currentLikes - 1;
                this.style.borderColor = '#262626';
                this.style.color = 'white';
            }
        });
    });

    // 3. ADICIONAR COMENTÁRIOS VIA FORMULÁRIO (DINÂMICO)
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('comment-name');
        const textInput = document.getElementById('comment-text');

        // Criar a estrutura do novo comentário
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        newComment.innerHTML = `
            <h4>${escapeHTML(nameInput.value)} <span class="comment-time">Agora mesmo</span></h4>
            <p>${escapeHTML(textInput.value)}</p>
        `;

        // Adicionar ao topo da lista de comentários
        commentsList.insertBefore(newComment, commentsList.firstChild);

        // Limpar os campos
        nameInput.value = '';
        textInput.value = '';
    });

    // Função de segurança básica para evitar injeção de código nos comentários
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // 4. TRUQUE DE MENTALISMO AVANÇADO (LEITURA DE MENTE INCONSCIENTE)
    const btnTruque = document.getElementById('btn-truque-avancado');
    const loader = document.getElementById('loader');
    const resultado = document.getElementById('resultado-truque');

    btnTruque.addEventListener('click', () => {
        btnTruque.classList.add('hidden');
        loader.classList.remove('hidden');
        resultado.classList.add('hidden');

        setTimeout(() => {
            loader.classList.add('hidden');
            btnTruque.classList.remove('hidden');
            btnTruque.textContent = "Tentar de novo";
            
            // O truque psicológico baseia-se no facto de que "Vermelho" é estatisticamente a cor mais escolhida neste contexto.
            resultado.innerHTML = `Jane deduziu: Você pensou na cor <span style="color:#9e0c0c; font-weight:bold;">VERMELHO</span>!<br><small>Se acertei, foi psicologia. Se errei, você tentou enganar o sistema de propósito.</small>`;
            resultado.classList.remove('hidden');
        }, 2000);
    });

    // 5. CAIXA DE SUBSCRIÇÃO DA NEWSLETTER
    const btnNewsletter = document.getElementById('btn-newsletter');
    const emailInput = document.getElementById('newsletter-email');

    btnNewsletter.addEventListener('click', () => {
        if(emailInput.value.includes('@')) {
            alert(`Acesso concedido. O terminal ${emailInput.value} agora receberá relatórios confidenciais da CBI.`);
            emailInput.value = '';
            
            // Incrementa o contador de subscritores de forma simulada
            const counter = document.getElementById('counter-val');
            counter.textContent = parseInt(counter.textContent) + 1;
        } else {
            alert('Por favor, introduza um e-mail de agente válido.');
        }
    });
});
