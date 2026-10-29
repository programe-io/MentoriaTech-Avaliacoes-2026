
const input = document.getElementById("post-input");
const publishBtn = document.getElementById("publish-btn");
const posts = document.getElementById("posts");
const postCount = document.getElementById("post-count");

// Atualizar quantidade de publicações
function updatePostCount() {
  postCount.textContent = posts.children.length;
}

// Sistema de curtidas
function addLikeEvents(button) {
  button.addEventListener("click", () => {
    const count = button.querySelector(".like-count");
    let likes = Number(button.dataset.likes);

    if (button.classList.contains("liked")) {
      likes--;
      button.classList.remove("liked");
      button.firstChild.textContent = "♡ Curtir ";
    } else {
      likes++;
      button.classList.add("liked");
      button.firstChild.textContent = "♥ Curtido ";
    }

    button.dataset.likes = likes;
    count.textContent = likes;
  });
}

// Ativar curtidas nos posts existentes
document.querySelectorAll(".like-btn").forEach(addLikeEvents);

// Criar uma nova publicação
publishBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (!text) {
    alert("Escreva algo sobre seu treino primeiro!");
    input.focus();
    return;
  }

  // Criar o card da publicação
  const article = document.createElement("article");
  article.className = "card";

  // Perfil
  const profile = document.createElement("div");
  profile.className = "profile";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "V";

  const info = document.createElement("div");

  const name = document.createElement("strong");
  name.textContent = "Você";

  const time = document.createElement("p");
  time.className = "muted";
  time.textContent = "Agora · Treino";

  info.append(name, time);
  profile.append(avatar, info);

  // Texto do post
  const message = document.createElement("p");
  message.className = "post-text";
  message.textContent = text;

  // Hashtags
  const tag = document.createElement("p");
  tag.className = "tag";
  tag.textContent = "#FitSocial #Foco #Fitness";

  // Área de ações
  const actions = document.createElement("div");
  actions.className = "post-actions";

  const like = document.createElement("button");
  like.className = "like-btn";
  like.dataset.likes = "0";
  like.append(document.createTextNode("♡ Curtir "));

  const count = document.createElement("span");
  count.className = "like-count";
  count.textContent = "0";

  like.append(count);

  const comments = document.createElement("span");
  comments.className = "muted";
  comments.textContent = "💬 0 comentários";

  actions.append(like, comments);

  // Montar o post
  article.append(profile, message, tag, actions);

  // Adicionar ao topo do feed
  posts.prepend(article);

  // Ativar curtidas no novo post
  addLikeEvents(like);

  // Limpar campo de texto
  input.value = "";

  // Atualizar estatísticas
  updatePostCount();
});

// Inicializar contador
updatePostCount();
