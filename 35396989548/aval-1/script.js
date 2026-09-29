document.addEventListener('DOMContentLoaded', () => {
    // Inicializa as funcionalidades da página
    initInteracaoContato();
    initNavegacaoSuave();
});

/**
 * Gerencia a interação do botão de saudação na seção de contato
 */
function initInteracaoContato() {
    const botao = document.getElementById('btn-interacao');
    const mensagem = document.getElementById('mensagem-retorno');

    // Validação defensiva para garantir que os elementos existem
    if (!botao || !mensagem) return;

    botao.addEventListener('click', () => {
        const horaAtual = new Date().getHours();
        const saudacao = obterSaudacao(horaAtual);

        // Define o texto da mensagem
        mensagem.textContent = `${saudacao} Obrigado por conferir meu portfólio. Bora codar! 🚀`;
        
        // Adiciona classe para gatilho da animação no CSS
        mensagem.classList.add('ativa');

        // Desativa o botão atualizando acessibilidade (o CSS tratará o visual via :disabled)
        botao.disabled = true;
        botao.setAttribute('aria-disabled', 'true');
    });
}

/**
 * Retorna uma saudação personalizada com base na hora do dia
 * @param {number} hora - Hora no formato 24h (0-23)
 * @returns {string} Saudação apropriada
 */
function obterSaudacao(hora) {
    if (hora >= 5 && hora < 12) {
        return 'Bom dia!';
    }
    if (hora >= 12 && hora < 18) {
        return 'Boa tarde!';
    }
    return 'Boa noite!';
}

/**
 * Adiciona suporte a rolagem suave ao clicar nos links internos da navegação
 */
function initNavegacaoSuave() {
    const linksNav = document.querySelectorAll('header nav a[href^="#"]');

    linksNav.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const idDestino = link.getAttribute('href');
            const secaoDestino = document.querySelector(idDestino);

            if (secaoDestino) {
                secaoDestino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}