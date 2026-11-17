// Espera a página carregar completamente antes de rodar o código
document.addEventListener('DOMContentLoaded', () => {
    
        // 1. Seleciona os elementos da página
            const container = document.querySelector('.container');
                const titulo = document.querySelector('h1');
                    const paragrafo = document.querySelector('p');

                        // 2. Cria um botão dinamicamente para alternar o tema
                            const botaoTema = document.createElement('button');
                                botaoTema.textContent = '🌙 Ativar Modo Escuro';
                                    
                                        // Estiliza o botão diretamente via JS
                                            botaoTema.style.marginTop = '15px';
                                                botaoTema.style.padding = '10px 20px';
                                                    botaoTema.style.border = 'none';
                                                        botaoTema.style.borderRadius = '6px';
                                                            botaoTema.style.cursor = 'pointer';
                                                                botaoTema.style.backgroundColor = '#333';
                                                                    botaoTema.style.color = '#fff';
                                                                        botaoTema.style.fontWeight = 'bold';

                                                                            // Adiciona o botão dentro da caixa principal
                                                                                container.appendChild(document.createElement('br'));
                                                                                    container.appendChild(botaoTema);

                                                                                        // 3. Variável para controlar o estado atual do tema
                                                                                            let modoEscuro = false;

                                                                                                // 4. Evento de clique no botão
                                                                                                    botaoTema.addEventListener('click', () => {
                                                                                                            modoEscuro = !modoEscuro; // Inverte o valor (true/false)

                                                                                                                    if (modoEscuro) {
                                                                                                                                document.body.style.backgroundColor = '#121212';
                                                                                                                                            container.style.backgroundColor = '#1e1e1e';
                                                                                                                                                        titulo.style.color = '#8ab4f8';
                                                                                                                                                                    paragrafo.style.color = '#e0e0e0';
                                                                                                                                                                                botaoTema.textContent = '☀️ Ativar Modo Claro';
                                                                                                                                                                                            botaoTema.style.backgroundColor = '#f0f2f5';
                                                                                                                                                                                                        botaoTema.style.color = '#333';
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                            document.body.style.backgroundColor = '#f0f2f5';
                                                                                                                                                                                                                                        container.style.backgroundColor = '#ffffff';
                                                                                                                                                                                                                                                    titulo.style.color = '#1a73e8';
                                                                                                                                                                                                                                                                paragrafo.style.color = '#555555';
                                                                                                                                                                                                                                                                            botaoTema.textContent = '🌙 Ativar Modo Escuro';
                                                                                                                                                                                                                                                                                        botaoTema.style.backgroundColor = '#333';
                                                                                                                                                                                                                                                                                                    botaoTema.style.color = '#fff';
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                