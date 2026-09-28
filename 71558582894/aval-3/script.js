// Base de dados de postagens do consultório pediátrico
const posts = [
    {
        id: 1,
        title: "A importância da Puericultura no primeiro ano de vida",
        category: "desenvolvimento",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
        description: "As consultas mensais de rotina nos primeiros 12 meses são essenciais para monitorar o crescimento, ganho de peso, marcos motores e orientar sobre a introdução alimentar com segurança."
    },
    {
        id: 2,
        title: "Como introduzir novos alimentos sem estresse?",
        category: "dicas",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600",
        description: "A partir dos 6 meses, o bebê pode iniciar a papinha principal de forma amassada e colorida. Tenha paciência: o bebê está descobrindo novas texturas, sabores e cheiros!"
    },
    {
        id: 3,
        title: "Calendário de Vacinação Atualizado 2026",
        category: "pediatria",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600",
        description: "Mantenha a caderneta de vacinação sempre em dia. As vacinas protegem contra infecções graves e são o pilar mais importante da imunidade infantil coletiva."
    },
    {
        id: 4,
        title: "Sono Infantil: O que esperar em cada fase?",
        category: "desenvolvimento",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600",
        description: "O ritmo do sono muda bastante conforme a criança cresce. Criar uma rotina relaxante antes de dormir ajuda o cérebro do pequeno a entender que chegou a hora do descanso."
    }
];

// Elementos do DOM
const feedContainer = document.getElementById('feedContainer');
const filterChips = document.querySelectorAll('.filter-chip');
const openModalBtn = document.getElementById('openModalBtn');
const appointmentModal = document.getElementById('appointmentModal');
const closeModal = document.getElementById('closeModal');
const overlay = document.getElementById('overlay');
const appointmentForm = document.getElementById('appointmentForm');

// Renderizar Feed
function renderFeed(filter = 'all') {
    feedContainer.innerHTML = '';
    
    const filteredPosts = filter === 'all' 
        ? posts 
        : posts.filter(p => p.category === filter);

    if (filteredPosts.length === 0) {
        feedContainer.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 30px 0;">Nenhuma postagem encontrada nesta categoria.</p>';
        return;
    }

    filteredPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-user">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100" alt="Dra. Pediatra">
                    <div class="post-user-info">
                        <h4>Dra. Ana Beatriz</h4>
                        <span>Pediatra • CRM 12345</span>
                    </div>
                </div>
                <i class="fa-solid fa-shield-heart" style="color: var(--accent); font-size: 1.1rem;"></i>
            </div>
            <div class="post-image-container">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-actions">
                <div class="post-actions-left">
                    <button onclick="toggleLike(this)"><i class="fa-regular fa-heart"></i></button>
                    <button onclick="alert('Compartilhe esta orientação com outros pais!')"><i class="fa-regular fa-share-from-square"></i></button>
                </div>
                <button onclick="alert('Dica salva com sucesso nos seus favoritos!')"><i class="fa-regular fa-bookmark"></i></button>
            </div>
            <div class="post-content">
                <div class="post-title-highlight">${post.title}</div>
                <div class="post-desc">${post.description}</div>
            </div>
        `;
        feedContainer.appendChild(postCard);
    });
}

// Filtros de Categoria
filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.getAttribute('data-filter');
        renderFeed(filter);
    });
});

// Curtir Post
function toggleLike(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = '#e53e3e';
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = 'inherit';
    }
}

// Controle do Modal
openModalBtn.addEventListener('click', () => {
    appointmentModal.classList.add('open');
    overlay.classList.add('open');
});

closeModal.addEventListener('click', () => {
    appointmentModal.classList.remove('open');
    overlay.classList.remove('open');
});

overlay.addEventListener('click', () => {
    appointmentModal.classList.remove('open');
    overlay.classList.remove('open');
});

// Envio do Formulário de Consulta
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const resp = document.getElementById('respName').value;
    const child = document.getElementById('childInfo').value;
    
    alert(`Solicitação enviada com sucesso, ${resp}! Entraremos em contato para confirmar a consulta de ${child}.`);
    
    appointmentForm.reset();
    appointmentModal.classList.remove('open');
    overlay.classList.remove('open');
});

// Inicialização
renderFeed();