// Gerenciador do sistema de curtidas
function alternarCurtida(postCard, forcarCurtida = false) {
    const botaoCurtir = postCard.querySelector('.like-btn');
        const elementoCurtidas = postCard.querySelector('.likes-count');
            let curtidasAtuais = parseInt(elementoCurtidas.getAttribute('data-likes'));
                const jaCurtiu = botaoCurtir.classList.contains('liked');

                    if (jaCurtiu && !forcarCurtida) {
                            botaoCurtir.classList.remove('liked');
                                    botaoCurtir.innerText = '🤍';
                                            curtidasAtuais--;
                                                } else if (!jaCurtiu) {
                                                        botaoCurtir.classList.add('liked');
                                                                botaoCurtir.innerText = '❤️';
                                                                        curtidasAtuais++;
                                                                            }

                                                                                elementoCurtidas.setAttribute('data-likes', curtidasAtuais);
                                                                                    elementoCurtidas.innerText = curtidasAtuais.toLocaleString('pt-BR') + ' curtidas';
                                                                                    }

                                                                                    // Clique Simples no Coração
                                                                                    document.querySelectorAll('.like-btn').forEach(botao => {
                                                                                        botao.addEventListener('click', function() {
                                                                                                const postCard = this.closest('.post-card');
                                                                                                        alternarCurtida(postCard);
                                                                                                            });
                                                                                                            });

                                                                                                            // Toque Duplo na Imagem (Double Tap)
                                                                                                            document.querySelectorAll('.post-media-container').forEach(container => {
                                                                                                                container.addEventListener('dblclick', function() {
                                                                                                                        const postCard = this.closest('.post-card');
                                                                                                                                const overlayCoracao = this.querySelector('.heart-overlay');

                                                                                                                                        alternarCurtida(postCard, true);
                                                                                                                                                overlayCoracao.classList.add('animate');
                                                                                                                                                        
                                                                                                                                                                setTimeout(() => {
                                                                                                                                                                            overlayCoracao.classList.remove('animate');
                                                                                                                                                                                    }, 500);
                                                                                                                                                                                        });
                                                                                                                                                                                        });
                                                                                                                                                                                        