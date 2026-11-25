
let posts = JSON.parse(localStorage.getItem("instaPosts")) || [];

function save() {
    localStorage.setItem("instaPosts", JSON.stringify(posts));
}

function focusCreate(event) {
    event.preventDefault();
    document.getElementById("create").scrollIntoView({
        behavior: "smooth"
    });
}

function publish() {
    const username =
        document.getElementById("username").value.trim() || "visitante";

    const caption =
        document.getElementById("caption").value.trim();

    const file = document.getElementById("image").files[0];

    if (!file) {
        alert("Escolha uma imagem!");
        return;
    }

    if (!file.type.startsWith("image/") ||
        file.size > 3 * 1024 * 1024) {
        alert("Selecione uma imagem válida de até 3 MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        posts.unshift({
            id: Date.now(),
            username,
            caption,
            image: e.target.result,
            likes: 0,
            liked: false,
            comments: []
        });

        save();
        render();

        document.getElementById("caption").value = "";
        document.getElementById("image").value = "";
    };

    reader.readAsDataURL(file);
}

function like(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    save();
    render();
}

function addComment(id) {
    const input = document.getElementById("comment-" + id);
    const text = input.value.trim();

    if (!text) return;

    const post = posts.find(p => p.id === id);
    if (!post) return;

    post.comments.push(text);

    save();
    render();
}

function deletePost(id) {
    if (!confirm("Excluir publicação?")) return;

    posts = posts.filter(p => p.id !== id);

    save();
    render();
}

function render() {
    const feed = document.getElementById("feed");
    feed.replaceChildren();

    posts.forEach(post => {
        const card = document.createElement("article");
        card.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const author = document.createElement("strong");
        author.textContent = "👤 " + post.username;

        const remove = document.createElement("button");
        remove.textContent = "•••";
        remove.onclick = () => deletePost(post.id);

        header.append(author, remove);

        const image = document.createElement("img");
        image.className = "post-image";
        image.src = post.image;
        image.alt = "Foto publicada por " + post.username;

        const content = document.createElement("div");
        content.className = "post-content";

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const heart = document.createElement("button");
        heart.className = post.liked ? "liked" : "";
        heart.textContent = post.liked ? "♥" : "♡";
        heart.onclick = () => like(post.id);

        const commentIcon = document.createElement("span");
        commentIcon.textContent = "♡";
        const send = document.createElement("span");
        send.textContent = "➤";

        actions.append(heart, commentIcon, send);

        const likes = document.createElement("strong");
        likes.textContent = post.likes + " curtidas";

        const caption = document.createElement("p");
        caption.textContent = post.username + " " + post.caption;

        content.append(actions, likes, caption);

        post.comments.forEach(comment => {
            const p = document.createElement("p");
            p.textContent = "💬 " + comment;
            content.appendChild(p);
        });

        const commentBox = document.createElement("div");
        commentBox.className = "comment-input";

        const input = document.createElement("input");
        input.id = "comment-" + post.id;
        input.placeholder = "Adicione um comentário...";

        const btn = document.createElement("button");
        btn.textContent = "Publicar";
        btn.onclick = () => addComment(post.id);

        commentBox.append(input, btn);
        content.appendChild(commentBox);

        card.append(header, image, content);
        feed.appendChild(card);
    });
}

render();
