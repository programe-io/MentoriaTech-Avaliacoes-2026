const posts = document.getElementById("posts");
const publishBtn = document.getElementById("publishBtn");

// Curtidas e comentários
posts.addEventListener("click", function(event) {
    const post = event.target.closest(".post");

    if (!post) return;

    // Curtir
    if (event.target.closest(".like-btn")) {
        const button = event.target.closest(".like-btn");
        const counter = button.querySelector("span");

        let likes = Number(counter.textContent);

        if (button.classList.contains("liked")) {
            likes--;
            button.classList.remove("liked");
            button.innerHTML = "♡ Curtir <span>" + likes + "</span>";
        } else {
            likes++;
            button.classList.add("liked");
            button.innerHTML = "♥ Curtir <span>" + likes + "</span>";
        }
    }

    // Mostrar comentários
    if (event.target.closest(".comment-toggle")) {
        const comments = post.querySelector(".comments");
        comments.classList.toggle("active");
    }

    // Enviar comentário
    if (event.target.closest(".comment-btn")) {
        const input = post.querySelector(".comments input");
        const list = post.querySelector(".comment-list");

        const message = input.value.trim();

        if (message === "") return;

        const comment = document.createElement("div");
        comment.className = "comment-item";
        comment.textContent = message;

        list.appendChild(comment);
        input.value = "";
    }
});

// Criar publicação
publishBtn.addEventListener("click", function() {
    const username = document.getElementById("username").value.trim();
    const text = document.getElementById("postText").value.trim();

    if (username === "" || text === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const avatar = username.charAt(0).toUpperCase();

    const user = document.createElement("div");
    user.className = "user";

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "avatar";
    avatarDiv.textContent = avatar;

    const info = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = username;

    const time = document.createElement("small");
    time.textContent = "Agora";

    info.append(name, time);
    user.append(avatarDiv, info);

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    const image = document.createElement("img");
    image.src = "https://picsum.photos/600/300?random=" + Date.now();
    image.alt = "Imagem da publicação";

    const actions = document.createElement("div");
    actions.className = "actions";

    actions.innerHTML = `
        <button class="like-btn">♡ Curtir <span>0</span></button>
        <button class="comment-toggle">💬 Comentar</button>
    `;

    const comments = document.createElement("div");
    comments.className = "comments";

    comments.innerHTML = `
        <div class="comment-list"></div>
        <input type="text" placeholder="Escreva um comentário...">
        <button class="comment-btn">Enviar</button>
    `;

    post.append(user, paragraph, image, actions, comments);

    posts.prepend(post);

    document.getElementById("postText").value = "";
    document.getElementById("username").value = "";
});
