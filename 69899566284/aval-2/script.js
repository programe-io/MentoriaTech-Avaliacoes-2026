
const likeButtons = document.querySelectorAll(".like-btn");
const saveButtons = document.querySelectorAll(".save-btn");

// Curtir e descurtir publicações
likeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("liked");

    button.textContent = button.classList.contains("liked")
      ? "♥"
      : "♡";
  });
});

// Salvar publicações
saveButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.classList.toggle("saved");

    button.textContent = button.classList.contains("saved")
      ? "▣"
      : "♧";
  });
});

// Mostrar comentários
const viewComments = document.getElementById("viewComments");
const comments = document.getElementById("comments");

viewComments.addEventListener("click", () => {
  comments.classList.toggle("show");

  viewComments.textContent = comments.classList.contains("show")
    ? "Ocultar comentários"
    : "Ver todos os 18 comentários";
});

// Adicionar comentário
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");

commentForm.addEventListener("submit", event => {
  event.preventDefault();

  const message = commentInput.value.trim();

  if (message === "") {
    return;
  }

  const newComment = document.createElement("p");
  const username = document.createElement("strong");

  username.textContent = "você ";
  newComment.appendChild(username);
  newComment.appendChild(document.createTextNode(message));

  comments.appendChild(newComment);
  comments.classList.add("show");

  viewComments.textContent = "Ocultar comentários";
  commentInput.value = "";
});

// Aviso ao clicar nos stories
document.querySelectorAll(".story").forEach(story => {
  story.addEventListener("click", () => {
    const name = story.querySelector("p").textContent;
    alert("Você abriu o story de " + name + "!");
  });
});
