// Banco de dados simulado de publicações viralizadas de unhas
const postsData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
        likes: 148920,
        liked: false,
        viral: true,
        caption: "Baby Boomer translúcido com microbrilhos pérola ✨ Aquele efeito naturalidade que parece que nasceu assim! Qual nota de 0 a 10 para essa delicadeza? 🌸💅",
        comments: [
            { user: "camila.coutinho", text: "Simplesmente a perfeição em forma de unha! 😍" },
            { user: "marina.ruy", text: "Que acabamento impecável, zero marcação 💕" },
            { user: "studio.bella", text: "Minha maior inspiração na mesa todos os dias!" }
        ]
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
        likes: 94310,
        liked: false,
        viral: false,
        caption: "Francesinha sorriso ultrafina em rosa quartzo 💖 Elegância atemporal para as apaixonadas por clássicos.",
        comments: [
            { user: "julia.almeida", text: "Quero exatamente assim no meu horário de sexta!" },
            { user: "nailart.brasil", text: "Essa curvatura C está surreal 👏✨" }
        ]
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
        likes: 215400,
        liked: false,
        viral: true,
        caption: "Especial Noivas 2026 👰🏻‍♀️✨ Efeito Glazed Donut rosado com aplicação de folhas de ouro rosé. Marca a amiga que vai casar e precisa salvar essa inspiração!",
        comments: [
            { user: "noivas.luxo", text: "Viralizou com razão! Coisa mais linda do mundo 💍" },
            { user: "bianca.andrade", text: "Chocada com esse brilho espelhado!" },
            { user: "fernanda.lima", text: "Salvei na minha pastinha agora mesmo 🌸" }
        ]
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
        likes: 67850,
        liked: false,
        viral: false,
        caption: "Formato Amendoado (Almond) com esmaltação em gel rosa milkshake 🍓 Cuticulagem combinada impecável.",
        comments: [
            { user: "larissa.manoela", text: "Essa cor é tudo! Qual o nome do esmalte?" },
            { user: "lumierenails.atelier", text: "@larissa.manoela É a misturinha Pink Silk da nossa coleção 💕" }
        ]
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=800&q=80",
        likes: 112600,
        liked: false,
        viral: true,
        caption: "Minimalismo chique: pontos de luz em cristais Swarovski sobre base nude rosada 💎 Menos é sempre mais!",
        comments: [
            { user: "patricia.poeta", text: "Delicadeza define o trabalho de vocês ✨" },
            { user: "amanda.nails", text: "Como faz para a pedrinha não cair? Dura muito?" }
        ]
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        likes: 83920,
        liked: false,
        viral: false,
        caption: "Manutenção de 30 dias sem nenhum descolamento! ✨ Técnica exclusiva de aderência e saúde da lâmina natural.",
        comments: [
            { user: "carol.peixinho", text: "Melhor investimento que faço todo mês 💖" },
            { user: "gabriela.pugliesi", text: "Qualidade impecável!" }
        ]
    }
];

const photoGrid = document.getElementById('photoGrid');
const postModal = document.getElementById('postModal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalCommentsList = document.getElementById('modalCommentsList');
const modalLikesCount = document.getElementById('modalLikesCount');
const modalLikeBtn = document.getElementById('modalLikeBtn');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const followBtn = document.getElementById('followBtn');

let currentPostIndex = null;

// Formata números grandes (ex: 148920 -> 148,9 mil)
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace('.', ',') + ' mi';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.', ',') + ' mil';
    }
    return num.toLocaleString('pt-BR');
}

// Renderiza a grade de fotos
function renderGrid() {
    photoGrid.innerHTML = '';
    postsData.forEach((post, index) => {
        const item = document.createElement('div');
        item.className = 'grid-item';
        item.innerHTML = `
            <img src="${post.image}" alt="Unhas decoradas ${index + 1}">
            ${post.viral ? '<span class="viral-badge"><i class="fa-solid fa-fire"></i> Viral</span>' : ''}
            <div class="grid-overlay">
                <span><i class="fa-solid fa-heart"></i> ${formatNumber(post.likes)}</span>
                <span><i class="fa-solid fa-comment"></i> ${post.comments.length}</span>
            </div>
        `;
        item.addEventListener('click', () => openPostModal(index));
        photoGrid.appendChild(item);
    });
}

// Abre o modal da foto clicada
function openPostModal(index) {
    currentPostIndex = index;
    const post = postsData[index];
    
    modalImg.src = post.image;
    updateModalLikes(post);
    renderComments(post);
    
    postModal.style.display = 'flex';
}

// Atualiza visual do botão de curtir e contador no modal
function updateModalLikes(post) {
    modalLikesCount.textContent = `${post.likes.toLocaleString('pt-BR')} curtidas`;
    if (post.liked) {
        modalLikeBtn.classList.add('liked');
        modalLikeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        modalLikeBtn.classList.remove('liked');
        modalLikeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
}

// Renderiza legenda + comentários dentro do modal
function renderComments(post) {
    modalCommentsList.innerHTML = `
        <div class="comment-item">
            <strong>lumierenails.atelier</strong> ${post.caption}
        </div>
        <hr style="border: 0; border-top: 1px solid #F3D9E0;">
    `;

    post.comments.forEach(c => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.innerHTML = `<strong>${c.user}</strong> ${c.text}`;
        modalCommentsList.appendChild(div);
    });
}

// Evento de curtir dentro do modal
modalLikeBtn.addEventListener('click', () => {
    if (currentPostIndex === null) return;
    const post = postsData[currentPostIndex];
    
    if (post.liked) {
        post.likes--;
        post.liked = false;
    } else {
        post.likes++;
        post.liked = true;
    }
    
    updateModalLikes(post);
    renderGrid();
});

// Adicionar novo comentário
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (currentPostIndex === null) return;
    
    const text = commentInput.value.trim();
    if (!text) return;

    postsData[currentPostIndex].comments.push({
        user: "voce.vip",
        text: text
    });

    commentInput.value = '';
    renderComments(postsData[currentPostIndex]);
    renderGrid();
});

// Botão de Seguir interativo
followBtn.addEventListener('click', () => {
    if (followBtn.classList.contains('following')) {
        followBtn.classList.remove('following');
        followBtn.textContent = 'Seguir';
    } else {
        followBtn.classList.add('following');
        followBtn.textContent = 'Seguindo ✓';
    }
});

// Fechar modal
closeModal.addEventListener('click', () => {
    postModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === postModal) {
        postModal.style.display = 'none';
    }
});

// Inicializa a grade
renderGrid();