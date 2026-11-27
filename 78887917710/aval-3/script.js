
// SISTEMA DE CURTIDAS

document.querySelectorAll('.post').forEach(post => {

    const like = post.querySelector('.like');
    const likes = post.querySelector('.likes');
    const imagem = post.querySelector('.post-image');

    let curtido = false;
    let total = parseInt(likes.textContent.replace(/\D/g, ''));

    function curtir() {
        curtido = !curtido;

        if (curtido) {
            like.classList.add('ativo');
            like.classList.replace('fa-regular', 'fa-solid');
            total++;
        } else {
            like.classList.remove('ativo');
            like.classList.replace('fa-solid', 'fa-regular');
            total--;
        }

        likes.textContent = total.toLocaleString('pt-BR') + ' curtidas';
    }

    like.addEventListener('click', curtir);

    // CURTIR COM DOIS CLIQUES NA FOTO

    imagem.addEventListener('dblclick', () => {
        if (!curtido) {
            curtir();
        }
    });

});

// SISTEMA DE SALVAR PUBLICAÇÃO

document.querySelectorAll('.save').forEach(botao => {

    botao.addEventListener('click', () => {

        botao.classList.toggle('fa-regular');
        botao.classList.toggle('fa-solid');

    });

});

// SISTEMA DE COMENTÁRIOS

document.querySelectorAll('.post-info input').forEach(input => {

    input.addEventListener('keydown', (evento) => {

        if (evento.key === 'Enter' && input.value.trim() !== '') {

            const comentario = document.createElement('p');

            comentario.innerHTML =
                '<b>Marlos</b> ';

            comentario.appendChild(
                document.createTextNode(input.value)
            );

            input.parentElement.insertBefore(
                comentario,
                input
            );

            input.value = '';

        }

    });

});

// STORIES

document.querySelectorAll('.story').forEach(story => {

    story.addEventListener('click', () => {
        const nome = story.querySelector('p').textContent;
        alert('Você abriu o story de ' + nome + '!');
    });

});

console.log('Instagram Clone carregado com sucesso!');
