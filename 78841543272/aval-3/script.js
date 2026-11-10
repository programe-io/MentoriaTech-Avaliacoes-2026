
// =====================================
// DADOS DOS STORIES
// =====================================

const storiesData = [
  { username: "seu_story", image: 12, own: true },
  { username: "ana_silva", image:  girl = 47 },
  { username: "pedro.dev", image: 11 },
  { username: "mariana", image: 44 },
  { username: "gabriel", image: 13 },
  { username: "juliana", image: 49 },
  { username: "lucas", image: 14 },
  { username: "carolina", image: 45 }
];

// Corrige os dados dos avatares
storiesData[1].image = 47;

// =====================================
// DADOS DAS PUBLICAÇÕES
// =====================================

const posts = [
  {
    id: 1,
    username: "ana_silva",
    avatar: 47,
    location: "Rio de Janeiro, Brasil",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
    likes: 1248,
    description: "Um dia incrível para guardar na memória! ☀️🌊",
    comments: 32,
    liked: false
  },
  {
    id: 2,
    username: "pedro.dev",
    avatar: 11,
    location: "São Paulo, Brasil",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
    likes: 856,
    description: "Explorando novos horizontes 🚀",
    comments: 18,
    liked: false
  },
  {
    id: 3,
    username: "mariana",
    avatar: 44,
    location: "Paris, França",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900",
    likes: 2350,
    description: "Paris sempre será uma boa ideia! ❤️",
    comments: 76,
    liked: false
  }
];

// =====================================
// DADOS DAS SUGESTÕES
// =====================================

const suggestionsData = [
  { username: "gabriel", avatar: 13 },
  { username: "juliana", avatar: 49 },
  { username: "lucas", avatar: 14 },
  { username: "carolina", avatar: 45 },
  { username: "fernando", avatar: 15 }
];

// =====================================
// RENDERIZAR STORIES
// =====================================

const storiesContainer = document.getElementById("stories");

storiesData.forEach(story => {

  storiesContainer.innerHTML += `
    <div class="flex flex-col items-center min-w-[62px] cursor-pointer">

      <div class="${story.own ? "border-2 border-gray-300" : "story-gradient p-[3px]"} rounded-full">

        <img
          src="https://i.pravatar.cc/100?img=${story.image}"
          class="w-14 h-14 rounded-full border-2 border-white object-cover"
        >

      </div>

      <span class="text-xs mt-1 truncate w-16 text-center">
        ${story.username}
      </span>

    </div>
  `;

});

// =====================================
// RENDERIZAR FEED
// =====================================

const feedContainer = document.getElementById("feed");

function renderPosts() {

  feedContainer.innerHTML = "";

  posts.forEach(post => {

    const postElement = document.createElement("article");

    postElement.className = "bg-white border rounded-lg overflow-hidden";

    postElement.innerHTML = `

      <!-- CABEÇALHO -->

      <div class="flex items-center justify-between p-3">

        <div class="flex items-center gap-3">

          <div class="story-gradient p-[2px] rounded-full">

            <img
              src="https://i.pravatar.cc/100?img=${post.avatar}"
              class="w-9 h-9 rounded-full border-2 border-white"
            >

          </div>

          <div>
            <p class="text-sm font-semibold">${post.username}</p>
            <p class="text-xs text-gray-500">${post.location}</p>
          </div>

        </div>

        <button class="text-xl font-bold">···</button>

      </div>

      <!-- IMAGEM -->

      <div>
        <img
          src="${post.image}"
          class="w-full aspect-square object-cover"
          alt="Publicação de ${post.username}"
        >
      </div>

      <!-- AÇÕES -->

      <div class="p-3">

        <div class="flex justify-between mb-3">

          <div class="flex gap-4">

            <button
              class="like-button"
              data-id="${post.id}"
              aria-label="Curtir publicação"
            >
              <i data-lucide="heart"
                class="w-6 h-6 ${post.liked ? 'fill-red-500 text-red-500' : ''}">
              </i>
            </button>

            <button class="comment-button" data-id="${post.id}">
              <i data-lucide="message-circle" class="w-6 h-6"></i>
            </button>

            <button>
              <i data-lucide="send" class="w-6 h-6"></i>
            </button>

          </div>

          <button>
            <i data-lucide="bookmark" class="w-6 h-6"></i>
          </button>

        </div>

        <!-- CURTIDAS -->

        <p class="text-sm font-semibold mb-2">
          ${post.likes.toLocaleString("pt-BR")} curtidas
        </p>

        <!-- DESCRIÇÃO -->

        <p class="text-sm mb-2">
          <span class="font-semibold">${post.username}</span>
          ${post.description}
        </p>

        <!-- COMENTÁRIOS -->

        <button class="text-sm text-gray-500 mb-2">
          Ver todos os ${post.comments} comentários
        </button>

        <div class="flex items-center border-t pt-3 gap-2">

          <input
            type="text"
            placeholder="Adicione um comentário..."
            class="comment-input text-sm outline-none flex-1 min-w-0"
            data-id="${post.id}"
          >

          <button
            class="publish-comment text-blue-500 font-semibold text-sm"
            data-id="${post.id}"
          >
            Publicar
          </button>

        </div>

      </div>

    `;

    feedContainer.appendChild(postElement);

  });

  lucide.createIcons();

}

// =====================================
// CURTIR PUBLICAÇÃO
// =====================================

feedContainer.addEventListener("click", event => {

  const button = event.target.closest(".like-button");

  if (!button) return;

  const id = Number(button.dataset.id);

  const post = posts.find(item => item.id === id);

  if (!post) return;

  post.liked = !post.liked;

  post.likes += post.liked ? 1 : -1;

  renderPosts();

});

// =====================================
// ADICIONAR COMENTÁRIOS
// =====================================

feedContainer.addEventListener("click", event => {

  const button = event.target.closest(".publish-comment");

  if (!button) return;

  const id = Number(button.dataset.id);

  const input = feedContainer.querySelector(
    `.comment-input[data-id="${id}"]`
  );

  const comment = input.value.trim();

  if (!comment) return;

  const post = posts.find(item => item.id === id);

  if (!post) return;

  post.comments++;

  alert("Comentário publicado: " + comment);

  renderPosts();

});

// =====================================
// SUGESTÕES DE PERFIS
// =====================================

const suggestionsContainer = document.getElementById("suggestions");

suggestionsData.forEach(user => {

  suggestionsContainer.innerHTML += `

    <div class="flex items-center justify-between">

      <div class="flex items-center gap-3">

        <img
          src="https://i.pravatar.cc/100?img=${user.avatar}"
          class="w-9 h-9 rounded-full"
        >

        <div>
          <p class="text-sm font-semibold">${user.username}</p>
          <p class="text-xs text-gray-400">Sugestão para você</p>
        </div>

      </div>

      <button
        class="follow-button text-blue-500 text-xs font-semibold"
      >
        Seguir
      </button>

    </div>

  `;

});

// =====================================
// SEGUIR E DEIXAR DE SEGUIR
// =====================================

suggestionsContainer.addEventListener("click", event => {

  const button = event.target.closest(".follow-button");

  if (!button) return;

  if (button.textContent.trim() === "Seguir") {

    button.textContent = "Seguindo";
    button.classList.remove("text-blue-500");
    button.classList.add("text-gray-500");

  } else {

    button.textContent = "Seguir";
    button.classList.remove("text-gray-500");
    button.classList.add("text-blue-500");

  }

});

// =====================================
// INICIALIZAÇÃO
// =====================================

renderPosts();
