// 1. Mensagem de boas-vindas personalizada
function mensagemBoasVindas() {
    const horaAtual = new Date().getHours();
        let saudacao;

            if (horaAtual < 12) {
                    saudacao = "Bom dia!";
                        } else if (horaAtual < 18) {
                                saudacao = "Boa tarde!";
                                    } else {
                                            saudacao = "Boa noite!";
                                                }

                                                    console.log(saudacao + " Seja bem-vindo(a) ao Meu Blog! 😊");
                                                    }

                                                    // 2. Botão para mostrar data e hora atual
                                                    function mostrarDataHora() {
                                                        const agora = new Date();
                                                            const dataFormatada = agora.toLocaleDateString('pt-BR', {
                                                                    weekday: 'long',
                                                                            year: 'numeric',
                                                                                    month: 'long',
                                                                                            day: 'numeric'
                                                                                                });
                                                                                                    const horaFormatada = agora.toLocaleTimeString('pt-BR');
                                                                                                        alert(`📅 Hoje é: ${dataFormatada}\n⏰ Agora são: ${horaFormatada}`);
                                                                                                        }

                                                                                                        // 3. Efeito de clique nos artigos
                                                                                                        document.addEventListener('DOMContentLoaded', function() {
                                                                                                            mensagemBoasVindas();

                                                                                                                const artigos = document.querySelectorAll('article');
                                                                                                                    artigos.forEach((artigo, indice) => {
                                                                                                                            artigo.addEventListener('click', function() {
                                                                                                                                        alert(`Você clicou no artigo ${indice + 1}! 📝`);
                                                                                                                                                });
                                                                                                                                                    });
                                                                                                                                                    });

                                                                                                                                                    // 4. Alterar cor do cabeçalho ao clicar
                                                                                                                                                    function mudarCorCabecalho() {
                                                                                                                                                        const cabecalho = document.querySelector('header');
                                                                                                                                                            const corAleatoria = '#' + Math.floor(Math.random()*16777215).toString(16);
                                                                                                                                                                cabecalho.style.background = corAleatoria;
                                                                                                                                                                }
                                                                                                                                                                