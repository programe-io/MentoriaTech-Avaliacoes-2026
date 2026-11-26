// Dados iniciais do feed
let posts = [
    {
        id: 1,
        usuario: "@camila.style",
        avatar: "https://unsplash.com",
        categoria: "alfaiataria",
        imagem: "https://unsplash.com",
        legenda: "Blazer oversized + tons neutros para começar a semana. O que acham dessa combinação? 🤎✨",
        curtidas: 142,
        curtido: false,
        salvo: false,
        comentarios: [
            { user: "@lucas.urbano", texto: "Corte impecável desse blazer!" }
        ]
    },
    {
        id: 2,
        usuario: "@lucas.urbano",
        avatar: "https://unsplash.com",
        categoria: "streetwear",
        imagem: "https://unsplash.com",
        legenda: "Sobreposições urbanas e tênis retrô. Conforto total para o dia a dia.",
        curtidas: 98,
        curtido: false,
        salvo: false,
        comentarios: []
    },
    {
        id: 3,
        usuario: "@brecho.chic",
        avatar: "https://unsplash.com",
        categoria: "vintage",
        imagem: "https://unsplash.com",
        legenda: "Achado dos anos 90 garimpado neste fim de semana. Moda circular sempre! ♻️👗",
        curtidas: 215,
        curtido: true,
        salvo: true,
        comentarios: [
            { user: "@camila.style", texto: "Amei a textura do tecido!" }
        ]
    }
];

let filtroAtual = "todos";
const feedStream = document.getElementById("feed-stream");
const savedCountEl = document.getElementById("saved-count");
const filterPills = document.querySelectorAll(".pill");

function atualizarContadorSalvos() {
    const totalSalvos = posts.filter(p => p.salvo).length;
    savedCountEl.textContent = totalSalvos;
}

function renderizarFeed() {
    feedStream.innerHTML = "";
    atualizarContadorSalvos();

    const postsFiltrados = posts.filter(post => {
        if (filtroAtual === "todos") return true;
        if (filtroAtual === "salvos") return post.salvo;
        return post.categoria === filtroAtual;
    });

    if (postsFiltrados.length === 0) {
        feedStream.innerHTML = `<p style="text-align:center; color:#71717a; padding: 40px 0;">Nenhum look encontrado nesta aba.</p>`;
        return;
    }

    postsFiltrados.forEach(post => {
        const comentariosHTML = post.comentarios
            .map(c => `<div><strong>${c.user}</strong> ${c.texto}</div>`)
            .join("");

        const card = document.createElement("article");
        card.className = "post-card";
        card.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <img src="${post.avatar}" alt="${post.usuario}" class="user-avatar">
                    <div>
                        <span class="user-name">${post.usuario}</span>
                        <span class="post-tag">#${post.categoria}</span>
                    </div>
                </div>
            </div>

            <img src="${post.imagem}" alt="Look de moda" class="post-image" ondblclick="alternarCurtida(${post.id})">

            <div class="post-actions">
                <div class="action-group">
                    <button class="action-btn ${post.curtido ? 'liked' : ''}" onclick="alternarCurtida(${post.id})" title="Curtir">
                        ${post.curtido ? '♥' : '♡'}
                    </button>
                </div>
                <button class="action-btn ${post.salvo ? 'saved' : ''}" onclick="alternarSalvar(${post.id})" title="Salvar Look">
                    ${post.salvo ? '★' : '☆'}
                </button>
            </div>

            <div class="post-details">
                <div class="likes-count">${post.curtidas} curtidas</div>
                <p class="caption"><strong>${post.usuario}</strong> ${post.legenda}</p>
                
                <div class="comments-list">
                    ${comentariosHTML}
                </div>

                <form class="comment-form" onsubmit="adicionarComentario(event, ${post.id})">
                    <input type="text" placeholder="Adicione um comentário..." required>
                    <button type="submit">Publicar</button>
                </form>
            </div>
        `;
        feedStream.appendChild(card);
    });
}

// Curtir / Descurtir (funciona no botão e no duplo clique na foto)
function alternarCurtida(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;
    renderizarFeed();
}

// Salvar / Remover dos salvos
function alternarSalvar(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    post.salvo = !post.salvo;
    renderizarFeed();
}

// Adicionar comentário
function adicionarComentario(event, id) {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const texto = input.value.trim();
    if (!texto) return;

    const post = posts.find(p => p.id === id);
    post.comentarios.push({
        user: "@voce",
        texto: texto
    });

    renderizarFeed();
}

// Filtros da barra superior
filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        filtroAtual = pill.dataset.filter;
        renderizarFeed();
    });
});

// Controle do Modal de Nova Publicação
const modalPost = document.getElementById("new-post-modal");

function abrirModalPost() {
    modalPost.style.display = "flex";
}

function fecharModalPost() {
    modalPost.style.display = "none";
}

document.getElementById("create-post-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let user = document.getElementById("post-user").value.trim();
    if (!user.startsWith("@")) user = "@" + user;

    const novoPost = {
        id: Date.now(),
        usuario: user,
        avatar: "https://unsplash.com",
        categoria: document.getElementById("post-category").value,
        imagem: document.getElementById("post-img").value,
        legenda: document.getElementById("post-caption").value,
        curtidas: 1,
        curtido: true,
        salvo: false,
        comentarios: []
    };

    posts.unshift(novoPost);
    this.reset();
    fecharModalPost();
    renderizarFeed();
});

// Inicializa o feed
renderizarFeed();
