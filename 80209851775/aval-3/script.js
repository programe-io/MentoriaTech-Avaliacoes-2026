
const $ = (selector) => document.querySelector(selector);

const defaultPosts = [
    {
        id: 1,
        user: "mariana.oficial",
        avatar: "https://i.pravatar.cc/100?img=5",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
        caption: "Aproveitando cada momento! ✨",
        likes: 1245,
        liked: false,
        saved: false,
        comments: []
    },
    {
        id: 2,
        user: "pedro.fotografia",
        avatar: "https://i.pravatar.cc/100?img=8",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        caption: "Que lugar incrível! 🌎",
        likes: 856,
        liked: false,
        saved: false,
        comments: []
    },
    {
        id: 3,
        user: "ana.silva",
        avatar: "https://i.pravatar.cc/100?img=9",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        caption: "Flores e dias felizes! 🌸",
        likes: 320,
        liked: false,
        saved: false,
        comments: []
    }
];

const defaultUsers = [
    { name: "mariana.oficial", avatar: "https://i.pravatar.cc/100?img=5", following: false },
    { name: "pedro.fotografia", avatar: "https://i.pravatar.cc/100?img=8", following: false },
    { name: "ana.silva", avatar: "https://i.pravatar.cc/100?img=9", following: false },
    { name: "lucas.dev", avatar: "https://i.pravatar.cc/100?img=11", following: false }
];

function load(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

let posts = load("insta_posts", defaultPosts);
let users = load("insta_users", defaultUsers);
let profile = load("insta_profile", {
    name: "seu_usuario",
    avatar: "https://i.pravatar.cc/100?img=12"
});

let currentPost = null;
let currentPage = "home";
let searchTerm = "";

function saveData() {
    try {
        localStorage.setItem("insta_posts", JSON.stringify(posts));
        localStorage.setItem("insta_users", JSON.stringify(users));
        localStorage.setItem("insta_profile", JSON.stringify(profile));
    } catch {
        toast("Armazenamento cheio. Tente usar imagens menores.");
    }
}

function toast(message) {
    const element = $("#toast");
    element.textContent = message;
    element.classList.add("show");

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        element.classList.remove("show");
    }, 2500);
}

// PERFIL
function renderProfile() {
    $("#myUsername").textContent = profile.name;
    $("#myAvatar").src = profile.avatar;
}

$("#editProfile").onclick = () => {
    $("#editName").value = profile.name;
    $("#editAvatar").value = profile.avatar;
    openModal("profileModal");
};

$("#saveProfile").onclick = () => {
    const name = $("#editName").value.trim();
    const avatar = $("#editAvatar").value.trim();

    if (!name) {
        toast("Digite um nome de usuário.");
        return;
    }

    profile.name = name;
    if (avatar) profile.avatar = avatar;

    saveData();
    renderProfile();
    closeModal("profileModal");
    toast("Perfil atualizado!");
};

// STORIES
const stories = [
    { name: "Seu story", avatar: profile.avatar, image: profile.avatar },
    { name: "mariana", avatar: "https://i.pravatar.cc/100?img=5", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800" },
    { name: "pedro", avatar: "https://i.pravatar.cc/100?img=8", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800" },
    { name: "julia", avatar: "https://i.pravatar.cc/100?img=9", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800" },
    { name: "gabriel", avatar: "https://i.pravatar.cc/100?img=11", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800" }
];

function renderStories() {
    $("#stories").innerHTML = stories.map((story, index) => `
        <div class="story" data-story="${index}">
            <img src="${story.avatar}" alt="">
            <p>${story.name}</p>
        </div>
    `).join("");
}

$("#stories").onclick = (event) => {
    const item = event.target.closest("[data-story]");
    if (!item) return;

    const story = stories[Number(item.dataset.story)];

    $("#storyImage").src = story.image;
    $("#storyName").textContent = story.name;

    openModal("storyModal");
};

// PUBLICAÇÕES
function renderPosts() {
    const container = $("#posts");

    let filtered = [...posts];

    if (currentPage === "profile") {
        filtered = filtered.filter(post => post.user === profile.name);
    }

    if (currentPage === "saved") {
        filtered = filtered.filter(post => post.saved);
    }

    if (searchTerm) {
        filtered = filtered.filter(post =>
            post.user.toLowerCase().includes(searchTerm) ||
            post.caption.toLowerCase().includes(searchTerm)
        );
    }

    $("#emptyMessage").hidden = filtered.length > 0;

    container.innerHTML = filtered.map(post => `
        <article class="post" data-id="${post.id}">
            <div class="post-header">
                <img src="${post.avatar}" alt="">
                <strong>${escapeHTML(post.user)}</strong>
                <button class="more" data-action="delete">⋯</button>
            </div>

            <img class="post-image" src="${post.image}" alt="Publicação">

            <div class="actions">
                <button data-action="like" class="${post.liked ? "liked" : ""}">
                    ${post.liked ? "♥" : "♡"}
                </button>

                <button data-action="comments">💬</button>

                <button data-action="share">➤</button>

                <button data-action="save" class="save ${post.saved ? "saved" : ""}">
                    ${post.saved ? "🔖" : "♧"}
                </button>
            </div>

            <div class="post-info">
                <strong>${post.likes.toLocaleString("pt-BR")} curtidas</strong>

                <p>
                    <strong>${escapeHTML(post.user)}</strong>
                    ${escapeHTML(post.caption)}
                </p>

                <p class="view-comments" data-action="comments">
                    Ver comentários (${post.comments.length})
                </p>

                <p class="date">Agora</p>
            </div>
        </article>
    `).join("");
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// INTERAÇÕES COM PUBLICAÇÕES
$("#posts").onclick = async (event) => {
    const action = event.target.closest("[data-action]");
    const postElement = event.target.closest(".post");

    if (!action || !postElement) return;

    const post = posts.find(p => p.id == postElement.dataset.id);
    if (!post) return;

    switch (action.dataset.action) {

        case "like":
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            saveData();
            renderPosts();
            break;

        case "save":
            post.saved = !post.saved;
            saveData();
            renderPosts();
            toast(post.saved ? "Publicação salva!" : "Publicação removida dos salvos.");
            break;

        case "comments":
            currentPost = post.id;
            renderComments();
            openModal("commentsModal");
            break;

        case "share":
            try {
                await navigator.clipboard.writeText(
                    window.location.href + "#post-" + post.id
                );
                toast("Link copiado!");
            } catch {
                toast("Não foi possível copiar o link.");
            }
            break;

        case "delete":
            if (post.user !== profile.name) {
                toast("Você só pode excluir suas próprias publicações.");
                return;
            }

            if (confirm("Deseja excluir esta publicação?")) {
                posts = posts.filter(p => p.id !== post.id);
                saveData();
                renderPosts();
                toast("Publicação excluída!");
            }
            break;
    }
};

// COMENTÁRIOS
function renderComments() {
    const post = posts.find(p => p.id === currentPost);

    if (!post) return;

    $("#commentsList").innerHTML = post.comments.map((comment, index) => `
        <div class="comment-item">
            <div>
                <strong>${escapeHTML(comment.user)}</strong>
                ${escapeHTML(comment.text)}
            </div>

            ${comment.user === profile.name ?
                `<button data-delete-comment="${index}">Excluir</button>` : ""}
        </div>
    `).join("") || "<p>Nenhum comentário ainda.</p>";
}

$("#commentForm").onsubmit = (event) => {
    event.preventDefault();

    const input = $("#commentInput");
    const text = input.value.trim();

    if (!text) return;

    const post = posts.find(p => p.id === currentPost);
    if (!post) return;

    post.comments.push({
        user: profile.name,
        text
    });

    input.value = "";
    saveData();
    renderComments();
    renderPosts();
};

$("#commentsList").onclick = (event) => {
    const button = event.target.closest("[data-delete-comment]");
    if (!button) return;

    const post = posts.find(p => p.id === currentPost);
    const index = Number(button.dataset.deleteComment);

    if (!post || post.comments[index]?.user !== profile.name) return;

    post.comments.splice(index, 1);
    saveData();
    renderComments();
    renderPosts();
};

// CRIAR PUBLICAÇÃO
$("#openCreate").onclick = (event) => {
    event.preventDefault();
    openModal("createModal");
};

let selectedImage = "";

$("#imageInput").onchange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        toast("Selecione uma imagem válida.");
        return;
    }

    if (file.size > 3 * 1024 * 1024) {
        toast("Escolha uma imagem de até 3 MB.");
        event.target.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        selectedImage = e.target.result;
        $("#imagePreview").src = selectedImage;
        $("#imagePreview").hidden = false;
    };

    reader.readAsDataURL(file);
};

$("#publishButton").onclick = () => {
    const caption = $("#captionInput").value.trim();

    if (!selectedImage) {
        toast("Escolha uma imagem primeiro.");
        return;
    }

    posts.unshift({
        id: Date.now(),
        user: profile.name,
        avatar: profile.avatar,
        image: selectedImage,
        caption,
        likes: 0,
        liked: false,
        saved: false,
        comments: []
    });

    saveData();

    $("#captionInput").value = "";
    $("#imageInput").value = "";
    $("#imagePreview").hidden = true;
    selectedImage = "";

    closeModal("createModal");

    currentPage = "home";
    searchTerm = "";

    renderPosts();
    toast("Publicação compartilhada!");
};

// SUGESTÕES E SEGUIR
function renderSuggestions() {
    $("#suggestions").innerHTML = users
        .filter(user => user.name !== profile.name)
        .map(user => `
            <div class="suggestion">
                <strong>${escapeHTML(user.name)}</strong>
                <button data-follow="${escapeHTML(user.name)}">
                    ${user.following ? "Seguindo" : "Seguir"}
                </button>
            </div>
        `).join("");
}

$("#suggestions").onclick = (event) => {
    const button = event.target.closest("[data-follow]");
    if (!button) return;

    const user = users.find(u => u.name === button.dataset.follow);
    if (!user) return;

    user.following = !user.following;

    saveData();
    renderSuggestions();
    toast(user.following ? "Você está seguindo!" : "Você deixou de seguir.");
};

// PESQUISA E NAVEGAÇÃO
document.querySelectorAll("[data-page]").forEach(link => {
    link.onclick = (event) => {
        event.preventDefault();

        const page = link.dataset.page;

        if (page === "search") {
            const term = prompt("Digite o nome de um perfil ou palavra:");
            if (term === null) return;

            searchTerm = term.trim().toLowerCase();
            currentPage = "search";
        } else if (page === "messages") {
            openModal("messagesModal");
            return;
        } else if (page === "notifications") {
            toast("Você está em dia com as notificações!");
            return;
        } else if (page === "explore") {
            currentPage = "explore";
            searchTerm = "";
        } else if (page === "reels") {
            toast("Área de Reels: conecte vídeos para ativar.");
            return;
        } else {
            currentPage = page;
            searchTerm = "";
        }

        $("#pageTitle").textContent = {
            home: "Feed",
            search: "Pesquisa",
            explore: "Explorar",
            profile: "Meu perfil"
        }[currentPage] || "Feed";

        document.querySelectorAll("[data-page]").forEach(item =>
            item.classList.toggle("active", item === link)
        );

        renderPosts();
    };
});

// MODAIS
function openModal(id) {
    $("#" + id).classList.add("show");
}

function closeModal(id) {
    $("#" + id).classList.remove("show");
}

document.querySelectorAll("[data-close]").forEach(button => {
    button.onclick = () => closeModal(button.dataset.close);
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    };
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal.show").forEach(modal =>
            modal.classList.remove("show")
        );
    }
});

// INICIALIZAÇÃO
renderProfile();
renderStories();
renderPosts();
renderSuggestions();
