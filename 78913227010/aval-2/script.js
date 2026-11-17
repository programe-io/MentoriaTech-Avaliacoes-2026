
const posts = [
    {
        user: "clara",
        avatar: "https://i.pravatar.cc/100?img=45",
        photo: "https://picsum.photos/id/1011/600/600",
        caption: "Vivendo momentos incríveis! ✨❤️",
        likes: 128
    },
    {
        user: "isadora",
        avatar: "https://i.pravatar.cc/100?img=32",
        photo: "https://picsum.photos/id/1027/600/600",
        caption: "A vida fica mais bonita assim 🌸",
        likes: 245
    },
    {
        user: "marlos",
        avatar: "https://i.pravatar.cc/100?img=12",
        photo: "https://picsum.photos/id/1005/600/600",
        caption: "Só agradece! 🙏🔥",
        likes: 89
    },
    {
        user: "fielpzs",
        avatar: "https://i.pravatar.cc/100?img=15",
        photo: "https://picsum.photos/id/1012/600/600",
        caption: "Mais um dia para fazer história! 🚀",
        likes: 356
    }
];

const feed = document.getElementById("feed");

posts.forEach((post, index) => {
    const article = document.createElement("div");
    article.className = "post";

    article.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar}">
            <b>${post.user}</b>
        </div>

        <img class="post-photo" src="${post.photo}">

        <div class="actions">
            <span onclick="likePost(${index}, this)">♡</span>
            <span onclick="focusComment(${index})">💬</span>
            <span>➤</span>
        </div>

        <div class="caption">
            <b><span id="likes-${index}">${post.likes}</span> curtidas</b>
            <p><b>${post.user}</b> ${post.caption}</p>
        </div>

        <div class="comments" id="comments-${index}">
            Comentários
        </div>

        <div class="comment-input">
            <input id="input-${index}"
            placeholder="Adicione um comentário...">
            <button onclick="addComment(${index})">
                Publicar
            </button>
        </div>
    `;

    feed.appendChild(article);
});

function likePost(index, element) {
    const likes = document.getElementById(`likes-${index}`);

    if (element.classList.contains("like")) {
        element.classList.remove("like");
        element.innerText = "♡";
        likes.innerText = Number(likes.innerText) - 1;
    } else {
        element.classList.add("like");
        element.innerText = "♥";
        likes.innerText = Number(likes.innerText) + 1;
    }
}

function focusComment(index) {
    document.getElementById(`input-${index}`).focus();
}

function addComment(index) {
    const input = document.getElementById(`input-${index}`);
    const comments = document.getElementById(`comments-${index}`);

    if (!input.value.trim()) return;

    const comment = document.createElement("p");
    comment.textContent = "Você: " + input.value;

    comments.appendChild(comment);
    input.value = "";
}
