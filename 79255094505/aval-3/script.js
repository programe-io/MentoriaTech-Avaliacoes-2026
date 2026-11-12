
document.addEventListener("DOMContentLoaded", () => {

    // CURTIR PUBLICAÇÕES

    document.querySelectorAll(".like-btn").forEach(button => {

        button.addEventListener("click", () => {

            const post = button.closest(".post");
            const likes = post.querySelector(".likes");

            let quantidade = parseInt(likes.textContent.replace(/\D/g, ""));

            if (button.classList.contains("liked")) {

                button.classList.remove("liked");
                button.classList.replace("fas", "far");

                quantidade--;

            } else {

                button.classList.add("liked");
                button.classList.replace("far", "fas");

                quantidade++;

            }

            likes.textContent = quantidade.toLocaleString("pt-BR") + " curtidas";

        });

    });


    // SEGUIR USUÁRIOS

    document.querySelectorAll(".follow-btn").forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent === "Seguir") {

                button.textContent = "Seguindo";
                button.style.color = "#262626";

            } else {

                button.textContent = "Seguir";
                button.style.color = "#0095f6";

            }

        });

    });


    // COMENTÁRIOS

    document.querySelectorAll(".comment-input").forEach(input => {

        input.addEventListener("keypress", event => {

            if (event.key === "Enter" && input.value.trim() !== "") {

                const post = input.closest(".post");
                const comment = document.createElement("p");

                const username = document.createElement("strong");
                username.textContent = "seu_usuario ";

                comment.appendChild(username);
                comment.appendChild(
                    document.createTextNode(input.value.trim())
                );

                post.querySelector(".post-info").appendChild(comment);

                input.value = "";

            }

        });

    });


    // CRIAR PUBLICAÇÃO

    document.getElementById("newPost").addEventListener("click", event => {

        event.preventDefault();

        const imageUrl = prompt("Digite o endereço da imagem:");

        if (!imageUrl || !imageUrl.trim()) return;

        const post = document.createElement("article");

        post.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = "https://i.pravatar.cc/150?img=12";

        const username = document.createElement("strong");
        username.textContent = "seu_usuario";

        header.append(avatar, username);

        const image = document.createElement("img");
        image.className = "post-image";
        image.src = imageUrl.trim();
        image.alt = "Nova publicação";

        image.onerror = () => {
            alert("Não foi possível carregar essa imagem.");
            post.remove();
        };

        const info = document.createElement("div");
        info.className = "post-info";

        const likes = document.createElement("strong");
        likes.className = "likes";
        likes.textContent = "0 curtidas";

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const left = document.createElement("div");

        const heart = document.createElement("i");
        heart.className = "far fa-heart like-btn";

        const commentIcon = document.createElement("i");
        commentIcon.className = "far fa-comment";

        left.append(heart, commentIcon);
        actions.append(left);

        const commentInput = document.createElement("input");
        commentInput.className = "comment-input";
        commentInput.placeholder = "Adicione um comentário...";

        info.append(likes, commentInput);

        post.append(header, image, actions, info);

        document.getElementById("feed").prepend(post);

        // Ativa curtidas e comentários da nova publicação
        heart.addEventListener("click", () => {

            const liked = heart.classList.toggle("liked");

            heart.classList.toggle("fas", liked);
            heart.classList.toggle("far", !liked);

            likes.textContent = liked ? "1 curtida" : "0 curtidas";

        });

        commentInput.addEventListener("keypress", event => {

            if (event.key === "Enter" && commentInput.value.trim()) {

                const comment = document.createElement("p");
                comment.textContent = "seu_usuario " + commentInput.value.trim();

                info.insertBefore(comment, commentInput);

                commentInput.value = "";

            }

        });

    });

});
