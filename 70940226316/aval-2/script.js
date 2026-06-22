// Banco de Dados de Posts - Edição Status do Dia (Vibe Instagram)
const postsData = [
    {
        id: 1,
        title: "07:00 AM // Expectativa vs. Realidade 🎬",
        tag: "Rotina",
        excerpt: "O alarme toca. A meta era levantar pra vencer na vida, mas a história foi outra...",
        content: "O alarme tocou no horário certo. A meta era acordar, fazer um scrolling rápido de 5 minutos e levantar para dominar o mundo. O que aconteceu na realidade: cancelei 4 alarmes seguidos, fingi que não tinha nenhuma obrigação no universo e usei a técnica milenar de ficar olhando fixamente para o teto por 15 minutos pensando em absolutamente nada. Quem nunca?",
        date: "Hoje",
        readTime: "1 min de leitura",
        img: "https://images.unsplash.com/photo-1511289081367-46c54b342225?w=600&auto=format&fit=crop&q=60" // Foto de acordando/cama
    },
    {
        id: 2,
        title: "10:00 AM // A Estética do Caos ☕✨",
        tag: "Mood",
        excerpt: "Aquela foto clássica do caderno aberto e a xícara de café para fingir que tá tudo sob controle.",
        content: "Cenário perfeito para os Stories: o caderno aberto em uma página limpa, uma caneta bonita posicionada milimetricamente de lado e uma xícara estilosa cheia de café bem quente. Por trás das câmeras: 47 abas abertas no navegador, duas notificações de erro no código e a mente trabalhando a mil por hora. Foco, força e café... principalmente café!",
        date: "Hoje",
        readTime: "2 min de leitura",
        img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=60" // Foto de café aesthetics
    },
    {
        id: 3,
        title: "04:00 PM // A Bateria Social Zerou 📉",
        tag: "Alerta",
        excerpt: "Aquela hora do dia em que sua energia vai embora e esquece de te avisar.",
        content: "Bateu o Modo Avião na vida real. Sabe aquela hora da tarde em que você descobre que está olhando para a parede há dez minutos sem piscar? A bateria social zerou, os e-mails parecem estar escritos em grego e a única coisa que seu cérebro processa é o desejo de sumir por algumas horas. O estoque de paciência foi com Deus.",
        date: "Hoje",
        readTime: "1 min de leitura",
        img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&auto=format&fit=crop&q=60" // Foto de exaustão/computador
    },
    {
        id: 4,
        title: "10:00 PM // De Cria na Cama (Só mais um vídeo) 🌙",
        tag: "Madrugada",
        excerpt: "Luz apagada, tela no rosto e uma promessa que os dois sabemos que é mentira.",
        content: "O quarto está completamente escuro, iluminado apenas pelo brilho azul do celular direto no rosto. A promessa interna é clássica: 'só vou ver mais esse Reels/TikTok e vou dormir'. Corta para: 2:30 da manhã e você assistindo a um tutorial de como restaurar um machado medieval enferrujado ou teorias da conspiração sobre o espaço. Amanhã eu sofro as consequências.",
        date: "Hoje",
        readTime: "2 min de leitura",
        img: "https://images.unsplash.com/photo-1554178286-db408c69260a?w=600&auto=format&fit=crop&q=60" // Foto de celular no escuro
    }
];

// --- SISTEMA LOGÍSTICO DO BLOG (BUSCA, MODAL E TEMA) ---
const postsContainer = document.getElementById('posts-container');
const searchInput = document.getElementById('search-input');
const themeToggleBtn = document.getElementById('theme-toggle');
const icon = themeToggleBtn.querySelector('i');
const modal = document.getElementById('post-modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.querySelector('.close-modal');

function renderPosts(posts) {
    postsContainer.innerHTML = '';
    if(posts.length === 0) {
        postsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted)">Nenhum status encontrado para essa busca... 📭</p>`;
        return;
    }
    posts.forEach(post => {
        const card = document.createElement('article');
        card.classList.add('post-card');
        card.innerHTML = `
            <div class="post-img" style="background-image: url('${post.img}');"></div>
            <div class="post-content">
                <span class="post-tag">${post.tag}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                    <span><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openPostModal(post));
        postsContainer.appendChild(card);
    });
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPosts = postsData.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.tag.toLowerCase().includes(searchTerm)
    );
    renderPosts(filteredPosts);
});

function openPostModal(post) {
    modalBody.innerHTML = `
        <span class="post-tag">${post.tag}</span>
        <h1 style="margin-bottom: 10px;">${post.title}</h1>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
            <span style="margin-right: 15px;"><i class="fa-regular fa-calendar"></i> ${post.date}</span>
            <span><i class="fa-regular =fa-clock"></i> ${post.readTime}</span>
        </div>
        <div class="modal-img" style="background-image: url('${post.img}')"></div>
        <p style="font-size: 1.1rem; line-height: 1.8; margin-top: 20px;">${post.content}</p>
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Tema Dark/Light
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
}
themeToggleBtn.addEventListener('click', () => {
    let theme = 'light';
    if (document.body.getAttribute('data-theme') !== 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        theme = 'dark';
    } else {
        document.body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
    localStorage.setItem('theme', theme);
});

document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inscrição confirmada! 🫡');
    e.target.reset();
});

// Inicializar
renderPosts(postsData);