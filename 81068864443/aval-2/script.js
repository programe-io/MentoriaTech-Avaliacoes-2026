"use strict";

const feed = document.querySelector("#feedList");
const postForm = document.querySelector("#postForm");
const postInput = document.querySelector("#postInput");
const filterButton = document.querySelector(".filter-button");
const toast = document.querySelector("#toast");
let toastTimer;
let nextOrder = 1;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createAction(className, label, icon, pressed = null) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  if (pressed !== null) button.setAttribute("aria-pressed", String(pressed));
  button.append(document.createTextNode(`${icon} `), makeElement("span", "", label));
  return button;
}

function createPost(text) {
  const article = makeElement("article", "post-card");
  article.dataset.own = "true";
  article.dataset.order = String(nextOrder++);
  article.dataset.likes = "0";
  article.dataset.comments = "0";

  const header = makeElement("div", "post-header");
  header.append(makeElement("div", "avatar", "L"));
  header.lastElementChild.setAttribute("aria-hidden", "true");

  const author = makeElement("div", "author");
  const name = makeElement("strong", "", "Lucas Almeida");
  author.append(name, makeElement("span", "", "@lucasalmeida · agora"));
  header.append(author);

  const more = makeElement("button", "more-button", "···");
  more.type = "button";
  more.setAttribute("aria-label", "Mais opções");
  more.setAttribute("aria-expanded", "false");
  header.append(more);

  const footer = makeElement("div", "post-footer");
  const reaction = makeElement("span", "reaction-count");
  reaction.append(document.createTextNode("♡ "), makeElement("span", "", "0 curtidas"));
  footer.append(reaction, makeElement("span", "comment-count", "0 comentários"));

  const actions = makeElement("div", "post-actions");
  actions.append(
    createAction("like-button", "Curtir", "♡", false),
    createAction("comment-button", "Comentar", "▢", false),
    createAction("share-button", "Compartilhar", "↗")
  );

  article.append(header, makeElement("p", "post-text", text), footer, actions);
  return article;
}

function getCount(post, key, selector) {
  if (post.dataset[key] === undefined) {
    const text = post.querySelector(selector)?.textContent ?? "";
    post.dataset[key] = String(Number(text.match(/\d+/)?.[0] ?? 0));
  }
  return Number(post.dataset[key]);
}

function updateCounts(post) {
  const likes = getCount(post, "likes", ".reaction-count");
  const comments = getCount(post, "comments", ".comment-count");
  post.querySelector(".reaction-count span").textContent = `${likes} ${likes === 1 ? "curtida" : "curtidas"}`;
  post.querySelector(".comment-count").textContent = `${comments} ${comments === 1 ? "comentário" : "comentários"}`;
}

function closeMenus(except = null) {
  feed.querySelectorAll(".post-menu").forEach((menu) => {
    if (menu !== except) {
      menu.remove();
      menu.closest(".post-card")?.querySelector(".more-button")?.setAttribute("aria-expanded", "false");
    }
  });
}

function toggleComments(post, button) {
  let panel = post.querySelector(".comment-panel");
  if (panel) {
    panel.remove();
    button.setAttribute("aria-expanded", "false");
    return;
  }

  panel = makeElement("div", "comment-panel");
  const form = makeElement("form", "comment-form");
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 180;
  input.placeholder = "Escreva um comentário...";
  input.setAttribute("aria-label", "Escreva um comentário");
  input.required = true;
  const submit = makeElement("button", "", "Enviar");
  submit.type = "submit";
  form.append(input, submit);
  panel.append(form);
  post.querySelector(".post-actions").after(panel);
  button.setAttribute("aria-expanded", "true");
  input.focus();
}

function showPostMenu(post, button) {
  const current = post.querySelector(".post-menu");
  closeMenus();
  if (current) return;

  const menu = makeElement("div", "post-menu");
  const action = makeElement("button", "", post.dataset.own === "true" ? "Excluir publicação" : "Sinalizar publicação");
  action.type = "button";
  action.dataset.menuAction = post.dataset.own === "true" ? "delete" : "report";
  menu.append(action);
  post.querySelector(".post-header").append(menu);
  button.setAttribute("aria-expanded", "true");
}

function copyPost(post) {
  const text = post.querySelector(".post-text")?.textContent ?? "";
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast("Texto da publicação copiado. Compartilhe com quem quiser!"))
      .catch(() => showToast("Não foi possível copiar agora. Tente novamente."));
  } else {
    showToast("Compartilhamento não está disponível neste navegador.");
  }
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = postInput.value.trim();
  if (!text) {
    showToast("Escreva algo antes de publicar 😊");
    postInput.focus();
    return;
  }
  feed.prepend(createPost(text));
  postForm.reset();
  postInput.focus();
  showToast("Sua publicação já está no feed! 💙");
});

feed.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const post = button.closest(".post-card");

  if (!post) return;
  if (button.matches(".like-button")) {
    const liked = button.getAttribute("aria-pressed") === "true";
    const likes = getCount(post, "likes", ".reaction-count") + (liked ? -1 : 1);
    post.dataset.likes = String(Math.max(0, likes));
    button.setAttribute("aria-pressed", String(!liked));
    button.classList.toggle("liked", !liked);
    button.querySelector("span").textContent = liked ? "Curtir" : "Curtido";
    updateCounts(post);
  } else if (button.matches(".comment-button")) {
    toggleComments(post, button);
  } else if (button.matches(".share-button")) {
    copyPost(post);
  } else if (button.matches(".more-button")) {
    showPostMenu(post, button);
  } else if (button.dataset.menuAction === "delete") {
    post.remove();
    showToast("Publicação removida do seu feed.");
  } else if (button.dataset.menuAction === "report") {
    closeMenus();
    showToast("Obrigado por avisar. Este protótipo não envia sinalizações a um servidor.");
  }
});

feed.addEventListener("submit", (event) => {
  if (!event.target.matches(".comment-form")) return;
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input");
  const text = input.value.trim();
  const post = form.closest(".post-card");
  if (!text || !post) return;

  const entry = makeElement("p", "comment-entry");
  entry.append(makeElement("strong", "", "Lucas: "), document.createTextNode(text));
  form.after(entry);
  post.dataset.comments = String(getCount(post, "comments", ".comment-count") + 1);
  updateCounts(post);
  form.reset();
  showToast("Comentário adicionado. Obrigado por participar! 💬");
});

filterButton.addEventListener("click", () => {
  const sortingByLikes = filterButton.getAttribute("aria-pressed") !== "true";
  filterButton.setAttribute("aria-pressed", String(sortingByLikes));
  filterButton.querySelector("span").textContent = sortingByLikes ? "Mais curtidas" : "Para você";

  const posts = [...feed.querySelectorAll(".post-card")];
  if (sortingByLikes) {
    posts.sort((a, b) => getCount(b, "likes", ".reaction-count") - getCount(a, "likes", ".reaction-count"));
  } else {
    posts.sort((a, b) => Number(b.dataset.order) - Number(a.dataset.order));
  }
  posts.forEach((post) => feed.append(post));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".post-header")) closeMenus();

  if (event.target.closest(".my-avatar")) {
    showToast("Olá, Lucas! Que bom ter você por aqui 💙");
  }

  const exploreLink = event.target.closest('a[href="#explorar"]');
  if (exploreLink) showToast("Confira os assuntos que estão em alta.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenus();
});

feed.querySelectorAll(".post-card").forEach((post, index) => {
  post.dataset.order = String(-index);
  updateCounts(post);
});
