
const posts = [
    {
        user: "Clara",
        avatar: "https://i.pravatar.cc/100?img=45",
        text: "Boa tarde, pessoal! ❤️✨",
        photo: "https://picsum.photos/id/1011/700/500",
        likes: 120
    },
    {
        user: "Isadora",
        avatar: "https://i.pravatar.cc/100?img=32",
        text: "Que Deus abençoe nosso dia! 🌸",
        photo: "https://picsum.photos/id/1027/700/500",
        likes: 245
    },
    {
        user: "Marlos",
        avatar: "https://i.pravatar.cc/100?img=12",
        text: "Só progresso! 🚀🔥",
        photo: "https://picsum.photos/id/1005/700/500",
        likes: 89
    },
    {
        user: "fielpzs",
        avatar: "https://i.pravatar.cc/100?img=15",
        text: "Foco nos objetivos! 💙",
        photo: "https://picsum.photos/id/1012/700/500",
        likes: 356
    }
];

const feed = document.getElementById("feed");

function renderPosts() {
    feed.innerHTML = "";

    posts.forEach((post, index) => {
        const div = document.createElement("article");
        div.className = "post";

        div.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}">
                <div>
                    <b>${post.user}</b><br>
                    <small>Agora · 🌎</small>
                </div>
            </div>

            <p class="post-text">${post.text}</p>

            ${post.photo ? `
                <img class="post-photo" src="${post.photo}">
            ` : ""}

            <p style="margin-top:12px">
                👍 <span id="likes-${index}">${post.likes}</span> curtidas
            </p>

            <div class="post-actions">
                <button onclick="likePost(${index}, this)">👍 Curtir</button>
                <button onclick="focusComment(${index})">💬 Comentar</button>
                <button onclick="sharePost(${index})">↗ Compartilhar</button>
            </div>

            <div class="comments" id="comments-${index}"></div>

            <div class="comment-input">
                <input id="input-${index}" placeholder="Escreva um comentário...">
                <button onclick="addComment(${index})">Enviar</button>
            </div>
        `;

        feed.appendChild(div);
    });
}

function likePost(index, button) {
    if (button.dataset.liked === "true") {
        posts[index].likes--;
        button.dataset.liked = "false";
        button.style.color = "#65676b";
    } else {
        posts[index].likes++;
        button.dataset.liked = "true";
        button.style.color = "#1877f2";
    }

    document.getElementById(`likes-${index}`).textContent =
        posts[index].likes;
}

function focusComment(index) {
    document.getElementById(`input-${index}`).focus();
}

function addComment(index) {
    const input = document.getElementById(`input-${index}`);
    const comments = document.getElementById(`comments-${index}`);

    if (!input.value.trim()) return;

    const comment = document.createElement("p");
    comment.textContent = "👤 Você: " + input.value;

    comments.appendChild(comment);
    input.value = "";
}

function createPost() {
    const input = document.getElementById("newPost");

    if (!input.value.trim()) {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    posts.unshift({
        user: "Você",
        avatar: "https://i.pravatar.cc/100?img=47",
        text: input.value,
        photo: "",
        likes: 0
    });

    input.value = "";
    renderPosts();
}

function sharePost(index) {
    const text = posts[index].user + ": " + posts[index].text;

    if (navigator.share) {
        navigator.share({ title: "Facebook Clone", text });
    } else {
        navigator.clipboard.writeText(text);
        alert("Publicação copiada!");
    }
}

renderPosts();
