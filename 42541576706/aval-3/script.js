
// INSTAGRAM CLONE - JAVASCRIPT

// CURTIR PUBLICAÇÃO
document.querySelectorAll(".post").forEach(post => {
    const actions = post.querySelector(".post-actions");
    const likeButton = actions.children[0];

    likeButton.addEventListener("click", () => {
        const liked = likeButton.classList.toggle("liked");

        likeButton.innerHTML = liked ? "❤️" : "♡";
        likeButton.style.color = liked ? "red" : "#262626";

        const likes = post.querySelector(".post-content strong");

        let count = Number(likes.dataset.count || 1250);

        count = liked ? count + 1 : count - 1;

        likes.dataset.count = count;
        likes.textContent = count.toLocaleString("pt-BR") + " curtidas";
    });
});

// COMENTÁRIOS
document.querySelectorAll(".post").forEach(post => {
    const content = post.querySelector(".post-content");

    const input = document.createElement("input");
    input.placeholder = "Adicione um comentário...";
    input.className = "comment-input";

    const button = document.createElement("button");
    button.textContent = "Publicar";
    button.className = "comment-button";

    const area = document.createElement("div");
    area.className = "comment-area";

    const comments = document.createElement("div");
    comments.className = "comments";

    area.append(input, button);
    content.append(area, comments);

    button.addEventListener("click", () => {
        const value = input.value.trim();

        if (!value) return;

        const comment = document.createElement("p");
        const username = document.createElement("strong");

        username.textContent = " seu_usuario: ";

        comment.append("@" , username, document.createTextNode(value));

        comments.appendChild(comment);

        input.value = "";
    });

    input.addEventListener("keypress", event => {
        if (event.key === "Enter") button.click();
    });
});

// SEGUIR USUÁRIOS
document.querySelectorAll(".suggestion a").forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#262626";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#0095f6";
        }
    });
});

// SALVAR PUBLICAÇÃO
document.querySelectorAll(".save").forEach(button => {
    button.addEventListener("click", () => {
        const saved = button.classList.toggle("saved");

        button.textContent = saved ? "🔖" : "♧";
        alert(saved ? "Publicação salva!" : "Publicação removida dos salvos!");
    });
});

// PESQUISA
const search = document.createElement("input");

search.placeholder = "Pesquisar publicação...";
search.className = "search-box";

document.querySelector(".feed").prepend(search);

search.addEventListener("input", () => {
    const value = search.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display =
            post.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
});

// CRIAR PUBLICAÇÃO
const createButton = document.createElement("button");

createButton.textContent = "➕ Nova publicação";
createButton.className = "create-button";

document.querySelector(".feed").prepend(createButton);

createButton.addEventListener("click", () => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) return;

        const imageURL = URL.createObjectURL(file);

        const post = document.createElement("article");
        post.className = "post";

        post.innerHTML = `
            <header class="post-header">
                <img src="https://i.pravatar.cc/100?img=11">
                <strong>seu_usuario</strong>
                <span>•••</span>
            </header>

            <img class="post-image" alt="Nova publicação">

            <div class="post-content">
                <div class="post-actions">
                    <span>♡</span>
                    <span>💬</span>
                    <span>➤</span>
                    <span class="save">♧</span>
                </div>
                <strong>0 curtidas</strong>
                <p><b>seu_usuario</b> Minha nova publicação! ❤️</p>
            </div>
        `;

        post.querySelector(".post-image").src = imageURL;

        document.querySelector(".feed").appendChild(post);

        alert("Publicação criada com sucesso!");
    });

    input.click();
});

console.log("Instagram Clone iniciado!");
