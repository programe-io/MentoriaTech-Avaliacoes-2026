
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function createPost() {
    const username = document.getElementById("username").value.trim();
    const text = document.getElementById("postText").value.trim();

    if (!username || !text) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = {
        id: Date.now(),
        username: username,
        text: text,
        date: new Date().toLocaleString("pt-BR"),
        likes: 0,
        liked: false,
        comments: []
    };

    posts.unshift(post);

    savePosts();
    renderPosts();

    document.getElementById("postText").value = "";
}

function likePost(id) {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    savePosts();
    renderPosts();
}

function deletePost(id) {
    if (!confirm("Deseja excluir esta publicação?")) return;

    posts = posts.filter(p => p.id !== id);

    savePosts();
    renderPosts();
}

function addComment(id, input) {
    const text = input.value.trim();

    if (!text) return;

    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.comments.push(text);

    savePosts();
    renderPosts();
}

function renderPosts() {
    const feed = document.getElementById("posts");

    feed.innerHTML = "";

    if (posts.length === 0) {
        feed.textContent = "Ainda não existem publicações. Seja o primeiro!";
        return;
    }

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const user = document.createElement("strong");
        user.textContent = "👤 " + post.username;

        const date = document.createElement("span");
        date.className = "post-date";
        date.textContent = post.date;

        header.append(user, date);

        const content = document.createElement("p");
        content.className = "post-content";
        content.textContent = post.text;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const like = document.createElement("button");
        like.className = "like-btn";
        like.textContent =
            `${post.liked ? "❤️" : "🤍"} Curtir (${post.likes})`;
        like.onclick = () => likePost(post.id);

        const remove = document.createElement("button");
        remove.className = "delete-btn";
        remove.textContent = "Excluir";
        remove.onclick = () => deletePost(post.id);

        actions.append(like, remove);

        const commentArea = document.createElement("div");
        commentArea.className = "comment-area";

        const commentTitle = document.createElement("strong");
        commentTitle.textContent = "Comentários";

        commentArea.appendChild(commentTitle);

        post.comments.forEach(comment => {
            const item = document.createElement("div");
            item.className = "comment";
            item.textContent = "💬 " + comment;
            commentArea.appendChild(item);
        });

        const input = document.createElement("input");
        input.placeholder = "Escreva um comentário...";

        const commentButton = document.createElement("button");
        commentButton.textContent = "Comentar";

        commentButton.onclick = () => addComment(post.id, input);

        commentArea.append(input, commentButton);

        article.append(
            header,
            content,
            actions,
            commentArea
        );

        feed.appendChild(article);
    });
}

// Carregar publicações salvas
renderPosts();
