function mostrarSecao(idSecao, elementoClicado) {
    // Esconde todas as seções
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach(secao => secao.classList.remove('ativa'));

    // Remove a classe 'active' de todos os links do menu
    const botoes = document.querySelectorAll('.btn-nav');
    botoes.forEach(btn => btn.classList.remove('active'));

    // Mostra a seção selecionada e destaca o botão ativo
    document.getElementById(idSecao).classList.add('ativa');
    elementoClicado.classList.add('active');
}