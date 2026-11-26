const STORAGE_KEY = "insta_clone_posts_v1";

const storiesData = [
  { user: "ana_silva", avatar: "https://pravatar.cc" },
  { user: "lucas_dev", avatar: "https://pravatar.cc" },
  { user: "mari_fotografia", avatar: "https://pravatar.cc" },
  { user: "pedro_viagens", avatar: "https://pravatar.cc" },
  { user: "bia_design", avatar: "https://pravatar.cc" }
];

const defaultPosts = [
  {
    id: 1,
    username: "mari_fotografia",
    avatar: "https://pravatar.cc",
    image: "https://picsum.photos",
    caption: "Tarde tranquila explorando novas paisagens.",
    likes: 24,
    liked: false,
    comments: [{ user: "lucas_dev", text: "Foto incrível!" }]
  },
  {
    id: 2,
    username: "lucas_dev",
    avatar: "https://pravatar.cc",
    image: "https://picsum.photos",
    caption: "Codando projetos front-end com JavaScript puro.",
    likes: 41,
    liked: true,
    comments: [{ user: "ana_silva", text: "Ficou muito bom!" }]
  }
];

let posts = loadPosts();

const storiesList = document.getElementById("stories-list");
const feedList = document.getElementById("feed-list");
const postForm = document.getElementById("post-form");

function loadPosts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : defaultPosts;
}

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function renderStories() {
  storiesList.innerHTML = storiesData
    .map(
      (story) => `
      <div class="story" title="Story de @${story.user}">
        <div class="story-ring">
          <img src="${story.avatar}" alt="${story.user}" />
        </div>
        <span>${story.user}</span>
      </div>
    `
    )
    .join("");
}

function toggleLike(postId) {
  posts = posts.map((post) => {
    if (post.id !== postId) return post;
    const liked = !post.liked;
    const likes = liked ? post.likes + 1 : Math.max(0, post.likes - 1);
    return { ...post, liked, likes };
  });
  savePosts();
  renderFeed();
}

function addComment(postId, text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  posts = posts.map((post) => {
    if (post.id !== postId) return post;
    return {
      ...post,
      comments: [...post.comments, { user: "voce", text: cleanText }]
    };
  });
  savePosts();
  renderFeed();
}

function renderFeed() {
  feedList.innerHTML = posts
    .map(
      (post) => `
      <article class="post">
        <div class="post-header">
          <img src="${post.avatar}" alt="${post.username}" />
          <span>${post.username}</span>
        </div>

        <img
          src="${post.image}"
          alt="Publicação de ${post.username}"
          class="post-image"
          data-dblclick-id="${post.id}"
        />

        <div class="post-actions">
          <button
            class="like-btn"
            data-like-id="${post.id}"
            aria-label="Curtir publicação"
          >
            ${post.liked ? "❤️" : "🤍"}
          </button>
        </div>

        <div class="post-body">
          <div class="likes-count">${post.likes} curtidas</div>
          <p><strong>${post.username}</strong> ${post.caption}</p>

          <div class="comments-list">
            ${post.comments
              .map(
                (c) => `<p><strong>${c.user}</strong> ${c.text}</p>`
              )
              .join("")}
          </div>
        </div>

        <form class="comment-form" data-comment-form-id="${post.id}">
          <input
            type="text"
            placeholder="Adicione um comentário..."
            required
          />
          <button type="submit">Publicar</button>
        </form>
      </article>
    `
    )
    .join("");
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const imageUrl = document.getElementById("image-url").value.trim();
  const caption = document.getElementById("caption-input").value.trim();
  if (!imageUrl || !caption) return;

  const newPost = {
    id: Date.now(),
    username: "voce",
    avatar: "https://pravatar.cc2",
    image: imageUrl,
    caption,
    likes: 0,
    liked: false,
    comments: []
  };

  posts = [newPost, ...posts];
  savePosts();
  renderFeed();
  postForm.reset();
});

feedList.addEventListener("click", (event) => {
  const likeBtn = event.target.closest("[data-like-id]");
  if (likeBtn) {
    toggleLike(Number(likeBtn.dataset.likeId));
  }
});

feedList.addEventListener("dblclick", (event) => {
  const img = event.target.closest("[data-dblclick-id]");
  if (img) {
    const postId = Number(img.dataset.dblclickId);
    const post = posts.find((item) => item.id === postId);
    if (post && !post.liked) {
      toggleLike(postId);
    }
  }
});

feedList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-comment-form-id]");
  if (!form) return;
  event.preventDefault();
  const input = form.querySelector("input");
  addComment(Number(form.dataset.commentFormId), input.value);
  input.value = "";
});

renderStories();
renderFeed();
