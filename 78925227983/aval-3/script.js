
const feed = document.getElementById("feed");

// Dados iniciais
const initialPosts = [
    {
        id: 1,
        user: "ana.oliveira",
        avatar: "https://i.pravatar.cc/100?img=32",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000",
        caption: "Um dia incrível para agradecer pelas coisas boas! ☀️",
        likes: 128,
        liked: false,
        saved: false,
        comments: ["Que foto linda! ❤️", "Amei esse lugar!"]
    },
    {
        id: 2,
        user: "lucas.dev",
        avatar: "https://i.pravatar.cc/100?img=11",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000",
        caption: "Desenvolvendo novos projetos e aprendendo todos os dias! 💻",
        likes: 89,
        liked: false,
        saved: false,
        comments: ["Muito bom!", "Sucesso nos projetos!"]
    },
    {
        id: 3,
        user: "maria.silva",
        avatar: "https://i.pravatar.cc/100?img=45",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
        caption: "A natureza sempre surpreende. 🌿",
        likes: 245,
        liked: false,
        saved: false,
        comments: ["Que paisagem maravilhosa!"]
    }
];

// Carregar publicações salvas
let posts;

try {
    posts = JSON.parse(localStorage.getItem("instagramPosts")) || initialPosts;
    if (!Array.isArray(posts)) posts = initialPosts;
} catch {
    posts = initialPosts;
}

function savePosts() {
    localStorage.setItem("instagramPosts", JSON.stringify(posts));
}

// Criar elementos com segurança
function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

// Renderizar feed
function renderFeed() {
    feed.replaceChildren();

    posts.forEach(post => {
        const article = createElement("article", "post");

        // Cabeçalho
        const header = createElement("div", "post-header");

        const avatar = createElement("img", "");
        avatar.src = post.avatar;
        avatar.alt = "Foto de perfil";

        const userInfo = createElement("div", "post-user");

        userInfo.append(
            createElement("strong", "", post.user),
            createElement("small", "", "Publicado recentemente")
        );

        const more = createElement("button", "post-more", "•••");

        header.append(avatar, userInfo, more);

        // Imagem
        const image = createElement("img", "post-image");
        image.src = post.image;
        image.alt = "Imagem publicada por " + post.user;
        image.loading = "lazy";

        // Ações
        const actions = createElement("div", "post-actions");

        const like = createElement(
            "button",
            "action-button like-button",
            post.liked ? "♥" : "♡"
        );

        if (post.liked) like.classList.add("liked");

        like.setAttribute("aria-label", "Curtir publicação");

        const commentButton = createElement(
            "button", "action-button", "♧"
        );

        commentButton.setAttribute("aria-label", "Comentar");

        const share = createElement(
            "button", "action-button share-button", "↗"
        );

        share.setAttribute("aria-label", "Compartilhar");

        const save = createElement(
            "button",
            "action-button save-button",
            post.saved ? "▣" : "♧"
        );

        save.setAttribute("aria-label", "Salvar publicação");

        actions.append(like, commentButton, share, save);

        // Curtidas
        const likes = createElement(
            "p",
            "likes",
            post.likes + " curtidas"
        );

        // Legenda
        const caption = createElement("p", "caption");

        caption.append(
            createElement("strong", "", post.user),
            document.createTextNode(" " + post.caption)
        );

        // Comentários
        const comments = createElement("div", "comments-list");

        post.comments.forEach(comment => {
            const p = createElement("p", "");
            p.append(
                createElement("strong", "", "usuario "),
                document.createTextNode(comment)
            );
            comments.appendChild(p);
        });

        const viewComments = createElement(
            "span",
            "view-comments",
            "Ver comentários (" + post.comments.length + ")"
        );

        // Formulário de comentário
        const form = createElement("form", "comment-form");

        const input = createElement("input", "");
        input.placeholder = "Adicione um comentário...";
        input.required = true;
        input.setAttribute("aria-label", "Novo comentário");

        const send = createElement("button", "", "Publicar");
        send.type = "submit";

        form.append(input, send);

        article.append(
            header,
            image,
            actions,
            likes,
            caption,
            viewComments,
            comments,
            form
        );

        feed.appendChild(article);
    });
}

// Curtir, salvar, comentar e compartilhar
feed.addEventListener("click", async event => {
    const button = event.target.closest("button");
    if (!button) return;

    const article = button.closest(".post");
    if (!article) return;

    const index = [...feed.children].indexOf(article);
    const post = posts[index];

    if (!post) return;

    if (button.classList.contains("like-button")) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        savePosts();
        renderFeed();
    }

    if (button.classList.contains("save-button")) {
        post.saved = !post.saved;
        savePosts();
        renderFeed();

        alert(post.saved
            ? "Publicação salva!"
            : "Publicação removida dos salvos.");
    }

    if (button.classList.contains("comment-button")) {
        article.querySelector(".comment-form input").focus();
    }

    if (button.classList.contains("share-button")) {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Instagram Clone",
                    text: post.caption
                });
            } else {
                await navigator.clipboard.writeText(post.caption);
                alert("Legenda copiada!");
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                alert("Não foi possível compartilhar.");
            }
        }
    }

    if (button.classList.contains("post-more")) {
        alert("Opções da publicação de @" + post.user);
    }
});

// Adicionar comentários
feed.addEventListener("submit", event => {
    if (!event.target.classList.contains("comment-form")) return;

    event.preventDefault();

    const article = event.target.closest(".post");
    const index = [...feed.children].indexOf(article);

    const input = event.target.querySelector("input");
    const comment = input.value.trim();

    if (!comment || !posts[index]) return;

    posts[index].comments.push(comment);

    savePosts();
    renderFeed();
});

// Modal de criação
const createModal = document.getElementById("createModal");
const createForm = document.getElementById("createForm");

function openCreateModal() {
    createModal.hidden = false;
}

function closeCreateModal() {
    createModal.hidden = true;
}

document.getElementById("createNav")
    .addEventListener("click", event => {
        event.preventDefault();
        openCreateModal();
    });

document.getElementById("mobileCreate")
    .addEventListener("click", event => {
        event.preventDefault();
        openCreateModal();
    });

document.getElementById("closeCreate")
    .addEventListener("click", closeCreateModal);

// Criar publicação
createForm.addEventListener("submit", event => {
    event.preventDefault();

    const image = document.getElementById("imageUrl").value.trim();
    const caption = document.getElementById("caption").value.trim();

    let url;

    try {
        url = new URL(image);

        if (!["https:", "http:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Digite uma URL de imagem válida.");
        return;
    }

    const newPost = {
        id: Date.now(),
        user: "seu_usuario",
        avatar: "https://i.pravatar.cc/100?img=12",
        image: url.href,
        caption,
        likes: 0,
        liked: false,
        saved: false,
        comments: []
    };

    posts.unshift(newPost);

    savePosts();
    renderFeed();
    createForm.reset();
    closeCreateModal();
});

// Seguir usuários
document.querySelectorAll(".follow-button").forEach(button => {
    button.addEventListener("click", () => {
        const following = button.textContent === "Seguindo";

        button.textContent = following ? "Seguir" : "Seguindo";
    });
});

// Stories demonstrativos
const storyData = {
    "Seu story": "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800",
    "Ana": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
    "Lucas": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    "Maria": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    "Pedro": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "Julia": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"
};

const storyModal = document.getElementById("storyModal");

document.querySelectorAll(".story").forEach(story => {
    story.addEventListener("click", () => {
        const name = story.dataset.user;

        document.getElementById("storyUser").textContent = name;

        document.getElementById("storyImage").src =
            storyData[name] || storyData["Seu story"];

        storyModal.hidden = false;
    });
});

document.getElementById("closeStory").addEventListener("click", () => {
    storyModal.hidden = true;
});

// Fechar modais com ESC
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCreateModal();
        storyModal.hidden = true;
    }
});

// Renderização inicial
renderFeed();
