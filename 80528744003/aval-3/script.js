<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instagram Clone - Apenas JS</title>
</head>
<body>
    <script>
        // ==========================================================================
        // 1. INJEÇÃO DE ESTILOS GERAIS (CSS dinâmico criado via JS)
        // ==========================================================================
        const style = document.createElement('style');
        style.textContent = `
            * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            body { background-color: #fafafa; color: #262626; padding-top: 60px; }
            .container { max-width: 935px; margin: 0 auto; width: 100%; padding: 0 20px; }
            
            /* Navbar */
            .navbar { position: fixed; top: 0; left: 0; right: 0; height: 60px; background: #fff; border-bottom: 1px solid #dbdbdb; display: flex; align-items: center; z-index: 1000; }
            .nav-content { display: flex; justify-content: space-between; align-items: center; width: 100%; }
            .logo { font-size: 22px; font-weight: bold; font-style: italic; cursor: pointer; }
            .nav-icons { display: flex; gap: 22px; font-size: 22px; cursor: pointer; }
            
            /* Feed */
            .feed-container { max-width: 614px; margin: 30px auto; }
            .post-card { background: #fff; border: 1px solid #dbdbdb; border-radius: 8px; margin-bottom: 24px; }
            .post-header { display: flex; align-items: center; padding: 14px 16px; gap: 10px; font-weight: 600; }
            .post-avatar { width: 32px; height: 32px; border-radius: 50%; background: #eee; display: flex; align-items: center; justify-content: center; border: 1px solid #dbdbdb; }
            .post-img { width: 100%; height: 450px; display: flex; align-items: center; justify-content: center; font-size: 48px; color: white; cursor: pointer; }
            .post-actions { padding: 12px 16px 0; display: flex; gap: 16px; font-size: 24px; cursor: pointer; }
            .post-info { padding: 12px 16px; font-size: 14px; }
            .liked { color: #ed4956; animation: pop 0.3s ease-in-out; }
            
            /* Perfil (Grid) */
            .profile-header { display: flex; align-items: center; gap: 60px; padding: 40px 0; border-bottom: 1px solid #dbdbdb; }
            .profile-pic { width: 150px; height: 150px; border-radius: 50%; background: linear-gradient(45deg, #f09433, #dc2743, #cc2366); padding: 4px; }
            .profile-pic-inner { width: 100%; height: 100%; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 60px; }
            .profile-stats { display: flex; gap: 40px; list-style: none; margin: 15px 0; }
            .grid-posts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 30px; }
            .grid-item { aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center; font-size: 42px; color: white; border-radius: 4px; cursor: pointer; position: relative; }
            .grid-item:hover::after { content: '❤️ View'; position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:bold; }

            @keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
            @media (max-width: 735px) { .profile-header { gap: 20px; flex-direction: column; text-align: center; } .grid-posts { gap: 3px; } }
        `;
        document.head.appendChild(style);

        // ==========================================================================
        // 2. BANCO DE DADOS FICTÍCIO (Estado da Aplicação)
        // ==========================================================================
        const state = {
            user: { username: "js_developer", name: "JavaScript Master", bio: "Construindo o DOM elemento por elemento. 🚀", followers: "45.2k", following: "512" },
            posts: [
                { id: 1, author: "js_developer", avatar: "👨‍💻", emoji: "🔥", color: "linear-gradient(45deg, #ff9a9e, #fecfef)", likes: 1042, caption: "Programando sistemas reativos puramente no Client-Side!", liked: false },
                { id: 2, author: "web_designer", avatar: "🎨", emoji: "🌈", color: "linear-gradient(120deg, #84fab0, #8fd3f4)", likes: 824, caption: "Gradientes modernos aplicados dinamicamente. Curtiram?", liked: false },
                { id: 3, author: "code_coffee", avatar: "☕", emoji: "⚡", color: "linear-gradient(to top, #a18cd1, #fbc2eb)", likes: 2150, caption: "Café + JS = Código limpo de madrugada.", liked: false }
            ]
        };

        // ==========================================================================
        // 3. COMPONENTES DE INTERFACE (Renderizadores JS)
        // ==========================================================================
        const root = document.body;

        // Renderiza a estrutura básica fixa (Navbar e Main Container)
        root.innerHTML = `
            <header class="navbar">
                <div class="container nav-content">
                    <div class="logo" id="navLogo">Instagram</div>
                    <div class="nav-icons">
                        <span id="btnHome">🏠</span>
                        <span id="btnProfile">👤</span>
                    </div>
                </div>
            </header>
            <main class="container" id="mainContent"></main>
        `;

        const mainContent = document.getElementById('mainContent');

        // Função para Renderizar a Tela de Feed
        function renderFeed() {
            mainContent.innerHTML = `<div class="feed-container"></div>`;
            const feedContainer = mainContent.querySelector('.feed-container');

            state.posts.forEach(post => {
                const postCard = document.createElement('article');
                postCard.className = 'post-card';
                postCard.innerHTML = `
                    <div class="post-header">
                        <div class="post-avatar">${post.avatar}</div>
                        <span>${post.author}</span>
                    </div>
                    <div class="post-img" style="background: ${post.color}">${post.emoji}</div>
                    <div class="post-actions">
                        <span class="like-heart ${post.liked ? 'liked' : ''}">${post.liked ? '❤️' : '🤍'}</span>
                        <span>💬</span>
                        <span>✈️</span>
                    </div>
                    <div class="post-info">
                        <p style="font-weight: bold; margin-bottom: 6px;"><span class="likes-count">${post.likes}</span> curtidas</p>
                        <p><span style="font-weight: bold; margin-right: 5px;">${post.author}</span>${post.caption}</p>
                    </div>
                `;

                // Evento de Clique Duplo na Imagem (Like estilo nativo) ou no Coração
                const heartIcon = postCard.querySelector('.like-heart');
                const likesCount = postCard.querySelector('.likes-count');
                
                const toggleLike = () => {
                    post.liked = !post.liked;
                    post.likes += post.liked ? 1 : -1;
                    heartIcon.textContent = post.liked ? '❤️' : '🤍';
                    heartIcon.classList.toggle('liked', post.liked);
                    likesCount.textContent = post.likes;
                };

                heartIcon.addEventListener('click', toggleLike);
                postCard.querySelector('.post-img').addEventListener('dblclick', toggleLike);

                feedContainer.appendChild(postCard);
            });
        }

        // Função para Renderizar a Tela de Perfil
        function renderProfile() {
            mainContent.innerHTML = `
                <header class="profile-header">
                    <div class="profile-pic"><div class="profile-pic-inner">👨‍💻</div></div>
                    <div>
                        <h2 style="font-size: 28px; font-weight: 300;">${state.user.username}</h2>
                        <ul class="profile-stats">
                            <li><strong>${state.posts.length}</strong> publicações</li>
                            <li><strong>${state.user.followers}</strong> seguidores</li>
                            <li><strong>${state.user.following}</strong> seguindo</li>
                        </ul>
                        <div>
                            <h1 style="font-size: 16px; font-weight: 600;">${state.user.name}</h1>
                            <p style="margin-top: 4px; color: #8e8e8e;">${state.user.bio}</p>
                        </div>
                    </div>
                </header>
                <section class="grid-posts" id="profileGrid"></section>
            `;

            const profileGrid = document.getElementById('profileGrid');
            state.posts.forEach(post => {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                gridItem.style.background = post.color;
                gridItem.textContent = post.emoji;
                
                // Clicar no post do perfil leva você de volta ao feed naquele post
                gridItem.addEventListener('click', renderFeed);
                
                profileGrid.appendChild(gridItem);
            });
        }

        // ==========================================================================
        // 4. ROTEAMENTO INTERNO E INICIALIZAÇÃO
        // ==========================================================================
