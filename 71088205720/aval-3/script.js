// ============================================================================
// 1. ALTERNAR TEMA (DARK MODE) COM CRIAÇÃO DINÂMICA DE BOTÃO
// ============================================================================
const botaoTema = document.createElement('button');
botaoTema.innerText = '🌓 Alternar Tema';
botaoTema.style.cssText = `
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    background-color: #764ba2;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
    width: 100%;
`;

// Insere o botão de tema logo acima do rodapé (footer)
const card = document.querySelector('.card');
const footer = document.querySelector('footer');
card.insertBefore(botaoTema, footer);

// Lógica de inversão de cores para Modo Escuro
botaoTema.addEventListener('click', () => {
    const titulo = document.querySelector('h1');
    const paragrafoArticulo = document.querySelector('article p');
    const linksNav = document.querySelectorAll('nav a');
    const blocoNav = document.querySelector('nav');

    if (card.style.backgroundColor === 'rgb(51, 51, 51)') {
        // Restaurar Modo Claro
        card.style.backgroundColor = '#ffffff';
        titulo.style.color = '#333333';
        paragrafoArticulo.style.color = '#666666';
        blocoNav.style.background = '#f4f7f6';
        linksNav.forEach(link => link.style.color = '#764ba2');
        botaoTema.style.backgroundColor = '#764ba2';
    } else {
        // Ativar Modo Escuro
        card.style.backgroundColor = '#333333';
        titulo.style.color = '#ffffff';
        paragrafoArticulo.style.color = '#cccccc';
        blocoNav.style.background = '#444444';
        linksNav.forEach(link => link.style.color = '#bb99ff');
        botaoTema.style.backgroundColor = '#667eea';
    }
});

// ============================================================================
// 2. INTERATIVIDADE NA NAVEGAÇÃO (LINKS COMPORTAMENTAIS)
// ============================================================================
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', (event) => {
        // Remove o destaque de todos os links
        links.forEach(l => l.style.textDecoration = 'none');
        // Aplica o sublinhado apenas no link clicado
        event.target.style.textDecoration = 'underline';
    });
});

// ============================================================================
// 3. EFEITO VISUAL E EVENTO NA IMAGEM
// ============================================================================
const imagem = document.querySelector('img');
if (imagem) {
    imagem.style.cursor = 'pointer';
    imagem.addEventListener('click', () => {
        alert('Você clicou na imagem do artigo! Esta janela de alerta foi disparada via JavaScript.');
    });
}
