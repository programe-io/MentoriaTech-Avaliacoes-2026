// Função interativa para curtir os posts
function toggleLike(button) {
    const countSpan = button.querySelector('.like-count');
        let currentLikes = parseInt(countSpan.textContent);
            
                // Verifica se já foi curtido (simples alternância de estado)
                    if (button.classList.contains('liked')) {
                            currentLikes -= 1;
                                    button.classList.remove('liked');
                                            button.style.color = '#f1f1f1';
                                                } else {
                                                        currentLikes += 1;
                                                                button.classList.add('liked');
                                                                        button.style.color = '#ff0080';
                                                                            }
                                                                                
                                                                                    countSpan.textContent = currentLikes;
                                                                                    }

                                                                                    // Log de boas-vindas no console para testar o carregamento do script
                                                                                    console.log("PixelPulse Blog carregado com sucesso! 🚀");
                                                                                    