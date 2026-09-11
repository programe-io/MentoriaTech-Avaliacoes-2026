// Lista de instrumentos da capoeira
const instrumentos = [
    {
            nome: "Berimbau",
                    descricao: "O instrumento principal da roda. Um arco de madeira (verga), um arame e uma cabaça que dita o ritmo do jogo."
                        },
                            {
                                    nome: "Atabaque",
                                            descricao: "Um tambor alto de origem afro-brasileira que mantém a batida e o pulso constante da roda."
                                                },
                                                    {
                                                            nome: "Pandeiro",
                                                                    descricao: "Instrumento de percussão que acompanha o berimbau, adicionando agudos e ritmo à música."
                                                                        },
                                                                            {
                                                                                    nome: "Agogô",
                                                                                            descricao: "Composto por duas campânulas de ferro de tamanhos diferentes, tocado com uma baqueta de metal ou madeira."
                                                                                                }
                                                                                                ];

                                                                                                let indiceAtual = 0;

                                                                                                // Seleção de elementos do DOM
                                                                                                const botao = document.getElementById('btn-instrumento');
                                                                                                const painel = document.getElementById('painel-instrumento');
                                                                                                const nomeElemento = document.getElementById('nome-instrumento');
                                                                                                const descElemento = document.getElementById('desc-instrumento');

                                                                                                // Função para mudar o instrumento ao clicar
                                                                                                botao.addEventListener('click', () => {
                                                                                                    // Remove a classe escondido para mostrar o painel
                                                                                                        painel.classList.remove('escondido');
                                                                                                            
                                                                                                                // Insere as informações do instrumento atual
                                                                                                                    nomeElemento.textContent = instrumentos[indiceAtual].nome;
                                                                                                                        descElemento.textContent = instrumentos[indiceAtual].descricao;
                                                                                                                            
                                                                                                                                // Avança para o próximo instrumento da lista
                                                                                                                                    indiceAtual = (indiceAtual + 1) % instrumentos.length;
                                                                                                                                        
                                                                                                                                            // Atualiza o texto do botão
                                                                                                                                                botao.textContent = "Ver Próximo Instrumento";
                                                                                                                                                });
                                                                                                                                                