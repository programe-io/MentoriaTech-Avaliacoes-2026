/**
 * Função para alternar entre as páginas
 * @param {string} idPagina - O ID da div que deve ser exibida
 */
function abrirPagina(idPagina) {
    // 1. Seleciona todos os elementos que possuem a classe 'pagina'
    const paginas = document.querySelectorAll('.pagina');
    
    // 2. Esconde todas as páginas
    paginas.forEach(p => {
        p.style.display = 'none';
    });
    
    // 3. Exibe apenas a página selecionada
    const paginaAlvo = document.getElementById(idPagina);
    if (paginaAlvo) {
        paginaAlvo.style.display = 'block';
    }
}