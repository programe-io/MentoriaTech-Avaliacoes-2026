
const $ = (id) => document.getElementById(id);

const STORAGE = {
    posts: "rafa_posts",
    profile: "rafa_profile",
    followers: "rafa_followers",
    following: "rafa_following"
};

const defaultPosts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600",
        text: "Me sentindo linda hoje! 💗",
        likes: 245,
        liked: false,
        saved: false,
        comments: []
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
        text: "Um look especial 🎀",
        likes: 189,
        liked: false,
        saved: false,
        comments: []
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        text: "Vivendo meus melhores momentos ✨",
        likes: 320,
        liked: false,
        saved: false,
        comments: []
    }
];

let posts = JSON.parse(localStorage.getItem(STORAGE.posts)) || defaultPosts;

let profile = JSON.parse(localStorage.getItem(STORAGE.profile)) || {
    name: "Rafaela 💗",
    username: "rafah_s.x",
    bio: "✨ Vivendo meus melhores momentos\n🎀 Beleza • Moda • Lifestyle\n🌷 Seja sua própria inspiração!",
    photo: "https://i.pravatar.cc/300?img=47"
};

let followers = Number(localStorage.getItem(STORAGE.followers)) || 2500;
let following = localStorage.getItem(STORAGE.following) === "true";
let activePost = null;
let currentTab = "posts";

function saveData() {
    localStorage.setItem(STORAGE.posts, JSON.stringify(posts));
    localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
    localStorage.setItem(STORAGE.followers, followers);
    localStorage.setItem(STORAGE.following, following);
}

function toast(message) {
    const element = $("toast");
    element.textContent = message;
    element.classList.add("show");

    setTimeout(() => {
        element.classList.remove("show");
    }, 2200);
}

function renderProfile() {
    $("profileName").textContent = profile.name;
    $("profileUsername").textContent = profile.username;
    $("profileBio").innerText = profile.bio;

    $("profileImage").src = profile.photo;
    $("navAvatar").src = profile.photo;

    $("followersCount").textContent =
        followers >= 1000
            ? (followers / 1000).toFixed(1) + " mil"
            : followers;

    $("postsCount").textContent = posts.length;

    $("followBtn").textContent = following ? "Seguindo" : "Seguir";
    $("followBtn").classList.toggle("secondary", following);
}

function renderFeed() {
    const feed = $("feed");
    feed.innerHTML = "";

    let filteredPosts = posts;

    if (currentTab === "saved") {
        filteredPosts = posts.filter(post => post.saved);
    }

    if (currentTab === "liked") {
        filteredPosts = posts.filter(post => post.liked);
    }

    filteredPosts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        const img = document.createElement("img");
        img.src = post.image || "https://placehold.co/600x600/fce5ef/d77da5?text=Rafa";
        img.alt = post.text || "Publicação";
        img.loading = "lazy";

        const overlay = document.createElement("div");
        overlay.className = "post-overlay";

        const likeCount = document.createElement("span");
        likeCount.textContent = `❤️ ${post.likes}`;

        const commentCount = document.createElement("span");
        commentCount.textContent = `💬 ${post.comments.length}`;

        overlay.append(likeCount, commentCount);

        article.append(img, overlay);

        article.addEventListener("click", () => {
            openPost(post.id);
        });

        feed.appendChild(article);
    });

    if (!filteredPosts.length) {
        const empty = document.createElement("p");
        empty.textContent = "Ainda não existem publicações aqui. 💗";
        empty.style.padding = "30px";
        feed.appendChild(empty);
    }
}

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

// Seguir perfil

$("followBtn").addEventListener("click", () => {
    following = !following;

    followers += following ? 1 : -1;

    saveData();
    renderProfile();

    toast(following ? "Você está seguindo! 💗" : "Você deixou de seguir.");
});

// Abrir criação de publicação

$("createBtn").addEventListener("click", () => {
    openModal("createModal");
});

// Criar publicação

$("publishBtn").addEventListener("click", () => {
    const text = $("postText").value.trim();
    const image = $("postImage").value.trim();

    if (!text && !image) {
        toast("Adicione um texto ou uma imagem!");
        return;
    }

    if (image && !/^https?:\/\/\S+$/i.test(image)) {
        toast("Insira um endereço de imagem válido.");
        return;
    }

    const newPost = {
        id: Date.now(),
        image: image,
        text: text,
        likes: 0,
        liked: false,
        saved: false,
        comments: []
    };

    posts.unshift(newPost);

    $("postText").value = "";
    $("postImage").value = "";

    currentTab = "posts";

    saveData();
    renderProfile();
    renderFeed();

    closeModal("createModal");
    toast("Publicação compartilhada! 🌸");
});

// Editar perfil

$("editBtn").addEventListener("click", () => {
    $("editName").value = profile.name;
    $("editUsername").value = profile.username;
    $("editBio").value = profile.bio;
    $("editPhoto").value = profile.photo;

    openModal("editModal");
});

$("saveProfile").addEventListener("click", () => {
    const username = $("editUsername").value.trim();

    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        toast("Nome de usuário inválido.");
        return;
    }

    const photo = $("editPhoto").value.trim();

    if (photo && !/^https?:\/\/\S+$/i.test(photo)) {
        toast("URL da foto inválida.");
        return;
    }

    profile.name = $("editName").value.trim();
    profile.username = username;
    profile.bio = $("editBio").value.trim();
    profile.photo = photo || profile.photo;

    saveData();
    renderProfile();

    closeModal("editModal");
    toast("Perfil atualizado! 💗");
});

// Abrir publicação

function openPost(id) {
    activePost = posts.find(post => post.id === id);

    if (!activePost) return;

    const existing = document.getElementById("postDetail");

    if (existing) existing.remove();

    const detail = document.createElement("div");
    detail.id = "postDetail";
    detail.className = "modal show";

    const content = document.createElement("div");
    content.className = "modal-content";

    const title = document.createElement("h2");
    title.textContent = profile.username;

    const close = document.createElement("button");
    close.className = "close";
    close.textContent = "×";
    close.onclick = () => detail.remove();

    const image = document.createElement("img");
    image.src = activePost.image || "";
    image.style.width = "100%";
    image.style.maxHeight = "350px";
    image.style.objectFit = "contain";

    const caption = document.createElement("p");
    caption.textContent = activePost.text;

    const like = document.createElement("button");
    like.className = "main-button";
    like.textContent = activePost.liked
        ? "❤️ Curtido"
        : "♡ Curtir";

    like.onclick = () => {
        activePost.liked = !activePost.liked;
        activePost.likes += activePost.liked ? 1 : -1;

        saveData();
        renderFeed();

        like.textContent = activePost.liked
            ? "❤️ Curtido"
            : "♡ Curtir";
    };

    const save = document.createElement("button");
    save.className = "main-button";
    save.style.marginLeft = "8px";
    save.textContent = activePost.saved
        ? "🔖 Salvo"
        : "🔖 Salvar";

    save.onclick = () => {
        activePost.saved = !activePost.saved;
        saveData();
        renderFeed();

        save.textContent = activePost.saved
            ? "🔖 Salvo"
            : "🔖 Salvar";
    };

    const commentsButton = document.createElement("button");
    commentsButton.className = "main-button";
    commentsButton.style.marginLeft = "8px";
    commentsButton.textContent = "💬 Comentários";

    commentsButton.onclick = () => {
        detail.remove();
        openComments(activePost.id);
    };

    content.append(
        close,
        title,
        image,
        caption,
        like,
        save,
        commentsButton
    );

    detail.appendChild(content);

    detail.addEventListener("click", event => {
        if (event.target === detail) detail.remove();
    });

    document.body.appendChild(detail);
}

// Comentários

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
        text.textContent = "💗 " + comment;

        const remove = document.createElement("button");
        remove.textContent = "Excluir";

        remove.addEventListener("click", () => {
            activePost.comments.splice(index, 1);

            saveData();
            renderComments();
            renderFeed();
        });

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

    toast("Comentário enviado! 💬");
});

// Stories

document.querySelectorAll(".story[data-story]").forEach(story => {
    story.addEventListener("click", () => {
        $("storyTitle").textContent =
            story.dataset.story + " 💗";

        openModal("storyModal");
    });
});

$("addStory").addEventListener("click", () => {
    toast("Área de adicionar stories! 🌸");
});

// Navegação das abas

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

// Pesquisa

$("searchInput").addEventListener("input", event => {
    const term = event.target.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const text = post.querySelector("img").alt.toLowerCase();

        post.style.display = text.includes(term) ? "" : "none";
    });
});

// Outros botões

$("messageBtn").addEventListener("click", () => {
    toast("Mensagens privadas em breve! 💌");
});

$("exploreBtn").addEventListener("click", () => {
    toast("Explorar publicações! 🔎");
});

$("notificationBtn").addEventListener("click", () => {
    toast("Você está em dia com as notificações! 💗");
});

$("moreBtn").addEventListener("click", () => {
    toast("Mais opções do perfil.");
});

// Inicialização

renderProfile();
renderFeed();
