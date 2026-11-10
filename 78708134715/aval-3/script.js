// Dados Mockados para Simular o Instagram
const storiesData = [
    { username: 'seu_story', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', isUser: true },
    { username: 'natgeo', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
    { username: 'tech_insider', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { username: 'viajante', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    { username: 'foodie_br', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { username: 'design_daily', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
];

const postsData = [
    {
        id: 1,
        username: 'natgeo',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        location: 'Yosemite National Park',
        postImage: 'https://images.unsplash.com/photo-1426604966848-d7adacbd02bff?w=800',
        likes: 1243,
        caption: 'A beleza intocada das montanhas sob a luz do amanhecer. 🌲✨ #natureza #aventura',
        commentsCount: 48,
        liked: false
    },
    {
        id: 2,
        username: 'tech_insider',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        location: 'Silicon Valley, CA',
        postImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
        likes: 852,
        caption: 'O futuro do desenvolvimento web está aqui. Como você estrutura seus componentes?',
        commentsCount: 15,
        liked: true
    }
];

const suggestionsData = [
    { username: 'dev_frontend', name: 'Frontend Tips', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
    { username: 'ui_ux_master', name: 'UI/UX Design', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
    { username: 'coffee_lover', name: 'Café & Código', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' }
];

// Renderizar Stories
function renderStories() {
    const container = document.getElementById('stories-container');
    container.innerHTML = storiesData.map((story, index) => `
        <div class="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0">
            <div class="w-16 h-16 rounded-full p-[2px] ${story.isUser ? 'border border-gray-300' : 'instagram-gradient'}">
                <div class="w-full h-full bg-white rounded-full p-[2px]">
                    <img src="${story.avatar}" class="w-full h-full rounded-full object-cover">
                </div>
            </div>
            <span class="text-xs text-neutral-700 truncate w-16 text-center">${story.username}</span>
        </div>
    `).join('');
}

// Renderizar Feed de Posts
function renderFeed() {
    const container = document.getElementById('feed-container');
    container.innerHTML = postsData.map(post => `
        <article class="bg-white md:border md:border-gray-200 md:rounded-xl overflow-hidden">
            <!-- Cabeçalho do Post -->
            <div class="flex items-center justify-between px-4 py-3">
                <div class="flex items-center gap-3">
                    <img src="${post.userAvatar}" class="w-8 h-8 rounded-full object-cover">
                    <div class="flex flex-col">
                        <span class="font-semibold text-sm">${post.username}</span>
                        <span class="text-xs text-gray-500">${post.location}</span>
                    </div>
                </div>
                <button class="text-neutral-600 hover:text-neutral-900"><i data-lucide="more-horizontal" class="w-5 h-5"></i></button>
            </div>

            <!-- Imagem do Post -->
            <div class="w-full bg-black max-h-[500px] overflow-hidden flex items-center justify-center">
                <img src="${post.postImage}" class="w-full object-cover">
            </div>

            <!-- Ações (Curtir, Comentar, Salvar) -->
            <div class="px-4 py-3 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <button onclick="toggleLike(${post.id})" class="transition transform active:scale-125">
                        <i data-lucide="heart" class="w-6 h-6 ${post.liked ? 'fill-red-500 text-red-500' : 'text-neutral-900'}"></i>
                    </button>
                    <button class="text-neutral-900 hover:text-gray-600"><i data-lucide="message-circle" class="w-6 h-6"></i></button>
                    <button class="text-neutral-900 hover:text-gray-600"><i data-lucide="send" class="w-6 h-6"></i></button>
                </div>
                <button class="text-neutral-900 hover:text-gray-600"><i data-lucide="bookmark" class="w-6 h-6"></i></button>
            </div>

            <!-- Curtidas e Legenda -->
            <div class="px-4 pb-3 flex flex-col gap-1 text-sm">
                <span class="font-semibold">${post.likes.toLocaleString()} curtidas</span>
                <p><strong class="font-semibold mr-2">${post.username}</strong>${post.caption}</p>
                <button class="text-gray-500 text-left text-xs mt-1 hover:text-gray-700">Ver todos os ${post.commentsCount} comentários</button>
                <span class="text-[10px] text-gray-400 uppercase tracking-wide mt-1">Há 2 horas</span>
            </div>

            <!-- Caixa de Comentário -->
            <div class="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
                <input type="text" placeholder="Adicione um comentário..." class="w-full text-sm outline-none bg-transparent">
                <button class="text-blue-500 font-semibold text-sm hover:text-blue-700">Publicar</button>
            </div>
        </article>
    `).join('');

    // Atualiza os ícones do Lucide nos novos elementos injetados
    lucide.createIcons();
}

// Renderizar Sugestões (Sidebar Direita)
function renderSuggestions() {
    const container = document.getElementById('suggestions-container');
    container.innerHTML = suggestionsData.map(s => `
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="${s.avatar}" class="w-9 h-9 rounded-full object-cover">
                <div class="flex flex-col">
                    <span class="font-semibold text-sm">${s.username}</span>
                    <span class="text-xs text-gray-500">${s.name}</span>
                </div>
            </div>
            <button class="text-xs font-semibold text-blue-500 hover:text-blue-700">Seguir</button>
        </div>
    `).join('');
}

// Função interativa de Curtir
window.toggleLike = function(postId) {
    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderFeed();
    }
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    renderStories();
    renderFeed();
    renderSuggestions();
    lucide.createIcons();
});