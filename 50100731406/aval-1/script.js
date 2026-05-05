function mostrarSecao(secaoId) {
    const secoes = document.querySelectorAll('.conteudo');

    secoes.forEach(secao => {
        secao.style.display = 'none';
    });

    document.getElementById(secaoId).style.display = 'block';
}

// Mostrar a primeira seção automaticamente
window.onload = function() {
    mostrarSecao('causas');
};