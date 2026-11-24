
document.addEventListener("DOMContentLoaded", () => {

  
  document.querySelectorAll(".post").forEach(post => {

    const likeButton = post.querySelector(".like");
    const likeIcon = likeButton.querySelector("i");
    const likesText = post.querySelector(".likes");

    let liked = false;

    const originalLikes = parseInt(
      likesText.textContent.replace(/\D/g, "")
    ) || 0;

    function updateLike() {
      liked = !liked;

      likeButton.classList.toggle("liked", liked);

      likeIcon.className = liked
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";

      likesText.textContent =
        (originalLikes + (liked ? 1 : 0)).toLocaleString("pt-BR")
        + " curtidas";
    }

    likeButton.addEventListener("click", updateLike);

    
    const media = post.querySelector(".post-media");
    const heart = post.querySelector(".big-heart");

    let lastClick = 0;

    media.addEventListener("click", () => {
      const now = Date.now();

      if (now - lastClick < 350) {
        if (!liked) updateLike();

        heart.classList.remove("animate");
        void heart.offsetWidth;
        heart.classList.add("animate");
      }

      lastClick = now;
    });


    const saveButton = post.querySelector(".save");
    const saveIcon = saveButton.querySelector("i");

    saveButton.addEventListener("click", () => {
      const saved = saveButton.classList.toggle("saved");

      saveIcon.className = saved
        ? "fa-solid fa-bookmark"
        : "fa-regular fa-bookmark";
    });


    const form = post.querySelector(".comment-form");
    const input = form.querySelector("input");
    const comments = post.querySelector(".comments");
    const commentCount = post.querySelector(".comments-count");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const value = input.value.trim();

      if (!value) return;

      const comment = document.createElement("p");
      const username = document.createElement("strong");

      username.textContent = "Você ";
      comment.appendChild(username);
      comment.appendChild(document.createTextNode(value));

      comments.appendChild(comment);

      input.value = "";
      commentCount.textContent = "Comentários adicionados nesta sessão";

    });

    
    post.querySelector(".comment-focus")
      .addEventListener("click", () => input.focus());

    
    post.querySelector(".share")
      .addEventListener("click", async () => {

        const shareData = {
          title: "Publicação",
          text: "Confira esta publicação!",
          url: window.location.href
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.url);
            alert("Link copiado!");
          } else {
            alert("Compartilhamento não disponível neste navegador.");
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        }

      });


    post.querySelector(".more")
      .addEventListener("click", () => {
        alert("Opções da publicação");
      });

  });


  document.querySelectorAll(".suggestion a")
    .forEach(button => {

      button.addEventListener("click", () => {

        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";

      });

    });

});
