
function createPost() {
    const text = document.getElementById("postText");
    const content = text.value.trim();

    if (content === "") {
        alert("Escreva alguma coisa!");
        return;
    }

    const post = {
        user: "Usuário",
        content: content,
        date: new Date().toLocaleString("pt-BR")
    };

    renderPost(post);
    text.value = "";
}

function renderPost(post) {
    const feed = document.getElementById("feed");

    const card = document.createElement("div");
    card.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const username = document.createElement("span");
    username.className = "username";
    username.textContent = "👤 " + post.user;

    const date = document.createElement("small");
    date.textContent = post.date;

    header.append(username, date);

    const content = document.createElement("p");
    content.className = "post-content";
    content.textContent = post.content;

    const actions = document.createElement("div");
    actions.className = "actions";

    // Curtidas
    let likes = 0;

    const likeButton = document.createElement("button");
    likeButton.textContent = "❤️ Curtir (0)";

    likeButton.onclick = function() {
        likes++;
        likeButton.textContent = `❤️ Curtir (${likes})`;
    };

    // Comentários
    const commentButton = document.createElement("button");
    commentButton.textContent = "💬 Comentar";

    const comments = document.createElement("div");

    commentButton.onclick = function() {
        const comment = prompt("Digite seu comentário:");

        if (comment && comment.trim()) {
            const item = document.createElement("div");
            item.className = "comment";
            item.textContent = "💬 " + comment.trim();

            comments.appendChild(item);
        }
    };

    actions.append(likeButton, commentButton);

    card.append(header, content, actions, comments);

    feed.prepend(card);
}
