// Postagens iniciais falsas (Mock)
let feedPosts = [
    {
        id: 1,
        username: "MarombaMaster",
        text: "Esmaga que cresce! Treino de peito concluído com sucesso às 6h da manhã.",
        type: "🏋️‍♂️ Musculação",
        intensity: "🔥🔥🔥 Intenso",
        time: "Há 10 min",
        likes: 4,
        likedByUser: false
    },
    {
        id: 2,
        username: "RunnerVida",
        text: "Corrida leve de 5km para manter o fôlego em dia.",
        type: "🏃‍♂️ Corrida / Cardio",
        intensity: "🔥 Leve",
        time: "Há 1 hora",
        likes: 12,
        likedByUser: false
    }
];

// Carregar elementos do DOM
const feedContainer = document.getElementById('feed');
const postForm = document.getElementById('post-form');
const totalWorkoutsSpan = document.getElementById('total-workouts');

// Atualiza o contador de treinos no Perfil
function updateProfileStats() {
    totalWorkoutsSpan.textContent = feedPosts.length;
}

// Renderiza todos os posts na tela
function renderFeed() {
    feedContainer.innerHTML = '';

    feedPosts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <div class="post-user">
                <span>@${post.username}</span>
                <span class="post-time">${post.time}</span>
            </div>
            <p class="post-text">${post.text}</p>
            <div class="tags-container">
                <span class="badge">${post.type}</span>
                <span class="badge intensity">${post.intensity}</span>
            </div>
            <div class="post-actions">
                <button class="btn-like ${post.likedByUser ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    ❤️ <span>${post.likes} Curtidas</span>
                </button>
            </div>
        `;

        feedContainer.appendChild(postElement);
    });

    updateProfileStats();
}

// Função para Curtir / Descurtir
function toggleLike(postId) {
    const post = feedPosts.find(p => p.id === postId);
    if (post) {
        if (post.likedByUser) {
            post.likes--;
            post.likedByUser = false;
        } else {
            post.likes++;
            post.likedByUser = true;
        }
        renderFeed();
    }
}

// Ouvinte do formulário de envio de treino
postForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    const textInput = document.getElementById('post-text');
    const typeInput = document.getElementById('exercise-type');
    const intensityInput = document.getElementById('intensity-level');

    // Cria o novo objeto do post
    const newPost = {
        id: Date.now(), // Gera ID único aproximado
        username: "atleta_focado", // Nome do usuário logado
        text: textInput.value,
        type: typeInput.value,
        intensity: intensityInput.value,
        time: "Agora mesmo",
        likes: 0,
        likedByUser: false
    };

    // Insere o post no início do array do feed
    feedPosts.unshift(newPost);

    // Limpa o formulário
    textInput.value = '';
    typeInput.selectedIndex = 0;
    intensityInput.selectedIndex = 0;

    // Recarrega o feed visualmente
    renderFeed();
});

// Inicialização Inicial do App
document.addEventListener('DOMContentLoaded', renderFeed);
