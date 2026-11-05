
document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // CURTIDAS
    // =========================

    document.querySelectorAll(".post").forEach(post => {

        const likeBtn = post.querySelector(".like-btn");
        const likeCount = post.querySelector(".like-count");
        const postImage = post.querySelector(".post-image");

        let liked = false;
        let likes = Number(likeCount.textContent);

        function toggleLike() {
            liked = !liked;

            if (liked) {
                likes++;
                likeBtn.classList.add("liked");
                likeBtn.innerHTML = '<i class="bx bxs-heart"></i>';
            } else {
                likes--;
                likeBtn.classList.remove("liked");
                likeBtn.innerHTML = '<i class="bx bx-heart"></i>';
            }

            likeCount.textContent = likes;
        }

        likeBtn.addEventListener("click", toggleLike);

        // Curtir com dois cliques na imagem
        postImage.addEventListener("dblclick", () => {
            if (!liked) {
                toggleLike();
            }
        });

    });


    // =========================
    // SALVAR PUBLICAÇÕES
    // =========================

    document.querySelectorAll(".post").forEach(post => {

        const bookmarkBtn = post.querySelector(".bookmark-btn");

        bookmarkBtn.addEventListener("click", () => {

            bookmarkBtn.classList.toggle("saved");

            const saved = bookmarkBtn.classList.contains("saved");

            bookmarkBtn.innerHTML = saved
                ? '<i class="bx bxs-bookmark"></i>'
                : '<i class="bx bx-bookmark"></i>';

            alert(
                saved
                    ? "Publicação salva com sucesso!"
                    : "Publicação removida dos salvos!"
            );

        });

    });


    // =========================
    // COMENTÁRIOS
    // =========================

    document.querySelectorAll(".post").forEach(post => {

        const commentButtons = post.querySelectorAll(".comment-btn");
        const commentsArea = post.querySelector(".comments-area");
        const commentForm = post.querySelector(".comment-form");
        const commentInput = post.querySelector(".comment-input");
        const commentsList = post.querySelector(".comments-list");

        // Abrir e fechar comentários
        commentButtons.forEach(button => {

            button.addEventListener("click", () => {

                commentsArea.classList.toggle("hidden");

                if (!commentsArea.classList.contains("hidden")) {
                    commentInput.focus();
                }

            });

        });

        // Adicionar comentário
        commentForm.addEventListener("submit", event => {

            event.preventDefault();

            const commentText = commentInput.value.trim();

            if (commentText === "") return;

            const comment = document.createElement("div");

            comment.className = "comment-item";

            const text = document.createElement("span");

            const username = document.createElement("strong");
            username.textContent = "voce ";

            text.appendChild(username);
            text.appendChild(
                document.createTextNode(commentText)
            );

            const deleteBtn = document.createElement("button");

            deleteBtn.className = "delete-comment";
            deleteBtn.innerHTML = '<i class="bx bx-trash"></i>';

            deleteBtn.setAttribute("aria-label", "Excluir comentário");

            deleteBtn.addEventListener("click", () => {
                comment.remove();
            });

            comment.appendChild(text);
            comment.appendChild(deleteBtn);

            commentsList.appendChild(comment);

            commentInput.value = "";

        });

    });


    // =========================
    // PESQUISAR USUÁRIOS
    // =========================

    const searchInput = document.querySelector("#searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const search = searchInput.value
                .toLowerCase()
                .trim();

            document.querySelectorAll(".post").forEach(post => {

                const username = post
                    .querySelector(".username")
                    .textContent
                    .toLowerCase();

                post.style.display = username.includes(search)
                    ? "block"
                    : "none";

            });

        });

    }


    // =========================
    // COMPARTILHAR PUBLICAÇÕES
    // =========================

    document.querySelectorAll(".share-btn").forEach(button => {

        button.addEventListener("click", async () => {

            const post = button.closest(".post");

            const username = post.querySelector(".username").textContent;

            const shareData = {
                title: "Publicação do Instagram Clone",
                text: `Confira esta publicação de ${username}!`,
                url: window.location.href
            };

            try {

                if (navigator.share) {

                    await navigator.share(shareData);

                } else if (navigator.clipboard) {

                    await navigator.clipboard.writeText(
                        shareData.url
                    );

                    alert("Link copiado para compartilhar!");

                } else {

                    alert("Compartilhamento não disponível neste navegador.");

                }

            } catch (error) {

                if (error.name !== "AbortError") {
                    console.error("Erro ao compartilhar:", error);
                }

            }

        });

    });


    // =========================
    // STORIES
    // =========================

    document.querySelectorAll(".story").forEach(story => {

        story.addEventListener("click", () => {

            const username = story.querySelector("span").textContent;

            alert(`Você abriu o story de ${username}!`);

        });

    });


    // =========================
    // MENU MOBILE
    // =========================

    const menuButton = document.querySelector(
        "header button"
    );

    if (menuButton) {

        menuButton.addEventListener("click", () => {

            alert("Menu do Instagram Clone");

        });

    }


    console.log("Instagram Clone carregado com sucesso!");

});
