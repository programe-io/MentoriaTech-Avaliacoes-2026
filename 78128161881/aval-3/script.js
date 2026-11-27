
document.addEventListener('DOMContentLoaded', () => {

    // CURTIR PUBLICAÇÕES

    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {

        button.addEventListener('click', () => {

            const post = button.closest('.post-card');
            const likesText = post.querySelector('.likes-count');
            const icon = button.querySelector('i');

            const currentLikes = Number(
                likesText.textContent.replace(/\D/g, '')
            );

            const liked = button.classList.toggle('liked');

            if (liked) {

                icon.classList.remove('bx-heart');
                icon.classList.add('bxs-heart');

                likesText.textContent =
                    (currentLikes + 1).toLocaleString('pt-BR') +
                    ' curtidas';

            } else {

                icon.classList.remove('bxs-heart');
                icon.classList.add('bx-heart');

                likesText.textContent =
                    (currentLikes - 1).toLocaleString('pt-BR') +
                    ' curtidas';

            }

        });

    });


    // SALVAR PUBLICAÇÕES

    const bookmarkButtons =
        document.querySelectorAll('.bookmark-button');

    bookmarkButtons.forEach(button => {

        button.addEventListener('click', () => {

            const icon = button.querySelector('i');

            const saved = button.classList.toggle('saved');

            if (saved) {

                icon.classList.remove('bx-bookmark');
                icon.classList.add('bxs-bookmark');

            } else {

                icon.classList.remove('bxs-bookmark');
                icon.classList.add('bx-bookmark');

            }

        });

    });


    // SEGUIR USUÁRIOS

    const followButtons =
        document.querySelectorAll('.follow-button');

    followButtons.forEach(button => {

        button.addEventListener('click', () => {

            if (button.textContent.trim() === 'Seguir') {

                button.textContent = 'Seguindo';
                button.classList.remove('text-blue-500');
                button.classList.add('text-gray-500');

            } else {

                button.textContent = 'Seguir';
                button.classList.remove('text-gray-500');
                button.classList.add('text-blue-500');

            }

        });

    });


    // PESQUISA DE PUBLICAÇÕES

    const searchInput =
        document.querySelector('#searchInput');

    if (searchInput) {

        searchInput.addEventListener('input', () => {

            const searchTerm =
                searchInput.value.toLowerCase().trim();

            const posts =
                document.querySelectorAll('.post-card');

            posts.forEach(post => {

                const content =
                    post.textContent.toLowerCase();

                post.style.display =
                    content.includes(searchTerm) ? '' : 'none';

            });

        });

    }


    // BOTÕES DE COMENTÁRIOS

    const commentButtons =
        document.querySelectorAll('.comment-button');

    commentButtons.forEach(button => {

        button.addEventListener('click', () => {

            alert('Área de comentários em desenvolvimento!');

        });

    });


    // STORIES

    const storyButtons =
        document.querySelectorAll('.story-item');

    storyButtons.forEach(button => {

        button.addEventListener('click', () => {

            const username =
                button.querySelector('span').textContent;

            if (username === 'Seu story') {

                alert('Você clicou em adicionar um novo story!');

            } else {

                alert('Visualizando story de ' + username);

            }

        });

    });


    // BOTÕES DE COMPARTILHAMENTO

    const shareButtons =
        document.querySelectorAll('.bx-send');

    shareButtons.forEach(icon => {

        const button = icon.closest('button');

        if (!button) return;

        button.addEventListener('click', async () => {

            const post = button.closest('.post-card');

            if (!post) return;

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );

                alert('Link da página copiado!');

            } catch (error) {

                alert('Não foi possível copiar o link.');

            }

        });

    });


    console.log('Instagram Clone carregado com sucesso!');

});
