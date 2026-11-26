// Lista inicial de posts do blog
const posts = [
    {
        id: 1,
        title: "Como adaptar um gato novo em casa sem estresse",
        category: "Gatos",
        date: "26 Nov, 2026",
        image: "https://unsplash.com",
        content: "Gatos são animais territorialistas e precisam de tempo para explorar novos ambientes. Prepare um cômodo seguro nos primeiros dias com caixa de areia, água fresca e arranhadores antes de apresentá-lo ao resto da casa.",
        likes: 14,
        liked: false
    },
    {
        id: 2,
        title: "A importância dos passeios diários para a saúde mental dos cães",
        category: "Cães",
        date: "24 Nov, 2026",
        image: "https://unsplash.com",
        content: "Passear não serve apenas para o cachorro gastar energia física. Farejar novos cheiros e explorar a rua estimula o cérebro, reduz a ansiedade de separação e melhora o comportamento dentro de casa.",
        likes: 22,
        liked: false
    },
    {
        id: 3,
        title: "Hidratação no calor: dicas práticas para manter seu pet saudável",
        category: "Saúde",
        date: "20 Nov, 2026",
        image: "https://unsplash.com",
        content: "Espalhar vários potes de água pela casa, oferecer sachês úmidos e evitar passeios entre 10h e 16h são cuidados essenciais para prevenir a desidratação e o superaquecimento.",
        likes: 19,
        liked: false
    }
];

let currentCategory = "Todos";
let searchQuery = "";

const postsContainer = document.getElementById("posts-container");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll("#category-list button");
const filterStatus = document.getElementById("filter-status");
const resetFilterBtn = document.getElementById("reset-filter");
const postForm = document.getElementById("post-form");

// Renderiza os posts na tela com base nos filtros ativos
function renderPosts() {
    const filteredPosts = posts.filter(post => {
        const matchesCategory = currentCategory === "Todos" || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery) ||
                              post.content.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Atualiza barra de status do filtro
    if (currentCategory === "Todos" && searchQuery === "") {
        filterStatus.innerHTML = `Mostrando: <strong>Todos os posts (${filteredPosts.length})</strong>`;
        resetFilterBtn.style.display = "none";
    } else {
        filterStatus.innerHTML = `Filtrando por: <strong>${currentCategory}</strong> (${filteredPosts.length} encontrado(s))`;
        resetFilterBtn.style.display = "inline-block";
    }

    postsContainer.innerHTML = "";

    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = `<div class="widget"><p>Nenhum artigo encontrado para essa busca.</p></div>`;
        return;
    }

    filteredPosts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post-card";

        article.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="post-body">
                <div class="post-meta">
                    <span class="badge">${post.category}</span>
                    <span>📅 ${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div class="post-actions">
                    <button class="like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                        ❤️ Curtir (${post.likes})
                    </button>
                </div>
            </div>
        `;

        postsContainer.appendChild(article);
    });
}

// Delegação de eventos para o botão de curtir
postsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-btn")) {
        const postId = Number(event.target.dataset.id);
        const post = posts.find(p => p.id === postId);

        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            renderPosts();
        }
    }
});

// Filtro por categoria na barra lateral
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentCategory = button.dataset.category;
        renderPosts();
    });
});

// Busca em tempo real
searchInput.addEventListener("input", (event) => {
    searchQuery = event.target.value.toLowerCase().trim();
    renderPosts();
});

// Limpar filtros
resetFilterBtn.addEventListener("click", () => {
    currentCategory = "Todos";
    searchQuery = "";
    searchInput.value = "";
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    categoryButtons[0].classList.add("active");
    renderPosts();
});

// Adicionar novo post pelo formulário
postForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const imageInput = document.getElementById("image").value.trim();
    const content = document.getElementById("content").value.trim();

    const defaultImage = "https://unsplash.com";

    const newPost = {
        id: Date.now(),
        title,
        category,
        date: "Agora mesmo",
        image: imageInput || defaultImage,
        content,
        likes: 0,
        liked: false
    };

    posts.unshift(newPost); // Adiciona no topo da lista
    postForm.reset();
    renderPosts();
});

// Inicializa o blog
renderPosts();
4