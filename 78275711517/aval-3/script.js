
// CURTIR PUBLICAÇÕES
document.querySelectorAll('.like').forEach(botao => {

    botao.addEventListener('click', function() {

        const post = this.closest('.post');
        const curtidas = post.querySelector('.curtidas b');

        let total = Number(curtidas.textContent);

        if (this.classList.contains('curtido')) {
            this.classList.remove('curtido');
            this.innerHTML = '♡';
            total--;
        } else {
            this.classList.add('curtido');
            this.innerHTML = '♥';
            total++;
        }

        curtidas.textContent = total;
    });
});

// ABRIR COMENTÁRIOS
document.querySelectorAll('.comentar').forEach(botao => {

    botao.addEventListener('click', function() {
        const post = this.closest('.post');
        post.querySelector('.campo-comentario input').focus();
    });

});

// ENVIAR COMENTÁRIOS
document.querySelectorAll('.enviar').forEach(botao => {

    botao.addEventListener('click', function() {

        const post = this.closest('.post');
        const input = post.querySelector('.campo-comentario input');
        const comentarios = post.querySelector('.comentarios');

        if (input.value.trim() === '') {
            alert('Digite um comentário!');
            return;
        }

        const novo = document.createElement('p');
        novo.textContent = '👤 Você: ' + input.value;

        comentarios.appendChild(novo);
        input.value = '';

    });

});

// COMPARTILHAR
document.querySelectorAll('.compartilhar').forEach(botao => {

    botao.addEventListener('click', function() {

        const legenda = this.closest('.post')
            .querySelector('.legenda').innerText;

        if (navigator.share) {
            navigator.share({
                title: 'DarkWeb - Neymar Jr.',
                text: legenda
            }).catch(() => {});
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(legenda)
                .then(() => alert('Publicação copiada!'));
        } else {
            alert('Compartilhamento indisponível.');
        }

    });

});

// PESQUISAR PUBLICAÇÕES
document.getElementById('pesquisa')
.addEventListener('input', function() {

    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll('.post').forEach(post => {

        const conteudo = post.innerText.toLowerCase();

        post.style.display = conteudo.includes(pesquisa)
            ? 'block'
            : 'none';

    });

});
