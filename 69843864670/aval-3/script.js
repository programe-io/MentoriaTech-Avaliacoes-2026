document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MENU RESPONSIVO (HAMBÚRGUER)
    // ==========================================
    const navToggle = document.querySelector('.nav-toggle');
    const appNav = document.querySelector('.app-nav');

    if (navToggle && appNav) {
        navToggle.addEventListener('click', () => {
            appNav.classList.toggle('active');
            navToggle.textContent = appNav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // ==========================================
    // 2. ABAS DE NAVEGAÇÃO DO HEADER
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            if (appNav && appNav.classList.contains('active')) {
                appNav.classList.remove('active');
                navToggle.textContent = '☰';
            }
        });
    });

    // ==========================================
    // 3. SISTEMA REUTILIZÁVEL DE CURTIDAS
    // ==========================================
    function setupLikeButton(button) {
        button.addEventListener('click', () => {
            const counterSpan = button.querySelector('.counter');
            let totalLikes = parseInt(counterSpan.textContent);

            if (button.classList.contains('active-liked')) {
                button.classList.remove('active-liked');
                counterSpan.textContent = totalLikes - 1;
            } else {
                button.classList.add('active-liked');
                counterSpan.textContent = totalLikes + 1;
                
                // Feedback visual de pulsação (Escala)
                button.style.transform = 'scale(1.2)';
                setTimeout(() => button.style.transform = 'scale(1)', 150);
            }
        });
    }

    // Inicializa os botões de curtir já existentes no HTML
    document.querySelectorAll('.like-btn').forEach(setupLikeButton);

    // ==========================================
    // 4. PUBLICAÇÃO DINÂMICA DE POSTS
    // ==========================================
    const submitBtn = document.querySelector('.submit-post-btn');
    const textarea = document.querySelector('.create-post-header textarea');
    const feedSection = document.querySelector('.social-feed');

    if (submitBtn && textarea && feedSection) {
        submitBtn.addEventListener('click', () => {
            const textContent = textarea.value.trim();

            if (textContent === "") {
                alert("Por favor, digite algo antes de publicar!");
                return;
            }

            const newPost = document.createElement('article');
            newPost.className = 'feed-post';
            newPost.innerHTML = `
                <div class="post-user-info">
                    <img src="https://picsum.photos" alt="Avatar" class="small-avatar">
                    <div>
                        <h4>Alex Silva</h4>
                        <span class="post-time">Agora mesmo • Global</span>
                    </div>
                </div>
                <p class="post-text">${textContent}</p>
                <div class="post-footer-actions">
                    <button class="interactive-btn like-btn">❤️ <span class="counter">0</span></button>
                    <button class="interactive-btn comment-btn">💬 <span class="counter">0</span></button>
                    <button class="interactive-btn share-btn">🔄 <span class="counter">0</span></button>
                </div>
            `;

            // Adiciona animação de entrada via JS
            newPost.style.opacity = '0';
            newPost.style.transform = 'translateY(-20px)';
            newPost.style.transition = 'all 0.4s ease';

            feedSection.insertBefore(newPost, feedSection.firstChild);
            
            // Força o gatilho da animação CSS no próximo frame
            requestAnimationFrame(() => {
                newPost.style.opacity = '1';
                newPost.style.transform = 'translateY(0)';
            });

            textarea.value = "";
            
            // Ativa o sistema de curtidas no novo post injetado
            const newLikeBtn = newPost.querySelector('.like-btn');
            setupLikeButton(newLikeBtn);
        });
    }

    // ==========================================
    // 5. RECURSO EXTRA: MODO ESCURO (DARK MODE)
    // ==========================================
    // Injeta dinamicamente o botão de alternância no Header para manter o HTML limpo
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
        const themeBtn = document.createElement('button');
        themeBtn.className = 'theme-toggle-btn';
        themeBtn.innerHTML = '🌙';
        themeBtn.style.cssText = 'background:none; border:none; font-size:1.3rem; cursor:pointer; padding:5px;';
        headerContainer.insertBefore(themeBtn, navToggle);

        // Verifica preferência anterior salva no navegador
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            themeBtn.innerHTML = '☀️';
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeBtn.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // ==========================================
    // 6. RECURSO EXTRA: JANELA DE CHAT FLUTUANTE
    // ==========================================
    // Cria a estrutura do chat diretamente via JavaScript com efeito Blur/Glass
    const chatContainer = document.createElement('div');
    chatContainer.className = 'floating-chat-container';
    chatContainer.innerHTML = `
        <div class="chat-header">
            <span>💬 Chat Geral</span>
            <button class="chat-minimize-btn">—</button>
        </div>
        <div class="chat-body">
            <div class="chat-message system">Bem-vindo ao chat da VibeNet!</div>
        </div>
        <div class="chat-footer">
            <input type="text" placeholder="Digite uma mensagem..." class="chat-input">
        </div>
    `;
    document.body.appendChild(chatContainer);

    // Seletores dos elementos do chat recém-criados
    const chatHeader = chatContainer.querySelector('.chat-header');
    const chatBody = chatContainer.querySelector('.chat-body');
    const chatInput = chatContainer.querySelector('.chat-input');
    const minimizeBtn = chatContainer.querySelector('.chat-minimize-btn');

    // Minimizar / Expandir a janela de conversa
    chatHeader.addEventListener('click', () => {
        chatContainer.classList.toggle('minimized');
        minimizeBtn.textContent = chatContainer.classList.contains('minimized') ? '▲' : '—';
    });

    // Envio de mensagens no chat pressionando Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            const msgText = chatInput.value.trim();
            
            const msgElement = document.createElement('div');
            msgElement.className = 'chat-message user';
            msgElement.textContent = msgText;
            
            chatBody.appendChild(msgElement);
            chatInput.value = '';
            
            // Rola automaticamente para a última mensagem
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    });
});
