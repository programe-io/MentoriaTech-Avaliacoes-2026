
// Sistema de curtidas
document.querySelectorAll(".like-button").forEach((button) => {
  button.addEventListener("click", () => {
    const post = button.closest(".post");
    const count = post.querySelector(".like-count");

    const liked = button.classList.toggle("liked");

    button.querySelector("i").className = liked
      ? "bx bxs-heart"
      : "bx bx-heart";

    const current = Number(count.textContent.replace(/\./g, ""));

    count.textContent = (
      current + (liked ? 1 : -1)
    ).toLocaleString("pt-BR");
  });
});


// Sistema de salvar publicações
document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");

    button.querySelector("i").className = saved
      ? "bx bxs-bookmark"
      : "bx bx-bookmark";
  });
});


// Sistema de seguir usuários
document.querySelectorAll(".follow-button").forEach((button) => {
  button.addEventListener("click", () => {
    const following = button.textContent.trim() === "Seguir";

    button.textContent = following
      ? "Seguindo"
      : "Seguir";

    button.style.color = following
      ? "#8e8e8e"
      : "#0095f6";
  });
});


// Sistema de comentários
document.querySelectorAll(".comment-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector("input");
    const value = input.value.trim();

    if (!value) return;

    const comment = document.createElement("p");
    comment.className = "caption new-comment";

    const username = document.createElement("strong");
    username.textContent = "seu_usuario";

    comment.append(
      username,
      document.createTextNode(" " + value)
    );

    form.before(comment);
    input.value = "";
  });
});


// Sistema de pesquisa
const search = document.getElementById("searchInput");

if (search) {
  search.addEventListener("input", () => {
    const term = search.value.trim().toLowerCase();

    document.querySelectorAll(".post").forEach((post) => {
      post.hidden = !post.dataset.user
        .toLowerCase()
        .includes(term);
    });
  });
}
