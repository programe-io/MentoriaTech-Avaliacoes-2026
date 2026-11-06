
const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const feedFilter = document.getElementById("feedFilter");
const publishBtn = document.getElementById("publishBtn");
const postText = document.getElementById("postText");
const postGenre = document.getElementById("postGenre");
const savedPosts = document.getElementById("savedPosts");
const emptyMessage = document.getElementById("emptyMessage");
const toast = document.getElementById("toast");

let savedPostIds = new Set();
let nextPostId = 1;

// AVISO NA TELA

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// IDENTIFICAR PUBLICAÇÕES

function getPosts() {
    return [...postsContainer.querySelectorAll(".post")];
}

getPosts().forEach((post, index) => {
    post.dataset.id = `post-${index}`;
});

// CURTIDAS, COMENTÁRIOS E FAVORITOS

postsContainer.addEventListener("click", (event) => {

    const button = event.target.closest("button");

    if (!button) return;

    const post = button.closest(".post");

    if (!post) return;

    // CURTIR

    if (button.classList.contains("like-btn")) {

        const liked = button.classList.toggle("liked");
        const counter = button.querySelector("span");

        let number = Number(counter.textContent);

        number = liked ? number + 1 : Math.max(0, number - 1);

        counter.textContent = number;

        button.innerHTML = `${liked ? "♥" : "♡"} <span>${number}</span>`;

        showToast(liked ? "❤️ Você curtiu esta publicação!" : "Curtida removida.");

    }

    // ABRIR OU FECHAR COMENTÁRIOS

    if (button.classList.contains("comment-toggle")) {

        const comments = post.querySelector(".comments");

        comments.hidden = !comments.hidden;

        if (!comments.hidden) {
            comments.querySelector("input").focus();
        }

    }

    // ENVIAR COMENTÁRIO

    if (button.classList.contains("send-comment")) {

        const input = post.querySelector(".comment-form input");
        const comment = input.value.trim();

        if (!comment) {
            showToast("Escreva um comentário primeiro!");
            return;
        }

        const commentList = post.querySelector(".comment-list");
        const paragraph = document.createElement("p");
        const author = document.createElement("strong");

        author.textContent = "Você: ";
        paragraph.appendChild(author);
        paragraph.appendChild(document.createTextNode(comment));

        commentList.appendChild(paragraph);

        input.value = "";

        const counter = post.querySelector(".comment-toggle span");
        counter.textContent = Number(counter.textContent) + 1;

        showToast("💬 Comentário publicado!");

    }

    // SALVAR FAVORITOS

    if (button.classList.contains("save-btn")) {

        const postId = post.dataset.id;

        if (savedPostIds.has(postId)) {
            savedPostIds.delete(postId);
            button.classList.remove("saved");
            button.textContent = "🔖 Salvar";
            showToast("Publicação removida dos favoritos.");
        } else {
            savedPostIds.add(postId);
            button.classList.add("saved");
            button.textContent = "💜 Salvo";
            showToast("Livro salvo nos seus favoritos!");
        }

        updateFavorites();
    }

    // MENU DE OPÇÕES

    if (button.classList.contains("more-btn")) {
        showToast("📚 Publicação da comunidade BookSpace.");
    }

});

// ATUALIZAR ÁREA DE FAVORITOS

function updateFavorites() {

    savedPosts.replaceChildren();

    const favorites = getPosts().filter(post =>
        savedPostIds.has(post.dataset.id)
    );

    if (favorites.length === 0) {

        const message = document.createElement("p");
        message.className = "empty-favorites";
        message.textContent =
            "Você ainda não salvou nenhuma publicação.";

        savedPosts.appendChild(message);
        return;
    }

    favorites.forEach(post => {

        const item = document.createElement("div");
        const title = post.querySelector(".post-text h3");
        const user = post.querySelector(".user-info strong");

        item.style.padding = "12px 0";
        item.style.borderBottom = "1px solid var(--border)";

        const heading = document.createElement("strong");
        heading.textContent = title.textContent;

        const author = document.createElement("p");
        author.textContent = "Publicado por " + user.textContent;
        author.style.color = "var(--muted)";
        author.style.fontSize = "12px";

        item.append(heading, author);
        savedPosts.appendChild(item);

    });

}

// PESQUISA E FILTROS

function filterPosts() {

    const search = searchInput.value.toLowerCase().trim();
    const genre = feedFilter.value;

    let visible = 0;

    getPosts().forEach(post => {

        const content = post.textContent.toLowerCase();

        const matchesSearch = content.includes(search);

        const matchesGenre =
            genre === "todos" || post.dataset.genre === genre;

        const matches =
            matchesSearch && matchesGenre;

        post.style.display = matches ? "block" : "none";

        if (matches) visible++;

    });

    emptyMessage.hidden = visible > 0;
}

searchInput.addEventListener("input", filterPosts);

feedFilter.addEventListener("change", filterPosts);

// FILTROS DO MENU LATERAL

document.querySelectorAll(".genre-link").forEach(button => {

    button.addEventListener("click", () => {

        feedFilter.value = button.dataset.genre;

        filterPosts();

        document.getElementById("feed").scrollIntoView({
            behavior: "smooth"
        });

    });

});

// CRIAR NOVA PUBLICAÇÃO

publishBtn.addEventListener("click", () => {

    const text = postText.value.trim();
    const genre = postGenre.value;

    if (!text) {
        showToast("Escreva alguma coisa antes de publicar!");
        postText.focus();
        return;
    }

    const article = document.createElement("article");

    article.className = "post";
    article.dataset.genre = genre;
    article.dataset.id = `new-post-${nextPostId++}`;

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("div");
    avatar.className = "avatar purple";
    avatar.textContent = "L";

    const user = document.createElement("div");
    user.className = "user-info";

    const name = document.createElement("strong");
    name.textContent = "Leitor BookSpace";

    const time = document.createElement("small");
    time.textContent = "Você · agora";

    user.append(name, time);

    const more = document.createElement("button");
    more.className = "more-btn";
    more.textContent = "•••";

    header.append(avatar, user, more);

    const content = document.createElement("div");
    content.className = "post-text";

    const tag = document.createElement("span");
    tag.className = "genre-tag";
    tag.textContent = genre;

    const heading = document.createElement("h3");
    heading.textContent = "Nova publicação literária ✨";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    content.append(tag, heading, paragraph);

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const like = document.createElement("button");
    like.className = "like-btn";
    like.innerHTML = '♡ <span>0</span>';

    const comment = document.createElement("button");
    comment.className = "comment-toggle";
    comment.innerHTML = '💬 <span>0</span>';

    const save = document.createElement("button");
    save.className = "save-btn";
    save.textContent = "🔖 Salvar";

    actions.append(like, comment, save);

    const comments = document.createElement("div");
    comments.className = "comments";
    comments.hidden = true;

    const commentList = document.createElement("div");
    commentList.className = "comment-list";

    const form = document.createElement("div");
    form.className = "comment-form";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escreva um comentário...";

    const send = document.createElement("button");
    send.className = "send-comment";
    send.textContent = "Enviar";

    form.append(input, send);
    comments.append(commentList, form);

    article.append(header, content, actions, comments);

    postsContainer.prepend(article);

    postText.value = "";

    filterPosts();

    showToast("🎉 Sua publicação foi compartilhada!");

});

// STORIES

document.querySelectorAll(".story").forEach(story => {

    story.addEventListener("click", () => {

        const name = story.querySelector("span").textContent;

        if (story.querySelector(".add-story")) {

            showToast("📸 Área de stories demonstrativa!");

        } else {

            showToast("✨ Story de " + name);

        }

    });

});

// MODO ESCURO

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    themeBtn.textContent = dark ? "☀️" : "🌙";

    showToast(dark ? "🌙 Modo escuro ativado!" : "☀️ Modo claro ativado!");

});

// INICIALIZAÇÃO

updateFavorites();
filterPosts();
