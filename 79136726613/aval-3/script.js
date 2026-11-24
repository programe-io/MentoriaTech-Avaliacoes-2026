// ======================================
// Clone Instagram — Perfil Neymar Jr.
// ======================================

console.log('⚽ Bem-vindo ao perfil do Neymar Jr. no Instagram!');

// === Botão Seguir ===
const botaoSeguir = document.querySelector('.botao-seguir');
let seguindo = false;

botaoSeguir.addEventListener('click', function() {
    seguindo = !seguindo;
        
            if (seguindo) {
                    this.textContent = 'Seguindo';
                            this.style.background = '#efefef';
                                    this.style.color = '#262626';
                                        } else {
                                                this.textContent = 'Seguir';
                                                        this.style.background = '#0095f6';
                                                                this.style.color = '#fff';
                                                                    }
                                                                    });

                                                                    // === Curtir Post ===
                                                                    const botaoCoracao = document.querySelector('.acoes-esquerda span:first-child');
                                                                    let curtido = false;

                                                                    botaoCoracao.addEventListener('click', function() {
                                                                        curtido = !curtido;
                                                                            
                                                                                if (curtido) {
                                                                                        this.textContent = '❤️';
                                                                                                this.style.transform = 'scale(1.2)';
                                                                                                        alert('🎉 Você curtiu a publicação do Neymar Jr.!');
                                                                                                            } else {
                                                                                                                    this.textContent = '🤍';
                                                                                                                            this.style.transform = 'scale(1)';
                                                                                                                                }
                                                                                                                                });

                                                                                                                                // === Navegar pelas Abas ===
                                                                                                                                const abas = document.querySelectorAll('.aba');

                                                                                                                                abas.forEach((aba, indice) => {
                                                                                                                                    aba.addEventListener('click', function() {
                                                                                                                                            // Remove classe ativa de todas
                                                                                                                                                    abas.forEach(a => a.classList.remove('ativa'));
                                                                                                                                                            // Adiciona na clicada
                                                                                                                                                                    this.classList.add('ativa');
                                                                                                                                                                            
                                                                                                                                                                                    const mensagens = [
                                                                                                                                                                                                '📷 Vendo todas as fotos do Neymar!',
                                                                                                                                                                                                            '▶️ Vídeos e Reels do Rei!',
                                                                                                                                                                                                                        '🏷️ Fotos em que o Neymar foi marcado!'
                                                                                                                                                                                                                                ];
                                                                                                                                                                                                                                        console.log(mensagens[indice]);
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                            // === Saudação ao carregar ===
                                                                                                                                                                                                                                            window.addEventListener('load', function() {
                                                                                                                                                                                                                                                const hora = new Date().getHours();
                                                                                                                                                                                                                                                    let saudacao;
                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                            if (hora < 12) saudacao = 'Bom dia! ☀️ Que dia para jogar bola! ⚽';
                                                                                                                                                                                                                                                                else if (hora < 18) saudacao = 'Boa tarde! 🌤️ O Neymar é o melhor do mundo! 🏆';
                                                                                                                                                                                                                                                                    else saudacao = 'Boa noite! 🌙 Sonhando com o próximo jogo da Seleção! 🇧🇷';
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                            console.log(saudacao);
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                            