// Aguarda o carregamento completo do documento HTML
document.addEventListener('DOMContentLoaded', () => {
    
        // Seleciona todos os botões de curtir
            const botoesCurtir = document.querySelectorAll('.like-btn');

                botoesCurtir.forEach(botao => {
                        botao.addEventListener('click', () => {
                                    const contadorSpan = botao.querySelector('.like-count');
                                                let curtidasAtuais = parseInt(contadorSpan.textContent);
                                                            
                                                                        // Incrementa o número de curtidas
                                                                                    curtidasAtuais++;
                                                                                                contadorSpan.textContent = curtidasAtuais;

                                                                                                            // Efeito visual simples no botão ao curtir
                                                                                                                        botao.style.transform = 'scale(1.1)';
                                                                                                                                    setTimeout(() => {
                                                                                                                                                    botao.style.transform = 'scale(1)';
                                                                                                                                                                }, 200);
                                                                                                                                                                        });
                                                                                                                                                                            });

                                                                                                                                                                                console.log("Blog da Ilana carregado com sucesso!");
                                                                                                                                                                                });
                                                                                                                                                                                