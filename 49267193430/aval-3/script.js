// Dados simulados para os Stories
const storiesData = [
    { username: "seu_story", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
    { username: "julia_code", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" },
    { username: "tech_daily", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" },
    { username: "nature_trip", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
    { username: "cafe_lovers", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" }
];

// Dados simulados para as Publicações do Feed
const postsData = [
    {
        id: 1,
        username: "tech_daily",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        likes: 1240,
        caption: "Explorando as novas possibilidades de desenvolvimento em hardware e IA para este ano. 🚀",
        liked: false
    },
    {
        id: 2,
        username: "nature_trip",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        likes: 856,
        caption: "Paisagens que renovam qualquer energia no meio da semana. ⛰️✨",
        liked: true
    }
];

const storiesContainer = document.getElementById('storiesContainer');
const postsFeed = document.getElementById('postsFeed');

// Renderizar Stories
function renderStories() {
    storiesContainer.innerHTML = '';
    storiesData.forEach(story => {
        const item = document.createElement('div');
        item.className = 'story-item';
        item.innerHTML = `
            <div class="story-ring">
                <div class="story-img" style="background-image: url('${story.avatar}')"></div>
            </div>
            <span>${story.username}</span>
        `;
        storiesContainer.appendChild(item);
    });
}

// Renderizar Feed de Posts
function renderPosts() {
    postsFeed.innerHTML = '';
    postsData.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <div class="post-avatar" style="background-image: url('${post.avatar}')"></div>
                    <h4>${post.username}</h4>
                </div>
                <i class="fa-solid fa-ellipsis" style="cursor: pointer;"></i>
            </div>
            <div class="post-image-container">
                <img src="${post.image}" alt="Post image" class="post-image">
            </div>
            <div class="post-actions">
                <div class="post-actions-left">
                    <i class="${post.liked ? 'fa-solid fa-heart liked-icon' : 'fa-regular fa-heart'}" 
                       style="${post.liked ? 'color: #ed4956;' : ''}" 
                       onclick="toggleLike(${post.id})"></i>
                    <i class="fa-regular fa-comment"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                </div>
                <i class="fa-regular fa-bookmark"></i>
            </div>
            <div class="post-likes">${post.likes.toLocaleString()} curtidas</div>
            <div class="post-caption">
                <span>${post.username}</span> ${post.caption}
            </div>
        `;
        postsFeed.appendChild(postCard);
    });
}

// Alternar Curtida de Post
function toggleLike(id) {
    const post = postsData.find(p => p.id === id);
    if (post) {
        if (post.liked) {
            post.likes -= 1;
            post.liked = false;
        } else {
            post.likes += 1;
            post.liked = true;
        }
        renderPosts();
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderStories();
    renderPosts();
});