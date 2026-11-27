
const $ = id => document.getElementById(id);

const STORAGE_KEY = "rafa_blog_masculino";

const initialArticles = [
    {
        id: 1,
        title: "Estilo masculino: como encontrar sua identidade",
        category: "Moda",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
        content: "Descubra como montar combinações modernas e expressar sua personalidade através da moda.",
        likes: 32,
        liked: false,
        saved: false
    },
    {
        id: 2,
        title: "Disciplina e evolução pessoal",
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700",
        content: "Pequenas atitudes diárias podem transformar sua rotina e seus resultados.",
        likes: 48,
        liked: false,
        saved: false
    },
    {
        id: 3,
        title: "Tecnologia e o futuro",
        category: "Tecnologia",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700",
        content: "Um pouco sobre tecnologia, inovação e as novidades do mundo digital.",
        likes: 27,
        liked: false,
        saved: false
    },
    {
        id: 4,
        title: "Vivendo novas experiências",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700",
        content: "Conhecer lugares e viver experiências faz parte da construção da nossa história.",
        likes: 55,
        liked: false,
        saved: false
    }
];

let articles;

try {
    const stored = localStorage.getItem(STORAGE_KEY);
    articles = stored ? JSON.parse(stored) : initialArticles;

    if (!Array.isArray(articles)) {
        articles = initialArticles;
    }
} catch {
    articles = initialArticles;
}

let selectedCategory = "Todos";
let searchTerm = "";

// Salvar artigos

function saveArticles() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(articles)
    );
}

// Notificação

function showToast(message) {
    const toast = $("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Renderizar artigos

function renderArticles() {

    const grid = $("articleGrid");

    grid.innerHTML = "";

    const filteredArticles = articles.filter(article => {

        const categoryMatch =
            selectedCategory === "Todos" ||
            article.category === selectedCategory;

        const searchMatch =
            article.title.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm);

        return categoryMatch && searchMatch;

    });

    if (filteredArticles.length === 0) {

        const empty = document.createElement("p");

        empty.textContent = "Nenhum artigo encontrado.";

        grid.appendChild(empty);

        return;
    }

    filteredArticles.forEach(article => {

        const card = document.createElement("article");

        card.className = "article-card";

        const image = document.createElement("img");

        image.src = article.image ||
            "https://placehold.co/700x450/eeeeee/222222?text=Rafa+Blog";

        image.alt = article.title;

        const info = document.createElement("div");

        info.className = "article-info";

        const category = document.createElement("span");

        category.className = "category";

        category.textContent = article.category.toUpperCase();

        const title = document.createElement("h3");

        title.textContent = article.title;

        const content = document.createElement("p");

        content.textContent = article.content;

        const actions = document.createElement("div");

        actions.className = "article-actions";

        // Curtidas

        const like = document.createElement("button");

        like.textContent =
            `${article.liked ? "❤️" : "♡"} ${article.likes}`;

        like.addEventListener("click", () => {

            article.liked = !article.liked;

            article.likes += article.liked ? 1 : -1;

            saveArticles();

            renderArticles();

        });

        // Favoritos

        const favorite = document.createElement("button");

        favorite.textContent =
            article.saved ? "★ Favorito" : "☆ Favoritar";

        favorite.addEventListener("click", () => {

            article.saved = !article.saved;

            saveArticles();

            renderArticles();

            showToast("Favoritos atualizados!");

        });

        // Excluir

        const remove = document.createElement("button");

        remove.textContent = "Excluir";

        remove.addEventListener("click", () => {

            if (confirm("Deseja excluir este artigo?")) {

                articles = articles.filter(
                    item => item.id !== article.id
                );

                saveArticles();

                renderArticles();

                showToast("Artigo excluído!");

            }

        });

        // Ler artigo

        const read = document.createElement("button");

        read.textContent = "Ler mais →";

        read.addEventListener("click", () => {

            openArticle(article);

        });

        actions.append(
            like,
            favorite,
            remove,
            read
        );

        info.append(
            category,
            title,
            content,
            actions
        );

        card.append(image, info);

        grid.appendChild(card);

    });

}

// Modal

function openModal() {
    $("postModal").classList.add("show");
}

function closeModal() {
    $("postModal").classList.remove("show");
}

$("newPostBtn").addEventListener("click", openModal);

$("closeModal").addEventListener("click", closeModal);

$("postModal").addEventListener("click", event => {

    if (event.target === $("postModal")) {
        closeModal();
    }

});

// Criar artigo

$("postForm").addEventListener("submit", event => {

    event.preventDefault();

    const title = $("postTitle").value.trim();

    const category = $("postCategory").value;

    const image = $("postImage").value.trim();

    const content = $("postContent").value.trim();

    if (!title || !category || !content) {

        showToast("Preencha os campos obrigatórios!");

        return;

    }

    if (image && !/^https?:\/\/\S+$/i.test(image)) {

        showToast("URL da imagem inválida!");

        return;

    }

    const newArticle = {

        id: Date.now(),

        title,

        category,

        image,

        content,

        likes: 0,

        liked: false,

        saved: false

    };

    articles.unshift(newArticle);

    saveArticles();

    $("postForm").reset();

    selectedCategory = "Todos";

    searchTerm = "";

    $("searchInput").value = "";

    updateCategories();

    renderArticles();

    closeModal();

    showToast("Artigo publicado com sucesso!");

});

// Pesquisa

$("searchInput").addEventListener("input", event => {

    searchTerm = event.target.value.toLowerCase().trim();

    renderArticles();

});

// Filtro de categorias

function updateCategories() {

    document.querySelectorAll("[data-category]").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === selectedCategory
        );

    });

}

document.querySelectorAll("[data-category]").forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        updateCategories();

        renderArticles();

    });

});

// Ler artigo completo

function openArticle(article) {

    const modal = document.createElement("div");

    modal.className = "modal show";

    const content = document.createElement("div");

    content.className = "modal-content";

    const close = document.createElement("button");

    close.className = "close";

    close.textContent = "×";

    close.addEventListener("click", () => modal.remove());

    const category = document.createElement("p");

    category.textContent = article.category;

    const title = document.createElement("h2");

    title.textContent = article.title;

    const image = document.createElement("img");

    image.src = article.image || "";

    image.style.width = "100%";

    image.style.margin = "15px 0";

    image.style.objectFit = "cover";

    const text = document.createElement("p");

    text.textContent = article.content;

    text.style.lineHeight = "1.8";

    content.append(
        close,
        category,
        title,
        image,
        text
    );

    modal.appendChild(content);

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.remove();
        }

    });

    document.body.appendChild(modal);

}

// Newsletter demonstrativa

$("newsletterForm").addEventListener("submit", event => {

    event.preventDefault();

    const email = $("email").value.trim();

    if (!email) return;

    showToast("Inscrição recebida! Obrigado.");

    $("newsletterForm").reset();

});

// Inicialização

renderArticles();

updateCategories();
