// Dados Iniciais dos Stories
const storiesData = [
    { id: 'user', name: 'Seu story', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', isUser: true },
    { id: 1, name: 'ana.silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150', storyImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'lucas_tech', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150', storyImg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'mari_trips', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150', storyImg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'cafe_art', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150', storyImg: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600' },
];

// Dados Iniciais do Feed
let postsData = [
    {
        id: 101,
        author: 'mari_trips',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
        location: 'Santorini, Grécia',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000',
        caption: 'Que lugar inacreditável! Cada canto parece uma pintura. 🇬🇷✨ #travel #greece #santorini #vacation',
        likes: 124,
        isLiked: false,
        isSaved: false,
        timeAgo: 'HÁ 2 HORAS',
        comments: [
            { user: 'ana.silva', text: 'Perfeito! Quero muito conhecer 😍' },
            { user: 'lucas_tech', text: 'Essa foto ficou sensacional!' }
        ]
    },
    {
        id: 102,
        author: 'cafe_art',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        location: 'São Paulo, Brasil',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
        caption: 'Começando o dia com aquele café especial. Quem mais não vive sem? ☕📖 #coffee #morning #cozy',
        likes: 89,
        isLiked: true,
        isSaved: true,
        timeAgo: 'HÁ 5 HORAS',
        comments: [
            { user: 'mari_trips', text: 'Nada melhor para acordar!' }
        ]
    }
];

// Elementos do DOM
const storiesContainer = document.getElementById('storiesContainer');
const feedContainer = document.getElementById('feedContainer');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const searchInput = document.getElementById('searchInput');

// Modais
const createModal = document.getElementById('createModal');
const openCreateModalBtn = document.getElementById('openCreateModalBtn');
const closeCreateModalBtn = document.getElementById('closeCreateModalBtn');
const createPostForm = document.getElementById('createPostForm');

const storyModal = document.getElementById('storyModal');
const closeStoryModalBtn = document.getElementById('closeStoryModalBtn');
const storyProgressBar = document.getElementById('storyProgressBar');
let storyTimeout;

// RENDERIZAR STORIES
function renderStories() {
    storiesContainer.innerHTML = storiesData.map(story => `
        <div class="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 group" onclick="openStory(${story.id})">
            <div class="${story.isUser ? 'p-[2px] bg-gray-300 dark:bg-zinc-700' : 'story-border'} rounded-full transition-transform group-hover:scale-105">
                <div class="bg-white dark:bg-zinc-900 p-[2px] rounded-full">
                    <img src="${story.avatar}" alt="${story.name}" class="w-14 h-14 rounded-full object-cover">
                </div>
            </div>
            <span class="text-xs truncate w-16 text-center text-gray-700 dark:text-gray-300">${story.name}</span>
        </div>
    `).join('');
}

// RENDERIZAR POSTS
function renderPosts(postsToRender = postsData) {
    if (postsToRender.length === 0) {
        feedContainer.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i class="fa-regular fa-compass text-4xl mb-2"></i>
                <p>Nenhuma publicação encontrada.</p>
            </div>
        `;
        return;
    }

    feedContainer.innerHTML = postsToRender.map(post => `
        <article class="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors" data-id="${post.id}">
            <!-- Header do Post -->
            <div class="flex items-center justify-between p-3.5 border-b border-gray-100 dark:border-zinc-800/50">
                <div class="flex items-center gap-3">
                    <img src="${post.avatar}" alt="${post.author}" class="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-zinc-700">
                    <div>
                        <h4 class="font-semibold text-sm leading-tight hover:underline cursor-pointer">${post.author}</h4>
                        ${post.location ? `<p class="text-xs text-gray-500 dark:text-gray-400">${post.location}</p>` : ''}
                    </div>
                </div>
                <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>

            <!-- Imagem do Post -->
            <div class="relative bg-black group select-none cursor-pointer" onclick="handleDoubleClick(${post.id}, event)">
                <img src="${post.image}" alt="Post" class="w-full max-h-[600px] object-cover block">
                <!-- Ícone de Animação de Curtida -->
                <i id="heart-anim-${post.id}" class="fa-solid fa-heart absolute top-1/2 left-1/2 text-white text-7xl opacity-0 pointer-events-none drop-shadow-lg"></i>
            </div>

            <!-- Ações do Post -->
            <div class="p-4 space-y-3">
                <div class="flex items-center justify-between text-2xl">
                    <div class="flex items-center gap-4">
                        <button onclick="toggleLike(${post.id})" class="transition-transform active:scale-125 focus:outline-none">
                            <i class="${post.isLiked ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart hover:text-gray-500'}"></i>
                        </button>
                        <button class="hover:text-gray-500 transition-colors">
                            <i class="fa-regular fa-comment"></i>
                        </button>
                        <button class="hover:text-gray-500 transition-colors">
                            <i class="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>
                    <button onclick="toggleSave(${post.id})" class="hover:text-gray-500 transition-colors">
                        <i class="${post.isSaved ? 'fa-solid fa-bookmark text-gray-900 dark:text-white' : 'fa-regular fa-bookmark'}"></i>
                    </button>
                </div>

                <!-- Curtidas -->
                <div class="font-semibold text-sm">
                    ${post.likes.toLocaleString()} curtidas
                </div>

                <!-- Legenda -->
                <div class="text-sm space-x-1 leading-relaxed">
                    <span class="font-semibold">${post.author}</span>
                    <span class="text-gray-800 dark:text-gray-200">${formatCaption(post.caption)}</span>
                </div>

                <!-- Comentários -->
                <div class="space-y-1 text-sm pt-1">
                    ${post.comments.map(c => `
                        <div class="flex items-start gap-1">
                            <span class="font-semibold">${c.user}</span>
                            <span class="text-gray-700 dark:text-gray-300">${c.text}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Tempo decorrido -->
                <div class="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-1">
                    ${post.timeAgo}
                </div>
            </div>

            <!-- Formulário de Novo Comentário -->
            <form onsubmit="handleAddComment(event, ${post.id})" class="flex items-center border-t border-gray-100 dark:border-zinc-800/80 px-4 py-2.5">
                <input type="text" placeholder="Adicione um comentário..." required
                    class="w-full bg-transparent text-sm focus:outline-none placeholder-gray-400 dark:placeholder-gray-500">
                <button type="submit" class="text-insta-pink font-semibold text-sm ml-2 hover:text-opacity-80 transition-opacity">
                    Publicar
                </button>
            </form>
        </article>
    `).join('');
}

// FORMATAÇÃO DE HASHTAGS NA LEGENDA
function formatCaption(caption) {
    return caption.replace(/#(\w+)/g, '<span class="text-blue-500 hover:underline cursor-pointer">#$1</span>');
}

// FUNCIONALIDADE DE CURTIR
function toggleLike(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;

    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    renderPosts();
}

// DOUBLE CLICK PARA CURTIR
let clickTimer = null;
function handleDoubleClick(postId, event) {
    if (clickTimer === null) {
        clickTimer = setTimeout(() => {
            clickTimer = null;
        }, 300);
    } else {
        clearTimeout(clickTimer);
        clickTimer = null;

        const post = postsData.find(p => p.id === postId);
        if (post) {
            if (!post.isLiked) {
                post.isLiked = true;
                post.likes += 1;
            }

            // Animação de Coração na Imagem
            const heartAnim = document.getElementById(`heart-anim-${postId}`);
            if (heartAnim) {
                heartAnim.classList.remove('animate-heart');
                void heartAnim.offsetWidth; // Trigger reflow
                heartAnim.classList.add('animate-heart');
            }

            renderPosts();
        }
    }
}

// SALVAR POST
function toggleSave(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;

    post.isSaved = !post.isSaved;
    renderPosts();
}

// ADICIONAR COMENTÁRIO
function handleAddComment(event, postId) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const commentText = input.value.trim();

    if (!commentText) return;

    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.comments.push({
            user: 'você',
            text: commentText
        });
        input.value = '';
        renderPosts();
    }
}

// BUSCA / FILTRO DE POSTS POR AUTOR OU LEGENDA
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = postsData.filter(post => 
        post.author.toLowerCase().includes(term) || 
        post.caption.toLowerCase().includes(term) ||
        (post.location && post.location.toLowerCase().includes(term))
    );
    renderPosts(filtered);
});

// ALTERNAR TEMA ESCURO / CLARO
themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// MODAL DE CRIAR POST
openCreateModalBtn.addEventListener('click', () => createModal.classList.remove('hidden'));
closeCreateModalBtn.addEventListener('click', () => createModal.classList.add('hidden'));

createModal.addEventListener('click', (e) => {
    if (e.target === createModal) createModal.classList.add('hidden');
});

createPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const imageUrl = document.getElementById('imageUrlInput').value;
    const location = document.getElementById('locationInput').value;
    const caption = document.getElementById('captionInput').value;

    const newPost = {
        id: Date.now(),
        author: 'você',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        location: location || '',
        image: imageUrl,
        caption: caption,
        likes: 0,
        isLiked: false,
        isSaved: false,
        timeAgo: 'AGORA MESMO',
        comments: []
    };

    postsData.unshift(newPost);
    renderPosts();

    // Limpar formulário e fechar modal
    createPostForm.reset();
    createModal.classList.add('hidden');
});

// MODAL DE STORY
function openStory(storyId) {
    const story = storiesData.find(s => s.id === storyId);
    if (!story || story.isUser) return; // Não abre modal para "Seu Story" sem dados

    document.getElementById('storyUserAvatar').src = story.avatar;
    document.getElementById('storyUsername').textContent = story.name;
    document.getElementById('storyImage').src = story.storyImg;

    storyModal.classList.remove('hidden');

    // Resetar barra de progresso
    storyProgressBar.style.width = '0%';
    setTimeout(() => {
        storyProgressBar.style.width = '100%';
    }, 50);

    // Fechar automaticamente após 5s
    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => {
        closeStory();
    }, 5000);
}

function closeStory() {
    storyModal.classList.add('hidden');
    storyProgressBar.style.width = '0%';
    clearTimeout(storyTimeout);
}

closeStoryModalBtn.addEventListener('click', closeStory);

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderStories();
    renderPosts();
});

    