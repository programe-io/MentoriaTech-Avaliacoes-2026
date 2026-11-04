// Banco de dados simples de posts para exibição no modal
const articlesData = {
    post1: {
        title: "O Poder do Desenvolvimento Web Simples",
        tag: "Tecnologia",
        date: "04 de Novembro, 2026",
        content: `
            <p>Muitas vezes nos perdemos em meio a tantos frameworks e bibliotecas complexas. Mas você já se perguntou o quanto consegue construir usando apenas HTML, CSS e JavaScript puros?</p>
            <br>
            <p>Escrever código sem dependências pesadas garante que seu site carregue instantaneamente, funcione bem em dispositivos mais fracos e seja extremamente fácil de manter.</p>
            <br>
            <p>Além disso, dominar a base antes de migrar para ferramentas modernas torna você um desenvolvedor muito mais preparado para resolver problemas reais.</p>
        `
    },
    post2: {
        title: "Princípios de Design Minimalista na Web",
        tag: "Design",
        date: "02 de Novembro, 2026",
        content: `
            <p>O minimalismo não é sobre a ausência de elementos, mas sim sobre a presença das coisas certas. Descubra como aplicar o conceito de 'menos é mais' na sua interface.</p>
            <br>
            <p>Para aplicar o minimalismo com sucesso, foque em 3 pilares:</p>
            <br>
            <ul>
                <li><strong>Espaçamento adequado:</strong> Dê espaço para os elementos respirarem.</li>
                <li><strong>Tipografia clara:</strong> Escolha fontes legíveis e estabeleça hierarquia visual.</li>
                <li><strong>Cores intencionais:</strong> Use cores de destaque apenas para chamar atenção a botões ou links importantes.</li>
            </ul>
        `
    },
    post3: {
        title: "Como Organizar seu Código sem Complicação",
        tag: "Produtividade",
        date: "28 de Outubro, 2026",
        content: `
            <p>Manter a estrutura de pastas organizada e aplicar boas práticas desde o início salva horas de depuração e facilita a manutenção do seu projeto no futuro.</p>
            <br>
            <p>Separe as responsabilidades: mantenha seu HTML focado na estrutura, o CSS no estilo e o JavaScript no comportamento do usuário. Essa separação em 3 arquivos limpos torna qualquer manutenção rápida e previsível.</p>
        `
    }
};

// --- Alternador de Tema (Dark / Light Mode) ---
const themeToggleBtn = document.getElementById('theme-toggle');

// Carrega tema salvo ou padrão do sistema
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// --- Controle do Modal de Leitura ---
const modal = document.getElementById('post-modal');
const modalBody = document.getElementById('modal-body');

function openPost(postId) {
    const post = articlesData[postId];
    if (!post) return;

    modalBody.innerHTML = `
        <div class="card-meta" style="margin-top: 10px;">
            <span class="tag">${post.tag}</span>
            <span class="date">${post.date}</span>
        </div>
        <h1 style="margin: 15px 0; font-size: 1.6rem;">${post.title}</h1>
        <div style="line-height: 1.7; color: var(--text-primary);">
            ${post.content}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Impede rolagem ao fundo
}

function closePost() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaura rolagem
}

// Fechar modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closePost();
    }
});