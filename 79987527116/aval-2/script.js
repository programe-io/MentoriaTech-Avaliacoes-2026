
const feed = document.getElementById("feed");

let posts = [
    {
        name: "Mariana Costa",
        avatar: "👩🏻",
        text: "Aproveitando um dia incrível! ☀️💜",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
        likes: 24,
        liked: false,
        comments: []
    },
    {
        name: "Lucas Santos",
        avatar: "👨🏽",
        text: "Um pouco de inspiração para continuar trabalhando nos meus projetos! 🚀",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        likes: 12,
        liked: false,
        comments: []
    }
];

function renderFeed() {
    feed.innerHTML = "";

    posts.forEach((post, index) => {
        const article = document.createElement("article");
        article.className = "post";

        const user = document.createElement("div");
        user.className = "post-user";

        const avatar = document.createElement("div");
        avatar.className = "post-avatar";
        avatar.textContent = post.avatar;

        const userInfo = document.createElement("div");
        const username = document.createElement("strong");
        username.textContent = post.name;

        const date = document.createElement("small");
        date.textContent = "Agora mesmo";

        userInfo.append(username, date);
        user.append(avatar, userInfo);

        const text = document.createElement("p");
        text.textContent = post.text;

        article.append(user, text);

        if (post.image) {
            const image = document.createElement("img");
            image.className = "post-image";
            image.src = post.image;
            image.alt = "Imagem da publicação";
            article.appendChild(image);
        }

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const like = document.createElement("button");
        like.textContent = `${post.liked ? "❤️" : "🤍"} ${post.likes} Curtidas`;

        like.onclick = () => {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderFeed();
        };

        const commentCount = document.createElement("button");
        commentCount.textContent = `💬 ${post.comments.length} Comentários`;

        actions.append(like, commentCount);
        article.appendChild(actions);

        const comments = document.createElement("div");
        comments.className = "comments";

        const input = document.createElement("input");
        input.placeholder = "Escreva um comentário...";

        const commentButton = document.createElement("button");
        commentButton.textContent = "Enviar";
        commentButton.onclick = () => {
            if (!input.value.trim()) return;

            post.comments.push(input.value.trim());
            renderFeed();
        };

        comments.append(input, commentButton);

        post.comments.forEach(comment => {
            const item = document.createElement("div");
            item.className = "comment";
            item.textContent = "💬 " + comment;
            comments.appendChild(item);
        });

        article.appendChild(comments);
        feed.appendChild(article);
    });
}

function openPost() {
    document.getElementById("postModal").style.display = "flex";
}

function closePost() {
    document.getElementById("postModal").style.display = "none";
}

function publishPost() {
    const name = document.getElementById("newName").value.trim();
    const text = document.getElementById("newText").value.trim();
    const image = document.getElementById("newImage").value.trim();

    if (!name || !text) {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    posts.unshift({
        name: name,
        avatar: "👤",
        text: text,
        image: image,
        likes: 0,
        liked: false,
        comments: []
    });

    document.getElementById("newName").value = "";
    document.getElementById("newText").value = "";
    document.getElementById("newImage").value = "";

    closePost();
    renderFeed();
}

renderFeed();
