document.querySelectorAll(".post").forEach((post) => {
  const likeButton = post.querySelector(".like");
  const likesText = post.querySelector(".likes");
  const commentInput = post.querySelector("input");
  const publishButton = post.querySelector(".publish");
  const commentArea = post.querySelector(".comments");

  let liked = false;
  let likes = parseInt(likesText.textContent.replace(/\D/g, "")) || 0;

  // Curtir publicação
  likeButton.addEventListener("click", () => {
    liked = !liked;

    if (liked) {
      likes++;
      likeButton.textContent = "♥";
      likeButton.classList.add("liked");
    } else {
      likes--;
      likeButton.textContent = "♡";
      likeButton.classList.remove("liked");
    }

    likesText.textContent = likes.toLocaleString("pt-BR") + " curtidas";
  });

  // Publicar comentário
  publishButton.addEventListener("click", () => {
    const text = commentInput.value.trim();

    if (text === "") return;

    const newComment = document.createElement("p");
    newComment.className = "caption";

    const username = document.createElement("strong");
    username.textContent = " seu_usuario ";

    newComment.appendChild(username);
    newComment.appendChild(document.createTextNode(text));

    commentArea.before(newComment);

    commentInput.value = "";
  });

  // Enter para publicar
  commentInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      publishButton.click();
    }
  });
});

// Botão seguir
document.querySelectorAll(".follow").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("following")) {
      button.classList.remove("following");
      button.textContent = "Seguir";
    } else {
      button.classList.add("following");
      button.textContent = "Seguindo";
    }
  });
});

// Salvar publicação
document.querySelectorAll(".save").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {
      button.textContent = "▣";
    } else {
      button.textContent = "♧";
    }
  });
});

// Mensagem ao clicar no botão de comentários
document.querySelectorAll(".comment").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.closest(".post").querySelector("input");
    input.focus();
  });
});