
let posts = JSON.parse(localStorage.getItem("socialPosts")) || [];

function save() {
    localStorage.setItem("socialPosts", JSON.stringify(posts));
}

function publish() {
    const text = document.getElementById("postText").value.trim();
    const file = document.getElementById("postImage").files[0];

    if (!text && !file) {
        alert("Escreva algo ou selecione uma imagem!");
        return;
    }

    const post = {
        id: Date.now(),
        author: "Você",
        text,
        image: "",
        likes: 0,
        liked: false,
        comments: []
    };

    function finish() {
        posts.unshift(post);
        save();
        render();
        document.getElementById("postText").value = "";
        document.getElementById("postImage").value = "";
    }

    if (file) {
        if (file.size > 3 * 1024 * 1024) {
            alert("Escolha uma imagem de até 3 MB.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Selecione uma imagem válida.");
            return;
        }

        const reader = new FileReader();

        reader.onload = e => {
            post.image = e.target.result;
            finish();
        };

        reader.readAsDataURL(file);
    } else {
        finish();
    }
}

function like(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    save();
    render();
}

function comment(id) {
    const input = document.getElementById("comment" + id);
    const value = input.value.trim();

    if (!value) return;

    const post = posts.find(p => p.id === id);
    if (!post) return;

    post.comments.push(value);
    save();
    render();
}

function removePost(id) {
    if (!confirm("Excluir esta publicação?")) return;

    posts = posts.filter(p => p.id !== id);
    save();
    render();
}

function render() {
    const container = document.getElementById("posts");
    container.replaceChildren();

    posts.forEach(post => {
        const card = document.createElement("article");
        card.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const author = document.createElement("strong");
        author.textContent = "👤 " + post.author;

        const remove = document.createElement("button");
        remove.textContent = "Excluir";
        remove.onclick = () => removePost(post.id);

        header.append(author, remove);
        card.appendChild(header);

        const text = document.createElement("p");
        text.textContent = post.text;
        card.appendChild(text);

        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            img.alt = "Imagem da publicação";
            card.appendChild(img);
        }

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const btnLike = document.createElement("button");
        btnLike.textContent =
            `${post.liked ? "❤️" : "🤍"} Curtir ${post.likes}`;
        btnLike.onclick = () => like(post.id);

        const btnComment = document.createElement("button");
        btnComment.textContent = "💬 Comentar";
        btnComment.onclick = () => comment(post.id);

        actions.append(btnLike, btnComment);
        card.appendChild(actions);

        const input = document.createElement("input");
        input.id = "comment" + post.id;
        input.placeholder = "Escreva um comentário...";
        input.style.cssText =
            "width:100%;padding:12px;margin-top:15px;border:1px solid #ddd;border-radius:8px";

        card.appendChild(input);

        post.comments.forEach(value => {
            const commentBox = document.createElement("p");
            commentBox.textContent = "💬 " + value;
            commentBox.style.marginTop = "10px";
            card.appendChild(commentBox);
        });

        container.appendChild(card);
    });
}

render();
