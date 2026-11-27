
const $ = id => document.getElementById(id);

const STORAGE = {
    posts: "kayke_posts",
    profile: "kayke_profile",
    followers: "kayke_followers",
    following: "kayke_following"
};

const initialPosts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
        text: "Foco no progresso. 🖤",
        likes: 120,
        liked: false,
        saved: false,
        comments: []
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
        text: "A vida é feita de momentos.",
        likes: 85,
        liked: false,
        saved: false,
        comments: []
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
        text: "Vivendo minha própria história. ⚡",
        likes: 210,
        liked: false,
        saved: false,
        comments: []
    }
];

function load(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch {
        return fallback;
    }
}

let posts = load(STORAGE.posts, initialPosts);

let profile = load(STORAGE.profile, {
    name: "Kayke",
    username: "kayke",
    bio: "Vivendo e aprendendo.\n📍 Brasil\n⚡ Minha história, minhas escolhas.",
    photo: "https://i.pravatar.cc/300?img=12"
});

let followers = load(STORAGE.followers, 1200);
let following = load(STORAGE.following, false);

let activePost = null;
let currentTab = "posts";

function saveData() {
    localStorage.setItem(STORAGE.posts, JSON.stringify(posts));
    localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
    localStorage.setItem(STORAGE.followers, JSON.stringify(followers));
    localStorage.setItem(STORAGE.following, JSON.stringify(following));
}

function toast(message) {
    $("toast").textContent = message;
    $("toast").classList.add("show");

    setTimeout(() => {
        $("toast").classList.remove("show");
    }, 2200);
}

// PERFIL

function renderProfile() {
    $("username").textContent = profile.username;
    $("profileName").textContent = profile.name;
    $("profileBio").innerText = profile.bio;

    $("profileImage").src = profile.photo;
    $("navAvatar").src = profile.photo;

    $("postsCount").textContent = posts.length;

    $("followersCount").textContent =
        followers >= 1000
        ? (followers / 1000).toFixed(1) + " mil"
        : followers;

    $("followBtn").textContent =
        following ? "Seguindo" : "Seguir";

    $("followBtn").classList.toggle(
        "secondary",
        following
    );
}

// FEED

function renderFeed() {
    const feed = $("feed");

    feed.innerHTML = "";

    let filtered = posts;

    if (currentTab === "saved") {
        filtered = posts.filter(post => post.saved);
    }

    if (currentTab === "liked") {
        filtered = posts.filter(post => post.liked);
    }

    filtered.forEach(post => {

        const article = document.createElement("article");
        article.className = "post";

        const image = document.createElement("img");

        image.src = post.image ||
            "https://placehold.co/600x600/eeeeee/222222?text=Kayke";

        image.alt = post.text;

        const overlay = document.createElement("div");
        overlay.className = "post-overlay";

        const likes = document.createElement("span");
        likes.textContent = `❤️ ${post.likes}`;

        const comments = document.createElement("span");
        comments.textContent = `💬 ${post.comments.length}`;

        overlay.append(likes, comments);

        article.append(image, overlay);

        article.addEventListener("click", () => {
            openPost(post.id);
        });

        feed.appendChild(article);
    });

    if (filtered.length === 0) {
        feed.textContent = "Nenhuma publicação encontrada.";
    }

    renderProfile();
}

// MODAIS

function openModal(id) {
    $(id).classList.add("show");
}

function closeModal(id) {
    $(id).classList.remove("show");
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

// SEGUIR

$("followBtn").addEventListener("click", () => {

    following = !following;

    followers += following ? 1 : -1;

    saveData();
    renderProfile();

    toast(following ? "Você está seguindo Kayke!" : "Você deixou de seguir.");
});

// CRIAR POST

$("createBtn").addEventListener("click", () => {
    openModal("createModal");
});

$("publishBtn").addEventListener("click", () => {

    const text = $("postText").value.trim();
    const image = $("postImage").value.trim();

    if (!text && !image) {
        toast("Escreva algo ou adicione uma imagem!");
        return;
    }

    if (image && !/^https?:\/\/\S+$/i.test(image)) {
        toast("Link de imagem inválido!");
        return;
    }

    posts.unshift({
        id: Date.now(),
        image,
        text,
        likes: 0,
        liked: false,
        saved: false,
        comments: []
    });

    $("postText").value = "";
    $("postImage").value = "";

    currentTab = "posts";

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.tab === "posts"
        );
    });

    saveData();
    renderFeed();

    closeModal("createModal");

    toast("Publicação criada com sucesso!");
});

// EDITAR PERFIL

$("editBtn").addEventListener("click", () => {

    $("editName").value = profile.name;
    $("editUsername").value = profile.username;
    $("editBio").value = profile.bio;
    $("editPhoto").value = profile.photo;

    openModal("editModal");
});

$("saveProfile").addEventListener("click", () => {

    const username = $("editUsername").value.trim();
    const photo = $("editPhoto").value.trim();

    if (!username || !/^[a-zA-Z0-9._]+$/.test(username)) {
        toast("Nome de usuário inválido!");
        return;
    }

    if (photo && !/^https?:\/\/\S+$/i.test(photo)) {
        toast("Link de foto inválido!");
        return;
    }

    profile.name = $("editName").value.trim();
    profile.username = username;
    profile.bio = $("editBio").value.trim();
    profile.photo = photo || profile.photo;

    saveData();
    renderProfile();

    closeModal("editModal");

    toast("Perfil atualizado!");
});

// VISUALIZAR POST

function openPost(id) {

    activePost = posts.find(post => post.id === id);

    if (!activePost) return;

    const modal = document.createElement("div");
    modal.className = "modal show";

    const content = document.createElement("div");
    content.className = "modal-content";

    const close = document.createElement("button");
    close.className = "close";
    close.textContent = "×";
    close.onclick = () => modal.remove();

    const title = document.createElement("h2");
    title.textContent = "@" + profile.username;

    const image = document.createElement("img");
    image.src = activePost.image || "";
    image.style.width = "100%";
    image.style.maxHeight = "350px";
    image.style.objectFit = "contain";

    const text = document.createElement("p");
    text.textContent = activePost.text;

    const like = document.createElement("button");
    like.textContent = activePost.liked ? "❤️ Curtido" : "♡ Curtir";
    like.className = "main-button";

    like.onclick = () => {
        activePost.liked = !activePost.liked;
        activePost.likes += activePost.liked ? 1 : -1;

        saveData();
        renderFeed();

        like.textContent = activePost.liked ? "❤️ Curtido" : "♡ Curtir";
    };

    const save = document.createElement("button");
    save.textContent = activePost.saved ? "🔖 Salvo" : "🔖 Salvar";
    save.className = "main-button";

    save.onclick = () => {
        activePost.saved = !activePost.saved;
        saveData();
        renderFeed();

        save.textContent = activePost.saved ? "🔖 Salvo" : "🔖 Salvar";
    };

    const comment = document.createElement("button");
    comment.textContent = "💬 Comentar";
    comment.className = "main-button";

    comment.onclick = () => {
        modal.remove();
        openComments(activePost.id);
    };

    const remove = document.createElement("button");
    remove.textContent = "Excluir publicação";
    remove.className = "main-button";

    remove.onclick = () => {
        if (confirm("Deseja excluir esta publicação?")) {
            posts = posts.filter(post => post.id !== activePost.id);
            saveData();
            renderFeed();
            modal.remove();
            toast("Publicação excluída!");
        }
    };

    content.append(
        close, title, image, text,
        like, save, comment, remove
    );

    modal.appendChild(content);

    modal.addEventListener("click", event => {
        if (event.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
}

// COMENTÁRIOS

function openComments(id) {
    activePost = posts.find(post => post.id === id);

    if (!activePost) return;

    renderComments();
    openModal("commentModal");
}

function renderComments() {

    const list = $("commentsList");

    list.innerHTML = "";

    activePost.comments.forEach((comment, index) => {

        const item = document.createElement("div");
        item.className = "comment-item";

        const text = document.createElement("span");
        text.textContent = "💬 " + comment;

        const remove = document.createElement("button");
        remove.textContent = "Excluir";

        remove.onclick = () => {
            activePost.comments.splice(index, 1);
            saveData();
            renderComments();
            renderFeed();
        };

        item.append(text, remove);
        list.appendChild(item);
    });
}

$("sendComment").addEventListener("click", () => {

    const text = $("commentText").value.trim();

    if (!text || !activePost) return;

    activePost.comments.push(text);

    $("commentText").value = "";

    saveData();
    renderComments();
    renderFeed();

    toast("Comentário enviado!");
});

// STORIES

document.querySelectorAll(".story[data-story]").forEach(story => {

    story.addEventListener("click", () => {

        $("storyTitle").textContent =
            story.dataset.story;

        openModal("storyModal");

    });

});

$("addStory").addEventListener("click", () => {
    toast("Adicionar stories em breve!");
});

// ABAS

document.querySelectorAll(".tab").forEach(tab => {

    tab.addEventListener("click", () => {

        document.querySelectorAll(".tab").forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        currentTab = tab.dataset.tab;

        renderFeed();

    });

});

// PESQUISA

$("searchInput").addEventListener("input", event => {

    const term = event.target.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const text = post.querySelector("img").alt.toLowerCase();

        post.style.display = text.includes(term) ? "" : "none";

    });

});

// NAVEGAÇÃO

$("homeBtn").addEventListener("click", () => {
    currentTab = "posts";

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.tab === "posts");
    });

    $("searchInput").value = "";

    renderFeed();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

$("notificationBtn").addEventListener("click", () => {
    toast("Você está em dia com as notificações!");
});

$("messageBtn").addEventListener("click", () => {
    toast("Mensagens privadas em breve!");
});

// INICIALIZAÇÃO

renderProfile();
renderFeed();
