// Lista inicial de tweets simulados
let tweets = [
    {
        id: 1,
        name: "Marcos",
        username: "@marcosdev",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        text: "Desenvolvendo um clone simples do X em HTML, CSS e JavaScript puro! Curtindo bastante o resultado.",
        time: "2h",
        comments: 5,
        retweets: 12,
        likes: 48,
        liked: false
    },
    {
        id: 2,
        name: "Tecnologia Brasil",
        username: "@techbrasil",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
        text: "Aprender os fundamentos da web (HTML, CSS e JS) é o passo mais importante para qualquer iniciante na programação.",
        time: "5h",
        comments: 14,
        retweets: 35,
        likes: 120,
        liked: false
    }
];

const tweetInput = document.getElementById('tweetInput');
const tweetBtn = document.getElementById('tweetBtn');
const charCount = document.getElementById('charCount');
const feedContainer = document.getElementById('feedContainer');

// Controle de caracteres e botão postar
tweetInput.addEventListener('input', () => {
    const textLength = tweetInput.value.trim().length;
    const remaining = 280 - textLength;
    
    charCount.textContent = remaining;

    if (textLength > 0 && textLength <= 280) {
        tweetBtn.removeAttribute('disabled');
    } else {
        tweetBtn.setAttribute('disabled', 'true');
    }
});

// Função para renderizar o feed na tela
function renderFeed() {
    feedContainer.innerHTML = tweets.map(tweet => `
        <div class="tweet-card">
            <div class="tweet-avatar">
                <img src="${tweet.avatar}" alt="Avatar">
            </div>
            <div class="tweet-content">
                <div class="tweet-header-info">
                    <span class="tweet-name">${tweet.name}</span>
                    <span class="tweet-username">${tweet.username}</span>
                    <span>·</span>
                    <span class="tweet-time">${tweet.time}</span>
                </div>
                <p class="tweet-text">${escapeHTML(tweet.text)}</p>
                <div class="tweet-footer-actions">
                    <button class="tweet-action-btn comment">
                        <i class="fa-regular fa-comment"></i> ${tweet.comments}
                    </button>
                    <button class="tweet-action-btn retweet">
                        <i class="fa-solid fa-retweet"></i> ${tweet.retweets}
                    </button>
                    <button class="tweet-action-btn like ${tweet.liked ? 'liked' : ''}" onclick="toggleLike(${tweet.id})">
                        <i class="${tweet.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i> ${tweet.likes}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Criar um novo post ao clicar no botão
tweetBtn.addEventListener('click', () => {
    const text = tweetInput.value.trim();
    if (text === "") return;

    const newTweet = {
        id: Date.now(),
        name: "Marcos",
        username: "@marcosdev",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        text: text,
        time: "Agora",
        comments: 0,
        retweets: 0,
        likes: 0,
        liked: false
    };

    tweets.unshift(newTweet); // Adiciona no início do array
    tweetInput.value = "";
    charCount.textContent = "280";
    tweetBtn.setAttribute('disabled', 'true');
    renderFeed();
});

// Curtir / Descurtir post
window.toggleLike = function(id) {
    const tweet = tweets.find(t => t.id === id);
    if (tweet) {
        if (tweet.liked) {
            tweet.likes -= 1;
            tweet.liked = false;
        } else {
            tweet.likes += 1;
            tweet.liked = true;
        }
        renderFeed();
    }
};

// Segurança básica para escapar HTML inserido pelo usuário
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Carga inicial
renderFeed();