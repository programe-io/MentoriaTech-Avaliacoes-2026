
document.addEventListener("DOMContentLoaded", () => {

    // CURTIR E DESCURTIR

    document.querySelectorAll(".post").forEach(post => {

        const likeBtn = post.querySelector(".like-button");
        const dislikeBtn = post.querySelector(".dislike-button");
        const countElement = post.querySelector(".count");

        let likes = parseInt(
            countElement.textContent.replace(/\./g, "")
        ) || 0;

        let liked = false;
        let disliked = false;

        function updateCount() {
            countElement.textContent = likes.toLocaleString("pt-BR");
        }

        function like() {
            if (disliked) {
                disliked = false;
                dislikeBtn.classList.remove("disliked");
            }

            if (!liked) {
                liked = true;
                likes++;
                likeBtn.classList.add("liked");
            }

            likeBtn.classList.add("animate");

            setTimeout(() => {
                likeBtn.classList.remove("animate");
            }, 300);

            updateCount();
        }

        likeBtn.addEventListener("click", () => {

            if (liked) {
                liked = false;
                likes--;
                likeBtn.classList.remove("liked");
            } else {
                like();
            }

            updateCount();
        });

        dislikeBtn.addEventListener("click", () => {

            if (disliked) {
                disliked = false;
                dislikeBtn.classList.remove("disliked");
            } else {
                if (liked) {
                    liked = false;
                    likes--;
                    likeBtn.classList.remove("liked");
                }

                disliked = true;
                dislikeBtn.classList.add("disliked");
            }

            updateCount();
        });

        // CURTIR COM DOIS CLIQUES NA FOTO

        const image = post.querySelector(".post-media img");
        const overlay = post.querySelector(".heart-overlay");

        if (image && overlay) {
            let lastClick = 0;

            image.addEventListener("click", () => {
                const now = Date.now();

                if (now - lastClick < 350) {
                    like();

                    overlay.classList.remove("show");
                    void overlay.offsetWidth;
                    overlay.classList.add("show");
                }

                lastClick = now;
            });
        }

        // SALVAR PUBLICAÇÃO

        const saveBtn = post.querySelector(".save-button");

        saveBtn.addEventListener("click", () => {
            saveBtn.classList.toggle("saved");
        });

        // COMENTÁRIOS

        const form = post.querySelector(".comment-form");
        const input = form.querySelector("input");
        const comments = post.querySelector(".comments");

        form.addEventListener("submit", event => {
            event.preventDefault();

            const message = input.value.trim();

            if (!message) return;

            const comment = document.createElement("div");
            comment.className = "comment";

            const username = document.createElement("strong");
            username.textContent = "voce";

            comment.appendChild(username);
            comment.appendChild(document.createTextNode(message));

            comments.appendChild(comment);

            input.value = "";
        });

        // ABRIR CAMPO DE COMENTÁRIOS

        post.querySelector(".comment-button").addEventListener("click", () => {
            input.focus();
        });

        // COMPARTILHAR

        post.querySelector(".share-button").addEventListener("click", async () => {
            const data = {
                title: "GTA VI",
                text: post.dataset.caption,
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(data);
                } else {
                    await navigator.clipboard.writeText(data.url);
                    alert("Link copiado!");
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    alert("Não foi possível compartilhar.");
                }
            }
        });

        // MAIS OPÇÕES

        post.querySelector(".more-button").addEventListener("click", () => {
            alert("Mais opções em breve!");
        });

    });

    // SEGUIR

    document.querySelectorAll(".follow-button").forEach(button => {

        button.addEventListener("click", () => {

            const following = button.classList.toggle("following");

            button.textContent = following ? "Seguindo" : "Seguir";

        });

    });

    console.log("Instagram GTA VI funcionando!");

});
