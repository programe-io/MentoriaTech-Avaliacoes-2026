
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function createPost() {
    const text = document.getElementById("postText").value.trim();
    const file = document.getElementById("postImage").files[0];

    if (!text && !file) {
        alert("Escreva algo ou escolha uma imagem!");
        return;
    }

    const post = {
        id: Date.now(),
        text: text,
        image: "",
        likes: 0,
        liked: false,
        comments: [],
        date: new Date().toLocaleString("pt-BR")
    };

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            post.image = e.target.result;
            posts.unshift(post);
            savePosts();
            renderPosts();
        };

        reader.readAsDataURL(file);
    } else {
        posts.unshift(post);
        savePosts();
        renderPosts();
    }

    document.getElementById("postText").value = "";
    document.getElementById("postImage").value = "";
}

function likePost(id) {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    savePosts();
    renderPosts();
}

function addComment(id) {
    const input = document.getElementById("comment-" + id);
    const text = input.value.trim();

    if (!text) return;

    const post = posts.find(p => p.id === id);

    if (!post) return;

    post.comments.push(text);

    savePosts();
    renderPosts();
}

function deletePost(id) {
    if (!confirm("Deseja excluir esta publicação?")) return;

    posts = posts.filter(p => p.id !== id);

    savePosts();
    renderPosts();
}

function renderPosts() {
    const container = document.getElementById("posts");

    container.innerHTML = "";

    if (posts.length === 0) {
        container.innerHTML = "<p>Nenhuma publicação ainda. Seja o primeiro!</p>";
        return;
    }

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        const title = document.createElement("h3");
        title.textContent = "👤 Visitante";

        const date = document.createElement("small");
        date.textContent = post.date;

        const content = document.createElement("p");
        content.textContent = post.text;

        article.append(title, date, content);

        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            img.alt = "Imagem da publicação";
            article.appendChild(img);
        }

        const actions = document.createElement("div");
        actions.className = "actions";

        const like = document.createElement("button");
        like.textContent = `${post.liked ? "❤️" : "🤍"} Curtir (${post.likes})`;
        like.onclick = () => likePost(post.id);

        const remove = document.createElement("button");
        remove.textContent = "🗑 Excluir";
        remove.onclick = () => deletePost(post.id);

        actions.append(like, remove);
        article.appendChild(actions);

        const commentInput = document.createElement("input");
        commentInput.className = "comment-input";
        commentInput.id = "comment-" + post.id;
        commentInput.placeholder = "Escreva um comentário...";

        const commentButton = document.createElement("button");
        commentButton.textContent = "Comentar";
        commentButton.style.marginTop = "8px";
        commentButton.onclick = () => addComment(post.id);

        article.append(commentInput, commentButton);

        post.comments.forEach(comment => {
            const div = document.createElement("div");
            div.className = "comment";
            div.textContent = "💬 " + comment;
            article.appendChild(div);
        });

        container.appendChild(article);
    });
}

renderPosts();
