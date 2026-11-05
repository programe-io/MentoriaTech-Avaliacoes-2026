
const feed = document.getElementById("feed");
const postInput = document.getElementById("postInput");
const publishBtn = document.getElementById("publishBtn");
const newPostBtn = document.getElementById("newPostBtn");
const postModal = document.getElementById("postModal");
const closeModal = document.getElementById("closeModal");
const modalPublish = document.getElementById("modalPublish");
const modalText = document.getElementById("modalText");

// ABRIR E FECHAR JANELA DE PUBLICAÇÃO

newPostBtn.addEventListener("click", () => {
    postModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    postModal.style.display = "none";
});

postModal.addEventListener("click", (event) => {
    if (event.target === postModal) {
        postModal.style.display = "none";
    }
});

// CRIAR PUBLICAÇÃO

function createPost(text) {
    if (!text.trim()) {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";
    post.dataset.user = "Leon S. Kennedy";

    const safeText = document.createElement("p");
    safeText.textContent = text;

    const header = document.createElement("div");
    header.className = "post-header";
    header.innerHTML = `
        <div class="avatar">🧟</div>
        <div>
            <strong>Leon S. Kennedy</strong>
            <small>Raccoon City • Agora</small>
        </div>
        <span class="verified">☣</span>
    `;

    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.innerHTML = `
        <button class="like-btn">♡ Curtir</button>
        <button class="comment-btn">💬 Comentar</button>
        <button class="share-btn">↗ Compartilhar</button>
    `;

    const likes = document.createElement("div");
    likes.className = "likes";
    likes.innerHTML = '❤️ <span>0</span> curtidas';

    const comments = document.createElement("div");
    comments.className = "comments";

    const commentInput = document.createElement("div");
    commentInput.className = "comment-input";
    commentInput.innerHTML = `
        <input type="text" placeholder="Escreva um comentário...">
        <button class="send-comment">Enviar</button>
    `;

    post.append(
        header,
        safeText,
        actions,
        likes,
        comments,
        commentInput
    );

    feed.prepend(post);

    postInput.value = "";
    modalText.value = "";
    postModal.style.display = "none";
}

publishBtn.addEventListener("click", () => {
    createPost(postInput.value);
});

postInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        createPost(postInput.value);
    }
});

modalPublish.addEventListener("click", () => {
    createPost(modalText.value);
});

// CURTIDAS, COMENTÁRIOS E COMPARTILHAMENTOS

feed.addEventListener("click", async (event) => {

    const button = event.target.closest("button");
    if (!button) return;

    const post = button.closest(".post");
    if (!post) return;

    // CURTIR
    if (button.classList.contains("like-btn")) {
        const count = post.querySelector(".likes span");
        let total = Number(count.textContent);

        if (button.classList.toggle("liked")) {
            total++;
            button.textContent = "♥ Curtido";
        } else {
            total--;
            button.textContent = "♡ Curtir";
        }

        count.textContent = total;
    }

    // COMENTAR
    if (button.classList.contains("send-comment")) {
        const input = post.querySelector(".comment-input input");
        const comments = post.querySelector(".comments");

        if (!input.value.trim()) return;

        const comment = document.createElement("p");
        const author = document.createElement("strong");

        author.textContent = "Sobrevivente: ";
        comment.append(author, document.createTextNode(input.value));

        comments.appendChild(comment);
        input.value = "";
    }

    // ABRIR CAMPO DE COMENTÁRIO
    if (button.classList.contains("comment-btn")) {
        post.querySelector(".comment-input input").focus();
    }

    // COMPARTILHAR
    if (button.classList.contains("share-btn")) {
        const text = post.querySelector("p")?.textContent || "";
        const shareText = "RESIDENT EVIL SOCIAL: " + text;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Resident Evil Social",
                    text: shareText
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareText);
                alert("Publicação copiada para compartilhar!");
            } else {
                alert(shareText);
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                alert("Não foi possível compartilhar.");
            }
        }
    }
});

// PESQUISAR SOBREVIVENTES

const search = document.getElementById("search");

search.addEventListener("input", () => {
    const value = search.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const user = post.dataset.user.toLowerCase();
        const text = post.textContent.toLowerCase();

        post.style.display =
            user.includes(value) || text.includes(value)
            ? "block"
            : "none";
    });
});

// STORIES INTERATIVOS

document.querySelectorAll(".story").forEach(story => {
    story.addEventListener("click", () => {
        const name = story.querySelector("span").textContent;

        alert(
            "STORY DE " + name.toUpperCase() +
            "\n\nVocê está visualizando o registro do sobrevivente!"
        );
    });
});

// MENU ATIVO

document.querySelectorAll(".sidebar nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".sidebar nav a")
            .forEach(item => item.classList.remove("active"));

        link.classList.add("active");
    });
});
