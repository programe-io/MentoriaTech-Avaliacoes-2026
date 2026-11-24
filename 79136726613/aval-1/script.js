// ======================================
// Anúncio de Chuteira — JavaScript
// ======================================

// Efeito no botão de compra
const botaoComprar = document.querySelector('.botao');

botaoComprar.addEventListener('click', function(evento) {
    evento.preventDefault(); // Evita recarregar a página
        
            // Mensagem bonita ao clicar
                alert('🎉 Parabéns! Sua compra foi realizada com sucesso!\n📦 Em breve você receberá sua Chuteira Pro Elite!\n⚽ Obrigado pela preferência!');
                });

                // Animação de boas-vindas quando a página carrega
                window.addEventListener('load', function() {
                    console.log('⚽ Anúncio carregado! Vamos jogar!');
                        
                            // Pequeno destaque no preço
                                const preco = document.querySelector('.preco');
                                    setInterval(() => {
                                            preco.style.opacity = '0.8';
                                                    setTimeout(() => {
                                                                preco.style.opacity = '1';
                                                                        }, 300);
                                                                            }, 2000);
                                                                            });
                                                                        