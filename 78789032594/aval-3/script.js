// Dados simulados para stories e feed
const storiesData = [
    { username: "julia_fotografia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { username: "carlos_dev", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { username: "beatriz_art", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100" },
    { username: "lucas_travel", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { username: "mariana_fit", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    { username: "tech_insider", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" }
];

const postsData = [
    {
        id: 1,
        username: "carlos_dev",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        postImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        likes: 124,
        caption: "Explorando novos horizontes com código e café ☕💻 #developer #tailwind",
        comments: [
            { user: "julia_fotografia", text: "Excelente foto e setup!" },
            { user: "mariana_fit", text: "Muito bom! Qual é o café?" }
        ],
        liked: false,
        saved: false
    },
    {
        id: 2,
        username: "julia_fotografia",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        postImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
        likes: 852,
        caption: "A natureza sempre nos surpreende. 🌲✨ #nature #photography",
        comments: [
            { user: "carlos_dev", text: "Incrível demais!" }
        ],
        liked: true,
        saved: true
    }
];

// Renderizar Stories
function renderStories() {
    const container = document.getElementById('stories-container');
    container.innerHTML = storiesData.map(story => `
        <div class="flex flex-col items-center cursor-pointer flex-shrink-0">
            <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
                <img src="${story.avatar}" class="w-full h-full rounded-full object-cover border-2 border-white" alt="${story.username}">
            </div>
            <span class="text-xs text-gray-600 mt-1 truncate w-16 text-center">${story.username}</span>
        </div>
    `).join('');
}

// Renderizar Feed de Posts
function renderFeed() {
    const container = document.getElementById('feed-container');
    container.innerHTML = postsData.map(post => `
        <article class="bg-white border border-gray-200 rounded-xl shadow-sm">
            <!-- Cabeçalho do Post -->
            <div class="flex items-center justify-between p-3">
                <div class="flex items-center gap-3">
                    <img src="${post.userAvatar}" class="w-8 h-8 rounded-full object-cover" alt="${post.username}">
                    <span class="font-semibold text-sm">${post.username}</span>
                </div>
                <button class="text-gray-500 hover:text-gray-800"><i class="fa-solid fa-ellipsis"></i></button>
            </div>

            <!-- Imagem do Post -->
            <div class="w-full bg-black max-h-[500px] flex items-center justify-center overflow-hidden">
                <img src="${post.postImage}" class="w-full object-cover" alt="Post image">
            </div>

            <!-- Ações (Curtir, Comentar, Compartilhar, Salvar) -->
            <div class="p-3">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex gap-4 text-2xl">
                        <button onclick="toggleLike(${post.id})" class="transition hover:scale-110">
                            <i class="${post.liked ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'}"></i>
                        </button>
                        <button class="transition hover:scale-110"><i class="fa-regular fa-comment"></i></button>
                        <button class="transition hover:scale-110"><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                    <button onclick="toggleSave(${post.id})" class="text-2xl transition hover:scale-110">
                        <i class="${post.saved ? 'fa-solid fa-bookmark text-black' : 'fa-regular fa-bookmark'}"></i>
                    </button>
                </div>
                
                <!-- Curtidas -->
                <p class="font-semibold text-sm mb-1"><span>${post.likes}</span> curtidas</p>
                
                <!-- Legenda -->
                <p class="text-sm mb-2"><span class="font-semibold mr-2">${post.username}</span>${post.caption}</p>

                <!-- Comentários -->
                <div class="space-y-1 mb-2 text-sm">
                    ${post.comments.map(c => `<p><span class="font-semibold mr-2">${c.user}</span>${c.text}</p>`).join('')}
                </div>

                <p class="text-gray-400 text-[10px] uppercase tracking-wide mb-3">Há 2 horas</p>

                <!-- Input de Comentário -->
                <div class="flex items-center border-t border-gray-100 pt-3">
                    <input type="text" id="comment-input-${post.id}" placeholder="Adicione um comentário..." class="w-full text-sm outline-none bg-transparent">
                    <button onclick="addComment(${post.id})" class="text-blue-500 font-semibold text-sm ml-2 hover:text-blue-700">Publicar</button>
                </div>
            </div>
        </article>
    `).join('');
}

// Funções de Interação
function toggleLike(postId) {
    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        renderFeed();
    }
}

function toggleSave(postId) {
    const post = postsData.find(p => p.id === postId);
    if (post) {
        post.saved = !post.saved;
        renderFeed();
    }
}

function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const text = input.value.trim();
    if (text) {
        const post = postsData.find(p => p.id === postId);
        post.comments.push({ user: "seu_usuario", text: text });
        input.value = "";
        renderFeed();
    }
}

// Inicialização ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderFeed();
});