
const postsGrid = document.getElementById("postsGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

const postModal = document.getElementById("postModal");
const postForm = document.getElementById("postForm");

let selectedCategory = "Todos";

// ABRIR E FECHAR MODAL

function openModal() {
    postModal.classList.add("show");
}

function closeModal() {
    postModal.classList.remove("show");
}

document.getElementById("newPostBtn").addEventListener("click", openModal);
document.getElementById("communityBtn").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);

postModal.addEventListener("click", event => {
    if (event.target === postModal) closeModal();
});

// MODO ESCURO

const themeBtn = document.getElementById("themeBtn");

function setTheme(dark) {
    document.body.classList.toggle("dark", dark);
    themeBtn.textContent = dark ? "☀️" : "🌙";
}

setTheme(localStorage.getItem("conectaTheme") === "dark");

themeBtn.addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark");

    setTheme(dark);

    localStorage.setItem(
        "conectaTheme",
        dark ? "dark" : "light"
    );
});

// PUBLICAÇÕES SALVAS

function getPosts() {
    return JSON.parse(localStorage.getItem("conectaPosts") || "[]");
}

function savePosts(posts) {
    localStorage.setItem("conectaPosts", JSON.stringify(posts));
}

// CRIAR PUBLICAÇÃO

postForm.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("postTitle").value.trim();
    const category = document.getElementById("postCategory").value;
    const description = document.getElementById("postDescription").value.trim();

    if (!title || !description) return;

    const posts = getPosts();

    posts.unshift({
        id: Date.now(),
        title,
        category,
        description,
        date: new Date().toLocaleDateString("pt-BR"),
        likes: 0,
        liked: false
    });

    savePosts(posts);

    postForm.reset();
    closeModal();

    renderCustomPosts();
    updateStats();

    document.getElementById("publicacoes").scrollIntoView({
        behavior: "smooth"
    });
});

// RENDERIZAR PUBLICAÇÕES NOVAS

function renderCustomPosts() {

    document.querySelectorAll(".custom-post").forEach(post => post.remove());

    getPosts().forEach(post => {

        const article = document.createElement("article");

        article.className = "post-card custom-post";
        article.dataset.category = post.category;

        const body = document.createElement("div");
        body.className = "post-body";

        const category = document.createElement("span");
        category.className = "post-category";
        category.textContent = post.category.toUpperCase();

        const title = document.createElement("h3");
        title.textContent = post.title;

        const description = document.createElement("p");
        description.textContent = post.description;

        const meta = document.createElement("div");
        meta.className = "post-meta";

        const date = document.createElement("span");
        date.textContent = "📅 " + post.date;

        const like = document.createElement("button");
        like.className = "like-btn";
        like.dataset.id = post.id;
        like.innerHTML = `${post.liked ? "♥" : "♡"} <span>${post.likes}</span>`;

        meta.append(date, like);
        body.append(category, title, description, meta);
        article.append(body);

        postsGrid.prepend(article);
    });

    updateStats();
    filterPosts();
}

// CURTIDAS

postsGrid.addEventListener("click", event => {

    const button = event.target.closest(".like-btn");

    if (!button) return;

    if (button.dataset.id) {

        const posts = getPosts();
        const post = posts.find(p => p.id === Number(button.dataset.id));

        if (!post) return;

        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;

        savePosts(posts);
        renderCustomPosts();

    } else {

        const liked = button.dataset.liked === "true";

        let count = Number(button.querySelector("span").textContent);

        count += liked ? -1 : 1;

        button.dataset.liked = liked ? "false" : "true";
        button.firstChild.textContent = liked ? "♡ " : "♥ ";
        button.querySelector("span").textContent = count;

        button.style.color = liked ? "" : "#e75d85";

        localStorage.setItem(
            "conectaLikes",
            JSON.stringify(getDefaultLikes())
        );

        updateStats();
    }
});

// FILTRO DE CATEGORIAS

document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".category").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterPosts();
    });
});

// PESQUISA

searchInput.addEventListener("input", filterPosts);

function filterPosts() {

    const term = searchInput.value.toLowerCase();

    const allPosts = document.querySelectorAll(".post-card");

    let visible = 0;

    allPosts.forEach(post => {

        const matchesCategory =
            selectedCategory === "Todos" ||
            post.dataset.category === selectedCategory;

        const matchesSearch =
            post.textContent.toLowerCase().includes(term);

        const show = matchesCategory && matchesSearch;

        post.style.display = show ? "block" : "none";

        if (show) visible++;
    });

    noResults.hidden = visible > 0;
}

// CURTIDAS DOS CARDS ORIGINAIS

function getDefaultLikes() {
    return [...document.querySelectorAll(".post-card:not(.custom-post) .like-btn")]
        .map(button => ({
            liked: button.dataset.liked === "true",
            likes: Number(button.querySelector("span").textContent)
        }));
}

function restoreDefaultLikes() {

    const saved = JSON.parse(localStorage.getItem("conectaLikes") || "[]");

    document.querySelectorAll(".post-card:not(.custom-post) .like-btn")
        .forEach((button, index) => {

            if (!saved[index]) return;

            button.dataset.liked = String(saved[index].liked);
            button.firstChild.textContent = saved[index].liked ? "♥ " : "♡ ";
            button.querySelector("span").textContent = saved[index].likes;

        });
}

// ESTATÍSTICAS

function updateStats() {

    const originalCount =
        document.querySelectorAll(".post-card:not(.custom-post)").length;

    const customCount = getPosts().length;

    document.getElementById("postCount").textContent =
        originalCount + customCount;

    const defaultLikes = getDefaultLikes().reduce(
        (sum, item) => sum + item.likes, 0
    );

    const customLikes = getPosts().reduce(
        (sum, post) => sum + post.likes, 0
    );

    document.getElementById("likeCount").textContent =
        String(defaultLikes + customLikes).padStart(2, "0");
}

// INICIALIZAÇÃO

restoreDefaultLikes();
renderCustomPosts();
updateStats();
