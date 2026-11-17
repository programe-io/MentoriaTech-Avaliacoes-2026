
const posts = [
    {
        id: 1,
        name: "Dra. Mariana Costa",
        username: "@psicologamariana",
        avatar: "https://i.pravatar.cc/100?img=47",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000",
        category: "Profissionais",
        caption: "Cuidar da saúde emocional também é uma forma de amor próprio. Respeite seu tempo e não tenha medo de pedir ajuda. 💗",
        likes: 1250,
        liked: false,
        verified: true,
        time: "Há 20 minutos",
        comments: []
    },
    {
        id: 2,
        name: "Dra. Camila Oliveira",
        username: "@camilamedica",
        avatar: "https://i.pravatar.cc/100?img=44",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000",
        category: "Profissionais",
        caption: "A prevenção é sempre o melhor caminho! Não deixe de cuidar da sua saúde e manter seus exames em dia. 🩺",
        likes: 890,
        liked: false,
        verified: true,
        time: "Há 1 hora",
        comments: []
    },
    {
        id: 3,
        name: "Lucas Ferreira",
        username: "@lucas.adv",
        avatar: "https://i.pravatar.cc/100?img=12",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000",
        category: "Profissionais",
        caption: "Conhecer seus direitos é essencial! Informação também é uma forma de proteção. ⚖️",
        likes: 643,
        liked: false,
        verified: true,
        time: "Há 2 horas",
        comments: []
    },
    {
        id: 4,
        name: "Closet da Bella",
        username: "@closetdabella",
        avatar: "https://i.pravatar.cc/100?img=49",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000",
        category: "Lojas",
        caption: "Novidades chegando por aqui! ✨ Peças lindas para deixar seus looks ainda mais especiais. Qual é a sua favorita?",
        likes: 2340,
        liked: false,
        verified: false,
        time: "Há 3 horas",
        comments: []
    },
    {
        id: 5,
        name: "Doce Encanto",
        username: "@doceencanto",
        avatar: "https://i.pravatar.cc/100?img=32",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000",
        category: "Lojas",
        caption: "Um pedacinho de felicidade em forma de bolo! 🎂 Feito com carinho para deixar seus momentos mais doces.",
        likes: 1870,
        liked: false,
        verified: false,
        time: "Há 4 horas",
        comments: []
    },
    {
        id: 6,
        name: "Natureza Viva",
        username: "@naturezaviva",
        avatar: "https://i.pravatar.cc/100?img=5",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1000",
        category: "Natureza",
        caption: "Às vezes tudo que precisamos é de um lugar tranquilo, uma paisagem bonita e um momento para respirar. 🌿",
        likes: 5420,
        liked: false,
        verified: false,
        time: "Há 5 horas",
        comments: []
    },
    {
        id: 7,
        name: "Mundo dos Pets",
        username: "@mundodospets",
        avatar: "https://i.pravatar.cc/100?img=15",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1000",
        category: "Animais",
        caption: "Uma dose de fofura para melhorar o seu dia! 🐶 Quem também ama esses companheiros?",
        likes: 7800,
        liked: false,
        verified: false,
        time: "Há 6 horas",
        comments: []
    },
    {
        id: 8,
        name: "Diário de Viagem",
        username: "@diariodeviagem",
        avatar: "https://i.pravatar.cc/100?img=20",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
        category: "Viagens",
        caption: "Colecionando momentos, conhecendo lugares e criando histórias que merecem ser lembradas. ✈️",
        likes: 3190,
        liked: false,
        verified: false,
        time: "Ontem",
        comments: []
    },
    {
        id: 9,
        name: "Flores & Jardins",
        username: "@floresjardins",
        avatar: "https://i.pravatar.cc/100?img=25",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000",
        category: "Natureza",
        caption: "Que a vida floresça nos pequenos detalhes. 🌸",
        likes: 1560,
        liked: false,
        verified: false,
        time: "Ontem",
        comments: []
    }
];

const storiesData = [
    { name: "Mariana", avatar: "https://i.pravatar.cc/100?img=47", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900", caption: "Um novo dia de atendimentos! 💗" },
    { name: "Bella", avatar: "https://i.pravatar.cc/100?img=49", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900", caption: "Novidades na loja! ✨" },
    { name: "Natureza", avatar: "https://i.pravatar.cc/100?img=5", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900", caption: "Um lugar para renovar as energias 🌿" },
    { name: "Doces", avatar: "https://i.pravatar.cc/100?img=32", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900", caption: "Doçura do dia! 🎂" },
    { name: "Pets", avatar: "https://i.pravatar.cc/100?img=15", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900", caption: "Olha quem veio desejar um bom dia! 🐶" },
    { name: "Viagens", avatar: "https://i.pravatar.cc/100?img=20", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900", caption: "Paisagens inesquecíveis! ✈️" }
];

let currentFilter = "Todos";
let searchTerm = "";
let sortMode = "recent";

const feed = document.getElementById("feed");
const emptyMessage = document.getElementById("emptyMessage");

// MOSTRAR STORIES

function renderStories() {
    const container = document.getElementById("stories");

    container.innerHTML = storiesData.map((story, index) => `
        <div class="story" onclick="openStory(${index})">
            <div class="story-photo">
                <img src="${story.avatar}" alt="${story.name}">
            </div>
            <span>${story.name}</span>
        </div>
    `).join("");
}

// MOSTRAR PUBLICAÇÕES

function renderPosts() {
    let filtered = posts.filter(post => {
        const categoryMatch =
            currentFilter === "Todos" || post.category === currentFilter;

        const text = (
            post.name + " " +
            post.username + " " +
            post.caption + " " +
            post.category
        ).toLowerCase();

        const searchMatch = text.includes(searchTerm.toLowerCase());

        return categoryMatch && searchMatch;
    });

    if (sortMode === "popular") {
        filtered.sort((a, b) => b.likes - a.likes);
    } else {
        filtered.sort((a, b) => b.id - a.id);
    }

    feed.innerHTML = filtered.map(post => `
        <article class="post">

            <div class="post-header">
                <img class="post-avatar" src="${post.avatar}" alt="${post.name}">

                <div class="post-user">
                    <strong>
                        ${post.name}
                        ${post.verified ? '<span class="verified">✓</span>' : ''}
                    </strong>
                    <span>${post.username} · ${post.time}</span>
                </div>

                <button class="post-menu" title="Opções">•••</button>
            </div>

            <img class="post-image"
                src="${post.image}"
                alt="Publicação de ${post.name}"
                onerror="this.src='https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1000'">

            <div class="post-content">

                <div class="post-actions">
                    <button
                        class="action-btn ${post.liked ? 'liked' : ''}"
                        onclick="toggleLike(${post.id})">
                        ${post.liked ? '♥' : '♡'}
                    </button>

                    <button class="action-btn"
                        onclick="document.getElementById('comment-${post.id}').focus()">
                        ♧
                    </button>

                    <button class="action-btn" onclick="sharePost(${post.id})">
                        ↗
                    </button>
                </div>

                <div class="likes">
                    ${post.likes.toLocaleString('pt-BR')} curtidas
                </div>

                <p class="caption">
                    <strong>${post.username}</strong>
                    ${post.caption}
                </p>

                <span class="post-category">${post.category}</span>

                <span class="post-time">${post.time}</span>
            </div>

            <div class="comments-area">
                <div class="comments-list">
                    ${post.comments.map(comment => `
                        <p><strong>${comment.name}:</strong> ${comment.text}</p>
                    `).join("")}
                </div>

                <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                    <input id="comment-${post.id}" type="text"
                        placeholder="Adicione um comentário..." required>
                    <button type="submit">Publicar</button>
                </form>
            </div>

        </article>
    `).join("");

    emptyMessage.hidden = filtered.length !== 0;
}

// CURTIR

function toggleLike(id) {
    const post = posts.find(item => item.id === id);

    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    renderPosts();
}

// COMENTAR

function addComment(event, id) {
    event.preventDefault();

    const post = posts.find(item => item.id === id);
    const input = document.getElementById(`comment-${id}`);
    const text = input.value.trim();

    if (!text || !post) return;

    post.comments.push({
        name: "Você",
        text: text
    });

    renderPosts();
}

// COMPARTILHAR

function sharePost(id) {
    const post = posts.find(item => item.id === id);

    if (!post) return;

    const text = `Confira esta publicação de ${post.name}: ${post.caption}`;

    if (navigator.share) {
        navigator.share({ title: "Socially", text: text })
            .catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => alert("Texto da publicação copiado!"))
            .catch(() => alert(text));
    } else {
        alert(text);
    }
}

// PESQUISA

document.getElementById("searchInput").addEventListener("input", event => {
    searchTerm = event.target.value;
    renderPosts();
});

// FILTROS

function setFilter(filter) {
    currentFilter = filter;

    document.querySelectorAll("[data-filter]").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );
    });

    renderPosts();
}

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        setFilter(button.dataset.filter);
    });
});

// ORDENAÇÃO

document.getElementById("sortSelect").addEventListener("change", event => {
    sortMode = event.target.value;
    renderPosts();
});

// SUGESTÕES DE PERFIS

const suggestions = [
    {
        name: "Dra. Mariana",
        username: "@psicologamariana",
        avatar: "https://i.pravatar.cc/100?img=47"
    },
    {
        name: "Closet da Bella",
        username: "@closetdabella",
        avatar: "https://i.pravatar.cc/100?img=49"
    },
    {
        name: "Natureza Viva",
        username: "@naturezaviva",
        avatar: "https://i.pravatar.cc/100?img=5"
    },
    {
        name: "Mundo dos Pets",
        username: "@mundodospets",
        avatar: "https://i.pravatar.cc/100?img=15"
    }
];

function renderSuggestions() {
    const container = document.getElementById("suggestions");

    container.innerHTML = suggestions.map((person, index) => `
        <div class="suggestion">
            <img src="${person.avatar}" alt="${person.name}">

            <div class="suggestion-info">
                <strong>${person.name}</strong>
                <span>${person.username}</span>
            </div>

            <button class="follow-btn" onclick="followProfile(this)">
                Seguir
            </button>
        </div>
    `).join("");
}

function followProfile(button) {
    const following = button.classList.toggle("following");

    button.textContent = following ? "Seguindo" : "Seguir";
}

// STORIES

function openStory(index) {
    const story = storiesData[index];

    document.getElementById("storyImage").src = story.image;
    document.getElementById("storyCaption").textContent = story.caption;
    document.getElementById("storyModal").classList.add("show");
}

document.getElementById("closeStory").addEventListener("click", () => {
    document.getElementById("storyModal").classList.remove("show");
});

// CRIAR PUBLICAÇÃO

const postModal = document.getElementById("postModal");

function openPostModal() {
    postModal.classList.add("show");
}

function closePostModal() {
    postModal.classList.remove("show");
}

document.getElementById("createButton").addEventListener("click", openPostModal);
document.getElementById("createSide").addEventListener("click", openPostModal);
document.getElementById("closeModal").addEventListener("click", closePostModal);

document.getElementById("publishButton").addEventListener("click", () => {
    const name = document.getElementById("newName").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const category = document.getElementById("newCategory").value;
    const caption = document.getElementById("newCaption").value.trim();
    const image = document.getElementById("newImage").value.trim();

    if (!name || !username || !caption || !image) {
        alert("Preencha todos os campos para publicar!");
        return;
    }

    try {
        const url = new URL(image);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }
    } catch {
        alert("Insira um link válido de imagem.");
        return;
    }

    posts.unshift({
        id: Date.now(),
        name: name,
        username: username.startsWith("@") ? username : "@" + username,
        avatar: "https://i.pravatar.cc/100?img=68",
        image: image,
        category: category,
        caption: caption,
        likes: 0,
        liked: false,
        verified: false,
        time: "Agora",
        comments: []
    });

    document.getElementById("newName").value = "";
    document.getElementById("newUsername").value = "";
    document.getElementById("newCaption").value = "";
    document.getElementById("newImage").value = "";

    closePostModal();
    setFilter("Todos");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// BOTÕES DE NAVEGAÇÃO

document.getElementById("homeButton").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    searchTerm = "";
    setFilter("Todos");
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("exploreButton").addEventListener("click", () => {
    setFilter("Todos");
    document.querySelector(".feed-area").scrollIntoView({
        behavior: "smooth"
    });
});

// INICIAR SITE

renderStories();
renderPosts();
renderSuggestions();
