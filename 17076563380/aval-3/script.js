function mostrarSecao(idDoArticle, event) {
    if (event) event.preventDefault();

    // Pega todos os articles, o aviso de boas-vindas e os links do menu
    const articles = document.querySelectorAll('main article');
    const welcomeBox = document.getElementById('welcome-box');
    const links = document.querySelectorAll('nav a');

    // Esconde a mensagem inicial de boas-vindas com os botões
    welcomeBox.style.display = 'none';

    // Remove a classe 'active' de todos os articles e links
    articles.forEach(art => art.classList.remove('active'));
    links.forEach(l => l.classList.remove('active'));

    // Mostra apenas o article correspondente ao ID clicado
    const artigoSelecionado = document.getElementById(idDoArticle);
    if (artigoSelecionado) {
        artigoSelecionado.classList.add('active');
    }

    // Destaca o link correspondente na barra superior
    links.forEach(l => {
        if(l.getAttribute('href') === '#' + idDoArticle) {
            l.classList.add('active');
        }
    });

    // Rola suavemente para o topo do conteúdo principal em telas menores
    window.scrollTo({ top: 350, behavior: 'smooth' });
}

// Função para voltar à tela inicial (somente foto e os botões) ao clicar no logo
function voltarInicio(event) {
    event.preventDefault();
    const articles = document.querySelectorAll('main article');
    const welcomeBox = document.getElementById('welcome-box');
    const links = document.querySelectorAll('nav a');

    articles.forEach(art => art.classList.remove('active'));
    links.forEach(l => l.classList.remove('active'));
    
    welcomeBox.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}