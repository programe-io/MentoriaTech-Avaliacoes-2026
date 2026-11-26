let feedPosts = [
    {
        id: 1,
        user: "@clara.leituras",
        avatar: "CL",
        time: "há 2 horas",
        book: "É Assim que Acaba",
        rating: 5,
        text: "Terminei ontem de madrugada e ainda não consegui superar a última cena entre a Lily e o Atlas. A forma como a Colleen aborda a quebra de ciclos familiares é avassaladora.",
        quote: "“Continue a nadar.”",
        likes: 48,
        liked: false,
        saved: false,
        commentsOpen: false,
        comments: [
            { user: "@lucas_books", text: "Esse livro me destruiu do melhor jeito possível!" },
            { user: "@mariana.coho", text: "Atlas Corrigan é simplesmente inesquecível." }
        ]
    },
    {
        id: 2,
        user: "@thriller.club",
        avatar: "TC",
        time: "há 5 horas",
        book: "Verity",
        rating: 5,
        text: "Li em uma sentada só. A atmosfera na casa dos Crawford dá arrepios em cada capítulo. Sem spoilers, mas preciso saber: vocês são #TimeCarta ou #TimeManuscrito?",
        quote: "“Encontre o que você ama e deixe que isso mate você.”",
        likes: 93,
        liked: true,
        saved: true,
        commentsOpen: true,
        comments: [
            { user: "@bia.paginas", text: "Com certeza Time Manuscrito! Aquilo não tem como ser inventado." }
        ]
    },
    {
        id: 3,
        user: "@pedro.literario",
        avatar: "PL",
        time: "ontem",
        book: "Todas as Suas (Im)Perfeições",
        rating: 4,
        text: "Um dos livros mais maduros da autora. Alternar entre o início apaixonado de Quinn e Graham e o desgaste do casamento mostra como a falta de diálogo machuca.",
        quote: "“Se você iluminar apenas suas imperfeições, todas as suas qualidades ficarão na sombra.”",
        likes: 37,
        liked: false,
        saved: false,
        commentsOpen: false,
        comments: []
    },
    {
        id: 4,
        user: "@sofia.estante",
        avatar: "SE",
        time: "há 2 dias",
        book: "Novembro, 9",
        rating: 5,
        text: "A premissa de se encontrar apenas um dia por ano parecia leve no começo, mas o plot twist perto do final me deixou de boca aberta.",
        quote: "",
        likes: 61,
        liked: false,
        saved: false,
        commentsOpen: false,
        comments: []
    }
];

let activeTab = "all";

const feedContainer = document.getElementById("feedContainer");
const postForm = document.getElementById("postForm");
const tabBtns = document.querySelectorAll(".tab-btn");
const savedCountEl = document.getElementById("savedCount");

function renderStars(count) {
    return "★".repeat(count) + "☆".repeat(5 - count);
}

function updateSavedCounter() {
    const count = feedPosts.filter(p => p.saved).length;
    savedCountEl.textContent = count;
}

function renderFeed() {
    updateSavedCounter();

    const visiblePosts = activeTab === "saved"
        ? feedPosts.filter(post => post.saved)
        : feedPosts;

    if (visiblePosts.length === 0) {
        feedContainer.innerHTML = `
            <div class="empty-feed">
                <p>Nenhum post salvo ainda. Clique em <strong>Salvar</strong> nos posts do feed para montar sua lista.</p>
            </div>
        `;
        return;
    }

    feedContainer.innerHTML = visiblePosts.map(post => `
        <article class="feed-card">
            <div class="post-header">
                <div class="author-info">
                    <div class="avatar">${post.avatar}</div>
                    <div>
                        <span class="author-name">${post.user}</span>
                        <span class="post-time">${post.time}</span>
                    </div>
                </div>
                <span class="book-badge">${post.book}</span>
            </div>

            <div class="stars">${renderStars(post.rating)}</div>
            <p class="post-body">${post.text}</p>

            ${post.quote ? `<div class="quote-box">${post.quote}</div>` : ""}

            <div class="post-actions">
                <div class="action-group">
                    <button class="action-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
                        ${post.liked ? "♥" : "♡"} ${post.likes}
                    </button>
                    <button class="action-btn" onclick="toggleComments(${post.id})">
                        💬 ${post.comments.length}
                    </button>
                </div>
                <button class="action-btn ${post.saved ? "saved" : ""}" onclick="toggleSave(${post.id})">
                    ${post.saved ? "★ Salvo" : "☆ Salvar"}
                </button>
            </div>

            <div class="comments-section ${post.commentsOpen ? "open" : ""}">
                ${post.comments.map(c => `
                    <div class="comment-item">
                        <strong>${c.user}</strong>${c.text}
                    </div>
                `).join("")}

                <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                    <input type="text" placeholder="Escreva um comentário..." required>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </article>
    `).join("");
}

function toggleLike(id) {
    const post = feedPosts.find(p => p.id === id);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderFeed();
}

function toggleSave(id) {
    const post = feedPosts.find(p => p.id === id);
    if (!post) return;
    post.saved = !post.saved;
    renderFeed();
}

function toggleComments(id) {
    const post = feedPosts.find(p => p.id === id);
    if (!post) return;
    post.commentsOpen = !post.commentsOpen;
    renderFeed();
}

function addComment(event, id) {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const text = input.value.trim();
    if (!text) return;

    const post = feedPosts.find(p => p.id === id);
    if (!post) return;

    post.comments.push({ user: "@voce", text });
    post.commentsOpen = true;
    renderFeed();
}

postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let rawUser = document.getElementById("userName").value.trim();
    if (!rawUser.startsWith("@")) rawUser = "@" + rawUser;

    const book = document.getElementById("bookSelect").value;
    const text = document.getElementById("postText").value.trim();
    const rating = Number(document.getElementById("bookRating").value);
    const initials = rawUser.replace("@", "").slice(0, 2).toUpperCase();

    const newPost = {
        id: Date.now(),
        user: rawUser,
        avatar: initials || "LE",
        time: "agora mesmo",
        book,
        rating,
        text,
        quote: "",
        likes: 1,
        liked: true,
        saved: false,
        commentsOpen: false,
        comments: []
    };

    feedPosts.unshift(newPost);
    postForm.reset();
    renderFeed();
});

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeTab = btn.dataset.tab;
        renderFeed();
    });
});

renderFeed();
