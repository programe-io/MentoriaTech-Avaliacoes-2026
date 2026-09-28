// Base de dados inicial de artigos do blog de jogos
let posts = [
    {
        id: 1,
        title: "Cyberpunk 2077: Phantom Liberty",
        category: "RPG",
        rating: 9.8,
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
        excerpt: "A expansão definitiva que resgatou o potencial máximo de Night City com uma história digna de cinema.",
        content: "Phantom Liberty transforma Cyberpunk 2077 em uma experiência impecável de espionagem cibernética. Com novas mecânicas de combate, uma árvore de habilidades totalmente reformulada e atuações de peso como a de Idris Elba, a CD Projekt Red entrega aqui tudo o que os fãs esperavam desde o lançamento original. A atmosfera sombria, trilha sonora imersiva e escolhas morais complexas elevam o patamar do gênero RPG de ação.",
        likes: 124,
        comments: [
            { author: "Lucas Gamer", text: "Achei a história do Reed fantástica!" },
            { author: "Maria Clara (Dev)", text: "Concordo totalmente, a trilha sonora da expansão é obra-prima!" }
        ],
        date: "24 de Set, 2026"
    },
    {
        id: 2,
        title: "Valorant: O Cenário Competitivo em 2026",
        category: "FPS",
        rating: 8.9,
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
        excerpt: "Novos agentes, mapas dinâmicos e atualizações de balanceamento que agitaram o meta dos eSports.",
        content: "O FPS tático da Riot Games continua ditando o ritmo dos eSports globais. Com a introdução recente de novos mapas verticais e alterações cruciais nas habilidades dos duelistas, o jogo exige cada vez mais sinergia de equipe e mira afiada. Analisamos as principais mudanças de balanceamento e tier list dos melhores agentes da temporada atual.",
        likes: 85,
        comments: [
            { author: "Ana Souza", text: "Jett ainda continua quebrada? O que acham?" }
        ],
        date: "22 de Set, 2026"
    },
    {
        id: 3,
        title: "Hollow Knight: Silksong - O Fenômeno Indie",
        category: "Indie",
        rating: 9.5,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        excerpt: "Explorando Pharloom com Hornet em uma aventura metroidvania desafiadora e visualmente estonteante.",
        content: "A Team Cherry superou as expectativas com Silksong. Hornet traz uma agilidade formidável ao combate, com um sistema de criação rápida de ferramentas e armadilhas em tempo real. A exploração de Pharloom é vasta, cheia de segredos bem guardados, trilha sonora orquestrada impecável e chefes que exigem paciência e reflexos rápidos.",
        likes: 210,
        comments: [
            { author: "Carlos Silva", text: "Demorou mas valeu cada segundo de espera!" }
        ],
        date: "19 de Set, 2026"
    },
    {
        id: 4,
        title: "God of War Ragnarok: Valhalla",
        category: "Ação",
        rating: 9.3,
        image: "https://images.unsplash.com/photo-1612287233002-91d015382d3e?auto=format&fit=crop&w=800&q=80",
        excerpt: "O modo roguelike gratuito que expande a jornada emocional de Kratos rumo à autoaceitação.",
        content: "Santa Monica Studio surpreendeu a comunidade com a DLC Valhalla. Misturando elementos de roguelike com uma narrativa profunda de autoconhecimento para Kratos, cada jogada revela novos fragmentos do passado espartano do Deus da Guerra. O combate permanece visceral e gratificante.",
        likes: 142,
        comments: [],
        date: "15 de Set, 2026"
    }
];

let currentCategory = 'todos';

// Renderizar posts ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderPosts(posts);

    // Event listener para a barra de pesquisa
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = posts.filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.excerpt.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        );
        renderPosts(filtered);
    });
});

// Função para exibir os posts no grid
function renderPosts(postsToRender) {
    const grid = document.getElementById('postsGrid');
    const noResults = document.getElementById('noResults');
    const postCount = document.getElementById('postCount');

    grid.innerHTML = '';
    postCount.innerText = `Mostrando ${postsToRender.length} artigo(s)`;

    if (postsToRender.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    postsToRender.forEach(post => {
        const card = document.createElement('div');
        card.className = "bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden card-hover flex flex-col justify-between";
        card.innerHTML = `
            <div>
                <div class="relative h-48 overflow-hidden group">
                    <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute top-3 left-3 bg-dark-900/80 backdrop-blur-md text-neon-cyan text-xs px-3 py-1 rounded-full font-mono border border-dark-600">${post.category}</span>
                    <span class="absolute top-3 right-3 bg-neon-pink/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">${post.rating} / 10</span>
                </div>
                <div class="p-6">
                    <span class="text-xs text-gray-500 font-mono">${post.date}</span>
                    <h3 class="text-xl font-bold font-['Rajdhani'] mt-1 mb-2 text-gray-100 hover:text-neon-cyan transition cursor-pointer" onclick="openReadModal(${post.id})">${post.title}</h3>
                    <p class="text-gray-400 text-sm line-clamp-2">${post.excerpt}</p>
                </div>
            </div>
            <div class="px-6 pb-6 pt-2 flex items-center justify-between border-t border-dark-600/40 text-xs text-gray-400">
                <div class="flex items-center space-x-4">
                    <button onclick="likePost(${post.id})" class="flex items-center space-x-1 hover:text-neon-pink transition">
                        <i class="fa-solid fa-heart text-neon-pink"></i>
                        <span>${post.likes}</span>
                    </button>
                    <button onclick="openReadModal(${post.id})" class="flex items-center space-x-1 hover:text-neon-cyan transition">
                        <i class="fa-solid fa-comment text-gray-400"></i>
                        <span>${post.comments.length}</span>
                    </button>
                </div>
                <button onclick="openReadModal(${post.id})" class="text-neon-cyan font-semibold hover:underline">Ler análise &rarr;</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtrar por Categoria
function filterCategory(category) {
    currentCategory = category;
    
    // Atualizar estilo visual dos botões
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if(btn.innerText.toLowerCase() === category.toLowerCase() || (category === 'todos' && btn.innerText === 'Todos')) {
            btn.className = "cat-btn active px-5 py-2 rounded-lg text-sm font-semibold transition border border-dark-600 bg-dark-700 text-neon-cyan";
        } else {
            btn.className = "cat-btn px-5 py-2 rounded-lg text-sm font-semibold transition border border-dark-600 bg-dark-700 text-gray-300 hover:text-white";
        }
    });

    if (category === 'todos') {
        renderPosts(posts);
    } else {
        const filtered = posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
        renderPosts(filtered);
    }
}

// Curtir post
function likePost(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.likes++;
        renderPosts(currentCategory === 'todos' ? posts : posts.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase()));
    }
}

// Modal de Leitura Completa
function openReadModal(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="mb-6">
            <div class="flex items-center space-x-2 mb-2">
                <span class="bg-dark-700 text-neon-cyan text-xs px-3 py-1 rounded-full font-mono border border-dark-600">${post.category}</span>
                <span class="text-xs text-gray-400 font-mono">${post.date}</span>
                <span class="text-xs bg-neon-pink/10 text-neon-pink px-2 py-0.5 rounded font-bold">Nota: ${post.rating}/10</span>
            </div>
            <h2 class="text-3xl font-bold font-['Rajdhani'] mb-4">${post.title}</h2>
            <img src="${post.image}" alt="${post.title}" class="w-full h-64 object-cover rounded-xl mb-6 border border-dark-600">
            <p class="text-gray-300 text-base leading-relaxed mb-6">${post.content}</p>
        </div>

        <div class="border-t border-dark-600 pt-6">
            <h4 class="font-bold font-['Rajdhani'] text-lg mb-4 flex items-center space-x-2">
                <i class="fa-solid fa-comments text-neon-cyan"></i>
                <span>Comentários (${post.comments.length})</span>
            </h4>
            <div id="commentsList" class="space-y-3 mb-6 max-h-40 overflow-y-auto pr-2">
                ${post.comments.length === 0 ? '<p class="text-xs text-gray-500 italic">Nenhum comentário ainda. Seja o primeiro!</p>' : 
                  post.comments.map(c => `
                    <div class="bg-dark-700/60 p-3 rounded-lg border border-dark-600/50 text-xs">
                        <strong class="text-neon-cyan font-semibold block mb-1">${c.author}</strong>
                        <p class="text-gray-300">${c.text}</p>
                    </div>
                  `).join('')}
            </div>
            <form onsubmit="handleAddComment(event, ${post.id})" class="flex gap-2">
                <input type="text" id="commentAuthor" required placeholder="Seu nome" class="w-1/3 bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-neon-cyan">
                <input type="text" id="commentText" required placeholder="Escreva um comentário..." class="flex-grow bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-neon-cyan">
                <button type="submit" class="bg-neon-cyan text-dark-900 font-bold px-4 py-2 rounded-lg text-xs hover:opacity-90 transition">Enviar</button>
            </form>
        </div>
    `;

    document.getElementById('readModal').classList.remove('hidden');
    document.getElementById('readModal').classList.add('flex');
}

function closeReadModal() {
    document.getElementById('readModal').classList.remove('flex');
    document.getElementById('readModal').classList.add('hidden');
}

// Adicionar Comentário
function handleAddComment(event, postId) {
    event.preventDefault();
    const author = document.getElementById('commentAuthor').value;
    const text = document.getElementById('commentText').value;

    const post = posts.find(p => p.id === postId);
    if (post) {
        post.comments.push({ author, text });
        openReadModal(postId); // Recarrega o modal para atualizar a lista
        renderPosts(currentCategory === 'todos' ? posts : posts.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase()));
    }
}

// Modal de Novo Post
function openNewPostModal() {
    document.getElementById('newPostModal').classList.remove('hidden');
    document.getElementById('newPostModal').classList.add('flex');
}

function closeNewPostModal() {
    document.getElementById('newPostModal').classList.remove('hidden');
    document.getElementById('newPostModal').classList.add('hidden');
}

// Lidar com criação de novo post
function handleNewPost(event) {
    event.preventDefault();
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const rating = parseFloat(document.getElementById('postRating').value);
    const image = document.getElementById('postImage').value;
    const excerpt = document.getElementById('postExcerpt').value;
    const content = document.getElementById('postContentText').value;

    const newPost = {
        id: posts.length + 1,
        title,
        category,
        rating,
        image,
        excerpt,
        content,
        likes: 0,
        comments: [],
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    posts.unshift(newPost);
    closeNewPostModal();
    document.getElementById('newPostForm').reset();
    renderPosts(currentCategory === 'todos' ? posts : posts.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase()));
}