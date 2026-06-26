// Executa tudo quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', function() {

    // 1. Saudação dinâmica no topo
        const cabecalho = document.querySelector('header');
            const saudacao = document.createElement('p');
                saudacao.style.marginTop = '10px';
                    saudacao.style.fontSize = '0.95em';

                        const horaAtual = new Date().getHours();
                            if (horaAtual < 12) {
                                    saudacao.textContent = "Bom dia! Seja bem-vindo ao meu blog ☀️";
                                        } else if (horaAtual < 18) {
                                                saudacao.textContent = "Boa tarde! Seja bem-vindo ao meu blog ⛅";
                                                    } else {
                                                            saudacao.textContent = "Boa noite! Seja bem-vindo ao meu blog 🌙";
                                                                }

                                                                    cabecalho.appendChild(saudacao);


                                                                        // 2. Efeito simples ao clicar nos títulos dos artigos
                                                                            const titulosArtigos = document.querySelectorAll('article h2');
                                                                                titulosArtigos.forEach(titulo => {
                                                                                        titulo.style.cursor = 'pointer';
                                                                                                titulo.addEventListener('click', function() {
                                                                                                            this.style.color = '#e74c3c'; // muda cor ao clicar
                                                                                                                        alert(`Você abriu: ${this.textContent}`);
                                                                                                                                });
                                                                                                                                    });


                                                                                                                                        // 3. Atualiza ano automaticamente no rodapé
                                                                                                                                            const rodapeTexto = document.querySelector('footer p');
                                                                                                                                                const anoAtual = new Date().getFullYear();
                                                                                                                                                    rodapeTexto.textContent = `© ${anoAtual} Meu Blog - Todos os direitos reservados`;

                                                                                                                                                    });
                                                                                                                                                    