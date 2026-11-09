<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clone Instagram (Dinamizado com JS)</title>
    <!-- Adição do pacote de ícones Boxicons -->
    <link href="https://unpkg.com" rel="stylesheet">
    
    <style>
        /* Estilização Geral do Projeto (CSS anterior) */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        body {
            min-height: 100vh;
            background-color: #f3f4f6;
            color: #0f172a;
        }

        .app-header {
            position: sticky;
            top: 0;
            z-index: 50;
            background-color: #ffffff;
            border-bottom: 1px solid #e5e7eb;
        }

        .header-container {
            max-width: 1024px;
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 3.5rem;
        }

        .logo {
            font-size: 1.25rem;
            font-weight: 600;
        }

        .menu-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: inherit;
        }

        .app-main {
            max-width: 1024px;
            margin-left: auto;
            margin-right: auto;
            padding-top: 1rem;
            padding-bottom: 5rem;
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .main-layout {
            display: flex;
            gap: 2rem;
        }

        .feed-container {
            flex: 1 1 0%;
            max-width: 32rem;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
        }

        /* Seção de Stories */
        .stories-section {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            gap: 1rem;
            overflow-x: auto;
            scrollbar-width: none; 
        }
        .stories-section::-webkit-scrollbar {
            display: none;
        }

        .story-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
            cursor: pointer;
        }

        .circle-container {
            border-radius: 50%;
            background-color: #f3f4f6;
            padding: 0.125rem;
        }

        .circle-lg {
            width: 4rem;
            height: 4rem;
        }

        .circle-inner-border {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #ffffff;
            padding: 0.125rem;
        }

        .gradient-border {
            background: linear-gradient(to bottom right, #ec4899, #ef4444, #eab308);
        }

        .circle-bg-gray {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .plus-sign {
            font-size: 1.5rem;
            color: #6b7280;
            font-weight: 300;
        }

        .story-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }

        .story-name {
            font-size: 0.75rem;
            margin-top: 0.25rem;
            width: 4rem;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Estrutura do Feed de Posts */
        .post-card {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }

        .post-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem;
        }

        .post-author-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .circle-md {
            width: 2.5rem;
            height: 2.5rem;
        }

        .author-details {
            display: flex;
            flex-direction: column;
        }

        .author-name {
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
        }
        .author-name:hover {
            text-decoration: underline;
        }

        .author-location {
            font-size: 0.75rem;
            color: #6b7280;
        }

        .post-options-btn {
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #4b5563;
            cursor: pointer;
        }

        .post-media-placeholder {
            background-color: #f9fafb;
            aspect-ratio: 1 / 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #9ca3af;
            font-size: 0.875rem;
            border-top: 1px solid #f3f4f6;
            border-bottom: 1px solid #f3f4f6;
        }

        .sidebar-aside {
            display: none;
            width: 18rem;
            flex-shrink: 0;
        }

        @media (min-width: 768px) {
            .sidebar-aside {
                display: block;
            }
        }
    </style>
</head>
<body>

    <!-- Cabeçalho -->
    <header class="app-header">
        <div class="header-container">
            <div class="header-content">
                <h1 class="logo">Instagram</h1>
                <button class="menu-btn">
                    <i class="bx bx-menu"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- Conteúdo principal -->
    <main class="app-main">
        <div class="main-layout">
            
            <!-- Feed Container -->
            <div class="feed-container">
                
                <!-- ID inserido para o JS injetar os Stories -->
                <section class="stories-section" id="stories-root">
                    <!-- O botão estático de "+ Adicionar Story" fica fixo no início -->
                    <div class="story-item">
                        <div class="circle-container circle-lg">
                            <div class="circle-inner-border">
                                <div class="circle-bg-gray">
                                    <span class="plus-sign">+</span>
                                </div>
                            </div>
                        </div>
                        <span class="story-name">Seu story</span>
                    </div>
                </section>

                <!-- ID inserido para o JS injetar as Postagens -->
                <div id="feed-root"></div>

            </div>

            <!-- Coluna Lateral -->
            <aside class="sidebar-aside"></aside>

        </div>
    </main>

    <!-- Arquivo ou tag de Script JavaScript -->
    <script>
        // 1. Banco de dados simulado (Array de Objetos)
        const usuarios = [
            { id: 1, nome: 'João', localizacao: 'São Paulo, Brazil', avatar: 'https://unsplash.com' },
            { id: 2, nome: 'Maria', localizacao: 'Rio de Janeiro, Brazil', avatar: 'https://unsplash.com' },
            { id: 3, nome: 'Pedro', localizacao: 'Lisboa, Portugal', avatar: 'https://unsplash.com' },
            { id: 4, nome: 'Ana_silva', localizacao: 'Buenos Aires, Argentina', avatar: 'https://unsplash.com' },
            { id: 5, nome: 'lucas_dev', localizacao: 'California, USA', avatar: 'https://unsplash.com' }
        ];

        // 2. Elementos de ancoragem capturados do HTML
        const storiesRoot = document.getElementById('stories-root');
        const feedRoot = document.getElementById('feed-root');

        // 3. Função para Renderizar os Stories dinamicamente
        function renderizarStories() {
            usuarios.forEach(usuario => {
                // Criação do elemento estrutural do story
                const storyDiv = document.createElement('div');
                storyDiv.classList.add('story-item');

                // Montagem da estrutura HTML interna com Template Literals
                storyDiv.innerHTML = `
                    <div class="circle-container circle-lg">
                        <div class="circle-inner-border gradient-border">
                            <div class="circle-inner-border">
                                <img src="${usuario.avatar}" alt="${usuario.nome}" class="story-img">
                            </div>
                        </div>
                    </div>
                    <span class="story-name">${usuario.nome}</span>
                `;

                // Adiciona o elemento criado dentro da seção de stories
                storiesRoot.appendChild(storyDiv);
            });
        }

        // 4. Função para Renderizar o Feed de Postagens dinamicamente
