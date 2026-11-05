// Interatividade ao clicar no botão do topo
const btnSaibaMais = document.getElementById('btnSaibaMais');

btnSaibaMais.addEventListener('click', function() {
    alert('Bem-vinda(o) ao Mundo das Unhas! Confira nossos artigos abaixo.');
    
    // Rola suavemente até a seção de posts
    document.getElementById('posts').scrollIntoView({ 
        behavior: 'smooth' 
    });
});
