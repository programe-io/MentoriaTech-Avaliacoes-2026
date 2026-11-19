
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 0);

    if (button.dataset.liked === "true") {
      count--;
      button.dataset.liked = "false";
      button.innerText = "♡";
    } else {
      count++;
      button.dataset.liked = "true";
      button.innerText = "♥";
    }

    likes.dataset.count = count;
    likes.innerText = count + " curtidas";
  });
});

// Focar no campo de comentário
document.querySelectorAll(".comment-btn").forEach(button => {
  button.addEventListener("click", () => {
    button.closest(".post")
      .querySelector("input").focus();
  });
});

// Adicionar comentários
document.querySelectorAll(".send-btn").forEach(button => {
  button.addEventListener("click", () => {
    const post = button.closest(".post");
    const input = post.querySelector("input");
    const comments = post.querySelector(".comments");

    if (input.value.trim() === "") return;

    const newComment = document.createElement("p");
    newComment.textContent = "💗 " + input.value;

    comments.appendChild(newComment);
    input.value = "";
  });
});

// Compartilhar
document.querySelectorAll(".share-btn").forEach(button => {
  button.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "A Hipótese do Amor 💗",
          text: "Entre experimentos, café e um amor inesperado!"
        });
      } catch (error) {
        console.log("Compartilhamento cancelado.");
      }
    } else {
      alert("Compartilhe esse amor! 💗");
    });
})