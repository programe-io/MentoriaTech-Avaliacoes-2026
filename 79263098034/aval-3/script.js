// Dados Mockados dos Posts
const posts = [
    {
        id: 1,
        username: "carlos_dev",
        userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        location: "São Paulo, Brasil",
        postImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        likes: 1242,
        caption: "Explorando novos horizontes com código e café. ☕💻 #developer #tailwind",
        comments: [
            { username: "ana_silva", text: "Muito irado esse setup!" },
            { username: "lucas_moura", text: "Top demais mano!" }
        ],
        liked: false
    },
    {
        id: 2,
        username: "ana_silva",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        location: "Rio de Janeiro, Brasil",
        postImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        likes: 859,
        caption: "Dia perfeito na praia! 🌊☀️",
        comments: [
            { username: "carlos_dev", text: "Que lugar maravilhoso!" }
        ],
        liked: true
    }
];

// Elementos do DOM
const feedContainer = document.getElementById('feed-container');
const modal = document.getElementById('post-modal');
const openModalBtn = document.getElementById('open-modal');
const openModalMobileBtn = document.getElementById('open-modal-mobile');
const closeModalBtn = document.getElementById('close-modal');

// Renderizar o Feed
function renderFeed() {
    feedContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'w-full bg-black md:border md:border-zinc-800 md:rounded-lg mb-4';
        
        postElement.innerHTML = `
            <!-- Cabeçalho do Post -->
            <div class="flex items-center justify-between p-3">
                <div class="flex items-center gap-3">
                    <img src="${post.userAvatar}" class="w-8 h-8 rounded-full object-cover" alt="${post.username}">
                    <div>
                        <span class="text-sm font-semibold block">${post.username}</span>
                        <span class="text-xs text-zinc-400 block">${post.location}</span>
                    </div>
                </div>
                <button class="text-zinc-400 hover:text-white"><i class="fa-solid fa-ellipsis"></i></button>
            </div>

            <!-- Imagem do Post -->
            <div class="w-full max-h-[585px] overflow-hidden bg-zinc-900 flex items-center justify-center">
                <img src="${post.postImage}" class="w-full h-full object-cover" alt="Post Image">
            </div>

            <!-- Ações (Curtir, Comentar, Compartilhar) -->
            <div class="p-3">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-4 text-2xl">
                        <button onclick="toggleLike(${post.id})" class="transition hover:scale-110">
                            <i class="${post.liked ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'}"></i>
                        </button>
                        <button class="hover:text-zinc-400 transition"><i class="fa-regular fa-comment"></i></button>
                        <button class="hover:text-zinc-400 transition"><i class="fa-regular fa-paper-plane"></i></button>
                    </div>
                    <button class="text-2xl hover:text-zinc-400 transition"><i class="fa-regular fa-bookmark"></i></button>
                </div>

                <!-- Curtidas -->
                <span class="text-sm font-semibold block mb-1">${post.likes.toLocaleString()} curtidas</span>

                <!-- Legenda -->
                <div class="text-sm mb-2">
                    <span class="font-semibold mr-2">${post.username}</span>
                    <span>${post.caption}</span>
                </div>

                <!-- Comentários -->
                <div class="text-sm text-zinc-400 mb-2 cursor-pointer">
                    Ver todos os ${post.comments.length} comentários
                </div>

                <div class="space-y-1 mb-3">
                    ${post.comments.map(c => `
                        <div class="text-sm">
                            <span class="font-semibold text-white mr-2">${c.username}</span>
                            <span>${c.text}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Adicionar Comentário -->
                <div class="border-t border-zinc-800 pt-3 flex items-center justify-between">
                    <input type="text" placeholder="Adicione um comentário..." class="bg-transparent text-sm w-full outline-none text-white placeholder-zinc-500">
                    <button class="text-blue-500 font-semibold text-sm hover:text-white transition">Publicar</button>
                </div>
            </div>
        `;
        feedContainer.appendChild(postElement);
    });
}

// Alternar Curtida
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        if (post.liked) {
            post.liked = false;
            post.likes -= 1;
        } else {
            post.liked = true;
            post.likes += 1;
        }
        renderFeed();
    }
}

// Controle do Modal de Criar Post
openModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
});

openModalMobileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Inicializar Aplicação
document.addEventListener('DOMContentLoaded', () => {
    renderFeed();
});