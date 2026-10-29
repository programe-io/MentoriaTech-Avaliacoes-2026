// Banco de dados simulado dos vídeos do Vlog
const videosData = [
    {
        id: 1,
        title: "Ep. 08: Cruzando os Alpes Suíços de Moto",
        category: "Viagens",
        duration: "14:20",
        views: "45 mil visualizações",
        date: "Há 2 dias",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: 2,
        title: "Montando um Setup de Desenvolvimento Definitivo 2026",
        category: "Tecnologia",
        duration: "22:15",
        views: "89 mil visualizações",
        date: "Há 5 dias",
        thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: 3,
        title: "Rotina Matinal de Alta Performance: O Que Funciona",
        category: "Estilo de Vida",
        duration: "10:05",
        views: "31 mil visualizações",
        date: "Há 1 semana",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: 4,
        title: "Explorando as Ruínas Antigas na Costa Amalfitana",
        category: "Viagens",
        duration: "19:40",
        views: "62 mil visualizações",
        date: "Há 2 semanas",
        thumbnail: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: 5,
        title: "Inteligência Artificial na Prática: Criando Apps Locais",
        category: "Tecnologia",
        duration: "25:00",
        views: "112 mil visualizações",
        date: "Há 3 semanas",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: 6,
        title: "Minimalismo: Como Reduzir Distrações no Dia a Dia",
        category: "Estilo de Vida",
        duration: "11:50",
        views: "28 mil visualizações",
        date: "Há 1 mês",
        thumbnail: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
];

// Elementos do DOM
const videoGrid = document.getElementById('videoGrid');
const filterContainer = document.getElementById('filterContainer');
const modal = document.getElementById('videoModal');
const modalIframe = document.getElementById('modalIframe');
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// 1. Renderização dos Vídeos na Tela
function renderVideos(videosToRender) {
    videoGrid.innerHTML = '';
    
    if (videosToRender.length === 0) {
        videoGrid.innerHTML = `<p style="color: var(--text-secondary);">Nenhum vídeo encontrado nesta categoria.</p>`;
        return;
    }

    videosToRender.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="thumbnail-container">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <span class="tag-category">${video.category}</span>
                <span class="duration">${video.duration}</span>
            </div>
            <div class="video-details">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span><i class="fa-solid fa-eye"></i> ${video.views}</span>
                    <span>•</span>
                    <span>${video.date}</span>
                </div>
            </div>
        `;
        
        // Evento para abrir o modal com o vídeo específico
        card.addEventListener('click', () => abrirModal(video.url));
        videoGrid.appendChild(card);
    });
}

// 2. Sistema de Filtros por Categoria
filterContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        // Remove a classe active de todos os botões e adiciona no clicado
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

        if (filterValue === 'all') {
            renderVideos(videosData);
        } else {
            const filtered = videosData.filter(v => v.category === filterValue);
            renderVideos(filtered);
        }
    }
});

// 3. Controle do Modal
function abrirModal(url) {
    modalIframe.src = url;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
}

function fecharModal() {
    modal.style.display = 'none';
    modalIframe.src = '';
    document.body.style.overflow = 'auto';
}

// Fecha o modal ao clicar fora da área interna
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        fecharModal();
    }
});

// 4. Alternância de Tema (Dark / Light) com Persistência
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = htmlElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

// Inicializa a aplicação carregando todos os vídeos
document.addEventListener('DOMContentLoaded', () => {
    renderVideos(videosData);
});