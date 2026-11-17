
// SISTEMA DE CURTIDAS

document.querySelectorAll('.like').forEach(button => {

    button.addEventListener('click', () => {

            const post = button.closest('.post');
                    const likes = post.querySelector('.likes');

                            let quantidade = Number(
                                        likes.textContent.replace(/\D/g, '')
                                                );

                                                        if (button.classList.contains('liked')) {
                                                                    button.classList.remove('liked');
                                                                                button.textContent = '♡';
                                                                                            quantidade--;
                                                                                                    } else {
                                                                                                                button.classList.add('liked');
                                                                                                                            button.textContent = '♥';
                                                                                                                                        quantidade++;
                                                                                                                                                }

                                                                                                                                                        likes.textContent = quantidade.toLocaleString('pt-BR') + ' curtidas';
                                                                                                                                                            });

                                                                                                                                                            });

                                                                                                                                                            // SISTEMA DE COMENTÁRIOS

                                                                                                                                                            document.querySelectorAll('.post-info input').forEach(input => {

                                                                                                                                                                input.addEventListener('keydown', event => {

                                                                                                                                                                        if (event.key === 'Enter' && input.value.trim() !== '') {

                                                                                                                                                                                    const post = input.closest('.post-info');

                                                                                                                                                                                                const comentario = document.createElement('p');
                                                                                                                                                                                                            comentario.innerHTML = '<strong>Você:</strong> ' +
                                                                                                                                                                                                                            document.createTextNode(input.value).textContent;

                                                                                                                                                                                                                                        post.insertBefore(comentario, input);

                                                                                                                                                                                                                                                    input.value = '';
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                // SISTEMA DE SEGUIR

                                                                                                                                                                                                                                                                document.querySelectorAll('.suggestion button').forEach(button => {

                                                                                                                                                                                                                                                                    button.addEventListener('click', () => {

                                                                                                                                                                                                                                                                            if (button.textContent === 'Seguir') {
                                                                                                                                                                                                                                                                                        button.textContent = 'Seguindo';
                                                                                                                                                                                                                                                                                                    button.style.color = '#8e8e8e';
                                                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                                                        button.textContent = 'Seguir';
                                                                                                                                                                                                                                                                                                                                    button.style.color = '#0095f6';
                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                // SALVAR PUBLICAÇÃO

                                                                                                                                                                                                                                                                                                                                                document.querySelectorAll('.save').forEach(button => {

                                                                                                                                                                                                                                                                                                                                                    button.addEventListener('click', () => {

                                                                                                                                                                                                                                                                                                                                                            button.classList.toggle('saved');

                                                                                                                                                                                                                                                                                                                                                                    button.textContent =
                                                                                                                                                                                                                                                                                                                                                                                button.classList.contains('saved') ? '▣' : '♧';

                                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                    