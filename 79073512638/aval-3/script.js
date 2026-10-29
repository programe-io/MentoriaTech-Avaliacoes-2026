// Dados simulados do Instagram (Posts e Stories)
const instagramData = {
  currentUser: {
    username: "seu_usuario",
    name: "Seu Nome",
    avatar: "https://via.placeholder.com/56"
  },
  stories: [
    { id: 1, username: "seu_story", avatar: "https://via.placeholder.com/56", active: false },
    { id: 2, username: "carlos_dev", avatar: "https://via.placeholder.com/56", active: true },
    { id: 3, username: "ana_tech", avatar: "https://via.placeholder.com/56", active: true },
    { id: 4, username: "design_hub", avatar: "https://via.placeholder.com/56", active: true }
  ],
  posts: [
    {
      id: 101,
      username: "ana_tech",
      userAvatar: "https://via.placeholder.com/32",
      timeAgo: "2 h",
      mediaUrl: "https://via.placeholder.com/600x600",
      likesCount: 1243,
      isLiked: false,
      isSaved: false,
      caption: "Finalizando a nova interface do projeto! O que acharam? 🚀💻 #developer #webdesign",
      comments: [
        { id: 1, username: "carlos_dev", text: "Ficou muito sensacional!" }
      ]
    }
  ],
  suggestions: [
    { id: 1, username: "marcos_code", relation: "Sugestão para você", avatar: "https://via.placeholder.com/32", isFollowing: false },
    { id: 2, username: "frontend_brasil", relation: "Seguido por ana_tech + 3", avatar: "https://via.placeholder.com/32", isFollowing: false }
  ]
};

// Inicializador da aplicação
document.addEventListener("DOMContentLoaded", () => {
  renderStories();
  renderPosts();
  renderSuggestions();
  setupCommentForm();
});

// Renderizar Stories
function renderStories() {
  const storiesContainer = document.querySelector(".stories-container");
  if (!storiesContainer) return;

  storiesContainer.innerHTML = instagramData.stories.map(story => `
    <div class="story" onclick="viewStory(${story.id})">
      <div class="story-ring ${story.active ? 'active' : ''}">
        <img src="${story.avatar}" alt="${story.username}">
      </div>
      <span>${story.username}</span>
    </div>
  `).join('');
}

// Renderizar Posts no Feed
function renderPosts() {
  const feedSection = document.querySelector(".feed");
  if (!feedSection) return;

  feedSection.innerHTML = instagramData.posts.map(post => `
    <article class="post" data-post-id="${post