// Posts iniciais do feed
let posts = [
    {
        id: 1,
        autor: "Explorador Cósmico",
        avatar: "https://dicebear.com",
        tempo: "Há 15 min",
        categoria: "Ciência",
        texto: "Sabia que um dia em Vênus é mais longo que um ano inteiro lá? 🪐\n\nEle leva 243 dias terrestres para girar em torno de si mesmo, mas apenas 225 dias para dar a volta completa ao redor do Sol!",
        curtidas: 42,
        curtido: false,
        comentarios: ["Minha cabeça explodiu com essa!", "Imagina esperar o aniversário lá kkk"]
    },
    {
        id: 2,
        autor: "Arquivo Histórico",
        avatar: "https://dicebear.com",
        tempo: "Há 1 hora",
        categoria: "História",
        texto: "A Universidade de Oxford é mais antiga que o Império Asteca! 🏛️\n\nO ensino em Oxford começou por volta de 1096, enquanto a fundação de Tenochtitlán (capital asteca) só ocorreu em 1325.",
        curtidas: 89,
        curtido: true,
        comentarios: ["A linha do tempo da história sempre confunde a gente."]
    },
    {
        id: 3,
        autor: "Mundo Selvagem",
        avatar: "https://dicebear.com",
        tempo: "Há 3 horas",
        categoria: "Natureza",
        texto: "Os tubarões existem na Terra há mais tempo do que as árvores e até mesmo antes dos anéis de Saturno se formarem! 🦈🌲",
        curtidas: 124,
        curtido: false,
        comentarios: []
    }
];

const feedContainer = document.getElementById('feed-container');
const postText = document.getElementById('post-text');
const postCategory = document.getElementById('post-category');
const publishBtn = document.getElementById('publish-btn');
const tabs = document.querySelectorAll('.tab');

let filtroAtual = 'todos';

// Renderizar o feed na tela
function renderFeed() {
    feedContainer.innerHTML = '';

    const postsFiltrados = posts.filter(post => {
        if (filtroAtual === 'todos') return true;
        if (filtroAtual === 'curtidos') return post.curtido;
        return post.categoria === filtroAtual;
    });

    if (postsFiltrados.length === 0) {
        feedContainer.innerHTML = '<p style="text-align:center; color:#65676b; margin-top:20px;">Nenhuma curiosidade encontrada nesta aba.</p>';
        return;
    }

    postsFiltrados.forEach(post => {
        const postEl = document.createElement('article');
        postEl.className = 'post-card';

        const comentariosHTML = post.comentarios
            .map(c => `<div class="comment-item"><strong>Visitante:</strong> ${c}</div>`)
            .join('');

        postEl.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <img src="${post.avatar}" alt="Avatar" class="avatar">
                    <div>
                        <div class="user-name">${post.autor}</div>
                        <div class="post-time">${post.tempo}</div>
                    </div>
                </div>
                <span class="category-badge">${post.categoria}</span>
            </div>

            <div class="post-body">${post.texto}</div>

            <div class="post-actions">
                <button class="action-btn ${post.curtido ? 'liked' : ''}" onclick="toggleLike(${post.id})">
                    ${post.curtido ? '❤️' : '🤍'} ${post.curtidas}
                </button>
                <button class="action-btn" onclick="toggleComments(${post.id})">
                    💬 ${post.comentarios.length} Comentários
                </button>
            </div>

            <div class="comments-section" id="comments-${post.id}">
                <div class="comments-list">${comentariosHTML}</div>
                <form class="comment-form" onsubmit="addComment(event, ${post.id})">
                    <input type="text" class="comment-input" placeholder="Escreva um comentário..." required>
                    <button type="submit" class="comment-submit">Enviar</button>
                </form>
            </div>
        `;

        feedContainer.appendChild(postEl);
    });
}

// Publicar nova curiosidade
publishBtn.addEventListener('click', () => {
    const texto = postText.value.trim();
    if (!texto) return;

    const novoPost = {
        id: Date.now(),
        autor: "Você (Curioso)",
        avatar: "https://dicebear.com",
        tempo: "Agora mesmo",
        categoria: postCategory.value,
        texto: texto,
        curtidas: 0,
        curtido: false,
        comentarios: []
    };

    posts.unshift(novoPost);
    postText.value = '';
    renderFeed();
});

// Curtir / Descurtir
function toggleLike(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;
    renderFeed();
}

// Abrir / Fechar área de comentários
function toggleComments(id) {
    const section = document.getElementById(`comments-${id}`);
    section.classList.toggle('open');
}

// Adicionar comentário
function addComment(event, id) {
    event.preventDefault();
    const input = event.target.querySelector('.comment-input');
    const texto = input.value.trim();
    if (!texto) return;

    const post = posts.find(p => p.id === id);
    post.comentarios.push(texto);
    renderFeed();

    // Mantém a aba de comentários aberta após renderizar
    document.getElementById(`comments-${id}`).classList.add('open');
}

// Alternar abas de filtro
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filtroAtual = tab.dataset.filter;
        renderFeed();
    });
});

// Inicializar feed
renderFeed();
