// Dados dos Stories (Fatos Rápidos)
const stories = [
    {
        user: "astronomia",
        avatar: "https://unsplash.com",
        img: "https://unsplash.com",
        texto: "🌌 O silêncio no espaço é absoluto porque não há ar para transportar ondas sonoras!"
    },
    {
        user: "oceanos",
        avatar: "https://unsplash.com",
        img: "https://unsplash.com",
        texto: "🌊 Conhecemos mais sobre a superfície de Marte do que sobre o fundo dos nossos próprios oceanos."
    },
    {
        user: "egito_antigo",
        avatar: "https://unsplash.com",
        img: "https://unsplash.com",
        texto: "🏺 Cleópatra viveu mais perto da invenção do iPhone do que da construção das Pirâmides de Gizé!"
    },
    {
        user: "corpo_humano",
        avatar: "https://unsplash.com",
        img: "https://unsplash.com",
        texto: "🧬 Se você esticasse todo o DNA do seu corpo, ele iria da Terra até Plutão e voltaria!"
    }
];

// Dados iniciais do Feed
let posts = [
    {
        id: 1,
        user: "planeta_curioso",
        avatar: "https://unsplash.com",
        location: "Islândia • Aurora Boreal",
        img: "https://unsplash.com",
        likes: 1420,
        liked: false,
        saved: false,
        caption: "As Auroras Boreais não acontecem só na Terra! Júpiter, Saturno, Urano e Netuno também têm auroras gigantescas causadas por tempestades solares. ✨🌌",
        comments: [
            { user: "lucas_m", text: "Meu sonho ver isso pessoalmente!" },
            { user: "ana.viaja", text: "Que foto surreal 😍" }
        ]
    },
    {
        id: 2,
        user: "reino_animal",
        avatar: "https://unsplash.com",
        location: "Florestas Tropicais",
        img: "https://unsplash.com",
        likes: 893,
        liked: true,
        saved: false,
        caption: "Os beija-flores são as únicas aves do mundo capazes de voar para trás, para os lados e até de cabeça para baixo! Suas asas batem até 80 vezes por segundo. 🐦💨",
        comments: [
            { user: "bio_nerd", text: "O coração deles bate mais de 1.200 vezes por minuto!" }
        ]
    }
];

const storiesBar = document.getElementById('stories-bar');
const feed = document.getElementById('feed');
let mostrarApenasSalvos = false;

// Renderizar Stories
function renderStories() {
    storiesBar.innerHTML = stories.map((s, index) => `
        <div class="story-item" onclick="abrirStory(${index})">
            <div class="story-ring">
                <img src="${s.avatar}" alt="${s.user}">
            </div>
            <span>${s.user}</span>
        </div>
    `).join('');
}

// Lógica do Visualizador de Story
const storyModal = document.getElementById('story-modal');
const storyFill = document.getElementById('story-bar-fill');
let storyTimeout;

function abrirStory(index) {
    const s = stories[index];
    document.getElementById('story-user').textContent = `@${s.user}`;
    document.getElementById('story-img').src = s.img;
    document.getElementById('story-text').textContent = s.texto;

    storyModal.style.display = 'flex';
    storyFill.style.transition = 'none';
    storyFill.style.width = '0%';

    setTimeout(() => {
        storyFill.style.transition = 'width 4s linear';
        storyFill.style.width = '100%';
    }, 50);

    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => {
        storyModal.style.display = 'none';
    }, 4100);
}

document.getElementById('close-story').onclick = () => {
    clearTimeout(storyTimeout);
    storyModal.style.display = 'none';
};

// Renderizar Feed
function renderFeed() {
    const lista = mostrarApenasSalvos ? posts.filter(p => p.saved) : posts;

    if (lista.length === 0) {
        feed.innerHTML = '<p style="text-align:center; color:#8e8e8e; margin-top:30px;">Nenhuma curiosidade salva ainda.</p>';
        return;
    }

    feed.innerHTML = lista.map(post => `
        <article class="post">
            <div class="post-header">
                <img src="${post.avatar}" class="post-avatar" alt="${post.user}">
                <div class="post-user-info">
                    <span class="post-username">${post.user}</span>
                    <span class="post-location">${post.location}</span>
                </div>
            </div>

            <div class="post-image-wrapper" ondblclick="doubleClickLike(${post.id}, this)">
                <img src="${post.img}" class="post-image" alt="Post">
                <div class="heart-popup">❤️</div>
            </div>

            <div class="post-actions">
                <div class="left-actions">
                    <button class="action-icon" onclick="toggleLike(${post.id})">
                        ${post.liked ? '❤️' : '🤍'}
                    </button>
                    <button class="action-icon" onclick="focusComment(${post.id})">💬</button>
                </div>
                <button class="action-icon" onclick="toggleSave(${post.id})">
                    ${post.saved ? '🔖' : '📑'}
                </button>
            </div>

            <div class="post-details">
                <div class="likes-count">${post.likes.toLocaleString('pt-BR')} curtidas</div>
                <div class="caption"><strong>${post.user}</strong> ${post.caption}</div>
                <div class="comments-list">
                    ${post.comments.map(c => `<div class="comment-line"><strong>${c.user}</strong> ${c.text}</div>`).join('')}
                </div>
            </div>

            <form class="comment-box" onsubmit="addComment(event, ${post.id})">
                <input type="text" id="input-${post.id}" placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        </article>
    `).join('');
}

// Curtir pelo botão
function toggleLike(id) {
    const p = posts.find(x => x.id === id);
    p.liked = !p.liked;
    p.likes += p.liked ? 1 : -1;
    renderFeed();
}

// Curtir com clique duplo na foto
function doubleClickLike(id, wrapper) {
    const p = posts.find(x => x.id === id);
    if (!p.liked) {
        p.liked = true;
        p.likes += 1;
    }
    const heart = wrapper.querySelector('.heart-popup');
    heart.classList.add('show');
    setTimeout(() => {
        heart.classList.remove('show');
        renderFeed();
    }, 600);
}

// Salvar post
function toggleSave(id) {
    const p = posts.find(x => x.id === id);
    p.saved = !p.saved;
    renderFeed();
}

// Focar no campo de comentário
function focusComment(id) {
    document.getElementById(`input-${id}`).focus();
}

// Adicionar comentário
function addComment(e, id) {
    e.preventDefault();
    const input = document.getElementById(`input-${id}`);
    const p = posts.find(x => x.id === id);
    p.comments.push({ user: "voce_curioso", text: input.value.trim() });
    renderFeed();
}

// Filtrar Salvos
const filterSavedBtn = document.getElementById('filter-saved-btn');
filterSavedBtn.onclick = () => {
    mostrarApenasSalvos = !mostrarApenasSalvos;
    filterSavedBtn.style.opacity = mostrarApenasSalvos ? '0.5' : '1';
    renderFeed();
};

// Modal Criar Novo Post
const createModal = document.getElementById('create-modal');
document.getElementById('open-create-modal').onclick = () => createModal.style.display = 'flex';
document.getElementById('close-create').onclick = () => createModal.style.display = 'none';

document.getElementById('create-form').onsubmit = (e) => {
    e.preventDefault();
    const novoPost = {
        id: Date.now(),
        user: "voce_curioso",
        avatar: "https://dicebear.com",
        location: document.getElementById('new-location').value,
        img: document.getElementById('new-img').value,
        likes: 1,
        liked: true,
        saved: false,
        caption: document.getElementById('new-caption').value,
        comments: []
    };
    posts.unshift(novoPost);
    e.target.reset();
    createModal.style.display = 'none';
    mostrarApenasSalvos = false;
    renderFeed();
};

// Inicializar
renderStories();
renderFeed();
