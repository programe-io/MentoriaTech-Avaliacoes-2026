
// ========================================
// INSTAGRAM CLONE - INTERATIVIDADE
// ========================================

const posts = document.getElementById("posts");
const modal = document.getElementById("modal");
const createBtn = document.getElementById("createBtn");
const closeModal = document.getElementById("closeModal");
const publishBtn = document.getElementById("publishBtn");
const imageInput = document.getElementById("imageInput");
const captionInput = document.getElementById("captionInput");

// Sistema de notificações na tela
function toast(message) {
    let notification = document.getElementById("toast");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "toast";
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        notification.classList.remove("show");
    }, 2500);
}

// ========================================
// CURTIDAS
// ========================================

function toggleLike(button) {
    const post = button.closest(".post");
    const likes = post.querySelector(".likes");

    let count = Number(
        likes.textContent.replace(/\D/g, "")
    );

    if (button.classList.contains("liked")) {
        button.classList.remove("liked");
        button.classList.replace("fa-solid", "fa-regular");
        count = Math.max(0, count - 1);
    } else {
        button.classList.add("liked");
        button.classList.replace("fa-regular", "fa-solid");
        count++;
    }

    likes.textContent =
        count.toLocaleString("pt-BR") + " curtidas";
}

// Clique nos botões
document.addEventListener("click", function(e) {

    // Curtir
    const like = e.target.closest(".like-btn");

    if (like) {
        toggleLike(like);
    }

    // Salvar publicação
    const bookmark = e.target.closest(".bookmark-btn");

    if (bookmark) {
        bookmark.classList.toggle("fa-regular");
        bookmark.classList.toggle("fa-solid");

        toast(
            bookmark.classList.contains("fa-solid")
                ? "Publicação salva! 🔖"
                : "Publicação removida dos salvos."
        );
    }

    // Compartilhar
    const share = e.target.closest(".fa-paper-plane");

    if (share) {
        const post = share.closest(".post");
        const username =
            post.querySelector(".post-header strong")?.textContent;

        const text = "Confira esta publicação de @" + username;

        if (navigator.share) {
            navigator.share({
                title: "Instagram Clone",
                text: text
            }).catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => toast("Link copiado! 📤"))
                .catch(() => toast(text));
        } else {
            toast(text);
        }
    }

    // Comentários
    const commentButton = e.target.closest(".fa-comment");

    if (commentButton) {
        const post = commentButton.closest(".post");
        post.querySelector(".comment-input")?.focus();
    }

    // Seguir usuários
    const follow = e.target.closest(".suggestion a");

    if (follow) {
        e.preventDefault();

        const following = follow.textContent === "Seguir";

        follow.textContent = following ? "Seguindo" : "Seguir";
        follow.style.color = following ? "#262626" : "#0095f6";

        toast(
            following
                ? "Você começou a seguir este usuário!"
                : "Você deixou de seguir este usuário."
        );
    }

    // Opções da publicação
    const menu = e.target.closest(".post-header .fa-ellipsis");

    if (menu) {
        const post = menu.closest(".post");

        const choice = prompt(
            "Opções da publicação:\n\n" +
            "1 - Denunciar publicação\n" +
            "2 - Copiar legenda\n" +
            "3 - Ocultar publicação"
        );

        if (choice === "1") {
            toast("Denúncia registrada para análise.");
        }

        if (choice === "2") {
            const caption = post.querySelector(".post-info p")?.textContent || "";

            if (navigator.clipboard) {
                navigator.clipboard.writeText(caption)
                    .then(() => toast("Legenda copiada!"));
            } else {
                toast(caption);
            }
        }

        if (choice === "3") {
            post.remove();
            toast("Publicação ocultada.");
        }
    }
});

// ========================================
// CURTIR COM DUPLO CLIQUE
// ========================================

document.addEventListener("dblclick", function(e) {

    if (e.target.classList.contains("post-image")) {
        const post = e.target.closest(".post");
        const button = post.querySelector(".like-btn");

        if (!button.classList.contains("liked")) {
            toggleLike(button);
        }

        toast("❤️ Você curtiu esta publicação!");
    }
});

// ========================================
// COMENTÁRIOS
// ========================================

document.addEventListener("keydown", function(e) {

    if (
        e.target.classList.contains("comment-input") &&
        e.key === "Enter"
    ) {
        const input = e.target;
        const text = input.value.trim();

        if (!text) return;

        const post = input.closest(".post");

        const comment = document.createElement("p");
        const username = document.createElement("strong");

        username.textContent = "seu_usuario ";

        comment.appendChild(username);
        comment.appendChild(
            document.createTextNode(text)
        );

        input.before(comment);
        input.value = "";

        toast("Comentário publicado! 💬");
    }
});

// ========================================
// STORIES
// ========================================

document.querySelectorAll(".story").forEach(story => {

    story.style.cursor = "pointer";

    story.addEventListener("click", function() {

        const image = story.querySelector("img").src;
        const username = story.querySelector("span").textContent;

        const viewer = document.createElement("div");

        viewer.className = "story-viewer";

        viewer.innerHTML = `
            <div class="story-progress">
                <div></div>
            </div>

            <button class="story-close">&times;</button>

            <div class="story-user">
                <img src="${image}">
                <strong></strong>
            </div>

            <img class="story-photo" src="${image}">
        `;

        viewer.querySelector(".story-user strong").textContent = username;

        document.body.appendChild(viewer);

        viewer.querySelector(".story-close").onclick = () => {
            viewer.remove();
        };

        viewer.addEventListener("click", function(e) {
            if (e.target === viewer) viewer.remove();
        });

        setTimeout(() => {
            if (viewer.isConnected) viewer.remove();
        }, 5000);
    });
});

// ========================================
// CRIAR PUBLICAÇÃO
// ========================================

createBtn.addEventListener("click", function(e) {
    e.preventDefault();
    modal.classList.add("active");
});

closeModal.addEventListener("click", function() {
    modal.classList.remove("active");
});

modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});

// Publicar
publishBtn.addEventListener("click", function() {

    const file = imageInput.files[0];
    const caption = captionInput.value.trim();

    if (!file) {
        toast("Selecione uma imagem primeiro!");
        return;
    }

    if (!file.type.startsWith("image/")) {
        toast("Arquivo de imagem inválido.");
        return;
    }

    const imageURL = URL.createObjectURL(file);

    const post = document.createElement("article");
    post.className = "post";

    const header = document.createElement("div");
    header.className = "post-header";

    const avatar = document.createElement("img");
    avatar.src = "https://i.pravatar.cc/100?img=12";

    const username = document.createElement("strong");
    username.textContent = "seu_usuario";

    const time = document.createElement("span");
    time.className = "time";
    time.textContent = "• agora";

    const menu = document.createElement("i");
    menu.className = "fa-solid fa-ellipsis";

    header.append(avatar, username, time, menu);

    const image = document.createElement("img");
    image.className = "post-image";
    image.src = imageURL;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const left = document.createElement("div");

    const heart = document.createElement("i");
    heart.className = "fa-regular fa-heart like-btn";

    const commentIcon = document.createElement("i");
    commentIcon.className = "fa-regular fa-comment";

    const shareIcon = document.createElement("i");
    shareIcon.className = "fa-regular fa-paper-plane";

    left.append(heart, commentIcon, shareIcon);

    const bookmark = document.createElement("i");
    bookmark.className = "fa-regular fa-bookmark bookmark-btn";

    actions.append(left, bookmark);

    const info = document.createElement("div");
    info.className = "post-info";

    const likes = document.createElement("strong");
    likes.className = "likes";
    likes.textContent = "0 curtidas";

    const description = document.createElement("p");

    const name = document.createElement("strong");
    name.textContent = "seu_usuario ";

    description.append(
        name,
        document.createTextNode(caption)
    );

    const commentInput = document.createElement("input");
    commentInput.className = "comment-input";
    commentInput.placeholder = "Adicione um comentário...";

    info.append(likes, description, commentInput);

    post.append(header, image, actions, info);

    posts.prepend(post);

    modal.classList.remove("active");

    imageInput.value = "";
    captionInput.value = "";

    toast("Publicação compartilhada! 🎉");
});

// ========================================
// PESQUISA
// ========================================

function searchPosts() {

    const query = prompt("O que você deseja pesquisar?");

    if (query === null) return;

    const search = query.toLowerCase().trim();

    if (!search) return;

    let found = 0;

    document.querySelectorAll(".post").forEach(post => {

        const content = post.textContent.toLowerCase();

        const matches = content.includes(search);

        post.style.display = matches ? "block" : "none";

        if (matches) found++;
    });

    toast(
        found + " publicação(ões) encontrada(s)."
    );
}

// ========================================
// NAVEGAÇÃO
// ========================================

document.querySelectorAll(".sidebar nav a").forEach(link => {

    link.addEventListener("click", function(e) {

        const text = this.textContent.trim();

        if (text === "Criar") return;

        e.preventDefault();

        document.querySelectorAll(".sidebar nav a")
            .forEach(item => item.classList.remove("active"));

        this.classList.add("active");

        if (text.includes("Início")) {
            document.querySelectorAll(".post")
                .forEach(post => post.style.display = "block");

            toast("Você está no início 🏠");
        }

        else if (text.includes("Pesquisa")) {
            searchPosts();
        }

        else if (text.includes("Explorar")) {
            document.querySelectorAll(".post")
                .forEach(post => post.style.display = "block");

            toast("Explore novas publicações! 🔎");
        }

        else if (text.includes("Reels")) {
            toast("Área de Reels em desenvolvimento 🎬");
        }

        else if (text.includes("Mensagens")) {
            toast("Caixa de mensagens aberta! ✉️");
        }

        else if (text.includes("Notificações")) {
            toast("Você não tem novas notificações. 🔔");
        }

        else if (text.includes("Perfil")) {
            toast("Perfil de @seu_usuario");
        }
    });
});

// ========================================
// BOTÃO MAIS
// ========================================

document.querySelector(".more")?.addEventListener("click", function() {

    const option = prompt(
        "Mais opções:\n\n" +
        "1 - Configurações\n" +
        "2 - Salvos\n" +
        "3 - Alternar tema"
    );

    if (option === "1") {
        toast("Configurações em desenvolvimento ⚙️");
    }

    if (option === "2") {
        document.querySelectorAll(".post").forEach(post => {
            post.style.display =
                post.querySelector(".bookmark-btn")
                    .classList.contains("fa-solid")
                    ? "block"
                    : "none";
        });

        toast("Exibindo publicações salvas.");
    }

    if (option === "3") {
        document.body.classList.toggle("dark-mode");
        toast("Tema alterado! 🌙");
    }
});

// ========================================
// PESQUISA E RESTAURAÇÃO
// ========================================

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        modal.classList.remove("active");

        document.querySelectorAll(".story-viewer")
            .forEach(viewer => viewer.remove());
    }
});

console.log("Instagram Clone carregado com sucesso!");
