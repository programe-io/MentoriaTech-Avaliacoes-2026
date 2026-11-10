// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    
        // 1. Funcionalidade para os botões de "Seguir" / "Seguindo"
            const botoesSeguir = document.querySelectorAll('button');

                botoesSeguir.forEach(botao => {
                        if (botao.textContent.trim() === 'Seguir') {
                                    botao.addEventListener('click', () => {
                                                    if (botao.textContent.trim() === 'Seguir') {
                                                                        botao.textContent = 'Seguindo';
                                                                                            botao.style.color = '#8e8e8e'; // Cor cinza estilo Instagram
                                                                                                            } else {
                                                                                                                                botao.textContent = 'Seguir';
                                                                                                                                                    botao.style.color = '#0095f6'; // Azul padrão do Instagram
                                                                                                                                                                    }
                                                                                                                                                                                });
                                                                                                                                                                                        }
                                                                                                                                                                                            });

                                                                                                                                                                                                // 2. Exemplo de alerta simples ao clicar na barra de pesquisa
                                                                                                                                                                                                    const barraPesquisa = document.querySelector('input[type="text"]');
                                                                                                                                                                                                        if (barraPesquisa) {
                                                                                                                                                                                                                barraPesquisa.addEventListener('focus', () => {
                                                                                                                                                                                                                            console.log('Campo de pesquisa focado.');
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        