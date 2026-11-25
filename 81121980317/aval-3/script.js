
// ==========================================
// INSTAGRAM CLONE - SCRIPT.JS
// ==========================================

// DADOS
const me = "meu_perfil";

const users = [
    { name: "mariana.fotos", avatar: "https://i.pravatar.cc/100?img=6" },
    { name: "lucas.viagens", avatar: "https://i.pravatar.cc/100?img=7" },
    { name: "ana.estilo", avatar: "https://i.pravatar.cc/100?img=13" },
    { name: "pedro.fotos", avatar: "https://i.pravatar.cc/100?img=14" },
    { name: "camila", avatar: "https://i.pravatar.cc/100?img=4" }
];

const defaultPosts = [
    {
        id: 1,
        user: "mariana.fotos",
        avatar: users[0].avatar,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        caption: "A natureza é maravilhosa! 🌿",
        likes: 1245,
        liked: false,
        saved: false,
        comments: [
            { user: "ana.estilo", text: "Que lugar lindo! ❤️" }
        ]
    },
    {
        id: 2,
        user: "lucas.viagens",
        avatar: users[1].avatar,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
        caption: "Um dia perfeito na praia! 🌊",
        likes: 856,
        liked: false,
        saved: false,
        comments: []
    },
    {
        id: 3,
        user: "ana.estilo",
        avatar: users[2].avatar,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        caption: "Flores deixam tudo mais bonito! 🌸",
        likes: 450,
        liked: false,
        saved: false,
        comments: []
    }
];

const defaultStories = users.map((user, index) => ({
    ...user,
    image: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700",
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=700",
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=700"
    ][index]
}));

// ==========================================
// ARMAZENAMENTO
// ==========================================

function loadData(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
}

let posts = loadData("insta_posts", defaultPosts);
let following = loadData("insta_following", []);
let stories = loadData("insta_stories", defaultStories);
let notifications = loadData("insta_notifications", []);
let messages = loadData("insta_messages", []);

let currentPage = "home";
let currentStory = 0;
let activeChat = "mariana.fotos";

function saveData() {
    localStorage.setItem("insta_posts", JSON.stringify(posts));
    localStorage.setItem("insta_following", JSON.stringify(following));
    localStorage.setItem("insta_stories", JSON.stringify(stories));
    localStorage.setItem("insta_notifications", JSON.stringify(notifications));
    localStorage.setItem("insta_messages", JSON.stringify(messages));
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function addNotification(text) {
    notifications.unshift({
        text,
        date: new Date().toLocaleString("pt-BR")
    });
    saveData();
}

// ==========================================
// NAVEGAÇÃO
// ==========================================

function navigate(page) {
    currentPage = page;

    document.querySelectorAll("[data-page]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    render();
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
        navigate(button.dataset.page);
    });
});

// ==========================================
// STORIES
// ==========================================

function renderStories() {
    return `
        <section class="stories">
            ${stories.map((story, index) => `
                <div class="story" data-story="${index}">
                    <img src="${escapeHTML(story.avatar)}" alt="">
                    <p>${escapeHTML(story.name)}</p>
                </div>
            `).join("")}
        </section>
    `;
}

function openStory(index) {
    if (!stories.length) return;

    currentStory = (index + stories.length) % stories.length;

    const story = stories[currentStory];

    document.getElementById("story-name").textContent = story.name;
    document.getElementById("story-image").src = story.image;
    document.getElementById("story-modal").classList.add("open");
}

document.getElementById("close-story").onclick = () => {
    document.getElementById("story-modal").classList.remove("open");
};

document.getElementById("story-prev").onclick = () => {
    openStory(currentStory - 1);
};

document.getElementById("story-next").onclick = () => {
    openStory(currentStory + 1);
};

// ==========================================
// PUBLICAÇÕES
// ==========================================

function postHTML(post) {
    return `
        <article class="post" data-id="${post.id}">

            <div class="post-header">
                <img class="avatar" src="${escapeHTML(post.avatar)}">
                <strong>${escapeHTML(post.user)}</strong>
                <button class="more" data-delete="${post.id}">•••</button>
            </div>

            <img class="post-image"
                src="${escapeHTML(post.image)}"
                alt="Publicação"
                data-image-like="${post.id}">

            <div class="post-actions">

                <button class="action ${post.liked ? "liked" : ""}"
                    data-like="${post.id}">
                    ${post.liked ? "❤️" : "🤍"}
                </button>

                <button class="action" data-focus="${post.id}">💬</button>

                <button class="action" data-share="${post.id}">📤</button>

                <button class="action save" data-save="${post.id}">
                    ${post.saved ? "🔖" : "♧"}
                </button>

            </div>

            <div class="post-info">

                <strong>${post.likes.toLocaleString("pt-BR")} curtidas</strong>

                <p>
                    <strong>${escapeHTML(post.user)}</strong>
                    ${escapeHTML(post.caption)}
                </p>

                <div class="comment-list">
                    ${post.comments.map((comment, index) => `
                        <p class="comment">
                            <span>
                                <strong>${escapeHTML(comment.user)}</strong>
                                ${escapeHTML(comment.text)}
                            </span>

                            ${comment.user === me ? `
                                <button class="delete-comment"
                                    data-delete-comment="${post.id}"
                                    data-index="${index}">
                                    ✖
                                </button>
                            ` : ""}
                        </p>
                    `).join("")}
                </div>

            </div>

            <form class="comment-form" data-comment="${post.id}">
                <input name="comment"
                    placeholder="Adicione um comentário..."
                    required>

                <button type="submit">Publicar</button>
            </form>

        </article>
    `;
}

function renderFeed(list = posts) {
    return list.map(postHTML).join("") ||
        '<div class="empty">Nenhuma publicação encontrada.</div>';
}

// ==========================================
// PÁGINAS
// ==========================================

function renderHome() {
    return renderStories() + renderFeed();
}

function renderExplore() {
    return `
        <h2 class="page-title">Explorar 🔍</h2>

        <div class="profile-grid">
            ${posts.map(post => `
                <img src="${escapeHTML(post.image)}"
                    data-explore="${post.id}">
            `).join("")}
        </div>
    `;
}

function renderProfile() {
    const mine = posts.filter(post => post.user === me);

    return `
        <section class="profile-page">

            <img src="https://i.pravatar.cc/150?img=12">

            <h2>Meu Perfil</h2>
            <p>@${me}</p>

            <div class="stats">
                <div>
                    <strong>${mine.length}</strong>
                    <p>Publicações</p>
                </div>

                <div>
                    <strong>${following.length}</strong>
                    <p>Seguindo</p>
                </div>

                <div>
                    <strong>12</strong>
                    <p>Seguidores</p>
                </div>
            </div>

            <button class="primary" id="edit-profile">
                Editar perfil
            </button>

            <h3 style="margin:30px 0 15px">
                Minhas publicações
            </h3>

            <div class="profile-grid">
                ${mine.map(post => `
                    <img src="${escapeHTML(post.image)}"
                        data-explore="${post.id}">
                `).join("")}
            </div>

        </section>
    `;
}

function renderSaved() {
    return `
        <h2 class="page-title">Publicações salvas 🔖</h2>
        ${renderFeed(posts.filter(post => post.saved))}
    `;
}

function renderNotifications() {
    return `
        <h2 class="page-title">Notificações ❤️</h2>

        ${notifications.map(notification => `
            <div class="notification">
                <p>${escapeHTML(notification.text)}</p>
                <small>${escapeHTML(notification.date)}</small>
            </div>
        `).join("") || '<div class="empty">Nenhuma notificação.</div>'}
    `;
}

function renderReels() {
    return `
        <h2 class="page-title">Reels 🎬</h2>
        ${renderFeed([...posts].reverse())}
    `;
}

function renderMessages() {
    return `
        <h2 class="page-title">Mensagens 💬</h2>

        ${users.map(user => `
            <div class="profile-mini">
                <img src="${user.avatar}">

                <div>
                    <strong>${escapeHTML(user.name)}</strong>
                    <br>
                    <small>Conversa privada</small>
                </div>

                <button class="follow" data-chat="${user.name}">
                    Abrir
                </button>
            </div>
        `).join("")}
    `;
}

function render() {
    const pages = {
        home: renderHome,
        explore: renderExplore,
        profile: renderProfile,
        saved: renderSaved,
        notifications: renderNotifications,
        reels: renderReels,
        messages: renderMessages
    };

    document.getElementById("main").innerHTML =
        (pages[currentPage] || renderHome)();
}

// ==========================================
// CURTIDAS E SALVAMENTOS
// ==========================================

function toggleLike(id) {
    const post = posts.find(post => post.id == id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    if (post.liked) {
        addNotification(`Você curtiu uma publicação de ${post.user}.`);
    }

    saveData();
    render();
}

function toggleSave(id) {
    const post = posts.find(post => post.id == id);
    if (!post) return;

    post.saved = !post.saved;

    saveData();
    render();
}

// ==========================================
// COMENTÁRIOS
// ==========================================

function addComment(id, text) {
    const post = posts.find(post => post.id == id);

    if (!post || !text.trim()) return;

    post.comments.push({
        user: me,
        text: text.trim()
    });

    addNotification("Você comentou uma publicação.");

    saveData();
    render();
}

function deleteComment(id, index) {
    const post = posts.find(post => post.id == id);
    if (!post) return;

    if (post.comments[index]?.user !== me) return;

    post.comments.splice(index, 1);

    saveData();
    render();
}

// ==========================================
// CRIAR PUBLICAÇÕES
// ==========================================

function openCreate() {
    document.getElementById("create-modal").classList.add("open");
}

document.getElementById("menu-create").onclick = openCreate;
document.getElementById("header-create").onclick = openCreate;

document.querySelectorAll('[data-close="create-modal"]').forEach(button => {
    button.onclick = () => {
        document.getElementById("create-modal").classList.remove("open");
    };
});

document.getElementById("create-form").addEventListener("submit", event => {
    event.preventDefault();

    const file = document.getElementById("post-image").files[0];
    const caption = document.getElementById("post-caption").value.trim();

    if (!file || !file.type.startsWith("image/")) {
        alert("Escolha uma imagem válida.");
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 2 MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        posts.unshift({
            id: Date.now(),
            user: me,
            avatar: "https://i.pravatar.cc/100?img=12",
            image: reader.result,
            caption,
            likes: 0,
            liked: false,
            saved: false,
            comments: []
        });

        saveData();

        document.getElementById("create-form").reset();
        document.getElementById("create-modal").classList.remove("open");

        navigate("home");

        alert("Publicação criada com sucesso!");
    };

    reader.readAsDataURL(file);
});

// ==========================================
// COMPARTILHAR
// ==========================================

async function sharePost(id) {
    const post = posts.find(post => post.id == id);
    if (!post) return;

    try {
        await navigator.clipboard.writeText(post.image);
        alert("Endereço da imagem copiado!");
    } catch {
        prompt("Copie o endereço:", post.image);
    }
}

// ==========================================
// SEGUIR USUÁRIOS
// ==========================================

function renderSuggestions() {
    document.getElementById("suggestions").innerHTML = `
        <div class="profile-mini">
            <img src="https://i.pravatar.cc/100?img=12">
            <div>
                <strong>${me}</strong>
                <br>
                <small>Meu perfil</small>
            </div>
        </div>

        <h4>Sugestões para você</h4>

        ${users.map(user => `
            <div class="profile-mini">
                <img src="${user.avatar}">

                <div>
                    <strong>${escapeHTML(user.name)}</strong>
                    <br>
                    <small>Sugestão</small>
                </div>

                <button class="follow" data-follow="${user.name}">
                    ${following.includes(user.name) ? "Seguindo" : "Seguir"}
                </button>
            </div>
        `).join("")}
    `;
}

function toggleFollow(name) {
    if (following.includes(name)) {
        following = following.filter(user => user !== name);
    } else {
        following.push(name);
        addNotification(`Você começou a seguir ${name}.`);
    }

    saveData();
    renderSuggestions();

    if (currentPage === "profile") render();
}

// ==========================================
// MENSAGENS
// ==========================================

function openChat(user) {
    activeChat = user;
    renderChat();

    document.getElementById("message-modal").classList.add("open");
}

function renderChat() {
    const chat = messages.filter(message => message.user === activeChat);

    document.getElementById("chat-content").innerHTML = `
        <h3>${escapeHTML(activeChat)}</h3>

        ${chat.map(message => `
            <div class="message ${message.mine ? "my-message" : ""}">
                ${escapeHTML(message.text)}
            </div>
        `).join("")}
    `;
}

document.getElementById("chat-form").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("chat-input");
    const text = input.value.trim();

    if (!text) return;

    messages.push({
        user: activeChat,
        text,
        mine: true
    });

    input.value = "";

    saveData();
    renderChat();
});

// ==========================================
// EVENTOS GERAIS
// ==========================================

document.addEventListener("click", event => {

    const story = event.target.closest("[data-story]");
    if (story) openStory(Number(story.dataset.story));

    const like = event.target.closest("[data-like]");
    if (like) toggleLike(like.dataset.like);

    const save = event.target.closest("[data-save]");
    if (save) toggleSave(save.dataset.save);

    const focus = event.target.closest("[data-focus]");
    if (focus) {
        document.querySelector(
            `[data-comment="${focus.dataset.focus}"] input`
        )?.focus();
    }

    const commentDelete = event.target.closest("[data-delete-comment]");
    if (commentDelete) {
        deleteComment(
            commentDelete.dataset.deleteComment,
            Number(commentDelete.dataset.index)
        );
    }

    const share = event.target.closest("[data-share]");
    if (share) sharePost(share.dataset.share);

    const follow = event.target.closest("[data-follow]");
    if (follow) toggleFollow(follow.dataset.follow);

    const chat = event.target.closest("[data-chat]");
    if (chat) openChat(chat.dataset.chat);

    const explore = event.target.closest("[data-explore]");
    if (explore) {
        const id = explore.dataset.explore;

        navigate("home");

        document.querySelector(`[data-id="${id}"]`)
            ?.scrollIntoView({ behavior: "smooth" });
    }

    const remove = event.target.closest("[data-delete]");
    if (remove) {
        const post = posts.find(p => p.id == remove.dataset.delete);

        if (!post || post.user !== me) {
            alert("Você só pode excluir suas próprias publicações.");
            return;
        }

        if (confirm("Deseja excluir esta publicação?")) {
            posts = posts.filter(p => p.id !== post.id);
            saveData();
            render();
        }
    }

    if (event.target.id === "edit-profile") {
        alert("Edição de perfil demonstrativa.");
    }
});

// ==========================================
// FORMULÁRIO DE COMENTÁRIOS
// ==========================================

document.addEventListener("submit", event => {
    if (!event.target.matches("[data-comment]")) return;

    event.preventDefault();

    const id = event.target.dataset.comment;
    const text = event.target.elements.comment.value;

    addComment(id, text);
});

// ==========================================
// PESQUISA
// ==========================================

document.getElementById("search").addEventListener("input", event => {
    const query = event.target.value.toLowerCase().trim();

    if (!query) {
        navigate("home");
        return;
    }

    currentPage = "home";

    const results = posts.filter(post =>
        post.user.toLowerCase().includes(query) ||
        post.caption.toLowerCase().includes(query) ||
        post.comments.some(comment =>
            comment.text.toLowerCase().includes(query)
        )
    );

    document.getElementById("main").innerHTML = `
        <h2 class="page-title">Resultados da pesquisa</h2>
        ${results.map(postHTML).join("") ||
        '<div class="empty">Nenhum resultado encontrado.</div>'}
    `;
});

// ==========================================
// DUPLO CLIQUE PARA CURTIR
// ==========================================

document.addEventListener("dblclick", event => {
    const image = event.target.closest("[data-image-like]");
    if (!image) return;

    const post = posts.find(p => p.id == image.dataset.imageLike);

    if (post && !post.liked) {
        toggleLike(post.id);
    }
});

// ==========================================
// FECHAR MODAIS
// ==========================================

document.querySelectorAll('[data-close="message-modal"]').forEach(button => {
    button.onclick = () => {
        document.getElementById("message-modal").classList.remove("open");
    };
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("open");
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.classList.remove("open");
        });
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

render();
renderSuggestions();

console.log("Instagram Clone iniciado com sucesso!");
