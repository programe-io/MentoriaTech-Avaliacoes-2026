// Dados dos Posts do Blog
const blogPosts = [
    {
        id: 1,
        title: "Como é ser adolescente e programador em Teresina",
        category: "Rotina",
        date: "20 Out, 2026",
        icon: "fa-code",
        excerpt: "Contando um pouco da minha rotina estudando programação no calor do Piauí e equilibrando a escola com os códigos...",
        content: `
            <p>Morar em Teresina tem seus desafios, especialmente quando o termômetro passa dos 40°C, mas isso nunca me impediu de focar nos meus objetivos com a tecnologia.</p>
            <p>Com 16 anos, comecei a pesquisar sobre desenvolvimento web por puro hobby. O que era curiosidade virou paixão quando criei minha primeira página em HTML pura. Desde então, não parei mais de aprender.</p>
            <p>Equilibrar as provas do colégio com o estudo de JavaScript e design responsivo exige disciplina, mas cada linha de código que funciona faz tudo valer a pena!</p>
        `
    },
    {
        id: 2,
        title: "Meus primeiros passos com HTML, CSS e JavaScript",
        category: "Desenvolvimento",
        date: "15 Out, 2026",
        icon: "fa-laptop-code",
        excerpt: "Dicas essenciais para quem tem 15 ou 16 anos e quer começar a criar sites do zero sem complicação.",
        content: `
            <p>Muita gente me pergunta por onde começar na programação. Minha resposta é sempre a mesma: domine os fundamentos da web!</p>
            <p><strong>HTML</strong> é a estrutura, o esqueleto de tudo. <strong>CSS</strong> é o estilo, a parte que deixa o site bonito e com a nossa cara. E o <strong>JavaScript</strong> traz a interatividade, fazendo as coisas acontecerem.</p>
            <p>Não pule etapas! Pratique criando projetos simples, como uma calculadora, uma lista de tarefas ou um blog pessoal igual a este.</p>
        `
    },
    {
        id: 3,
        title: "Rotina de estudos: Foco, música lofi e café gelado",
        category: "Lifestyle",
        date: "08 Out, 2026",
        icon: "fa-mug-hot",
        excerpt: "Como eu organizo meu tempo de estudos de programação e o que me ajuda a manter a concentração.",
        content: `
            <p>Com o calor que faz aqui em Teresina, café gelado ou um bom suco natural viraram essenciais na mesa de estudos.</p>
            <p>Para render bem nos códigos, gosto de colocar meus fones de ouvido, ligar uma playlist de lofi hip hop e separar blocos de tempo usando a técnica Pomodoro.</p>
            <p>A consistência é muito mais importante do que estudar 10 horas em um único dia e cansar. Um pouco todo dia gera resultados incríveis a longo prazo.</p>
        `
    }
];

// Alternar Tema (Dark / Light)
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Verificar preferência salva
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-moon';
    } else {
        themeIcon.className = 'fa-solid fa-sun';
    }
}

// Renderizar Posts no Grid
const postsContainer = document.getElementById('postsContainer');

function renderPosts() {
    postsContainer.innerHTML = blogPosts.map(post => `
        <article class="post-card" onclick="openPostModal(${post.id})">
            <div class="post-image">
                <i class="fa-solid ${post.icon}"></i>
            </div>
            <div class="post-body">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span>${post.date}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="read-more">
                    Ler artigo <i class="fa-solid fa-arrow-right" style="font-size: 0.8rem;"></i>
                </div>
            </div>
        </article>
    `).join('');
}

// Lógica do Modal
const postModal = document.getElementById('postModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDate = document.getElementById('modalDate');
const modalContent = document.getElementById('modalContent');

window.openPostModal = function(id) {
    const post = blogPosts.find(p => p.id === id);
    if (post) {
        modalTitle.textContent = post.title;
        modalCategory.textContent = post.category;
        modalDate.textContent = post.date;
        modalContent.innerHTML = post.content;
        postModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

function closeModal() {
    postModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeModalBtn.addEventListener('click', closeModal);
postModal.addEventListener('click', (e) => {
    if (e.target === postModal) {
        closeModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Inicializar
renderPosts();