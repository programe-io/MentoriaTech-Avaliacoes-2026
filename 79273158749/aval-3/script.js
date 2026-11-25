const users = [
    {
        id: 'khem',
        username: 'khem_oficial',
        name: 'Khemjira',
        avatar: 'imagens/images.jpg',
        verified: true,
        isCurrentUser: true,
        following: true,
        story: {
            image: 'imagens/60e76714227a7c9ffd1794b16bc16871.jpeg',
            text: 'Conferindo os amuletos de proteção antes de anoitecer... 🕯️',
            viewed: false
        }
    },
    {
        id: 'parat',
        username: 'mestre_parat',
        name: 'Mestre Parat (Pharan)',
        avatar: 'imagens/ab6761610000e5eb3d668ea042e66148e36f9673.jpg',
        verified: true,
        isCurrentUser: false,
        following: true,
        story: {
            image: 'imagens/images (4).jpg',
            text: 'Mantenham a mente focada. A lua cheia se aproxima. 🔮',
            viewed: false
        }
    },
    {
        id: 'charn',
        username: 'charn.vibe',
        name: 'Charn',
        avatar: 'imagens/images (2).jpg',
        verified: false,
        isCurrentUser: false,
        following: true,
        story: {
            image: 'imagens/images (5).jpg',
            text: 'Investigação espiritual dá uma fome absurda! 🍜',
            viewed: false
        }
    },
    {
        id: 'jet',
        username: 'jet_speed',
        name: 'Jet',
        avatar: 'imagens/images (1).jpg',
        verified: false,
        isCurrentUser: false,
        following: false,
        story: {
            image: 'imagens/images (6).jpg',
            text: 'Pronto para correr caso apareça algum espírito hoje 😂🏃‍♂️',
            viewed: false
        }
    }
];

let posts = [
    {
        id: 1,
        userId: 'khem',
        location: 'Templo Antigo, Tailândia',
        image: 'imagens/images (3).jpg',
        likes: 1420,
        liked: true,
        caption: 'Tentando manter a calma mesmo quando os espíritos não dão trégua... Obrigado por proteger minhas costas hoje, Pharan. 🕯️✨',
        timestamp: 'HÁ 2 HORAS',
        comments: [
            { user: 'charn.vibe', text: 'Se precisar de reforço, já estou levando os amuletos!' },
            { user: 'mestre_parat', text: 'Não saia do círculo de proteção sem avisar.' }
        ]
    },
    {
        id: 2,
        userId: 'parat',
        location: 'Santuário Sagrado',
        image: 'imagens/vista-da-casa-espiritual-tailandesa-com-pênis-de-madeira-na-rua-cidade-tailândia-koh-phangan-feb-casas-espirituais-são-erigidas-213366140.webp',
        likes: 3890,
        liked: false,
        caption: 'Preparando as oferendas antes da lua cheia. O equilíbrio exige disciplina. 🔮🔥',
        timestamp: 'HÁ 5 HORAS',
        comments: [
            { user: 'jet_speed', text: 'Mestre, o Khem quase derrubou o incenso de novo 😂' }
        ]
    },
    {
        id: 3,
        userId: 'charn',
        location: 'Mercado Noturno',
        image: 'imagens/khao-san-road.jpg',
        likes: 954,
        liked: false,
        caption: 'Pausa nas investigações sobrenaturais para comer algo decente com o @jet_speed 🍜🥢',
        timestamp: 'HÁ 1 DIA',
        comments: [
            { user: 'jet_speed', text: 'Você que vai pagar a conta hoje, né?' }
        ]
    }
];

// Histórico de Mensagens (Direct)
const chats = {
    parat: [
        { sender: 'them', text: 'Khem, você está com o cordão sagrado que te entreguei?' },
        { sender: 'me', text: 'Estou sim, Mestre Parat! Não tiro ele por nada.' }
    ],
    charn: [
        { sender: 'them', text: 'E aí Khem, vamos passar na biblioteca mais tarde?' }
    ],
    jet: [
        { sender: 'them', text: 'Cara, você não vai acreditar no que o Charn aprontou ontem kkk' }
    ]
};

let activeChatUser = 'parat';
let storyTimer = null;

// ==========================================
// 2. RENDERIZAÇÃO DE STORIES E VISUALIZADOR
// ==========================================
function renderStories() {
    const storiesBar = document.getElementById('stories-bar');
    storiesBar.innerHTML = '';

    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'story-item';
        div.innerHTML = `
            <div class="story-ring ${user.story.viewed ? 'viewed' : ''}">
                <img src="${user.avatar}" alt="${user.name}">
            </div>
            <span>${user.username}</span>
        `;
        div.addEventListener('click', () => openStory(user));
        storiesBar.appendChild(div);
    });
}

function openStory(user) {
    user.story.viewed = true;
    renderStories();

    const modal = document.getElementById('story-modal');
    const progress = document.getElementById('story-progress');
    
    document.getElementById('story-avatar').src = user.avatar;
    document.getElementById('story-username').textContent = user.username;
    document.getElementById('story-image').src = user.story.image;
    document.getElementById('story-text').textContent = user.story.text;

    modal.classList.remove('hidden');
    
    // Barra de progresso de 5 segundos
    progress.style.transition = 'none';
    progress.style.width = '0%';
    
    setTimeout(() => {
        progress.style.transition = 'width 5s linear';
        progress.style.width = '100%';
    }, 50);

    clearTimeout(storyTimer);
    storyTimer = setTimeout(closeStory, 5050);
}

function closeStory() {
    clearTimeout(storyTimer);
    document.getElementById('story-modal').classList.add('hidden');
}

document.getElementById('btn-close-story').addEventListener('click', closeStory);

// ==========================================
// 3. RENDERIZAÇÃO DO FEED, CURTIDAS E COMENTÁRIOS
// ==========================================
function renderFeed() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    posts.forEach(post => {
        const author = users.find(u => u.id === post.userId);
        const verifiedBadge = author.verified ? '<i class="fa-solid fa-circle-check verified"></i>' : '';
        
        const commentsHTML = post.comments.map(c => 
            `<p class="comment"><strong>${c.user}</strong> ${c.text}</p>`
        ).join('');

        const article = document.createElement('article');
        article.className = 'post-card';
        article.innerHTML = `
            <header class="post-header">
                <div class="user-info">
                    <img src="${author.avatar}" alt="${author.name}" class="avatar">
                    <div>
                        <h3 class="username">${author.username} ${verifiedBadge}</h3>
                        <span class="location">${post.location}</span>
                    </div>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
            </header>

            <div class="post-image">
                <img src="${post.image}" alt="Post">
            </div>

            <div class="post-actions">
                <div class="left-actions">
                    <i class="${post.liked ? 'fa-solid fa-heart liked' : 'fa-regular fa-heart'} btn-like" data-id="${post.id}"></i>
                    <i class="fa-regular fa-comment"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                </div>
                <i class="fa-regular fa-bookmark"></i>
            </div>

            <div class="post-details">
                <p class="likes"><strong>${post.likes.toLocaleString('pt-BR')} curtidas</strong></p>
                <p class="caption"><strong>${author.username}</strong> ${post.caption}</p>
                <div class="comments-list">${commentsHTML}</div>
                <span class="timestamp">${post.timestamp}</span>
            </div>

            <form class="add-comment-box" data-id="${post.id}">
                <input type="text" placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        `;
        container.appendChild(article);
    });

    // Eventos de Curtir
    document.querySelectorAll('.btn-like').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number(e.target.dataset.id);
            const post = posts.find(p => p.id === id);
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderFeed();
        });
    });

    // Eventos de Comentar
    document.querySelectorAll('.add-comment-box').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = Number(e.target.dataset.id);
            const input = e.target.querySelector('input');
            const post = posts.find(p => p.id === id);
            
            if (input.value.trim()) {
                post.comments.push({ user: 'khem_oficial', text: input.value.trim() });
                renderFeed();
            }
        });
    });
}

// ==========================================
// 4. SEGUIR PESSOAS E PESQUISAR USUÁRIOS
// ==========================================
function toggleFollow(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.following = !user.following;
        renderSuggestions();
        renderSearchResults(document.getElementById('search-input').value);
    }
}

function renderSuggestions() {
    const list = document.getElementById('suggestions-list');
    list.innerHTML = '';

    users.filter(u => !u.isCurrentUser).forEach(user => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}">
            <div class="user-meta">
                <strong>${user.username}</strong>
                <span>${user.name}</span>
            </div>
            <button class="follow-btn ${user.following ? 'following' : ''}" data-id="${user.id}">
                ${user.following ? 'Seguindo' : 'Seguir'}
            </button>
        `;
        list.appendChild(div);
    });

    list.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => toggleFollow(e.target.dataset.id));
    });
}

// Gaveta de Pesquisa
const searchDrawer = document.getElementById('search-drawer');
document.getElementById('btn-open-search').addEventListener('click', (e) => {
    e.preventDefault();
    searchDrawer.classList.toggle('open');
    renderSearchResults('');
});

document.getElementById('btn-close-search').addEventListener('click', () => {
    searchDrawer.classList.remove('open');
});

document.getElementById('search-input').addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
});

function renderSearchResults(query) {
    const container = document.getElementById('search-results');
    container.innerHTML = '';

    const filtered = users.filter(u => 
        u.username.toLowerCase().includes(query.toLowerCase()) || 
        u.name.toLowerCase().includes(query.toLowerCase())
    );

    filtered.forEach(user => {
        const div = document.createElement('div');
        div.className = 'search-user-card';
        div.innerHTML = `
            <div class="search-user-info">
                <img src="${user.avatar}" alt="${user.name}">
                <div>
                    <strong>${user.username}</strong>
                    <div style="font-size:12px; color:#8e8e8e;">${user.name}</div>
                </div>
            </div>
            ${!user.isCurrentUser ? `
                <button class="follow-btn ${user.following ? 'following' : ''}" data-id="${user.id}">
                    ${user.following ? 'Seguindo' : 'Seguir'}
                </button>
            ` : '<span style="font-size:12px; color:#8e8e8e;">Você</span>'}
        `;
        container.appendChild(div);
    });

    container.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', (e) => toggleFollow(e.target.dataset.id));
    });
}

// ==========================================
// 5. CRIAR NOVA POSTAGEM (UPLOAD OU LINK)
// ==========================================
const createModal = document.getElementById('create-modal');

document.getElementById('btn-open-create').addEventListener('click', (e) => {
    e.preventDefault();
    createModal.classList.remove('hidden');
});

document.getElementById('btn-close-create').addEventListener('click', () => {
    createModal.classList.add('hidden');
});

document.getElementById('create-post-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('post-file-input');
    const urlInput = document.getElementById('post-url-input').value.trim();
    const location = document.getElementById('post-location-input').value.trim();
    const caption = document.getElementById('post-caption-input').value.trim();

    const finalizePost = (imageSrc) => {
        posts.unshift({
            id: Date.now(),
            userId: 'khem',
            location: location,
            image: imageSrc,
            likes: 1,
            liked: true,
            caption: caption,
            timestamp: 'AGORA MESMO',
            comments: []
        });
        renderFeed();
        createModal.classList.add('hidden');
        e.target.reset();
    };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => finalizePost(event.target.result);
        reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput) {
        finalizePost(urlInput);
    } else {
        finalizePost('https://placehold.co/600x500/2c3e50/ffffff?text=Nova+Foto+de+Khem');
    }
});

// ==========================================
// 6. SISTEMA DE MENSAGENS (DIRECT) E ABAS
// ==========================================
document.querySelectorAll('.nav-item[data-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.dataset.tab;

        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        link.classList.add('active');

        if (tab === 'messages') {
            document.getElementById('tab-feed').classList.add('hidden');
            document.getElementById('right-sidebar').classList.add('hidden');
            document.getElementById('tab-messages').classList.remove('hidden');
            renderChatList();
            renderChatMessages();
        } else {
            document.getElementById('tab-messages').classList.add('hidden');
            document.getElementById('tab-feed').classList.remove('hidden');
            document.getElementById('right-sidebar').classList.remove('hidden');
        }
    });
});

function renderChatList() {
    const list = document.getElementById('chat-users-list');
    list.innerHTML = '';

    users.filter(u => !u.isCurrentUser).forEach(user => {
        const div = document.createElement('div');
        div.className = `chat-contact ${user.id === activeChatUser ? 'active' : ''}`;
        div.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}">
            <div>
                <strong>${user.username}</strong>
                <div style="font-size:12px; color:#8e8e8e;">Clique para conversar</div>
            </div>
        `;
        div.addEventListener('click', () => {
            activeChatUser = user.id;
            renderChatList();
            renderChatMessages();
        });
        list.appendChild(div);
    });
}

function renderChatMessages() {
    const user = users.find(u => u.id === activeChatUser);
    const header = document.getElementById('active-chat-header');
    header.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}">
        <div>
            <strong>${user.username}</strong>
            <span>Online agora</span>
        </div>
    `;

    const box = document.getElementById('chat-messages-box');
    box.innerHTML = '';

    (chats[activeChatUser] || []).forEach(msg => {
        const div = document.createElement('div');
        div.className = `msg-bubble ${msg.sender === 'me' ? 'msg-sent' : 'msg-received'}`;
        div.textContent = msg.text;
        box.appendChild(div);
    });
    box.scrollTop = box.scrollHeight;
}

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    if (!chats[activeChatUser]) chats[activeChatUser] = [];
    chats[activeChatUser].push({ sender: 'me', text });
    input.value = '';
    renderChatMessages();
    gerarRespostaPersonagem(activeChatUser, text);

    // Resposta automática do personagem após 1 segundo
    const replies = {
        parat: 'Entendido, Khem. Fique atento aos sinais ao seu redor.',
        charn: 'Boa! Já vou me preparar aqui e te encontro em 10 minutos.',
        jet: 'Hahaha pode deixar comigo! Tô indo pra aí agora!'
    };

    setTimeout(() => {
        chats[activeChatUser].push({ sender: 'them', text: replies[activeChatUser] });
        renderChatMessages();
    }, 1000);
});

// Inicialização
renderStories();
renderFeed();
renderSuggestions();