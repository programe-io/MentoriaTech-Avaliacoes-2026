
function like(button) {
    let post = button.closest(".post");
    let likes = post.querySelector(".likes");

    let count = Number(likes.dataset.count || 120);

    if (button.innerHTML === "♡") {
        button.innerHTML = "❤️";
        count++;
    } else {
        button.innerHTML = "♡";
        count--;
    }

    likes.dataset.count = count;
    likes.innerHTML = count + " curtidas";
}

function comment(button) {
    let post = button.closest(".post");
    let input = post.querySelector(".comment-area input");
    let comments = post.querySelector(".comments");

    if (input.value.trim() === "") return;

    let p = document.createElement("p");
    p.textContent = "Você: " + input.value;

    comments.appendChild(p);
    input.value = "";
}

function focusComment(button) {
    button.closest(".post")
        .querySelector(".comment-area input").focus();
}

function darkMode() {
    document.body.classList.toggle("dark");
}

function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "Instagram",
            text: "Confira esta publicação!"
        });
    } else {
        alert("Compartilhamento não disponível.");
    }
}

function createPost() {
    let url = document.getElementById("newPost").value.trim();

    if (!url) {
        alert("Digite o endereço de uma imagem!");
        return;
    }

    let post = document.createElement("div");
    post.className = "post";

    let header = document.createElement("div");
    header.className = "post-header";
    header.textContent = "👤 voce";

    let img = document.createElement("img");
    img.src = url;
    img.alt = "Nova publicação";

    img.onerror = function() {
        alert("Não foi possível carregar a imagem.");
        post.remove();
    };

    post.appendChild(header);
    post.appendChild(img);

    post.insertAdjacentHTML("beforeend", `
        <div class="actions">
            <button onclick="like(this)">♡</button>
            <button onclick="focusComment(this)">💬</button>
            <button onclick="sharePost()">➤</button>
        </div>

        <div class="likes" data-count="0">0 curtidas</div>

        <div class="comments"></div>

        <div class="comment-area">
            <input placeholder="Adicione um comentário...">
            <button onclick="comment(this)">Enviar</button>
        </div>
    `);

    document.getElementById("feed").prepend(post);

    document.getElementById("newPost").value = "";
}

document.getElementById("search").addEventListener("input", function() {
    let value = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display =
            post.innerText.toLowerCase().includes(value)
            ? "block" : "none";
    });
});
