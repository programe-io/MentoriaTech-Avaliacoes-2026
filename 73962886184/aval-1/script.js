document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

            const nome = document.getElementById('nome').value;
                const email = document.getElementById('email').value;
                    const mensagem = document.getElementById('mensagem').value;
                        const feedback = document.getElementById('formFeedback');

                            if (nome && email && mensagem) {
                                    feedback.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`;
                                            feedback.className = "success";
                                                    
                                                            document.getElementById('contactForm').reset();
                                                                }
                                                                });
})