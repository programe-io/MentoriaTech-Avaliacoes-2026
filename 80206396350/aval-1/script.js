// Botão "Ler mais"
document.querySelectorAll('.ler-mais').forEach(botao => {
    botao.addEventListener('click', function() {
            alert('📖 Em breve teremos o conteúdo completo deste artigo! Volte sempre! 😊');
                });
                });

                // Formulário de contato
                const formulario = document.getElementById('form-contato');
                formulario.addEventListener('submit', function(e) {
                    e.preventDefault();
                        
                            const nome = document.getElementById('nome').value;
                                document.getElementById('mensagem-sucesso').style.display = 'block';
                                    formulario.reset();
                                        
                                            setTimeout(() => {
                                                    document.getElementById('mensagem-sucesso').style.display = 'none';
                                                        }, 4000);
                                                        });

                                                        // Suavizar rolagem dos links do menu
                                                        document.querySelectorAll('nav a').forEach(link => {
                                                            link.addEventListener('click', function(e) {
                                                                    e.preventDefault();
                                                                            const alvo = document.querySelector(this.getAttribute('href'));
                                                                                    if (alvo) {
                                                                                                alvo.scrollIntoView({ behavior: 'smooth' });
                                                                                                        }
                                                                                                            });
                                                                                                            });
                                                                                                            