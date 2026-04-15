function irParaPersonalidades() {
    // Esconde a página de heranças
    document.getElementById('pagina-heranca').classList.add('hidden');
    
    // Mostra a página de personalidades
    document.getElementById('pagina-personalidades').classList.remove('hidden');
    
    // Rola para o topo da página suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function voltarHeranca() {
    // Esconde a página de personalidades
    document.getElementById('pagina-personalidades').classList.add('hidden');
    
    // Mostra a página de heranças
    document.getElementById('pagina-heranca').classList.remove('hidden');
}