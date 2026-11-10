
document.addEventListener("DOMContentLoaded", () => {

    // CURTIR PUBLICAÇÕES
    const likeButtons = document.querySelectorAll(".like-btn");

    likeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const icon = button.querySelector("i");
            const post = button.closest(".post");
            const likesElement = post.querySelector(".likes");

            button.classList.toggle("liked");

            const liked = button.classList.contains("liked");

            if (liked) {
                icon.classList.replace(
                    "fa-regular",
                    "fa-solid"
                );
            } else {
                icon.classList.replace(
                    "fa-solid",
                    "fa-regular"
                );
            }

            if (likesElement) {
                let likes = parseInt(
                    likesElement.textContent.replace(".", "")
                );

                likes += liked ? 1 : -1;

                likesElement.textContent =
                    likes.toLocaleString("pt-BR");
            }

        });

    });


    // BOTÃO SEGUIR
    const followButtons = document.querySelectorAll(
        "#suggestionList button"
    );

    followButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent.trim() === "Seguir") {
                button.textContent = "Seguindo";
                button.style.color = "#999";
            } else {
                button.textContent = "Seguir";
                button.style.color = "#0095f6";
            }

        });

    });


    // CRIAR PUBLICAÇÃO
    const createPost = document.getElementById("createPost");

    createPost.addEventListener("click", (event) => {

        event.preventDefault();

        const input = document.createElement("input");

        input.type = "file";
        input.accept = "image/*";

        input.addEventListener("change", () => {

            const file = input.files[0];

            if (!file) return;

            const imageURL = URL.createObjectURL(file);

            const feed = document.getElementById("feed");

            const post = document.createElement("article");

            post.className = "post";

            post.innerHTML = `
                <header class="flex items-center gap-3 mb-3">
                    <img src="https://i.pravatar.cc/150?img=12"
                         class="avatar">
                    <strong class="text-sm">seu_usuario</strong>
                </header>

                <img src="${imageURL}" class="post-image">

                <div class="flex gap-4 py-3">
                    <button class="like-btn">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <button>
                        <i class="fa-regular fa-comment"></i>
                    </button>
                    <button>
                        <i class="fa-regular fa-paper-plane"></i>
                    </button>
                </div>

                <p class="text-sm font-semibold">
                    0 curtidas
                </p>

                <p class="text-sm mt-2">
                    <strong>seu_usuario</strong>
                    Minha nova publicação! 📸
                </p>
            `;

            feed.prepend(post);

            const newLikeButton = post.querySelector(".like-btn");

            newLikeButton.addEventListener("click", () => {

                newLikeButton.classList.toggle("liked");

                const icon = newLikeButton.querySelector("i");

                icon.classList.toggle("fa-regular");
                icon.classList.toggle("fa-solid");

                const likes = post.querySelector("p.font-semibold");

                likes.textContent =
                    newLikeButton.classList.contains("liked")
                    ? "1 curtida"
                    : "0 curtidas";

            });

        });

        input.click();

    });

});
