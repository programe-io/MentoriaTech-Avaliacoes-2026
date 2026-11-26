// Dados iniciais simulando um banco de dados
let posts = [
    {
        id: 1,
        nick: "Bak_Oficial",
        category: "Dica",
        content: "Sensi atualizada pós-atualização: Geral 98, Ponto Vermelho 92, Mira 2x 95. Só capa de Desert!",
        booyahs: 42,
        liked: false,
        time: "Há 15 min"
    },
    {
        id: 2,
        nick: "Lider_LosGrandes",
        category: "Recrutamento",
        content: "Guilda competitiva abrindo 3 vagas para camp diário. Requisitos: Taxa de HS acima de 45% e ter Discord.",
        booyahs: 18,
        liked: false,
        time: "Há 1 hora"
    },
    {
        id: 3,
        nick: "CapaNeles99",
        category: "Highlight",
        content: "Acabei de fazer um Squad Wipe no último gás em Bermuda! 14 kills na ranqueada.",
        booyahs: 67,
        liked: false,
        time: "Há 3 horas"
    }
];

const feedContainer = document.getElementById("feedContainer");
const btnPublish = document.getElementById("btnPublish");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "Todos";

// Função para renderizar os posts na tela
function renderFeed() {
    feedContainer.innerHTML = "";

    const filteredPosts = currentFilter === "Todos" 
        ? posts 
        : posts.filter(post => post.category === currentFilter);

    filteredPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-card");

        postElement.innerHTML = `
            <div class="post-header">
                <span class="post-author">${post.nick}</span>
                <span class="post-badge">${post.category}</span>
            </div>
            <p class="post-text">${post.content}</p>
            <div class="post-actions">
                <span>${post.time}</span>
                <button class="btn-booyah ${post.liked ? 'liked' : ''}" onclick="toggleBooyah(${post.id})">
                    🔥 BOOYAH! (${post.booyahs})
                </button>
            </div>
        `;

        feedContainer.appendChild(postElement);
    });
}

// Função para publicar um novo post
btnPublish.addEventListener("click", () => {
    const nickInput = document.getElementById("playerNick");
    const categoryInput = document.getElementById("postCategory");
    const contentInput = document.getElementById("postContent");

    if (nickInput.value.trim() === "" || contentInput.value.trim() === "") {
        alert("Preencha seu Nick e a mensagem antes de publicar!");
        return;
    }

    const newPost = {
        id: Date.now(),
        nick: nickInput.value,
        category: categoryInput.value,
        content: contentInput.value,
        booyahs: 0,
        liked: false,
        time: "Agora mesmo"
    };

    posts.unshift(newPost); // Adiciona no topo do feed
    contentInput.value = ""; // Limpa o campo de texto
    renderFeed();
});

// Função para curtir (dar Booyah)
function toggleBooyah(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        post.liked = !post.liked;
        post.booyahs += post.liked ? 1 : -1;
        renderFeed();
    }
}

// Eventos dos botões de filtro
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-filter");
        renderFeed();
    });
});

// Inicializa o feed ao carregar a página
renderFeed();
