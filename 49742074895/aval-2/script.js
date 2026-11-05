const StorageManager = {
    get(key, defaultValue) {
        try {
            const data = localStorage.getItem(`teyvat_${key}`);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error("Erro ao ler localStorage:", e);
            return defaultValue;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(`teyvat_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error("Erro ao salvar localStorage:", e);
        }
    },
    getSession(key, defaultValue) {
        try {
            const data = sessionStorage.getItem(`teyvat_${key}`);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },
    setSession(key, value) {
        try {
            sessionStorage.setItem(`teyvat_${key}`, JSON.stringify(value));
        } catch (e) {}
    }
};const MusicManager = {
    audio: null,
    isPlaying: false,
    init() {
        // Objeto de áudio simulado/licenciado (evitando links protegidos diretos quebrados)
        this.audio = new Audio('https://ia801504.us.archive.org/3/items/genshin-impact-theme-song/Genshin%20Impact%20Theme.mp3');
        this.audio.loop = true;
        this.audio.volume = StorageManager.get('audio_volume', 0.4);

        const savedState = StorageManager.get('audio_playing', false);
        if (savedState) {
            // Navegadores exigem interação do usuário antes de dar play automático
        }
    },
    togglePlay() {
        if (!this.audio) return;
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            StorageManager.set('audio_playing', false);
            this.updateUI('Áudio: Pausado');
            App.showToast('Trilha sonora pausada.');
        } else {
            this.audio.play().then(() => {
                this.isPlaying = true;
                StorageManager.set('audio_playing', true);
                this.updateUI('Áudio: Reproduzindo');
                App.showToast('Trilha sonora ativada.');
            }).catch(e => {
                App.showToast('Interação necessária para reproduzir áudio.');
            });
        }
    },
    setVolume(val) {
        if (this.audio) {
            this.audio.volume = val;
            StorageManager.set('audio_volume', val);
        }
    },
    updateUI(text) {
        const textSpan = document.getElementById('audio-status-text');
        if (textSpan) textSpan.textContent = text;
    }
};const IntroManager = {
    init(onComplete) {
        const introSeen = StorageManager.getSession('intro_seen', false);
        const overlay = document.getElementById('intro-overlay');

        if (introSeen) {
            overlay.classList.add('hidden');
            document.getElementById('app-wrapper').classList.remove('hidden');
            onComplete();
            return;
        }

        this.createSnowParticles();

        document.getElementById('btn-awaken').addEventListener('click', () => {
            this.finishIntro(overlay, onComplete);
        });

        document.getElementById('btn-skip-intro').addEventListener('click', () => {
            this.finishIntro(overlay, onComplete);
        });

        // Auto fechar cinematográfico opcional após 7 segundos se o usuário não clicar
        setTimeout(() => {
            if (!overlay.classList.contains('hidden')) {
                // Mantém visível para o usuário interagir, respeitando diretrizes
            }
        }, 7000);
    },
    createSnowParticles() {
        const container = document.getElementById('intro-snow');
        if (!container) return;
        for (let i = 0; i < 40; i++) {
            const flake = document.createElement('div');
            flake.classList.add('snow-flake');
            flake.style.left = `${Math.random() * 100}vw`;
            flake.style.top = `${Math.random() * -20}vh`;
            const size = Math.random() * 6 + 2;
            flake.style.width = `${size}px`;
            flake.style.height = `${size}px`;
            flake.style.animationDuration = `${Math.random() * 5 + 3}s`;
            flake.style.animationDelay = `${Math.random() * 3}s`;
            container.appendChild(flake);
        }
    },
    finishIntro(overlay, onComplete) {
        overlay.classList.add('fade-out');
        StorageManager.setSession('intro_seen', true);
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.getElementById('app-wrapper').classList.remove('hidden');
            if (onComplete) onComplete();
        }, 1200);
    }
};const ProfileManager = {
    profileData: {
        name: "Marcos Henrique",
        handle: "@marcoshenrique",
        bio: "Um observador de Teyvat. Interessado nas verdades esquecidas, nos mistérios de Celestia e nas entidades que governam os princípios fundamentais deste mundo.",
        avatar: "./assets/images/avatar-marcos.jpg"
    },
    init() {
        const saved = StorageManager.get('user_profile', null);
        if (saved) {
            this.profileData = saved;
        }
        this.renderProfile();

        // Eventos do Modal de Edição
        document.getElementById('btn-open-edit-profile').addEventListener('click', () => this.openModal());
        document.getElementById('btn-close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('btn-save-profile').addEventListener('click', () => this.saveProfile());
        document.getElementById('btn-share-profile').addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            App.showToast('Link do perfil copiado para a área de transferência!');
        });
    },
    renderProfile() {
        document.getElementById('profile-view-name').textContent = this.profileData.name;
        document.getElementById('profile-view-handle').textContent = this.profileData.handle;
        document.getElementById('profile-view-bio').textContent = `"${this.profileData.bio}"`;
        document.getElementById('header-user-name').textContent = this.profileData.name;
        
        const avatarEls = [document.getElementById('header-user-avatar'), document.getElementById('profile-view-avatar')];
        avatarEls.forEach(el => {
            if (el) el.src = this.profileData.avatar;
        });
    },
    openModal() {
        document.getElementById('edit-name-input').value = this.profileData.name;
        document.getElementById('edit-bio-input').value = this.profileData.bio;
        document.getElementById('edit-avatar-input').value = this.profileData.avatar;
        document.getElementById('modal-edit-profile').classList.remove('hidden');
    },
    closeModal() {
        document.getElementById('modal-edit-profile').classList.add('hidden');
    },
    saveProfile() {
        const name = document.getElementById('edit-name-input').value.trim();
        const bio = document.getElementById('edit-bio-input').value.trim();
        const avatar = document.getElementById('edit-avatar-input').value.trim();

        if (name) this.profileData.name = name;
        if (bio) this.profileData.bio = bio;
        if (avatar) this.profileData.avatar = avatar;

        StorageManager.set('user_profile', this.profileData);
        this.renderProfile();
        this.closeModal();
        App.showToast('Perfil atualizado com sucesso!');
    }
};const FeedManager = {
    users: [
        { name: "Aether_Observador", handle: "@aether_obs", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", bio: "Especialista em história antiga de Teyvat." },
        { name: "LumineCelestial", handle: "@lumine_celestial", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", bio: "Princípios Celestiais e Celestia." },
        { name: "AbyssScholar", handle: "@abyss_scholar", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", bio: "Pesquisador do Abismo e Khaenri'ah." },
        { name: "FrostMoon", handle: "@frost_moon", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", bio: "Investigadora da Tsaritsa e dos Fatui." },
        { name: "IstarothArchive", handle: "@kairos_time", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", bio: "Arquivista do Tempo e Enkanomiya." },
        { name: "DeathWhisper", handle: "@ronova_watcher", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", bio: "Estudioso da Sombra da Morte." }
    ],
    defaultPosts: [
        {
            id: 1,
            author: "Aether_Observador",
            handle: "@aether_obs",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            category: "Celestia",
            content: "A verdadeira natureza de Celestia permanece oculta sob a barreira do Firmamento. As evidências em Enkanomiya sugerem que o céu falso foi erguido após a guerra contra os Dragões Soberanos.",
            timestamp: "Há 2 horas",
            likes: 42,
            liked: false
        },
        {
            id: 2,
            author: "AbyssScholar",
            handle: "@abyss_scholar",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
            category: "Khaenri'ah",
            content: "Sobre a Catástrofe de 500 anos atrás: os habitantes de sangue puro de Khaenri'ah não possuíam o favor dos Arcontes, o que atraiu a ira implacável de Celestia e a imposição da maldição.",
            timestamp: "Há 5 horas",
            likes: 89,
            liked: true
        },
        {
            id: 3,
            author: "DeathWhisper",
            handle: "@ronova_watcher",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
            category: "Ronova & Morte",
            content: "Ronova, a Regente da Morte, estabeleceu termos rígidos com Xbalanque em Natlan. O preço da morte é inexorável. Nenhuma alma escapa sem pagar o tributo às Linhas Ley.",
            timestamp: "Há 1 dia",
            likes: 134,
            liked: false
        }
    ],
    posts: [],
    currentFilter: 'all',
    currentSort: 'recent',

    init() {
        this.posts = StorageManager.get('community_posts', this.defaultPosts);
        this.renderFeed();
        this.initEvents();
    },

    initEvents() {
        document.getElementById('btn-submit-post').addEventListener('click', () => {
            const content = document.getElementById('new-post-content').value.trim();
            const category = document.getElementById('new-post-category').value;
            if (!content) {
                App.showToast('Escreva o conteúdo da publicação.');
                return;
            }

            const profile = ProfileManager.profileData;
            const newPost = {
                id: Date.now(),
                author: profile.name,
                handle: profile.handle,
                avatar: profile.avatar,
                category: category,
                content: content,
                timestamp: "Agora mesmo",
                likes: 0,
                liked: false
            };

            this.posts.unshift(newPost);
            StorageManager.set('community_posts', this.posts);
            document.getElementById('new-post-content').value = '';
            this.renderFeed();
            App.showToast('Investigação publicada com sucesso!');
        });

        // Filtros por categoria
        document.querySelectorAll('.filter-chips .chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.getAttribute('data-filter');
                this.renderFeed();
            });
        });

        document.getElementById('feed-sort-select').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderFeed();
        });
    },

    renderFeed() {
        const container = document.getElementById('community-feed-list');
        const userPostsContainer = document.getElementById('user-posts-list');
        if (!container) return;

        let filtered = [...this.posts];
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentFilter);
        }

        if (this.currentSort === 'popular') {
            filtered.sort((a, b) => b.likes - a.likes);
        } else {
            filtered.sort((a, b) => b.id - a.id);
        }

        container.innerHTML = filtered.map(post => this.generatePostHTML(post)).join('');

        // Renderizar posts do usuário na aba Perfil também
        if (userPostsContainer) {
            const myProfileName = ProfileManager.profileData.name;
            const myPosts = this.posts.filter(p => p.author === myProfileName);
            userPostsContainer.innerHTML = myPosts.length ? myPosts.map(p => this.generatePostHTML(p)).join('') : '<p class="text-muted">Nenhuma publicação realizada por você ainda.</p>';
        }

        this.bindPostActions();
    },

    generatePostHTML(post) {
        return `
            <div class="card-glass post-card" data-id="${post.id}">
                <div class="post-header">
                    <div class="post-author-info">
                        <img src="${post.avatar}" alt="${post.author}" class="post-author-avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'">
                        <div>
                            <div class="post-author-name">${post.author}</div>
                            <div class="post-author-handle">${post.handle} • <span class="tag-celestial">${post.category}</span></div>
                        </div>
                    </div>
                    <span class="post-timestamp">${post.timestamp}</span>
                </div>
                <div class="post-body">
                    <p>${post.content}</p>
                </div>
                <div class="post-footer-actions">
                    <button class="post-action-btn like-btn ${post.liked ? 'active' : ''}" data-id="${post.id}">
                        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span>${post.likes} Curtidas</span>
                    </button>
                    <button class="post-action-btn comment-btn" data-id="${post.id}">
                        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        <span>Comentar</span>
                    </button>
                    <button class="post-action-btn share-btn" data-id="${post.id}">
                        <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        <span>Compartilhar</span>
                    </button>
                </div>
            </div>
        `;
    },

    bindPostActions() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number(e.currentTarget.getAttribute('data-id'));
                const post = this.posts.find(p => p.id === id);
                if (post) {
                    if (post.liked) {
                        post.likes--;
                        post.liked = false;
                    } else {
                        post.likes++;
                        post.liked = true;
                    }
                    StorageManager.set('community_posts', this.posts);
                    this.renderFeed();
                }
            });
        });

        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(window.location.href);
                App.showToast('Link da publicação copiado!');
            });
        });

        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                App.showToast('Sistema de comentários em desenvolvimento (Simulado).');
            });
        });
    }
};const RonovaManager = {
    init() {
        // Inicializações e partículas da aba Ronova
        this.createAshParticles();
    },
    createAshParticles() {
        const container = document.getElementById('ronova-ash');
        if (!container) return;
        for (let i = 0; i < 25; i++) {
            const ash = document.createElement('div');
            ash.style.position = 'absolute';
            ash.style.background = '#ff4d4d';
            ash.style.borderRadius = '50%';
            ash.style.pointerEvents = 'none';
            ash.style.left = `${Math.random() * 100}vw`;
            ash.style.top = `${Math.random() * 100}vh`;
            const size = Math.random() * 4 + 2;
            ash.style.width = `${size}px`;
            ash.style.height = `${size}px`;
            ash.style.opacity = Math.random() * 0.7 + 0.2;
            ash.style.animation = `snowfall ${Math.random() * 6 + 4}s linear infinite`;
            container.appendChild(ash);
        }
    }
};const App = {
    init() {
        // Inicializar módulos
        MusicManager.init();
        ProfileManager.init();
        FeedManager.init();
        RonovaManager.init();

        // Intro Cinematográfica
        IntroManager.init(() => {
            this.showToast('Bem-vindo à rede secreta, Marcos Henrique.');
        });

        this.initNavigation();
        this.initTheme();
        this.initAudioControls();
        this.initSearch();
    },

    initNavigation() {
        const navItems = document.querySelectorAll('.sidebar-nav .nav-item, .user-mini-profile');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-target');
                if (targetId) {
                    this.navigateTo(targetId);
                    // Fechar menu mobile se aberto
                    document.getElementById('sidebar').classList.remove('mobile-open');
                }
            });
        });

        document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });
    },

    navigateTo(viewId) {
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(viewId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Atualizar link ativo na sidebar
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(nav => {
            if (nav.getAttribute('data-target') === viewId) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });
    },

    initTheme() {
        const themeBtn = document.getElementById('theme-toggle');
        const settingsThemeBtn = document.getElementById('settings-theme-btn');
        const htmlEl = document.documentElement;

        const savedTheme = StorageManager.get('theme', 'dark');
        htmlEl.setAttribute('data-theme', savedTheme);

        const toggleFn = () => {
            const current = htmlEl.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', next);
            StorageManager.set('theme', next);
            this.showToast(`Tema alterado para ${next === 'dark' ? 'Escuro' : 'Claro'}.`);
        };

        if (themeBtn) themeBtn.addEventListener('click', toggleFn);
        if (settingsThemeBtn) settingsThemeBtn.addEventListener('click', toggleFn);

        // Botões de configuração adicionais
        document.getElementById('settings-audio-btn').addEventListener('click', () => MusicManager.togglePlay());
        document.getElementById('settings-reset-intro').addEventListener('click', () => {
            sessionStorage.removeItem('teyvat_intro_seen');
            this.showToast('Introdução reiniciada. Recarregue a página.');
        });
        document.getElementById('settings-clear-storage').addEventListener('click', () => {
            if (confirm('Deseja realmente limpar todos os dados locais?')) {
                localStorage.clear();
                location.reload();
            }
        });
    },

    initAudioControls() {
        const audioBtn = document.getElementById('btn-toggle-audio');
        const volumeSlider = document.getElementById('volume-slider');

        if (audioBtn) {
            audioBtn.addEventListener('click', () => MusicManager.togglePlay());
        }
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                MusicManager.setVolume(e.target.value);
            });
        }
    },

    initSearch() {
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                if (query.length > 2) {
                    // Navegar automaticamente para o feed se pesquisar
                    this.navigateTo('view-feed');
                    // Filtrar posts
                    const matching = FeedManager.posts.filter(p => p.content.toLowerCase().includes(query) || p.author.toLowerCase().includes(query));
                    const container = document.getElementById('community-feed-list');
                    if (container) {
                        container.innerHTML = matching.length ? matching.map(p => FeedManager.generatePostHTML(p)).join('') : '<p class="text-muted">Nenhum registro encontrado para sua pesquisa.</p>';
                        FeedManager.bindPostActions();
                    }
                } else if (query.length === 0) {
                    FeedManager.renderFeed();
                }
            });
        }
    },

    openModalModalShadow(shadowName) {
        alert(`Abrindo ficha investigativa detalhada sobre: ${shadowName}. (Recurso interativo avançado em expansão).`);
    },

    showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});