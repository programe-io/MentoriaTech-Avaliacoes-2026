
document.addEventListener("DOMContentLoaded", () => {

    // SISTEMA DE CURTIDAS
    document.querySelectorAll(".like").forEach(button => {

        button.addEventListener("click", () => {

            const post = button.closest(".post");
            const likes = post.querySelector(".likes");

            let total = parseInt(likes.textContent.replace(/\D/g, ""));

            if (button.classList.contains("liked")) {
                button.classList.remove("liked");
                button.textContent = "♡";
                total--;
            } else {
                button.classList.add("liked");
                button.textContent = "♥";
                total++;
            }

            likes.textContent = total.toLocaleString("pt-BR") + " curtidas";
        });

    });

    // SISTEMA DE COMENTÁRIOS
    document.querySelectorAll(".publish-comment").forEach(button => {

        button.addEventListener("click", () => {

            const post = button.closest(".post");
            const input = post.querySelector("input");
            const content = input.value.trim();

            if (content === "") {
                alert("Digite um comentário!");
                return;
            }

            const comment = document.createElement("p");

            const username = document.createElement("strong");
            username.textContent = "Você ";

            comment.appendChild(username);
            comment.appendChild(document.createTextNode(content));

            post.querySelector(".post-content").insertBefore(
                comment,
                post.querySelector(".comment-area")
            );

            input.value = "";

        });

    });

    // BOTÃO DE COMENTÁRIO
    document.querySelectorAll(".comment-button").forEach(button => {

        button.addEventListener("click", () => {

            const input = button.closest(".post").querySelector("input");

            input.focus();

        });

    });

    // SALVAR PUBLICAÇÃO
    document.querySelectorAll(".save").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("liked");

            button.textContent =
                button.classList.contains("liked") ? "♣" : "♧";

        });

    });

    // CRIAR PUBLICAÇÃO
    document.getElementById("newPost").addEventListener("click", event => {

        event.preventDefault();

        const imageUrl = prompt("Digite a URL da imagem:");

        if (!imageUrl || !imageUrl.trim()) return;

        const caption = prompt("Digite uma legenda:") || "";

        const post = document.createElement("article");
        post.className = "post";

        post.innerHTML = `
            <header class="post-header">
                <img src="https://i.pravatar.cc/100?img=12">
                <strong>seu_perfil</strong>
                <span>•••</span>
            </header>

            <img class="post-image">

            <div class="post-actions">
                <button class="like">♡</button>
                <button class="comment-button">💬</button>
                <button>➤</button>
                <button class="save">♧</button>
            </div>

            <div class="post-content">
                <strong class="likes">0 curtidas</strong>
                <p class="caption"></p>
                <div class="comment-area">
                    <input type="text" placeholder="Adicione um comentário...">
                    <button class="publish-comment">Publicar</button>
                </div>
            </div>
        `;

        post.querySelector(".post-image").src = imageUrl;
        post.querySelector(".caption").textContent = caption;

        document.getElementById("feed").prepend(post);

        // Ativa os eventos da nova publicação
        ativarEventos(post);

    });

    function ativarEventos(post) {

        post.querySelector(".like").addEventListener("click", () => {

            const button = post.querySelector(".like");
            const likes = post.querySelector(".likes");

            let total = parseInt(likes.textContent.replace(/\D/g, ""));

            button.classList.toggle("liked");

            if (button.classList.contains("liked")) {
                button.textContent = "♥";
                total++;
            } else {
                button.textContent = "♡";
                total--;
            }

            likes.textContent = total + " curtidas";

        });

        post.querySelector(".publish-comment").addEventListener("click", () => {

            const input = post.querySelector("input");
            const value = input.value.trim();

            if (!value) return;

            const comment = document.createElement("p");
            const username = document.createElement("strong");

            username.textContent = "Você ";
            comment.append(username, document.createTextNode(value));

            post.querySelector(".comment-area").before(comment);

            input.value = "";

        });

        post.querySelector(".comment-button").addEventListener("click", () => {
            post.querySelector("input").focus();
        });

        post.querySelector(".save").addEventListener("click", event => {

            const button = event.currentTarget;
            button.classList.toggle("liked");

            button.textContent =
                button.classList.contains("liked") ? "♣" : "♧";

        });

    }

});
