// Aguarda o carregamento completo do documento
document.addEventListener('DOMContentLoaded', () => {

    // Funcionalidade de Curtir nos posts
        const botoesCurtir = document.querySelectorAll('.like-btn');

            botoesCurtir.forEach(botao => {
                    botao.addEventListener('click', () => {
                                const contador = botao.querySelector('.like-count');
                                            let curtidas = parseInt(contador.textContent);
                                                        curtidas++;
                                                                    contador.textContent = curtidas;
                                                                            });
                                                                                });

                                                                                    // Simulação do botão Publicar
                                                                                        const botaoPublicar = document.getElementById('publish-btn');
                                                                                            if (botaoPublicar) {
                                                                                                    botaoPublicar.addEventListener('click', () => {
                                                                                                                alert('Botão publicar clicado! Podes adicionar a lógica para criar novos posts aqui.');
                                                                                                                        });
                                                                                                                            }

                                                                                                                            });
                                                                                                                            