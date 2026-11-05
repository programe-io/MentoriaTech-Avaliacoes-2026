
const postInput = document.getElementById("postInput");
const publishBtn = document.getElementById("publishBtn");
const postsContainer = document.getElementById("posts");

// PUBLICAR POSTAGENS

publishBtn.addEventListener("click", () => {
    const content = postInput.value.trim();

    if (content === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "S";

    const userInfo = document.createElement("div");

    const username = document.createElement("strong");
    username.textContent = "Sobrevivente";

    const time = document.createElement("small");
    time.textContent = "Agora mesmo";

    userInfo.append(username, time);
    header.append(avatar, userInfo);

    const paragraph = document.createElement("p");
    paragraph.textContent = content;

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
    share.textContent = "↗ Compartilhar";

    actions.append(like, comment, share);

    post.append(header, paragraph, actions);

    postsContainer.prepend(post);

    postInput.value = "";
});

// CURTIDAS

document.addEventListener("click", (event) => {
    const button = event.target.closest(".like-btn");

    if (!button) return;

    const counter = button.querySelector("span");

    let likes = Number(counter.textContent);

    if (button.classList.contains("liked")) {
        likes--;
        button.classList.remove("liked");
    } else {
        likes++;
        button.classList.add("liked");
    }

    counter.textContent = likes;
});

// COMENTÁRIOS

document.addEventListener("click", (event) => {
    const button = event.target.closest(".comment-btn");

    if (!button) return;

    const comment = prompt("Digite seu comentário:");

    if (comment && comment.trim()) {
        const commentElement = document.createElement("p");
        commentElement.textContent = "💬 " + comment.trim();
        commentElement.style.color = "#aaa";
        commentElement.style.marginTop = "12px";

        button.closest(".post").append(commentElement);
    }
});

// COMPARTILHAR

document.addEventListener("click", async (event) => {
    const button = event.target.closest(".share-btn");

    if (!button) return;

    const post = button.closest(".post");
    const content = post.querySelector("p").textContent;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "Biohazard Social",
                text: content
            });
        } else {
            await navigator.clipboard.writeText(content);
            alert("Publicação copiada!");
        }
    } catch (error) {
        if (error.name !== "AbortError") {
            alert("Não foi possível compartilhar.");
        }
    }
});
