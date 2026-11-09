// --- FILTRAR GRELHA ATRAVÉS DOS STORIES DE DESTAQUE ---
function filterGrid(category) {
    const gridItems = document.querySelectorAll('.grid-item');
    const highlightCircles = document.querySelectorAll('.highlight-item');

    gridItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// --- CLIQUE PARA BOTÃO SEGUIR ---
function followToggle(button) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        button.textContent = "A Seguir";
    } else {
        button.textContent = "Seguir";
    }
}

// --- MAPEAMENTO DE CORES DOS GRADIENTES PARA O MODAL ---
const gradientMap = {
    'post1': { bg: 'linear-gradient(135deg, #ff0055, #ff5500)', emoji: '🔥', title: 'Introdução Web' },
    'post2': { bg: 'linear-gradient(135deg, #00ff55, #00aa55)', emoji: '🌿', title: 'Internet Viva' },
    'post3': { bg: 'linear-gradient(135deg, #ffdf00, #ff5500)', emoji: '💎', title: 'História Cyber' },
    'post4': { bg: 'linear-gradient(135deg, #00f0ff, #0044ff)', emoji: '🌐', title: 'Infraestrutura' },
    'post5': { bg: 'linear-gradient(135deg, #cc00ff, #7700aa)', emoji: '🎵', title: 'Internet vs Web' },
    'post6': { bg: 'linear-gradient(135deg, #00ffaa, #008855)', emoji: '🌊', title: 'Sistemas Web' }
};

// --- ABRIR POST DO INSTAGRAM (MODAL DETALHADO) ---
function openModal(postId) {
    // 1. Puxa a legenda da base oculta
    const textSrc = document.getElementById(postId).innerHTML;
    document.getElementById('modalTextTarget').innerHTML = textSrc;

    // 2. Configura o lado visual baseado no mapeamento
    const data = gradientMap[postId];
    const visualSide = document.getElementById('modalGradientBg');
    visualSide.style.background = data.bg;
    document.getElementById('modalFairyEmoji').textContent = data.emoji;
    document.getElementById('modalVisualTitle').textContent = data.title;

    // 3. Exibe o modal na tela
    document.getElementById('postModal').style.display = 'flex';
}

function closeModal(event) {
    // Fecha apenas clicando fora da caixa de conteúdo
    if (event.target.id === 'postModal') {
        document.getElementById('postModal').style.display = 'none';
    }
}
