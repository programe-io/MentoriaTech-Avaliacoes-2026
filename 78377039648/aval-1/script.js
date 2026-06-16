/**
 * Blog de Velozes e Furiosos - Lógica Front-End
 * Desenvolvido com JavaScript Vanilla (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização de módulos
    initMenuTracker();
    initArticleActions();
});

/**
 * Gerencia a ativação de classes do menu baseado na rolagem (Scroll)
 */
function initMenuTracker() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // Offset do header fixo

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('header__menu-link--active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('header__menu-link--active');
            }
        });
    });
}

/**
 * Manipulação de eventos dos botões dos artigos
 */
function initArticleActions() {
    const articleButtons = document.querySelectorAll('.card__button');

    articleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const articleId = event.target.getAttribute('data-article');
            handleReadMore(articleId);
        });
    });
}

/**
 * Controla o fluxo de leitura do artigo (Simulação de abertura)
 * @param {string} id - Identificador do artigo clicado
 */
function handleReadMore(id) {
    // Implementação resiliente e expansível
    console.log(`Carregando artigo ID: ${id}`);
    
    // Feedback visual temporário simulando o comportamento assíncrono
    alert(`O Nitro foi ativado! O artigo completo de ID ${id} será carregado em breve na sua tela.`);
}