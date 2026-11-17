
// SISTEMA DE CURTIDAS

document.querySelectorAll('.curtir').forEach(botao => {

    botao.addEventListener('click', function() {

        this.classList.toggle('ativo');

        if (this.classList.contains('ativo')) {
            this.innerHTML = '♥';
        } else {
            this.innerHTML = '♡';
        }

        const post = this.closest('.post');
        const likes = post.querySelector('.likes');

        let quantidade = Number(
            likes.textContent.replace(/\D/g, '')
        );

        if (this.classList.contains('ativo')) {
            quantidade++;
        } else {
            quantidade--;
        }

        likes.textContent = quantidade.toLocaleString('pt-BR') + ' curtidas';

    });

});


// SISTEMA DE SALVAR PUBLICAÇÃO

document.querySelectorAll('.salvar').forEach(botao => {

    botao.addEventListener('click', function() {

        this.classList.toggle('ativo');

        this.innerHTML = this.classList.contains('ativo')
            ? '♥'
            : '♡';

    });

});


// SISTEMA DE COMENTÁRIOS

document.querySelectorAll('.form-comentario').forEach(form => {

    form.addEventListener('submit', function(event) {

        event.preventDefault();

        const input = this.querySelector('input');
        const texto = input.value.trim();

        if (texto === '') {
            return;
        }

        const areaComentarios =
            this.previousElementSibling;

        const comentario = document.createElement('p');

        const usuario = document.createElement('strong');
        usuario.textContent = 'stay: ';

        comentario.appendChild(usuario);
        comentario.appendChild(
            document.createTextNode(texto)
        );

        areaComentarios.appendChild(comentario);

        input.value = '';

    });

});


// PESQUISA DE PUBLICAÇÕES

const pesquisa = document.querySelector('#pesquisa');

pesquisa.addEventListener('input', function() {

    const termo = this.value.toLowerCase();

    document.querySelectorAll('.post').forEach(post => {

        const conteudo = post.textContent.toLowerCase();

        post.style.display = conteudo.includes(termo)
            ? 'block'
            : 'none';

    });

});
