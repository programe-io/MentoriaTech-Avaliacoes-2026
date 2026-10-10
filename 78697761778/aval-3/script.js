javascript
// Função para alternar entre as abas de Gatos e Cachorros
function switchTab(tabId) {
    // Esconde todos os conteúdos das abas
        const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => {
                    content.classList.remove('active-content');
                        });

                            // Remove a classe 'active' de todos os botões
                                const buttons = document.querySelectorAll('.tab-btn');
                                    buttons.forEach(button => {
                                            button.classList.remove('active');
                                                });

                                                    // Mostra o conteúdo selecionado
                                                        document.getElementById(tabId).classList.add('active-content');

                                                            // Adiciona a classe 'active' ao botão clicado
                                                                const clickedButton = Array.from(buttons).find(btn => btn.textContent.toLowerCase().includes(tabId.substring(0, 4)));
                                                                    if (clickedButton) {
                                                                            clickedButton.classList.add('active');
                                                                                }
                                                                                }

                                                                                // Função simples para interagir com o sistema de votos
                                                                                function votar(animal) {
                                                                                    const textoResultado = document.getElementById('resultado-voto');
                                                                                        textoResultado.textContent = `Obrigado pelo seu voto! Você escolheu: Miau/AuAu (${animal})! 🐾`;
                                                                                        }