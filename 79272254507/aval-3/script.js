// ==========================================================================
// 1. BANCO DE DADOS SIMULADO (Array de Objetos)
// ==========================================================================
const usuarios = [
    { nome: "João", local: "São Paulo, Brazil", foto: "https://unsplash.com" },
    { nome: "Carlos", local: "Rio de Janeiro, Brazil", foto: "https://unsplash.com" },
    { nome: "Maria", local: "Lisboa, Portugal", foto: "https://unsplash.com" },
    { nome: "Lucas", local: "Buenos Aires, Argentina", foto: "https://unsplash.com" },
    { nome: "Ana", local: "Nova York, USA", foto: "https://unsplash.com" }
];

// ==========================================================================
// 2. FUNÇÃO PARA RENDERIZAR OS STORIES
// ==========================================================================
function renderizarStories() {
    const storiesScroll = document.getElementById("stories-scroll");

    usuarios.forEach(usuario => {
        // Criar o contêiner do story
        const storyContainer = document.createElement("div");
        storyContainer.classList.add("story-container");

        // Montar a estrutura HTML interna idêntica à da aula anterior usando Template Literals
        storyContainer.innerHTML = `
            <div class="avatar-circle size-16 ring-gradient">
                <div class="avatar-inner-bg">
                    <img src="${usuario.foto}" alt="Perfil ${usuario.nome}" class="avatar-img">
                </div>
            </div>
            <span class="story-name">${usuario.nome}</span>
        `;

        // Injetar o elemento dentro da seção de rolagem
        storiesScroll.appendChild(storyContainer);
    });
}

// ==========================================================================
// 3. FUNÇÃO PARA RENDERIZAR O FEED DE POSTAGENS
// ==========================================================================
function renderizarFeed() {
    const feedContainer = document.getElementById("feed-container");

    usuarios.forEach(usuario => {
        // Criar o elemento HTML <article> para a postagem
        const postArticle = document.createElement("article");
        postArticle.classList.add("card", "post-article");

        // Montar a estrutura do post reaproveitando as classes CSS tradicionais
        postArticle.innerHTML = `
            <div class="post-header">
                <div class="post-author flex-row">
                    <!-- Reaproveitamento do círculo modificado para tamanho 10 -->
                    <div class="avatar-circle size-10 ring-gradient">
                        <div class="avatar-inner-bg">
                            <img src="${usuario.foto}" alt="Perfil Autor" class="avatar-img">
                        </div>
                    </div>
                    <div class="author-details">
                        <span class="author-username">${usuario.nome}</span>
                        <span class="author-meta">${usuario.local}</span>
                    </div>
                </div>
                <button class="btn-options">
                    <i class="bx bx-dots-horizontal-rounded"></i>
                </button>
            </div>
            <!-- Espaço para a mídia da postagem -->
            <div class="post-media-box">
                <i class="bx bx-image"></i>
            </div>
        `;

        // Adicionar o post gerado na coluna do feed
        feedContainer.appendChild(postArticle);
    });
}

// ==========================================================================
// 4. EXECUÇÃO AUTOMÁTICA AO CARREGAR A PÁGINA
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    renderizarStories();
    renderizarFeed();
});
