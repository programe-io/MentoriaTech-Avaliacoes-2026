/**
 * Altera a aba ativa do blog (Sobre o Jogo / Imagens)
 * @param {string} aba - O identificador da aba ('sobre' ou 'imagens')
 */
function mudarAba(aba) {
    // Captura os containers de conteúdo
    const conteudoSobre = document.getElementById('conteudo-sobre');
    const conteudoImagens = document.getElementById('conteudo-imagens');
    
    // Captura os botões da barra de navegação
    const btnSobre = document.getElementById('btn-sobre');
    const btnImagens = document.getElementById('btn-imagens');

    // Remove as classes ativas de ambos
    conteudoSobre.classList.remove('ativa');
    conteudoImagens.classList.remove('ativa');
    btnSobre.classList.remove('ativo');
    btnImagens.classList.remove('ativo');

    // Ativa a aba selecionada e rola suavemente para o topo do conteúdo
    if (aba === 'sobre') {
        conteudoSobre.classList.add('ativa');
        btnSobre.classList.add('ativo');
    } else if (aba === 'imagens') {
        conteudoImagens.classList.add('ativa');
        btnImagens.classList.add('ativo');
    }
    
    // Pequeno ajuste para melhorar a experiência em telas mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
}