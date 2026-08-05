// 1. BASE DE DADOS DOS ARTIGOS (JSON simulado)
        const articles = [
            {
                id: 1,
                title: "O Futuro dos Jogos em Nuvem e Consoles de Próxima Geração",
                category: "Notícias",
                desc: "Descubra como os avanços tecnológicos estão moldando as novas experiências de gameplay sem necessidade de downloads.",
                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
                date: "Há 2 horas",
                likes: 124
            },
            {
                id: 2,
                title: "Novo RPG de Ficção Científica Ganha Data de Lançamento",
                category: "Notícias",
                desc: "Com um mapa expansivo e gráficos impressionantes na Unreal Engine 5, o título chega no próximo mês.",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
                date: "Há 5 horas",
                likes: 89
            },
            {
                id: 3,
                title: "Review: Vale a pena investir no novo FPS Tático?",
                category: "Análises",
                desc: "Analisamos a fundo a jogabilidade, otimização de servidor, movimentação e o balanceamento das armas.",
                image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=600&q=80",
                date: "Ontem",
                likes: 256
            },
            {
                id: 4,
                title: "Como escolher a Placa de Vídeo ideal para seu Setup",
                category: "Hardware",
                desc: "Guia completo comparando custo-benefício, consumo energético e tecnologias como DLSS e Ray Tracing.",
                image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80",
                date: "Há 2 dias",
                likes: 310
            },
            {
                id: 5,
                title: "Teclados Mecânicos: Switches Lineares vs. Táteis",
                category: "Hardware",
                desc: "Entenda as diferenças estruturais entre os switches Red, Blue e Brown para digitação e jogos rápidos.",
                image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
                date: "Há 3 dias",
                likes: 175
            },
            {
                id: 6,
                title: "Os 10 Melhores Jogos Independentes do Ano",
                category: "eSports",
                desc: "Criatividade sem limites: confira os games indies que superaram produções AAA em narrativa.",
                image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80",
                date: "Há 4 dias",
                likes: 420
            }
        ];

        // RESTAURAR LIKES DO LOCALSTORAGE
        const userLikes = JSON.parse(localStorage.getItem('nexus_likes')) || [];

        // ESTADO DA APLICAÇÃO
        let currentFilter = 'todos';
        let searchQuery = '';

        // ELEMENTOS DOM
        const cardsContainer = document.getElementById('cards-container');
        const searchInput = document.getElementById('search-input');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const themeToggleBtn = document.getElementById('theme-toggle');
        const menuToggleBtn = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');

        // 2. FUNÇÃO DE RENDERIZAÇÃO DOS CARDS
        function renderCards() {
            cardsContainer.innerHTML = '';

            // Filtragem por Categoria e Busca
            const filtered = articles.filter(article => {
                const matchesCategory = currentFilter === 'todos' || article.category.toLowerCase() === currentFilter.toLowerCase();
                const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      article.desc.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            if (filtered.length === 0) {
                cardsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fa-solid fa-ghost fa-3x" style="margin-bottom: 10px;"></i>
                        <p>Nenhum artigo encontrado com os termos pesquisados.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(article => {
                const isLiked = userLikes.includes(article.id);
                const card = document.createElement('article');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-img-wrapper">
                        <img src="${article.image}" alt="${article.title}" loading="lazy">
                        <span class="card-category">${article.category}</span>
                        <button class="like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${article.id})">
                            <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${article.title}</h3>
                        <p class="card-desc">${article.desc}</p>
                        <div class="card-footer">
                            <span><i class="fa-regular fa-clock"></i> ${article.date}</span>
                            <span><i class="fa-solid fa-heart" style="color: #ef4444;"></i> ${article.likes + (isLiked ? 1 : 0)}</span>
                        </div>
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
        }

        // 3. SISTEMA DE CURTIR (PERSISTENTE)
        window.toggleLike = function(id) {
            const index = userLikes.indexOf(id);
            if (index === -1) {
                userLikes.push(id);
            } else {
                userLikes.splice(index, 1);
            }
            localStorage.setItem('nexus_likes', JSON.stringify(userLikes));
            renderCards();
        };

        // 4. EVENTOS DE BUSCA E FILTROS
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderCards();
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');
                currentFilter = btn.dataset.category;
                renderCards();
            });
        });

        // Navegação pelo menu superior
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.nav-item.active').classList.remove('active');
                item.classList.add('active');
                
                const category = item.dataset.section;
                currentFilter = category;
                
                // Sincroniza os botões de filtro
                filterBtns.forEach(b => {
                    b.classList.toggle('active', b.dataset.category === category);
                });

                renderCards();
                navLinks.classList.remove('open');
            });
        });

        // 5. MODO DARK / LIGHT
        const savedTheme = localStorage.getItem('nexus_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nexus_theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            const icon = themeToggleBtn.querySelector('i');
            icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }

        // 6. MENU MOBILE
        menuToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Newsletter Form
        document.getElementById('newsletter-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Obrigado por se inscrever no Nexus Gaming!');
            e.target.reset();
        });

        // Inicializar aplicação
        renderCards();