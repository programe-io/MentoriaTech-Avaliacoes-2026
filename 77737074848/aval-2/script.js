// Posts iniciais do feed
const postsIniciais = [
    {
        id: 1,
        autor: "@mariana.cozinha",
        categoria: "Saudável",
        tempo: "15 min",
        data: "Há 2 horas",
        imagem: "https://unsplash.com",
        titulo: "Avocado Toast com Ovo Pochê",
        legenda: "Café da manhã nutritivo e pronto em 15 minutos! Finalizei com azeite e pimenta calabresa. 🥑🍳",
        curtidas: 342,
        curtido: false,
        salvo: false,
        ingredientes: [
            "2 fatias de pão integral ou fermentação natural",
            "1/2 abacate maduro amassado com limão e sal",
            "2 ovos frescos",
            "1 colher (sopa) de vinagre branco"
        ],
        preparo: [
            "Toste o pão na frigideira até ficar crocante.",
            "Cozinhe o ovo em água fervente com vinagre por 3 minutos.",
            "Monte o pão com o creme de abacate e o ovo por cima."
        ],
        comentarios: [
            { usuario: "@pedro_fit", texto: "Fiz hoje cedo, ficou sensacional!" }
        ]
    },
    {
        id: 2,
        autor: "@lucas.massas",
        categoria: "Massas",
        tempo: "25 min",
        data: "Há 5 horas",
        imagem: "https://unsplash.com",
        titulo: "Espaguete à Carbonara Clássico",
        legenda: "Sem creme de leite! Apenas gemas, queijo ralado, bacon crocante e a água do cozimento. 🍝",
        curtidas: 891,
        curtido: false,
        salvo: false,
        ingredientes: [
            "250g de espaguete",
            "150g de bacon ou guanciale em cubos",
            "3 gemas + 1 ovo inteiro",
            "100g de queijo parmesão ou pecorino ralado"
        ],
        preparo: [
            "Frite o bacon até dourar e reserve.",
            "Misture os ovos, o queijo e pimenta-do-reino.",
            "Misture o macarrão quente com o bacon e o creme de ovos fora do fogo."
        ],
        comentarios: []
    },
    {
        id: 3,
        autor: "@doces.da.clara",
        categoria: "Doces",
        tempo: "10 min",
        data: "Ontem",
        imagem: "https://unsplash.com",
        titulo: "Mousse de Chocolate Meio Amargo Rápido",
        legenda: "Sobremesa de 3 ingredientes para matar a vontade de doce sem sujar quase nada. 🍫",
        curtidas: 514,
        curtido: false,
        salvo: false,
        ingredientes: [
            "200g de chocolate meio amargo picado",
            "1 caixinha de creme de leite",
            "3 claras em neve com 2 colheres de açúcar"
        ],
        preparo: [
            "Derreta o chocolate e misture com o creme de leite.",
            "Incorpore delicadamente as claras em neve.",
            "Leve à geladeira por 2 horas antes de servir."
        ],
        comentarios: []
    }
];

// Estado da aplicação
let posts = JSON.parse(localStorage.getItem('cookfeed_posts')) || postsIniciais;
let filtroCategoria = 'todas';
let apenasSalvos = false;

const feedContainer = document.getElementById('feed-posts');
const contagemSalvos = document.getElementById('contagem-salvos');

// Salva estado no navegador
function salvarDados() {
    localStorage.setItem('cookfeed_posts', JSON.stringify(posts));
    atualizarContadorSalvos();
}

function atualizarContadorSalvos() {
    const total = posts.filter(p => p.salvo).length;
    contagemSalvos.textContent = total;
}

// Renderiza o feed na tela
function renderizarFeed() {
    feedContainer.innerHTML = '';

    const postsFiltrados = posts.filter(post => {
        if (apenasSalvos && !post.salvo) return false;
        if (filtroCategoria !== 'todas' && post.categoria !== filtroCategoria) return false;
        return true;
    });

    if (postsFiltrados.length === 0) {
        feedContainer.innerHTML = `<p style="text-align:center; color:#777; padding:2rem;">Nenhuma receita encontrada neste filtro.</p>`;
        return;
    }

    postsFiltrados.forEach(post => {
        const card = document.createElement('article');
        card.className = 'post-card';

        const inicialAutor = post.autor.replace('@', '')[0] || 'C';
        const iconeCurtida = post.curtido ? '❤️' : '🤍';
        const iconeSalvo = post.salvo ? '🔖' : '📑';

        const htmlIngredientes = post.ingredientes.map(i => `<li>${i}</li>`).join('');
        const htmlPreparo = post.preparo.map(p => `<li>${p}</li>`).join('');
        const htmlComentarios = post.comentarios.map(c => `<p><strong>${c.usuario}</strong> ${c.texto}</p>`).join('');

        card.innerHTML = `
            <div class="post-header">
                <div class="autor-box">
                    <div class="avatar-letra">${inicialAutor}</div>
                    <div>
                        <span class="autor-nome">${post.autor}</span>
                        <span class="post-meta">${post.categoria} • ${post.data}</span>
                    </div>
                </div>
                <span class="badge-tempo">⏱️ ${post.tempo}</span>
            </div>

            <div class="imagem-wrapper" ondblclick="curtirComDuploClique(${post.id}, this)">
                <img src="${post.imagem}" alt="${post.titulo}" class="post-imagem">
                <div class="coracao-animado">❤️</div>
            </div>

            <div class="post-acoes">
                <div class="acoes-esq">
                    <button class="btn-acao" onclick="alternarCurtida(${post.id})">${iconeCurtida}</button>
                    <button class="btn-acao" onclick="focarComentario(${post.id})">💬</button>
                </div>
                <button class="btn-acao" onclick="alternarSalvo(${post.id})" title="Salvar receita">${iconeSalvo}</button>
            </div>

            <div class="post-corpo">
                <div class="curtidas-texto">${post.curtidas} curtidas</div>
                <h2 class="post-titulo">${post.titulo}</h2>
                <p class="post-legenda">${post.legenda}</p>

                <details>
                    <summary>📖 Ver receita completa</summary>
                    <div class="receita-lista">
                        <h4>Ingredientes:</h4>
                        <ul>${htmlIngredientes}</ul>
                        <h4>Modo de Preparo:</h4>
                        <ol>${htmlPreparo}</ol>
                    </div>
                </details>

                <div class="comentarios-box">
                    <div class="lista-comentarios">${htmlComentarios}</div>
                    <form class="form-comentario" onsubmit="adicionarComentario(event, ${post.id})">
                        <input type="text" id="input-coment-${post.id}" placeholder="Adicione um comentário..." required>
                        <button type="submit">Publicar</button>
                    </form>
                </div>
            </div>
        `;

        feedContainer.appendChild(card);
    });
}

// Funções de Interação
window.alternarCurtida = function(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.curtido = !post.curtido;
    post.curtidas += post.curtido ? 1 : -1;
    salvarDados();
    renderizarFeed();
};

window.curtirComDuploClique = function(id, elemento) {
    const post = posts.find(p => p.id === id);
    const coracao = elemento.querySelector('.coracao-animado');
    
    coracao.classList.add('mostrar');
    setTimeout(() => coracao.classList.remove('mostrar'), 600);

    if (post && !post.curtido) {
        post.curtido = true;
        post.curtidas += 1;
        salvarDados();
        setTimeout(() => renderizarFeed(), 500);
    }
};

window.alternarSalvo = function(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.salvo = !post.salvo;
    salvarDados();
    renderizarFeed();
};

window.focarComentario = function(id) {
    const input = document.getElementById(`input-coment-${id}`);
    if (input) input.focus();
};

window.adicionarComentario = function(event, id) {
    event.preventDefault();
    const input = document.getElementById(`input-coment-${id}`);
    const texto = input.value.trim();
    if (!texto) return;

    const post = posts.find(p => p.id === id);
    post.comentarios.push({ usuario: "@voce", texto });
    salvarDados();
    renderizarFeed();
};

// Filtro pelos Stories
document.querySelectorAll('.story-item').forEach(story => {
    story.addEventListener('click', () => {
        document.querySelectorAll('.story-item').forEach(s => s.classList.remove('ativo'));
        story.classList.add('ativo');
        
        filtroCategoria = story.getAttribute('data-filtro');
        apenasSalvos = false;
        document.getElementById('btn-ver-salvos').classList.remove('ativo');
        renderizarFeed();
    });
});

// Botão de Ver Salvos
const btnVerSalvos = document.getElementById('btn-ver-salvos');
btnVerSalvos.addEventListener('click', () => {
    apenasSalvos = !apenasSalvos;
    btnVerSalvos.classList.toggle('ativo', apenasSalvos);
    renderizarFeed();
});

// Modal de Nova Postagem
const modal = document.getElementById('modal-post');
document.getElementById('btn-abrir-modal').addEventListener('click', () => modal.classList.remove('oculto'));
document.getElementById('btn-fechar-modal').addEventListener('click', () => modal.classList.add('oculto'));

document.getElementById('form-novo-post').addEventListener('submit', (e) => {
    e.preventDefault();

    let autor = document.getElementById('input-autor').value.trim();
    if (!autor.startsWith('@')) autor = '@' + autor;

    const novoPost = {
        id: Date.now(),
        autor: autor,
        categoria: document.getElementById('input-categoria').value,
        tempo: document.getElementById('input-tempo').value,
        data: "Agora mesmo",
