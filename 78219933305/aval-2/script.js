
const $ = selector => document.querySelector(selector);

const feed = $("#feed");
const postText = $("#postText");
const imageInput = $("#imageInput");
const imagePreview = $("#imagePreview");
const removeImage = $("#removeImage");
const searchInput = $("#searchInput");

let currentUser = localStorage.getItem("oc_user") || "Visitante";
let currentFilter = "all";
let searchTerm = "";
let selectedImage = "";
let posts = loadPosts();
let likedPosts = new Set(loadJSON("oc_likes", []));
let toastTimer;

function loadJSON(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch {
        return fallback;
    }
}

function loadPosts() {
    const saved = loadJSON("oc_posts", []);
    if (!Array.isArray(saved)) return [];
    return saved.filter(post =>
        post && typeof post.id === "string" &&
        typeof post.author === "string" &&
        Array.isArray(post.comments)
    );
}

function saveData() {
    try {
        localStorage.setItem("oc_posts", JSON.stringify(posts));
        localStorage.setItem("oc_likes", JSON.stringify([...likedPosts]));
        return true;
    } catch {
        showToast("Espaço de armazenamento insuficiente.");
        return false;
    }
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

function createId() {
    return Date.now().toString(36) +
        Math.random().toString(36).slice(2, 9);
}

function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function updateProfile() {
    const initial = [...currentUser][0]?.toUpperCase() || "V";

    $("#profileName").textContent = currentUser;
    $("#profileHandle").textContent =
        "@" + currentUser.toLowerCase().replace(/\s+/g, "");
    $("#profileAvatar").textContent = initial;
    $("#composerAvatar").textContent = initial;
    $("#composerName").textContent = currentUser;

    $("#postCount").textContent =
        posts.filter(post => post.author === currentUser).length;
}

function formatDate(timestamp) {
    const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));

    if (seconds < 60) return "agora mesmo";
    if (seconds < 3600) return `há ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `há ${Math.floor(seconds / 3600)} h`;

    return new Date(timestamp).toLocaleDateString("pt-BR");
}

function addDemoPost() {
    const exists = posts.some(post => post.id === "oc-marvel-demo");
    if (exists) return;

    posts.push({
        id: "oc-marvel-demo",
        author: "Marvel Universe 🦸",
        text:
`🌌 BEM-VINDOS AO UNIVERSO MARVEL!

Dos Vingadores aos Guardiões da Galáxia, o universo Marvel está cheio de heróis, vilões e histórias incríveis!

🛡️ Capitão América
⚡ Thor
🕷️ Homem-Aranha
🦾 Homem de Ferro

🔥 PERGUNTA PARA A COMUNIDADE:
Qual é o seu herói favorito da Marvel e por quê?

#Marvel #Vingadores #UniversoMarvel`,
        image: "",
        likes: 24,
        comments: [
            {
                author: "Pedro Gamer",
                text: "Homem-Aranha! 🕷️"
            },
            {
                author: "Luna Geek",
                text: "Doutor Estranho, com certeza! 🔮"
            }
        ],
        createdAt: Date.now() - 300000
    });

    saveData();
}

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function renderPosts() {
    feed.replaceChildren();

    let visiblePosts = [...posts].sort(
        (a, b) => b.createdAt - a.createdAt
    );

    if (currentFilter === "liked") {
        visiblePosts = visiblePosts.filter(post =>
            likedPosts.has(post.id)
        );
        $("#feedTitle").textContent = "Publicações curtidas ❤️";
    } else if (currentFilter === "mine") {
        visiblePosts = visiblePosts.filter(post =>
            post.author === currentUser
        );
        $("#feedTitle").textContent = "Minhas publicações 📝";
    } else {
        $("#feedTitle").textContent = searchTerm
            ? "Resultados da pesquisa 🔎"
            : "Explorar publicações";
    }

    if (searchTerm) {
        visiblePosts = visiblePosts.filter(post =>
            `${post.author} ${post.text}`.toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }

    $("#feedCount").textContent =
        `${visiblePosts.length} publicação(ões)`;

    if (visiblePosts.length === 0) {
        const empty = createElement("div", "empty");
        empty.append(
            createElement("div", "empty-icon", "🌌"),
            createElement("strong", "", "Nada por aqui ainda!"),
            createElement("p", "", "Que tal publicar algo para começar?")
        );
        feed.appendChild(empty);
        updateProfile();
        return;
    }

    visiblePosts.forEach(post => {
        const card = createElement("article", "post");
        const header = createElement("div", "post-header");
        const user = createElement("div", "post-user");
        const avatar = createElement(
            "div", "mini-avatar",
            [...post.author][0]?.toUpperCase() || "?"
        );
        const details = document.createElement("div");
        const name = createElement("strong", "", post.author);
        const date = createElement(
            "p", "muted", formatDate(post.createdAt)
        );

        details.append(name, date);
        user.append(avatar, details);
        header.appendChild(user);

        if (post.author === currentUser) {
            const deleteBtn = createElement("button", "delete-btn", "🗑️");
            deleteBtn.title = "Excluir publicação";
            deleteBtn.setAttribute("aria-label", "Excluir publicação");

            deleteBtn.addEventListener("click", () => {
                if (!confirm("Deseja excluir esta publicação?")) return;

                posts = posts.filter(item => item.id !== post.id);
                likedPosts.delete(post.id);
                saveData();
                renderPosts();
                showToast("Publicação excluída!");
            });

            header.appendChild(deleteBtn);
        }

        card.appendChild(header);

        if (post.text) {
            card.appendChild(createElement("p", "post-content", post.text));
        }

        if (post.image) {
            const img = createElement("img", "post-image");
            img.src = post.image;
            img.alt = "Imagem da publicação";
            img.loading = "lazy";
            card.appendChild(img);
        }

        const actions = createElement("div", "post-actions");
        const likeBtn = createElement(
            "button",
            "action-btn" + (likedPosts.has(post.id) ? " liked" : ""),
            `${likedPosts.has(post.id) ? "❤️" : "♡"} Curtir (${post.likes || 0})`
        );

        likeBtn.addEventListener("click", () => {
            if (likedPosts.has(post.id)) {
                likedPosts.delete(post.id);
                post.likes = Math.max(0, (post.likes || 0) - 1);
            } else {
                likedPosts.add(post.id);
                post.likes = (post.likes || 0) + 1;
            }

            saveData();
            renderPosts();
        });

        const commentBtn = createElement(
            "button", "action-btn",
            `💬 Comentar (${post.comments.length})`
        );

        const shareBtn = createElement(
            "button", "action-btn", "↗ Compartilhar"
        );

        actions.append(likeBtn, commentBtn, shareBtn);
        card.appendChild(actions);

        const commentArea = createElement("div", "comment-area");
        const commentForm = createElement("form", "comment-form");
        const commentInput = createElement("input");
        commentInput.type = "text";
        commentInput.maxLength = 500;
        commentInput.placeholder = "Escreva um comentário...";
        commentInput.setAttribute("aria-label", "Escreva um comentário");

        const sendBtn = createElement("button", "", "Enviar");
        sendBtn.type = "submit";
        commentForm.append(commentInput, sendBtn);

        const commentsList = createElement("div", "comments-list");

        post.comments.forEach(comment => {
            const item = createElement("div", "comment");
            const author = createElement("strong", "", comment.author);
            const text = createElement("span", "", comment.text);
            item.append(author, text);
            commentsList.appendChild(item);
        });

        commentForm.addEventListener("submit", event => {
            event.preventDefault();
            const text = commentInput.value.trim();
            if (!text) return;

            post.comments.push({
                author: currentUser,
                text
            });

            saveData();
            renderPosts();
            showToast("Comentário adicionado!");
        });

        commentBtn.addEventListener("click", () => {
            commentArea.classList.toggle("open");

            if (commentArea.classList.contains("open")) {
                commentInput.focus();
            }
        });

        shareBtn.addEventListener("click", async () => {
            const text = `${post.author}\n${post.text}`;

            try {
                if (navigator.share) {
                    await navigator.share({
                        title: "ONLYCONNECT",
                        text
                    });
                } else if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(text);
                    showToast("Texto copiado para compartilhar!");
                } else {
                    prompt("Copie o texto para compartilhar:", text);
                }
            } catch (error) {
                if (error.name !== "AbortError") {
                    showToast("Não foi possível compartilhar.");
                }
            }
        });

        commentArea.append(commentForm, commentsList);
        card.appendChild(commentArea);
        feed.appendChild(card);
    });

    updateProfile();
}

// Publicar texto ou imagem
$("#publishBtn").addEventListener("click", () => {
    const text = postText.value.trim();

    if (!text && !selectedImage) {
        showToast("Escreva algo ou escolha uma foto!");
        postText.focus();
        return;
    }

    const post = {
        id: createId(),
        author: currentUser,
        text,
        image: selectedImage,
        likes: 0,
        comments: [],
        createdAt: Date.now()
    };

    posts.push(post);

    if (!saveData()) {
        posts = posts.filter(item => item.id !== post.id);
        return;
    }

    postText.value = "";
    selectedImage = "";
    imageInput.value = "";
    imagePreview.removeAttribute("src");
    imagePreview.style.display = "none";
    removeImage.classList.add("hidden");

    currentFilter = "all";
    searchTerm = "";
    searchInput.value = "";

    document.querySelectorAll("[data-filter]").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === "all");
    });

    renderPosts();
    showToast("Publicado com sucesso! 🚀");
});

// Escolher uma imagem
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        showToast("Selecione um arquivo de imagem.");
        imageInput.value = "";
        return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
        showToast("Escolha uma imagem de até 1,5 MB.");
        imageInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        selectedImage = reader.result;
        imagePreview.src = selectedImage;
        imagePreview.style.display = "block";
        removeImage.classList.remove("hidden");
    };

    reader.readAsDataURL(file);
});

removeImage.addEventListener("click", () => {
    selectedImage = "";
    imageInput.value = "";
    imagePreview.removeAttribute("src");
    imagePreview.style.display = "none";
    removeImage.classList.add("hidden");
});

// Pesquisa
searchInput.addEventListener("input", () => {
    searchTerm = searchInput.value.trim();
    renderPosts();
});

// Filtros do menu
document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        document.querySelectorAll("[data-filter]").forEach(btn => {
            btn.classList.toggle("active", btn === button);
        });

        renderPosts();
    });
});

// Atalhos para publicar
$("#newPostBtn").addEventListener("click", () => {
    $("#composer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    postText.focus();
});

$("#addStory").addEventListener("click", () => {
    $("#composer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    postText.focus();
    showToast("Compartilhe seu momento!");
});

// Editar o nome do perfil
$("#profileBtn").addEventListener("click", () => {
    const name = prompt("Qual nome você quer usar?", currentUser);
    if (!name || !name.trim()) return;

    currentUser = name.trim().slice(0, 40);
    localStorage.setItem("oc_user", currentUser);

    updateProfile();
    renderPosts();
    showToast("Perfil atualizado!");
});

// Alternar tema claro e escuro
function setTheme(light) {
    document.body.classList.toggle("light-theme", light);
    $("#themeBtn").textContent = light ? "🌙" : "☀️";
    localStorage.setItem("oc_theme", light ? "light" : "dark");
}

$("#themeBtn").addEventListener("click", () => {
    setTheme(!document.body.classList.contains("light-theme"));
});

// Inicialização
addDemoPost();
setTheme(localStorage.getItem("oc_theme") === "light");
updateProfile();
renderPosts();
