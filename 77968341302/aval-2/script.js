document.addEventListener("DOMContentLoaded", () => {
  // 1. Curtir postagens (clique no coração ou duplo clique na foto)
  const postCards = document.querySelectorAll(".post-card");

  postCards.forEach((post) => {
    const likeBtn = post.querySelector(".like-btn");
    const likeIcon = likeBtn.querySelector("i");
    const likesCountEl = post.querySelector(".likes-count");
    const postImage = post.querySelector(".post-image");

    const toggleLike = (forceLike = false) => {
      const isLiked = likeBtn.classList.contains("liked");
      let currentLikes = parseInt(likesCountEl.textContent, 10);

      if (!isLiked) {
        likeBtn.classList.add("liked");
        likeIcon.classList.replace("bx-heart", "bxs-heart");
        likesCountEl.textContent = currentLikes + 1;
      } else if (!forceLike) {
        likeBtn.classList.remove("liked");
        likeIcon.classList.replace("bxs-heart", "bx-heart");
        likesCountEl.textContent = currentLikes - 1;
      }
    };

    likeBtn.addEventListener("click", () => toggleLike(false));
    postImage.addEventListener("dblclick", () => toggleLike(true));

    // 2. Salvar postagem (Bookmark)
    const saveBtn = post.querySelector(".save-btn");
    const saveIcon = saveBtn.querySelector("i");

    saveBtn.addEventListener("click", () => {
      const isSaved = saveBtn.classList.toggle("saved");
      if (isSaved) {
        saveIcon.classList.replace("bx-bookmark", "bxs-bookmark");
      } else {
        saveIcon.classList.replace("bxs-bookmark", "bx-bookmark");
      }
    });
  });

  // 3. Seguir / Deixar de seguir nas sugestões
  const followButtons = document.querySelectorAll(".follow-btn");

  followButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isFollowing = btn.classList.toggle("following");
      if (isFollowing) {
        btn.textContent = "Seguindo";
        btn.style.color = "#6b7280";
      } else {
        btn.textContent = "Seguir";
        btn.style.color = "#3b82f6";
      }
    });
  });

  // 4. Filtro de pesquisa por usuário ou legenda
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const term = event.target.value.toLowerCase().trim();

      postCards.forEach((post) => {
        const caption = post.dataset.caption || "";
        const username = post.querySelector(".username").textContent.toLowerCase();

        if (caption.includes(term) || username.includes(term)) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  }
});