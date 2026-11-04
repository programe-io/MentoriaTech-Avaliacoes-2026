
function likePost(button) {
    const icon = button.querySelector("i");
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 1234);

    if (icon.classList.contains("fa-regular")) {
        icon.classList.replace("fa-regular", "fa-solid");
        button.classList.add("liked");
        count++;
    } else {
        icon.classList.replace("fa-solid", "fa-regular");
        button.classList.remove("liked");
        count--;
    }

    likes.dataset.count = count;
    likes.textContent = count.toLocaleString("pt-BR") + " curtidas";
}

function addComment(input) {
    const text = input.value.trim();

    if (!text) return;

    const comments = input.closest(".post-info")
        .querySelector(".comments");

    const p = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = "voce ";
    p.appendChild(strong);
    p.appendChild(document.createTextNode(text));

    comments.appendChild(p);
    input.value = "";
}

function focusComment(button) {
    const input = button.closest(".post")
        .querySelector(".comment-input");

    input.focus();
}

document.querySelectorAll(".save").forEach(button => {
    button.addEventListener("click", () => {
        const icon = button.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
    });
});

document.getElementById("fileInput").addEventListener("change", function() {
    const file = this.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=12">
            <strong>voce</strong>
            <span>•••</span>
        </div>
        <img class="post-image" src="${url}">
        <div class="actions">
            <button onclick="likePost(this)">
                <i class="fa-regular fa-heart"></i>
            </button>
            <button onclick="focusComment(this)">
                <i class="fa-regular fa-comment"></i>
            </button>
            <button><i class="fa-regular fa-paper-plane"></i></button>
            <button class="save">
                <i class="fa-regular fa-bookmark"></i>
            </button>
        </div>
        <div class="post-info">
            <strong class="likes" data-count="0">0 curtidas</strong>
            <p><strong>voce</strong> Nova publicação! 📸</p>
            <div class="comments"></div>
            <input class="comment-input"
                placeholder="Adicione um comentário..."
                onkeydown="if(event.key==='Enter') addComment(this)">
        </div>
    `;

    document.getElementById("feed").prepend(post);
});
