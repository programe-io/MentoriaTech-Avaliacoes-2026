
/* =====================================
   BLACKPINK INSTAGRAM
   Sistema de interação e armazenamento
===================================== */

const images = {
    lisa: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_6vJ_3ROtjLQZdtkN9OdjwGhs9ctFENMlTTXfycIChcprVirwhmxwhokdpSR_ryFtj02Iw_8QzH3mgqn_WK_fVQxb4FRmkcCjb7yOE1KBIw&s=10",
    jennie: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYBslTCmwIuOPcYCZ67dmVnpySjp1I1w3ZygVuvAa5ddgAAlwWlG8lnckClUBc8NW4SS-rH4SZ4OZmlvhYjgNFizNuMMZLDfCgTmEmeIq&s=10",
    rose: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRejT9eaUn8N_s-T-bidfSb3J55Dv5ga_VYFgMeEbc7GfwFBWo41nM_vxcTGjWQbn8not3m77XQK6ixV-8kI4wLiKZcVStD0lxW2s1xsccpNw&s=10"
};

const profiles = [
    {
        name: "Lisa",
        username: "lalalalisa_m",
        image: images.lisa,
        description: "LALISA 🖤"
    },
    {
        name: "Jennie",
        username: "jennierubyjane",
        image: images.jennie,
        description: "JENNIERUBYJANE 💗"
    },
    {
        name: "Rosé",
        username: "roses_are_rosie",
        image: images.rose,
        description: "ROSÉ 🌹"
    }
];

const initialPosts = [
    {
        id: 1,
        username: "lalalalisa_m",
        name: "Lisa",
        image: images.lisa,
        avatar: images.lisa,
        caption: "LALISA IN YOUR AREA! 🖤✨",
        likes: 2458000,
        liked: false,
        saved: false,
        comments: [
            { user: "blink_world", text: "QUE MULHER PERFEITA! 💗" },
            { user: "blackpinkfan", text: "LISA VOCÊ É INCRÍVEL!" }
        ],
        verified: true
    },
    {
        id: 2,
        username: "jennierubyjane",
        name: "Jennie",
        image: images.jennie,
        avatar: images.jennie,
        caption: "A little moment with BLINKS. 💗",
        likes: 1876000,
        liked: false,
        saved: false,
        comments: [
            { user: "blinkforever", text: "JENNIEEEE ❤️" },
            { user: "pinkvenom", text: "Rainha demais!" }
        ],
        verified: true
    },
    {
        id: 3,
        username: "roses_are_rosie",
        name: "Rosé",
        image: images.rose,
        avatar: images.rose,
        caption: "Love you always, BLINKS! 🌹",
        likes: 1950000,
        liked: false,
        saved: false,
        comments: [
            { user: "rosefan", text: "Beautiful Rosé!" },
            { user: "blink_world", text: "Nossa princesa! 💗" }
        ],
        verified: true
    }
];

// Armazenamento
function loadData(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
}

let posts = loadData("bp_posts", initialPosts);
let following = loadData("bp_following", []);
let notifications = loadData("bp_notifications", []);
let conversations = loadData("bp_chats", {});

let currentPost = null;
let currentChat = null;
let storyTimer = null;
let storyIndex = 0;

function saveData() {
    localStorage.setItem("bp_posts", JSON.stringify(posts));
    localStorage.setItem("bp_following", JSON.stringify(following));
    localStorage.setItem("bp_notifications", JSON.stringify(notifications));
    localStorage.setItem("bp_chats", JSON.stringify(conversations));
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

function safeImage(url) {
    try {
        const parsed = new URL(url);
        return ["https:", "http:"].includes(parsed.protocol)
            ? escapeHTML(url)
            : "";
    } catch {
        return "";
    }
}

function formatLikes(number) {
    return Number(number).toLocaleString("pt-BR");
}

/* =====================================
   FEED
===================================== */

function renderPosts() {
    const container = document.getElementById("postsContainer");

    container.innerHTML = posts.map(post => `
        <article class="post" data-id="${post.id}">

            <div class="post-header">
                <img class="avatar" src="${safeImage(post.avatar)}">

                <div class="post-user">
                    <strong>${escapeHTML(post.username)}
                    ${post.verified ? '<i class="fa-solid fa-circle-check verified"></i>' : ''}
                    </strong>
                    <small>${escapeHTML(post.name)} • BLACKPINK</small>
                </div>

                <button class="post-menu" data-menu="${post.id}">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
            </div>

            <img class="post-image"
                 src="${safeImage(post.image)}"
                 alt="Publicação de ${escapeHTML(post.name)}"
                 data-preview="${post.id}">

            <div class="post-actions">
                <button class="${post.liked ? 'liked' : ''}"
                        data-like="${post.id}"
                        aria-label="Curtir">
                    <i class="${post.liked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                </button>

                <button data-comment="${post.id}" aria-label="Comentar">
                    <i class="fa-regular fa-comment"></i>
                </button>

                <button data-share="${post.id}" aria-label="Compartilhar">
                    <i class="fa-regular fa-paper-plane"></i>
                </button>

                <button class="save-button ${post.saved ? 'saved' : ''}"
                        data-save="${post.id}"
                        aria-label="Salvar">
                    <i class="${post.saved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                </button>
            </div>

            <div class="likes">${formatLikes(post.likes)} curtidas</div>

            <div class="caption">
                <strong>${escapeHTML(post.username)}</strong>
                ${escapeHTML(post.caption)}
            </div>

            <button class="view-comments" data-comment="${post.id}">
                Ver todos os ${post.comments.length} comentários
            </button>

            <small class="post-time">HÁ ALGUNS MOMENTOS</small>

            <form class="quick-comment" data-quick="${post.id}">
                <input name="comment" placeholder="Adicione um comentário..." required>
                <button type="submit">Publicar</button>
            </form>
        </article>
    `).join("");

    renderProfile();
    updatePostCount();
}

/* CURTIR */

function likePost(id) {
    const post = posts.find(p => p.id == id);
    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    if (post.liked) {
        addNotification("Você curtiu uma publicação de " + post.username);
    }

    saveData();
    renderPosts();
}

/* SALVAR */

function savePost(id) {
    const post = posts.find(p => p.id == id);
    if (!post) return;

    post.saved = !post.saved;

    saveData();
    renderPosts();
}

/* =====================================
   COMENTÁRIOS
===================================== */

function openComments(id) {
    currentPost = posts.find(p => p.id == id);
    if (!currentPost) return;

    renderComments();

    document.getElementById("commentModal").classList.add("show");
}

function renderComments() {
    const list = document.getElementById("commentsList");

    list.innerHTML = currentPost.comments.map(comment => `
        <div class="comment-item">
            <strong>${escapeHTML(comment.user)}</strong>
            ${escapeHTML(comment.text)}
        </div>
    `).join("") || "<p>Seja o primeiro a comentar!</p>";
}

document.getElementById("commentForm").addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("commentInput");
    const text = input.value.trim();

    if (!text || !currentPost) return;

    currentPost.comments.push({
        user: "blink_world",
        text: text
    });

    input.value = "";

    saveData();
    renderComments();
    renderPosts();
});

function addQuickComment(id, text) {
    const post = posts.find(p => p.id == id);
    if (!post || !text.trim()) return;

    post.comments.push({
        user: "blink_world",
        text: text.trim()
    });

    saveData();
    renderPosts();
}

/* =====================================
   CRIAR PUBLICAÇÃO
===================================== */

function openCreate() {
    document.getElementById("createModal").classList.add("show");
}

function createPost() {
    const imageInput = document.getElementById("postImage");
    const captionInput = document.getElementById("postCaption");

    const image = imageInput.value.trim();
    const caption = captionInput.value.trim();

    if (!image) {
        alert("Insira o endereço de uma imagem.");
        return;
    }

    let validURL;

    try {
        validURL = new URL(image);
    } catch {
        alert("Digite um endereço de imagem válido.");
        return;
    }

    if (!["https:", "http:"].includes(validURL.protocol)) {
        alert("Endereço de imagem inválido.");
        return;
    }

    const post = {
        id: Date.now(),
        username: "blink_world",
        name: "BLACKPINK FAN PAGE",
        image: image,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        caption: caption || "Um momento especial! 🖤💗",
        likes: 0,
        liked: false,
        saved: false,
        comments: [],
        verified: false
    };

    posts.unshift(post);

    saveData();
    renderPosts();

    imageInput.value = "";
    captionInput.value = "";

    closeModal("createModal");
    navigate("home");

    alert("Publicação criada com sucesso!");
}

document.getElementById("publishButton")
    .addEventListener("click", createPost);

/* =====================================
   NAVEGAÇÃO
===================================== */

function navigate(page) {
    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active-page");
    });

    const target = document.getElementById(page + "Page");

    if (!target) return;

    target.classList.add("active-page");

    document.querySelectorAll("[data-page]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === page
        );
    });

    if (page === "profile") renderProfile();
    if (page === "explore") renderExplore();
    if (page === "messages") renderChats();
    if (page === "notifications") renderNotifications();
}

document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
        navigate(button.dataset.page);
    });
});

document.getElementById("createButton")
    .addEventListener("click", openCreate);

document.getElementById("mobileCreate")
    .addEventListener("click", openCreate);

document.getElementById("reelsCreate")
    .addEventListener("click", openCreate);

/* =====================================
   MODAIS
===================================== */

function closeModal(id) {
    document.getElementById(id).classList.remove("show");
}

document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
        closeModal(button.dataset.close);
    });
});

document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.classList.remove("show");
        });

        closeStory();
    }
});

/* =====================================
   STORIES
===================================== */

const stories = [
    { name: "Lisa", image: images.lisa, text: "LALISA 🖤" },
    { name: "Jennie", image: images.jennie, text: "JENNIERUBYJANE 💗" },
    { name: "Rosé", image: images.rose, text: "ROSÉ 🌹" },
    { name: "BLACKPINK", image: images.jennie, text: "BLACKPINK IN YOUR AREA!" }
];

function openStory(name) {
    storyIndex = stories.findIndex(story => story.name === name);

    if (storyIndex < 0) return;

    showStory();
}

function showStory() {
    const story = stories[storyIndex];

    document.getElementById("storyContent").innerHTML = `
        <h2>${escapeHTML(story.name)}</h2>
        <img src="${safeImage(story.image)}" alt="Story de ${escapeHTML(story.name)}">
        <p style="margin-top:15px">${escapeHTML(story.text)}</p>
    `;

    const progress = document.getElementById("storyProgress");

    progress.style.transition = "none";
    progress.style.width = "0%";

    document.getElementById("storyModal").classList.add("show");

    clearTimeout(storyTimer);

    setTimeout(() => {
        progress.style.transition = "width 5s linear";
        progress.style.width = "100%";
    }, 50);

    storyTimer = setTimeout(() => {
        if (storyIndex < stories.length - 1) {
            storyIndex++;
            showStory();
        } else {
            closeStory();
        }
    }, 5000);
}

function closeStory() {
    clearTimeout(storyTimer);
    document.getElementById("storyModal").classList.remove("show");
}

document.getElementById("closeStory")
    .addEventListener("click", closeStory);

document.querySelectorAll("[data-story]").forEach(story => {
    story.addEventListener("click", () => {
        openStory(story.dataset.story);
    });
});

/* =====================================
   PESQUISA
===================================== */

document.getElementById("searchInput")
    .addEventListener("input", event => {
        const term = event.target.value.toLowerCase();

        const results = document.getElementById("searchResults");

        const filtered = profiles.filter(profile =>
            profile.username.toLowerCase().includes(term) ||
            profile.name.toLowerCase().includes(term)
        );

        results.innerHTML = filtered.map(profile => `
            <div class="search-result">
                <img src="${safeImage(profile.image)}">
                <div>
                    <strong>${escapeHTML(profile.username)}</strong>
                    <small>${escapeHTML(profile.description)}</small>
                </div>
            </div>
        `).join("");

        if (term && filtered.length === 0) {
            results.innerHTML = "<p>Nenhum perfil encontrado.</p>";
        }
    });

/* =====================================
   EXPLORAR
===================================== */

function renderExplore() {
    const grid = document.getElementById("exploreGrid");

    const explorePosts = [
        ...posts,
        ...profiles.map((profile, index) => ({
            id: "profile-" + index,
            image: profile.image,
            caption: profile.description
        }))
    ];

    grid.innerHTML = explorePosts.map(post => `
        <img src="${safeImage(post.image)}"
             alt="${escapeHTML(post.caption)}"
             data-preview="${post.id}">
    `).join("");
}

/* =====================================
   PERFIL E PUBLICAÇÕES
===================================== */

function renderProfile() {
    const grid = document.getElementById("profileGrid");

    grid.innerHTML = posts
        .filter(post => post.username === "blink_world")
        .map(post => `
            <img src="${safeImage(post.image)}"
                 data-preview="${post.id}">
        `).join("");

    updatePostCount();
}

function updatePostCount() {
    const count = document.getElementById("postCount");

    if (count) {
        count.textContent = posts.filter(
            post => post.username === "blink_world"
        ).length;
    }
}

/* ABAS DO PERFIL */

document.querySelectorAll(".profile-tabs span").forEach((tab, index) => {
    tab.addEventListener("click", () => {
        const grid = document.getElementById("profileGrid");

        if (index === 0) {
            renderProfile();
        }

        if (index === 1) {
            grid.innerHTML = posts
                .filter(post => post.saved)
                .map(post => `
                    <img src="${safeImage(post.image)}"
                         data-preview="${post.id}">
                `).join("") || "<p>Nenhuma publicação salva.</p>";
        }

        if (index === 2) {
            grid.innerHTML = "<p>Nenhuma publicação marcada.</p>";
        }
    });
});

/* =====================================
   NOTIFICAÇÕES
===================================== */

function addNotification(message) {
    notifications.unshift({
        id: Date.now(),
        message,
        date: new Date().toLocaleString("pt-BR")
    });

    notifications = notifications.slice(0, 50);
    saveData();
}

function renderNotifications() {
    const container = document.getElementById("notificationsList");

    container.innerHTML = notifications.map(notification => `
        <div class="notification">
            <img src="${images.jennie}">
            <div>
                ${escapeHTML(notification.message)}
                <small style="display:block;color:gray;margin-top:5px">
                    ${escapeHTML(notification.date)}
                </small>
            </div>
        </div>
    `).join("") || "<p>Você ainda não tem notificações.</p>";
}

/* =====================================
   SUGESTÕES E SEGUIR
===================================== */

function renderSuggestions() {
    const container = document.getElementById("suggestionList");

    container.innerHTML = profiles.map(profile => {
        const isFollowing = following.includes(profile.username);

        return `
            <div class="suggestion">
                <img class="avatar" src="${safeImage(profile.image)}">
                <div>
                    <strong>${escapeHTML(profile.username)}</strong>
                    <small>${escapeHTML(profile.name)} • BLACKPINK</small>
                </div>
                <button class="blue-button"
                        data-follow="${escapeHTML(profile.username)}">
                    ${isFollowing ? "Seguindo" : "Seguir"}
                </button>
            </div>
        `;
    }).join("");
}

function toggleFollow(username) {
    if (following.includes(username)) {
        following = following.filter(item => item !== username);
    } else {
        following.push(username);
        addNotification("Você começou a seguir " + username);
    }

    saveData();
    renderSuggestions();
}

document.getElementById("seeAll").addEventListener("click", event => {
    event.preventDefault();
    navigate("search");
});

/* =====================================
   MENSAGENS DEMONSTRATIVAS
===================================== */

function renderChats() {
    const container = document.getElementById("chatContacts");

    container.innerHTML = profiles.map(profile => `
        <div class="contact" data-chat="${escapeHTML(profile.username)}">
            <img src="${safeImage(profile.image)}">
            <div>
                <strong>${escapeHTML(profile.username)}</strong>
                <small>Conversar</small>
            </div>
        </div>
    `).join("");
}

function openChat(username) {
    currentChat = username;

    if (!conversations[username]) {
        conversations[username] = [];
    }

    renderChatMessages();
}

function renderChatMessages() {
    const profile = profiles.find(p => p.username === currentChat);

    const container = document.getElementById("chatContent");

    container.innerHTML = `
        <div style="padding:15px;border-bottom:1px solid var(--border)">
            <img src="${safeImage(profile.image)}"
                 style="width:45px;height:45px;border-radius:50%;object-fit:cover">
            <h3 style="margin-top:10px;color:var(--text)">
                ${escapeHTML(profile.username)}
            </h3>
        </div>

        <div class="chat-messages" id="chatMessages">
            ${conversations[currentChat].map(message => `
                <div class="chat-bubble ${message.mine ? "mine" : ""}">
                    ${escapeHTML(message.text)}
                </div>
            `).join("")}
        </div>

        <form class="chat-send" id="chatSend">
            <input id="chatInput" placeholder="Envie uma mensagem..." required>
            <button type="submit" style="color:var(--pink)">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    `;

    document.getElementById("chatSend").addEventListener("submit", event => {
        event.preventDefault();

        const input = document.getElementById("chatInput");
        const text = input.value.trim();

        if (!text) return;

        conversations[currentChat].push({
            text,
            mine: true
        });

        saveData();
        renderChatMessages();
    });

    const messages = document.getElementById("chatMessages");
    messages.scrollTop = messages.scrollHeight;
}

document.getElementById("chatContacts")
    .addEventListener("click", event => {
        const contact = event.target.closest("[data-chat]");

        if (contact) openChat(contact.dataset.chat);
    });

document.getElementById("chatSearch")
    .addEventListener("input", event => {
        const term = event.target.value.toLowerCase();

        document.querySelectorAll(".contact").forEach(contact => {
            contact.style.display =
                contact.textContent.toLowerCase().includes(term)
                    ? "flex"
                    : "none";
        });
    });

/* =====================================
   VISUALIZAR PUBLICAÇÃO
===================================== */

function previewPost(id) {
    const post = posts.find(p => p.id == id);

    if (!post) return;

    document.getElementById("previewImage").src = post.image;
    document.getElementById("previewCaption").textContent = post.caption;

    document.getElementById("postModal").classList.add("show");
}

/* =====================================
   COMPARTILHAR
===================================== */

async function sharePost(id) {
    const post = posts.find(p => p.id == id);
    if (!post) return;

    const text = `Confira esta publicação de ${post.username}: ${post.caption}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "BLACKPINK",
                text
            });
        } catch (error) {
            // Compartilhamento cancelado.
        }
    } else if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            alert("Texto copiado para compartilhar!");
        } catch {
            alert(text);
        }
    } else {
        alert(text);
    }
}

/* =====================================
   MENU DE PUBLICAÇÃO
===================================== */

function postMenu(id) {
    const post = posts.find(p => p.id == id);
    if (!post) return;

    const action = prompt(
        "Escolha uma ação:\n1 - Ver publicação\n2 - Compartilhar\n3 - Salvar publicação"
    );

    if (action === "1") previewPost(id);
    if (action === "2") sharePost(id);
    if (action === "3") savePost(id);
}

/* =====================================
   TEMA ESCURO
===================================== */

const themeButton = document.getElementById("themeButton");

if (localStorage.getItem("bp_theme") === "dark") {
    document.body.classList.add("dark");
    themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i><span>Modo claro</span>';
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    localStorage.setItem("bp_theme", dark ? "dark" : "light");

    themeButton.innerHTML = dark
        ? '<i class="fa-solid fa-sun"></i><span>Modo claro</span>'
        : '<i class="fa-regular fa-moon"></i><span>Modo escuro</span>';
});

/* =====================================
   EDITAR PERFIL
===================================== */

document.getElementById("editProfile")
    .addEventListener("click", () => {
        const newName = prompt("Digite o nome do seu perfil:");

        if (newName && newName.trim()) {
            document.querySelector(".profile-top h2").textContent =
                newName.trim();

            document.querySelector(".my-account strong").textContent =
                newName.trim();
        }
    });

document.getElementById("shareProfile")
    .addEventListener("click", async () => {
        const profileURL = location.href + "#profile";

        try {
            await navigator.clipboard.writeText(profileURL);
            alert("Endereço do perfil copiado!");
        } catch {
            alert(profileURL);
        }
    });

/* =====================================
   EVENTOS DO FEED
===================================== */

document.addEventListener("click", event => {
    const like = event.target.closest("[data-like]");
    const save = event.target.closest("[data-save]");
    const comment = event.target.closest("[data-comment]");
    const share = event.target.closest("[data-share]");
    const preview = event.target.closest("[data-preview]");
    const follow = event.target.closest("[data-follow]");
    const menu = event.target.closest("[data-menu]");

    if (like) likePost(like.dataset.like);
    if (save) savePost(save.dataset.save);
    if (comment) openComments(comment.dataset.comment);
    if (share) sharePost(share.dataset.share);
    if (preview) previewPost(preview.dataset.preview);
    if (follow) toggleFollow(follow.dataset.follow);
    if (menu) postMenu(menu.dataset.menu);
});

document.addEventListener("submit", event => {
    const form = event.target.closest("[data-quick]");

    if (!form) return;

    event.preventDefault();

    const input = form.querySelector("input");

    addQuickComment(form.dataset.quick, input.value);
});

/* =====================================
   INICIALIZAÇÃO
===================================== */

function initializeApp() {
    renderPosts();
    renderSuggestions();
    renderChats();
    renderExplore();
    renderNotifications();
    updatePostCount();

    console.log("BLACKPINK INSTAGRAM iniciado!");
}

initializeApp();