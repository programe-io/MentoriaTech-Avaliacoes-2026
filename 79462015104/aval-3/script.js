// Dados simulados para o feed, stories e sugestões
const storiesData = [
    { username: 'maria_silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { username: 'joao_dev', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { username: 'ana_viajante', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150' },
    { username: 'carlos_foto', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
    { username: 'beatriz_art', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150' },
];

const postsData = [
    {
        id: 1,
        username: 'joao_dev',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        location: 'São Paulo, Brasil',
        postImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
        likes: 1243,
        caption: 'Explorando novas tecnologias e códigos limpos por aí! 💻✨ #coding #webdev',
        time: 'HÁ 2 HORAS'
    },
    {
        id: 2,
        username: 'ana_viajante',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
        location: 'Kyoto, Japão',
        postImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
        likes: 4892,
        caption: 'A serenidade desses lugares é incomparável. 🌸 #japan #travel',
        time: 'HÁ 5 HORAS'
    }
];

const suggestionsData = [
    { username: 'tech_insider', name: 'Tech Insider', avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150' },
    { username: 'minimal_zine', name: 'Minimal Design', avatar: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=150' },
    { username: 'coffee_lovers', name: 'Coffee & Co.', avatar: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=150' },
];

// Funções de Inicialização da Interface
document.addEventListener('DOMContentLoaded', () => {
    renderStories();
    renderPosts();
    renderSuggestions();
});

function renderStories() {
    const container = document.getElementById('stories-container');
    container.innerHTML = storiesData.map(story => `
        <div class="flex flex-col items-center cursor-pointer flex-shrink-0">
            <div class="w-16 h-16 rounded-full p-[2px] story-gradient">
                <img src="${story.avatar}" class="w-full h-full rounded-full object-cover border-2 border-white">
            </div>
            <span class="text-xs text-gray-700 mt-1 max-w-[64px] truncate">${story.username}</span>
        </div>
    `).join('');
}

function renderPosts() {
    const container = document.getElementById('feed-container');
    container.innerHTML = postsData.map(post => `
        <article class="bg-white border border-gray-200 rounded-xl">
            <!-- Cabeçalho do Post -->
            <div class="flex items-center justify-between p-3">
                <div class="flex items-center gap-3">
                    <img src="${post.userAvatar}" class="w-8 h-8 rounded-full object-cover">
                    <div>
                        <h3 class="font-semibold text-sm">${post.username}</h3>
                        <p class="text-xs text-gray-500">${post.location}</p>
                    </div>
                </div>
                <button class="text-gray-500 hover:text-black"><i class="fa-solid fa-ellipsis"></i></button>
            </div>

            <!-- Imagem do Post -->
            <div class="w-full bg-black max-h-[500px] overflow-hidden flex items-center justify-center">
                <img src="${post.postImage}" class="w-full object-cover">
            </div>

            <!-- Ações do Post -->
            <div class="p-3">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex gap-4 text-xl">
                        <button onclick="toggleLike(this)" class="hover:text-gray-500 transition-colors"><i class="fa-regular fa-heart"></i></button>
                        <button class="hover:text-gray-500 transition-colors"><i class="fa-regular fa-comment"></i></button>
                        <button class="hover:text-gray-500 transition-colors"><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                    <button class="text-xl hover:text-gray-500"><i class="fa-regular fa-bookmark"></i></button>
                </div>

                <!-- Curtidas e Legenda -->
                <p class="font-semibold text-sm mb-1">${post.likes} curtidas</p>
                <p class="text-sm mb-2"><strong class="font-semibold mr-2">${post.username}</strong>${post.caption}</p>
                <p class="text-xs text-gray-400 uppercase tracking-wide">${post.time}</p>
            </div>

            <!-- Campo de Comentário -->
            <div class="border-t border-gray-100 px-3 py-2 flex items-center">
                <input type="text" placeholder="Adicione um comentário..." class="w-full text-sm outline-none bg-transparent">
                <button class="text-blue-500 font-semibold text-sm hover:text-blue-700">Publicar</button>
            </div>
        </article>
    `).join('');
}

function renderSuggestions() {
    const container = document.getElementById('suggestions-container');
    container.innerHTML = suggestionsData.map(s => `
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="${s.avatar}" class="w-10 h-10 rounded-full object-cover">
                <div>
                    <h5 class="font-semibold text-sm">${s.username}</h5>
                    <p class="text-gray-400 text-xs">Sugestão para você</p>
                </div>
            </div>
            <button class="text-blue-500 text-xs font-semibold hover:text-blue-700">Seguir</button>
        </div>
    `).join('');
}

// Função interativa de Curtir (Like)
function toggleLike(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid', 'text-red-500');
    } else {
        icon.classList.remove('fa-solid', 'text-red-500');
        icon.classList.add('fa-regular');
    }
}