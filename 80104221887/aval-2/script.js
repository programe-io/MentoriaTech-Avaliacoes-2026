 const storiesData = [
  { user: "seu_story", avatar: "https://picsum.photos" },
  { user: "ana.dev", avatar: "https://picsum.photos" },
  { user: "lucas_ui", avatar: "https://picsum.photos" },
  { user: "cafe.codigo", avatar: "https://picsum.photos" },
  { user: "viagens.br", avatar: "https://picsum.photos" }
];

const postsData = [
  {
    id: 1,
    user: "ana.dev",
    location: "Teresina, PI",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    likes: 142,
    liked: false,
    caption: "Setup pronto para estudar JavaScript puro hoje.",
    time: "há 2 horas",
    comments: [{ user: "lucas_ui", text: "Ficou muito limpo!" }]
  },
  {
    id: 2,
    user: "viagens.br",
    location: "Delta do Parnaíba",
    avatar: "https://picsum.photos",
    image: "https://picsum.photos",
    likes: 318,
    liked: true,
    caption: "Fim de tarde incrível por aqui.",
    time: "há 5 horas",
    comments: []
  }
];

const storiesEl = document.getElementById("stories");
const feedEl = document.getElementById("feed");

function renderStories() {
  storiesEl.innerHTML = storiesData
    .map(
      (story) => `
      <div class="story">
        <div class="story-ring">
          <img src="${story.avatar}" alt="${story.user}" />
        </div>
        <span>${story.user}</span>
      </div>
    `
    )
    .join("");
}

function renderFeed() {
  feedEl.innerHTML = postsData
    .map(
      (post) => `
      <article class="post" data-id="${post.id}">
        <header class="post-header">
          <img class="avatar" src="${post.avatar}" alt="${post.user}" />
          <div>
            <div class="post-user">${post.user}</div>
            <div class="post-location">${post.location}</div>
          </div>
        </header>

        <div class="post-media" data-action="dbl-like">
          <img src="${post.image}" alt="Post de ${post.user}" />
          <div class="heart-overlay">❤️</div>
        </div>

        <div class="post-body">
          <div class="actions">
            <button class="action-btn" data-action="toggle-like" aria-label="Curtir">
              ${post.liked ? "❤️" : "🤍"}
            </button>
            <button class="action-btn" data-action="focus-comment" aria-label="Comentar">💬</button>
          </div>

          <div class="likes">${post.likes} curtidas</div>
          <p class="caption"><strong>${post.user}</strong> ${post.caption}</p>

          <div class="comments">
            ${post.comments
              .map((c) => `<p class="comment-item"><strong>${c.user}</strong> ${c.text}</p>`)
              .join("")}
          </div>

          <div class="time">${post.time}</div>

          <form class="comment-form">
            <input type="text" placeholder="Adicione um comentário..." required />
            <button type="submit">Publicar</button>
          </form>
        </div>
      </article>
    `
    )
    .join("");
}

feedEl.addEventListener("click", (event) => {
  const postEl = event.target.closest(".post");
  if (!postEl) return;
  const post = postsData.find((p) => p.id === Number(postEl.dataset.id));

  if (event.target.closest('[data-action="toggle-like"]')) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
  }

  if (event.target.closest('[data-action="focus-comment"]')) {
    postEl.querySelector("input").focus();
  }
});

feedEl.addEventListener("dblclick", (event) => {
  const mediaEl = event.target.closest('[data-action="dbl-like"]');
  if (!mediaEl) return;

  const postEl = mediaEl.closest(".post");
  const post = postsData.find((p) => p.id === Number(postEl.dataset.id));

  if (!post.liked) {
    post.liked = true;
    post.likes += 1;
    renderFeed();
  }

  const updatedHeart = feedEl.querySelector(`.post[data-id="${post.id}"] .heart-overlay`);
  updatedHeart.classList.add("show");
  setTimeout(() => updatedHeart.classList.remove("show"), 600);
});

feedEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target.closest(".comment-form");
  if (!form) return;

  const input = form.querySelector("input");
  const text = input.value.trim();
  if (!text) return;

  const postEl = form.closest(".post");
  const post = postsData.find((p) => p.id === Number(postEl.dataset.id));
  post.comments.push({ user: "voce", text });
  renderFeed();
});

document.getElementById("newPostBtn").addEventListener("click", () => {
  const caption = prompt("Escreva a legenda da nova foto:");
  if (!caption) return;

  postsData.unshift({
    id: Date.now(),
    user: "voce",
    location: "Brasil",
    avatar: "https://picsum.photos",
    image: `https://picsum.photos{Date.now()}/600`,
    likes: 1,
    liked: true,
    caption,
    time: "agora",
    comments: []
  });
  renderFeed();
});

renderStories();
renderFeed();
