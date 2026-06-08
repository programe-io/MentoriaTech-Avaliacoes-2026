// Localiza o link na página utilizando o ID único
const meuLink = document.getElementById('linkInterativo');

// Aguarda o clique do usuário para executar a função
meuLink.addEventListener('click', function(event) {
    // Exibe um aviso no navegador antes do redirecionamento
    alert('Ação disparada via JavaScript externo! Você será redirecionado agora.');
});
