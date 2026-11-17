
const publishBtn = document.getElementById("publishBtn");
const postText = document.getElementById("postText");
const posts = document.getElementById("posts");

// Criar publicação
publishBtn.addEventListener("click", () => {
    const text = postText.value.trim();

    if (!text) {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "Meu perfil";

    const info = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = "Meu Perfil";

    const time = document.createElement("small");
    time.textContent = "Agora";

    info.append(name, time);
    header.append(avatar, info);

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like-btn";
    like.innerHTML = '❤️ <span>0</span>';

    const comment = document.createElement("button");
    comment.className = "comment-btn";
    comment.textContent = "💬 Comentar";

    const share = document.createElement("button");
    share.className = "share-btn";
    share.textContent = "🔗 Compartilhar";

    actions.append(like, comment, share);

    const comments = document.createElement("div");
    comments.className = "comments";

    const input = document.createElement("input");
    input.placeholder = "Escreva um comentário...";

    const send = document.createElement("button");
    send.className = "send-comment";
    send.textContent = "Enviar";

    const list = document.createElement("div");
    list.className = "comment-list";

    comments.append(input, send, list);

    post.append(header, paragraph, actions, comments);

    posts.prepend(post);

    postText.value = "";
});

// Interações do feed
posts.addEventListener("click", async (event) => {
    const button = event.target.closest("button");

    if (!button) return;

    const post = button.closest(".post");

    // Curtir publicação
    if (button.classList.contains("like-btn")) {
        const count = button.querySelector("span");

        let likes = Number(count.textContent);

        if (button.classList.toggle("liked")) {
            likes++;
        } else {
            likes--;
        }

        count.textContent = likes;
    }

    // Mostrar comentários
    if (button.classList.contains("comment-btn")) {
        post.querySelector(".comments input").focus();
    }

    // Enviar comentário
    if (button.classList.contains("send-comment")) {
        const input = post.querySelector(".comments input");
        const list = post.querySelector(".comment-list");

        const text = input.value.trim();

        if (!text) return;

        const item = document.createElement("div");
        item.className = "comment-item";
        item.textContent = "Você: " + text;

        list.appendChild(item);

        input.value = "";
    }

    // Compartilhar publicação
    if (button.classList.contains("share-btn")) {
        const text = post.querySelector("p")?.textContent || "";

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "SocialFeed",
                    text
                });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            }
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            alert("Publicação copiada!");
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    }
});

// Pesquisar publicações
document.getElementById("search").addEventListener("input", (event) => {
    const search = event.target.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const content = post.textContent.toLowerCase();

        post.style.display = content.includes(search)
            ? "block"
            : "none";
    });
});

// Botões de seguir
document.querySelectorAll(".suggestion button").forEach(button => {
    button.addEventListener("click", () => {
        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";
        button.style.background = following ? "#7656ff" : "#34394d";
    });
});
