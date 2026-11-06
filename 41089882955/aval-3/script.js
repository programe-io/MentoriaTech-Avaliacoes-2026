const usersData = [
    { id: 1, username: 'seu_username', avatar: 'https://picsum.photos', isMe: true },
    { id: 2, username: 'gabi_art', avatar: 'https://picsum.photos' },
    { id: 3, username: 'viagens_br', avatar: 'https://picsum.photos' },
    { id: 4, username: 'chef_lucas', avatar: 'https://picsum.photos' },
    { id: 5, username: 'tech_news', avatar: 'https://picsum.photos' },
    { id: 6, username: 'pet_lovers', avatar: 'https://picsum.photos' }
];

const feedData = [
    {
        id: 101,
        userId: 3,
        postImage: 'https://picsum.photos',
        likes: 1240,
        caption: 'Que vista maravilhosa da viagem de hoje! 🏔️✨',
        liked: false
    },
    {
        id: 102,
        userId: 4,
        postImage: 'https://picsum.photos',
        likes: 412,
        caption: 'O almoço de domingo está servido. Quem vai? 🍝👨‍🍳',
        liked: false
    },
    {
        id: 103,
        userId: 2,
        postImage: 'https://picsum.photos',
        likes: 89,
        caption: 'Nova arte finalizada no estúdio hoje. 🎨🖌️',
        liked: false
    }
];

// Carrega os elementos da página
document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderFeed();
});

// Função para renderizar a barra de contas (Stories)
function renderStories() {
    const storiesWrapper = document.getElementById('stories-wrapper');
    storiesWrapper.innerHTML = '';

    usersData.forEach(user => {
        const label = user.isMe ? 'Seu Story' : user.username;
        const storyHtml = `
            <div class="story-item">
                <div class="story-ring">
                    <img src="${user.avatar}" alt="${user.username}">
                </div>
                <span class="story-username">${label}</span>
            </div>
        `;
        storiesWrapper.insertAdjacentHTML('beforeend', storyHtml);
    });
}

// Função para renderizar os posts do Feed
function renderFeed() {
    const feedWrapper = document.getElementById('feed-wrapper');
    feedWrapper.innerHTML = '';

    feedData.forEach(post => {
        const user = usersData.find(u => u.id === post.userId) || usersData[0];
        
        const postHtml = `
            <article class="post">
                <div class="post-header">
                    <div class="post-user-info">
                        <img src="${user.avatar}" class="post-avatar" alt="${user.username}">
                        <span class="post-username">${user.username}</span>
                    </div>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
                
                <img src="${post.postImage}" class="post-main-img" alt="Publicação">
                
                <div class="post-actions">
                    <div class="left-actions">
                        <i class="${post.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}" 
                           style="color: ${post.liked ? '#ed4956' : 'black'}" 
                           onclick="toggleLike(${post.id})"></i>
                        <i class="fa-regular fa-comment"></i>
                        <i class="fa-regular fa-paper-plane"></i>
                    </div>
                    <div class="right-actions">
                        <i class="fa-regular fa-bookmark"></i>
                    </div>
                </div>
                
                <div class="post-details">
                    <p class="likes-count">${post.likes.toLocaleString('pt-BR')} curtidas</p>
                    <p class="post-caption">
                        <span class="caption-user">${user.username}</span>${post.caption}
                    </p>
                </div>
            </article>
        `;
        feedWrapper.insertAdjacentHTML('beforeend', postHtml);
    });
}

// Função para dar/remover o like do post
function toggleLike(postId) {
    const post = feedData.find(p => p.id === postId);
    if (post) {
        if (post.liked) {
            post.liked = false;
            post.likes--;
        } else {
            post.liked = true;
            post.likes++;
        }
        renderFeed(); // Atualiza a interface do feed com o novo valor
    }
}