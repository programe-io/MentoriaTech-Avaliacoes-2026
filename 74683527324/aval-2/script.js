
// Dados dos demais posts com imagens focadas em FPS (Competitivo) e Jogos Indies (Retrô/Console)
const postsData = [
    {
        title: "Análise: O Novo Campeão dos FPS",
        imgUrl: "https://unsplash.com",
        imgAlt: "Pessoa jogando um jogo competitivo de tiro em um computador de alta performance",
        excerpt: "Gráficos realistas e jogabilidade tática. Vale a pena investir seu tempo no shooter do momento?"
    },
    {
        title: "Top 5 Jogos Indies para Jogar no Fim de Semana",
        imgUrl: "https://unsplash.com",
        imgAlt: "Prateleira com consoles clássicos, controles antigos e referências à cultura pop e jogos independentes",
        excerpt: "Separamos as melhores obras de estúdios independentes que trazem histórias profundas e mecânicas inovadoras."
    }
];

function carregarPosts() {
    const container = document.getElementById('posts-container');
    
    postsData.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post-card');
        
        article.innerHTML = `
            <img src="${post.imgUrl}" alt="${post.imgAlt}" class="post-img">
            <div class="post-content">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-text">${post.excerpt}</p>
                <a href="#" class="read-more">Ler Mais</a>
            </div>
        `;
        
        container.appendChild(article);
    });
}

window.onload = carregarPosts;
