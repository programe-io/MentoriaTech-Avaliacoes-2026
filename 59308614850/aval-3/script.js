const botoesLerMais = document.querySelectorAll('.read-more');

botoesLerMais.forEach(botao => {
    botao.addEventListener('click', function(event) {
        alert('Voce esta sendo redirecionado para ler o artigo completo em uma nova aba!');
    });
});