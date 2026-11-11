
const postText = document.getElementById("postText");
const publishBtn = document.getElementById("publishBtn");
const posts = document.getElementById("posts");

// PUBLICAR NOVA POSTAGEM

publishBtn.addEventListener("click", function () {
    const text = postText.value.trim();

    if (text === "") {
        alert("Escreva alguma coisa antes de publicar!");
        return;
    }

    const newPost = document.createElement("article");
    newPost.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";
    avatar.alt = "João Vitor";

    const info = document.createElement("div");
    info.className = "user-info";

    const name = document.createElement("strong");
    name.textContent = "João Vitor";

    const date = document.createElement("span");
    date.textContent = "Agora mesmo";

    info.append(name, date);
    header.append(avatar, info);

    const paragraph = document.createElement("p");
    paragraph.className = "post-text";
    paragraph.textContent = text;

    const stats = document.createElement("div");
    stats.className = "post-stats";
    stats.innerHTML = `
        <span class="like-count">❤️ 0 curtidas</span>
        <span>0 comentários</span>
    `;

    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.innerHTML = `
        <button class="like-btn">♡ Curtir</button>
        <button class="comment-focus">♧ Comentar</button>
        <button class="share-btn">↗ Compartilhar</button>
    `;

    const commentArea = document.createElement("div");
    commentArea.className = "comment-area";
    commentArea.innerHTML = `
        <input type="text" placeholder="Escreva um comentário...">
        <button class="comment-btn">Enviar</button>
    `;

    const commentsList = document.createElement("div");
    commentsList.className = "comments-list";

    newPost.append(
        header,
        paragraph,
        stats,
        actions,
        commentArea,
        commentsList
    );

    posts.prepend(newPost);
    postText.value = "";

    newPost.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// CURTIR PUBLICAÇÕES

posts.addEventListener("click", function (event) {
    const button = event.target.closest(".like-btn");

    if (!button) return;

    const post = button.closest(".post");
    const count = post.querySelector(".like-count");

    let likes = Number(
        count.dataset.likes ||
        count.textContent.match(/\d+/)?.[0] ||
        0
    );

    const liked = button.classList.toggle("liked");

    if (liked) {
        likes++;
        button.textContent = "♥ Curtido";
    } else {
        likes--;
        button.textContent = "♡ Curtir";
    }

    count.dataset.likes = likes;
    count.textContent = `❤️ ${likes} curtidas`;
});

// COMENTAR PUBLICAÇÕES

posts.addEventListener("click", function (event) {
    const button = event.target.closest(".comment-btn");

    if (!button) return;

    const post = button.closest(".post");
    const input = post.querySelector(".comment-area input");
    const commentsList = post.querySelector(".comments-list");

    const comment = input.value.trim();

    if (comment === "") {
        alert("Digite um comentário!");
        return;
    }

    const item = document.createElement("div");
    item.className = "comment-item";

    const author = document.createElement("strong");
    author.textContent = "João Vitor: ";

    const content = document.createElement("span");
    content.textContent = comment;

    item.append(author, content);
    commentsList.appendChild(item);

    input.value = "";

    const stats = post.querySelector(".post-stats span:last-child");
    const total = commentsList.children.length;

    stats.textContent = `${total} comentário${total === 1 ? "" : "s"}`;
});

// FOCAR NO CAMPO DE COMENTÁRIO

posts.addEventListener("click", function (event) {
    const button = event.target.closest(".comment-focus");

    if (!button) return;

    const post = button.closest(".post");
    post.querySelector(".comment-area input").focus();
});

// COMPARTILHAR PUBLICAÇÕES

posts.addEventListener("click", async function (event) {
    const button = event.target.closest(".share-btn");

    if (!button) return;

    const post = button.closest(".post");
    const text = post.querySelector(".post-text").textContent;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "Connect - Publicação",
                text: text
            });
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            alert("Publicação copiada para compartilhar!");
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            alert("Não foi possível compartilhar.");
        }
    }
});

// SEGUIR USUÁRIOS

document.querySelectorAll(".follow-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const following = button.classList.toggle("following");

        button.textContent = following ? "✓" : "+";
        button.style.background = following ? "#dff5e9" : "#eeedff";
        button.style.color = following ? "#299c71" : "#635bdb";
    });
});
