const IntroManager = {
    init(onComplete) {
        const introSeen = sessionStorage.getItem('teyvat_intro_seen');
        const overlay = document.getElementById('intro-overlay');

        if (introSeen === 'true') {
            overlay.classList.add('hidden');
            document.getElementById('app-wrapper').classList.remove('hidden');
            if (onComplete) onComplete();
            return;
        }

        this.createSnowParticles();

        document.getElementById('btn-awaken').addEventListener('click', () => {
            this.finishIntro(overlay, onComplete);
        });

        document.getElementById('btn-skip-intro').addEventListener('click', () => {
            this.finishIntro(overlay, onComplete);
        });
    },

    createSnowParticles() {
        const container = document.getElementById('intro-snow');
        if (!container) return;
        for (let i = 0; i < 35; i++) {
            const flake = document.createElement('div');
            flake.style.position = 'absolute';
            flake.style.background = '#ffffff';
            flake.style.borderRadius = '50%';
            flake.style.pointerEvents = 'none';
            flake.style.left = `${Math.random() * 100}vw`;
            flake.style.top = `${Math.random() * -20}vh`;
            const size = Math.random() * 5 + 2;
            flake.style.width = `${size}px`;
            flake.style.height = `${size}px`;
            flake.style.animation = `fadeIn ${Math.random() * 4 + 2}s linear infinite`;
            container.appendChild(flake);
        }
    },

    finishIntro(overlay, onComplete) {
        overlay.classList.add('fade-out');
        sessionStorage.setItem('teyvat_intro_seen', 'true');
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.getElementById('app-wrapper').classList.remove('hidden');
            if (onComplete) onComplete();
        }, 1200);
    }
};const App = {
    profileData: {
        name: "Marcos Henrique",
        handle: "@marcoshenrique",
        bio: "Um observador de Teyvat com a guia de Paimon. Interessado nas verdades esquecidas e nos domínios de Ronova.",
        avatar: "https://enka.network/ui/UI_AvatarIcon_Paimon.png"
    },
    posts: [
        {
            id: 1,
            author: "DeathWhisper",
            handle: "@ronova_watcher",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
            category: "Ronova & Morte",
            content: "Ronova, a Regente da Morte, estabeleceu termos rígidos com Xbalanque em Natlan. O preço da morte é inexorável nas Linhas Ley.",
            timestamp: "Há 2 horas"
        }
    ],

    init() {
        const savedProfile = localStorage.getItem('teyvat_profile');
        if (savedProfile) {
            try { this.profileData = JSON.parse(savedProfile); } catch(e){}
        }

        const savedPosts = localStorage.getItem('teyvat_posts');
        if (savedPosts) {
            try { this.posts = JSON.parse(savedPosts); } catch(e){}
        }

        this.renderProfile();
        this.renderFeed();

        IntroManager.init(() => {
            this.showToast('Bem-vindo à rede secreta, Marcos Henrique.');
        });

        this.initNavigation();
        this.initEvents();
    },

    initNavigation() {
        document.querySelectorAll('.sidebar-nav .nav-item, .user-mini-profile').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-target');
                if (targetId) {
                    this.navigateTo(targetId);
                    document.getElementById('sidebar').classList.remove('mobile-open');
                }
            });
        });

        document.getElementById('mobile-menu-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });
    },

    navigateTo(viewId) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        const target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(nav => {
            if (nav.getAttribute('data-target') === viewId) nav.classList.add('active');
            else nav.classList.remove('active');
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

    renderFeed() {
        const container = document.getElementById('community-feed-list');
        const userContainer = document.getElementById('user-posts-list');
        if (!container) return;

        container.innerHTML = this.posts.map(p => `
            <div class="card-glass post-card">
                <div class="post-header">
                    <div class="post-author-info">
                        <img src="${p.avatar}" alt="${p.author}" class="post-author-avatar">
                        <div>
                            <div class="post-author-name">${p.author}</div>
                            <div class="post-author-handle">${p.handle} • <span class="badge-ronova">${p.category}</span></div>
                        </div>
                    </div>
                    <span style="font-size:0.75rem; color:var(--text-muted);">${p.timestamp}</span>
                </div>
                <div class="post-body"><p>${p.content}</p></div>
            </div>
        `).join('');

        if (userContainer) {
            const myPosts = this.posts.filter(p => p.author === this.profileData.name);
            userContainer.innerHTML = myPosts.length ? myPosts.map(p => `
                <div class="card-glass post-card">
                    <div class="post-header">
                        <div class="post-author-info">
                            <img src="${p.avatar}" class="post-author-avatar">
                            <div><div class="post-author-name">${p.author}</div><div class="post-author-handle">${p.handle}</div></div>
                        </div>
                    </div>
                    <div class="post-body"><p>${p.content}</p></div>
                </div>
            `).join('') : '<p style="color:var(--text-muted);">Nenhuma publicação realizada ainda.</p>';
        }
    },

    initEvents() {
        document.getElementById('btn-submit-post').addEventListener('click', () => {
            const content = document.getElementById('new-post-content').value.trim();
            const category = document.getElementById('new-post-category').value;
            if (!content) {
                this.showToast('Escreva algo antes de publicar.');
                return;
            }

            const newPost = {
                id: Date.now(),
                author: this.profileData.name,
                handle: this.profileData.handle,
                avatar: this.profileData.avatar,
                category: category,
                content: content,
                timestamp: "Agora mesmo"
            };

            this.posts.unshift(newPost);
            localStorage.setItem('teyvat_posts', JSON.stringify(this.posts));
            document.getElementById('new-post-content').value = '';
            this.renderFeed();
            this.showToast('Investigação publicada com sucesso!');
        });

        document.getElementById('btn-open-edit-profile').addEventListener('click', () => {
            document.getElementById('edit-name-input').value = this.profileData.name;
            document.getElementById('edit-bio-input').value = this.profileData.bio;
            document.getElementById('modal-edit-profile').classList.remove('hidden');
        });

        document.getElementById('btn-close-modal').addEventListener('click', () => {
            document.getElementById('modal-edit-profile').classList.add('hidden');
        });

        document.getElementById('btn-save-profile').addEventListener('click', () => {
            const name = document.getElementById('edit-name-input').value.trim();
            const bio = document.getElementById('edit-bio-input').value.trim();
            if (name) this.profileData.name = name;
            if (bio) this.profileData.bio = bio;

            localStorage.setItem('teyvat_profile', JSON.stringify(this.profileData));
            this.renderProfile();
            this.renderFeed();
            document.getElementById('modal-edit-profile').classList.add('hidden');
            this.showToast('Perfil atualizado com sucesso!');
        });

        document.getElementById('settings-clear-storage').addEventListener('click', () => {
            if (confirm('Deseja limpar todos os dados salvos?')) {
                localStorage.clear();
                sessionStorage.clear();
                location.reload();
            }
        });
    },

    showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());