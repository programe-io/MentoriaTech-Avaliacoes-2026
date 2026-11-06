
const postsContainer = document.getElementById("postsContainer");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

// Curtidas, comentários e favoritos
postsContainer.addEventListener("click", (event) => {
  const likeButton = event.target.closest(".like-button");
  const saveButton = event.target.closest(".save-button");
  const commentButton = event.target.closest(".comment-focus");
  const sendComment = event.target.closest(".send-comment");
  const showComments = event.target.closest(".show-comments");
  const shareButton = event.target.closest(".share-button");

  if (likeButton) {
    const post = likeButton.closest(".post");
    const count = post.querySelector(".like-count");
    const icon = likeButton.querySelector("i");

    const liked = likeButton.classList.toggle("liked");
    icon.className = liked
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";

    let current = Number(count.textContent.replace(/\./g, ""));
    current += liked ? 1 : -1;
    count.textContent = current.toLocaleString("pt-BR");
  }

  if (saveButton) {
    const saved = saveButton.classList.toggle("saved");

    saveButton.querySelector("i").className = saved
      ? "fa-solid fa-bookmark"
      : "fa-regular fa-bookmark";

    showToast(saved ? "Publicação salva!" : "Publicação removida dos salvos.");
  }

  if (commentButton) {
    commentButton.closest(".post")
      .querySelector(".comment-area input").focus();
  }

  if (sendComment) {
    const area = sendComment.closest(".comment-area");
    const input = area.querySelector("input");
    const comment = input.value.trim();

    if (!comment) {
      showToast("Digite um comentário primeiro.");
      return;
    }

    const element = document.createElement("p");
    element.className = "new-comment";

    const username = document.createElement("strong");
    username.textContent = "meu_perfil ";

    element.append(username, document.createTextNode(comment));
    area.before(element);

    input.value = "";
    showToast("Comentário publicado!");
  }

  if (showComments) {
    const area = showComments.closest(".post")
      .querySelector(".comment-area");

    area.classList.toggle("expanded");
    area.querySelector("input").focus();
  }

  if (shareButton) {
    const post = shareButton.closest(".post");
    const title = post.dataset.title || "Minha publicação";
    const url = window.location.href;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => showToast("Link copiado para compartilhar!"))
        .catch(() => showToast("Não foi possível copiar o link."));
    } else {
      showToast("Compartilhamento demonstrativo.");
    }
  }
});

// Criar publicações
document.getElementById("publishButton").addEventListener("click", () => {
  const input = document.getElementById("postInput");
  const text = input.value.trim();

  if (!text) {
    showToast("Escreva algo sobre uma série!");
    input.focus();
    return;
  }

  const post = document.createElement("article");
  post.className = "post";
  post.dataset.category = "drama";
  post.dataset.title = text.toLowerCase();

  const header = document.createElement("div");
  header.className = "post-header";

  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = "https://i.pravatar.cc/100?img=12";
  avatar.alt = "Meu perfil";

  const userInfo = document.createElement("div");
  const username = document.createElement("strong");
  username.textContent = "meu_perfil";

  const time = document.createElement("small");
  time.textContent = "Agora mesmo";

  userInfo.append(username, time);

  const more = document.createElement("button");
  more.className = "more-button";
  more.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

  header.append(avatar, userInfo, more);

  const image = document.createElement("img");
  image.className = "post-image";
  image.src = "https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg";
  image.alt = "Imagem ilustrativa de série";

  const body = document.createElement("div");
  body.className = "post-body";

  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.innerHTML = `
    <button class="like-button"><i class="fa-regular fa-heart"></i></button>
    <button class="comment-focus"><i class="fa-regular fa-comment"></i></button>
    <button class="share-button"><i class="fa-regular fa-paper-plane"></i></button>
    <button class="save-button"><i class="fa-regular fa-bookmark"></i></button>
  `;

  const likes = document.createElement("p");
  likes.className = "likes";
  likes.innerHTML = '<strong class="like-count">0</strong> curtidas';

  const caption = document.createElement("p");
  const captionUser = document.createElement("strong");
  captionUser.textContent = "meu_perfil ";
  caption.append(captionUser, document.createTextNode(text));

  const hashtags = document.createElement("p");
  hashtags.className = "hashtags";
  hashtags.textContent = "#SeriesGram #MinhaSerieFavorita";

  const date = document.createElement("small");
  date.className = "post-date";
  date.textContent = "AGORA MESMO";

  const comments = document.createElement("div");
  comments.className = "comment-area";
  comments.innerHTML = `
    <input type="text" placeholder="Adicione um comentário...">
    <button class="send-comment">Publicar</button>
  `;

  body.append(actions, likes, caption, hashtags, date, comments);
  post.append(header, image, body);

  postsContainer.prepend(post);
  input.value = "";

  showToast("Sua publicação foi criada!");
  post.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Filtrar publicações
document.getElementById("filterSelect").addEventListener("change", (event) => {
  const selected = event.target.value;

  document.querySelectorAll(".post").forEach((post) => {
    const matches = selected === "all" ||
      post.dataset.category === selected;

    const search = document.getElementById("searchInput").value
      .toLowerCase().trim();

    const matchesSearch = post.innerText.toLowerCase().includes(search) ||
      (post.dataset.title || "").includes(search);

    post.style.display = matches && matchesSearch ? "block" : "none";
  });
});

// Pesquisar séries
document.getElementById("searchInput").addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase().trim();
  const category = document.getElementById("filterSelect").value;

  document.querySelectorAll(".post").forEach((post) => {
    const matchesSearch = post.innerText.toLowerCase().includes(term) ||
      (post.dataset.title || "").includes(term);

    const matchesCategory = category === "all" ||
      post.dataset.category === category;

    post.style.display = matchesSearch && matchesCategory ? "block" : "none";
  });
});

// Alternar tema
function toggleTheme() {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");

  document.querySelectorAll("#themeButton i, #mobileTheme i")
    .forEach((icon) => {
      icon.className = dark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
    });

  showToast(dark ? "Modo escuro ativado!" : "Modo claro ativado!");
}

document.getElementById("themeButton")
  .addEventListener("click", toggleTheme);

document.getElementById("mobileTheme")
  .addEventListener("click", toggleTheme);

// Stories
document.querySelectorAll(".story").forEach((story) => {
  story.addEventListener("click", () => {
    const name = story.querySelector("span").textContent;
    showToast(`Você está vendo os stories de ${name}!`);
  });
});

// Navegação
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
