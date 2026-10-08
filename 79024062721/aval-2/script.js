script.js
const postText = document.getElementById("postText");
const publishButton = document.getElementById("publishButton");
const feed = document.getElementById("feed");

publishButton.addEventListener("click", criarPost);

function criarPost() {
    const texto = postText.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de publicar.");
        return;
    }

    const post = document.createElement("article");
    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">
            <div class="avatar">EU</div>

            <div class="post-info">
                <strong>Usuário</strong>
                <small>Agora</small>
            </div>
        </div>

        <div class="post-content">
            ${texto}
        </div>

        <button class="like-button">
            ❤️ Curtir <span>0</span>
        </button>
    `;

    const likeButton = post.querySelector(".like-button");
    const likeCount = post.querySelector("span");

    likeButton.addEventListener("click", () => {
        const curtidas = Number(likeCount.textContent);

        if (likeButton.classList.contains("liked")) {
            likeCount.textContent = curtidas - 1;
            likeButton.classList.remove("liked");
        } else {
            likeCount.textContent = curtidas + 1;
            likeButton.classList.add("liked");
        }
    });

    feed.prepend(post);

    postText.value = "";
}
Estrutura da pasta
mini-feed/
│
├── index.html
├── style.css
└── script.js