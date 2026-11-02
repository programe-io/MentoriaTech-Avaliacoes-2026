const posts = [
  {
    user: "RODRIGO",
    location: "Meu setup gamer",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1100&q=85",
    alt: "Computador gamer com iluminação colorida",
    likes: 1280,
    caption: "Setup dos sonhos! Qual jogo vocês estão jogando hoje? 🎮 #gamer #setup #games",
    time: "há 2 horas"
  },
  {
    user: "gamezone_news",
    location: "Destaque gamer",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1100&q=85",
    alt: "Arena de jogos eletrônicos",
    likes: 964,
    caption: "A energia das partidas competitivas é diferente! Qual seu game favorito? #esports #gaming",
    time: "há 5 horas"
  },
  {
    user: "RODRIGO",
    location: "Explorando novos jogos",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1100&q=85",
    alt: "Controle de videogame e ambiente de jogos",
    likes: 2134,
    caption: "Sempre tem um novo mundo para explorar. Deixe aqui sua recomendação de jogo! #gaming #player",
    time: "ontem"
  }
];

const postsContainer = document.querySelector("#posts-container");

function createPost(post) {
  const article = document.createElement("article");
  article.className = "post";

  article.innerHTML = `
    <div class="post-header">
      <span class="avatar">${post.user.charAt(0).toUpperCase()}</span>

      <div class="post-user">
        <strong>${post.user}</strong>
        <small>${post.location}</small>
      </div>

      <button class="icon-button post-options" aria-label="Mais opções">
        <i class="bx bx-dots-horizontal-rounded"></i>
      </button>
    </div>

    <img
      class="post-image"
      src="${post.image}"
      alt="${post.alt}"
      loading="lazy"
    >

    <div class="post-content">
      <div class="post-actions">
        <div class="action-group">
          <button class="icon-button like-button" aria-label="Curtir">
            <i class="bx bx-heart"></i>
          </button>

          <button class="icon-button comment-focus" aria-label="Comentar">
            <i class="bx bx-message-rounded"></i>
          </button>

          <button class="icon-button share-button" aria-label="Compartilhar">
            <i class="bx bx-send"></i>
          </button>
        </div>

        <button class="icon-button save-button" aria-label="Salvar">
          <i class="bx bx-bookmark"></i>
        </button>
      </div>

      <p class="likes" data-count="${post.likes}">
        ${post.likes.toLocaleString("pt-BR")} curtidas
      </p>

      <p class="caption">
        <strong>${post.user}</strong>${post.caption}
      </p>

      <button class="comments-button">Ver todos os comentários</button>
      <time class="post-time">${post.time}</time>
    </div>

    <form class="comment-form">
      <input
        type="text"
        placeholder="Comente sobre esse game..."
        aria-label="Escreva um comentário"
      >
      <button type="submit">Publicar</button>
    </form>
  `;

  return article;
}

posts.forEach(post => {
  postsContainer.appendChild(createPost(post));
});

postsContainer.addEventListener("click", event => {
  const like = event.target.closest(".like-button");

  if (like) {
    const icon = like.querySelector("i");
    const likesText = like.closest(".post").querySelector(".likes");
    const liked = like.classList.toggle("liked");

    icon.className = liked ? "bx bxs-heart" : "bx bx-heart";

    const count = Number(likesText.dataset.count) + (liked ? 1 : -1);

    likesText.dataset.count = count;
    likesText.textContent = `${count.toLocaleString("pt-BR")} curtidas`;
  }

  const save = event.target.closest(".save-button");

  if (save) {
    const icon = save.querySelector("i");
    const saved = icon.classList.toggle("bxs-bookmark");

    icon.classList.toggle("bx-bookmark", !saved);

    save.setAttribute(
      "aria-label",
      saved ? "Remover dos salvos" : "Salvar"
    );
  }

  const comment = event.target.closest(".comment-focus");

  if (comment) {
    comment.closest(".post").querySelector(".comment-form input").focus();
  }

  const share = event.target.closest(".share-button");

  if (share) {
    const post = share.closest(".post");
    const caption = post.querySelector(".caption").textContent;

    if (navigator.share) {
      navigator.share({
        title: "GameZone",
        text: caption
      });
    } else {
      alert("Compartilhamento não disponível neste navegador.");
    }
  }
});

postsContainer.addEventListener("submit", event => {
  if (!event.target.matches(".comment-form")) return;

  event.preventDefault();

  const input = event.target.querySelector("input");
  const comment = input.value.trim();

  if (!comment) return;

  const post = event.target.closest(".post");

  post.querySelector(".comments-button").textContent =
    `Seu comentário: ${comment}`;

  input.value = "";
});