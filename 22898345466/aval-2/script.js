
// LISTA DE JOGOS
const jogos = [
    {
            nome: "Free Fire",
                    descricao: "Confira novidades, dicas e atualizações do Free Fire.",
                            imagem: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"
                                },
                                    {
                                            nome: "Fortnite",
                                                    descricao: "Fique por dentro das novidades do Fortnite.",
                                                            imagem: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600"
                                                                },
                                                                    {
                                                                            nome: "Minecraft",
                                                                                    descricao: "Descubra construções e aventuras no Minecraft.",
                                                                                            imagem: "https://images.unsplash.com/photo-1603481546238-487240415921?w=600"
                                                                                                }
                                                                                                ];

                                                                                                // CRIAR OS CARDS
                                                                                                const areaJogos = document.getElementById("jogos");

                                                                                                jogos.forEach((jogo) => {
                                                                                                    const card = document.createElement("div");

                                                                                                        card.classList.add("card");

                                                                                                            card.innerHTML = `
                                                                                                                    <img src="${jogo.imagem}" alt="${jogo.nome}">
                                                                                                                            <h3>${jogo.nome}</h3>
                                                                                                                                    <p>${jogo.descricao}</p>
                                                                                                                                            <button onclick="verJogo('${jogo.nome}')">
                                                                                                                                                        Ver mais
                                                                                                                                                                </button>
                                                                                                                                                                    `;

                                                                                                                                                                        areaJogos.appendChild(card);
                                                                                                                                                                        });

                                                                                                                                                                        // FUNÇÃO DOS BOTÕES
                                                                                                                                                                        function verJogo(nome) {
                                                                                                                                                                            alert("Você selecionou o jogo: " + nome);
                                                                                                                                                                            }

                                                                                                                                                                            // MENSAGEM DE BOAS-VINDAS
                                                                                                                                                                            console.log("🎮 GameZone carregado com sucesso!");

                                                                                                                                                                            // ATUALIZAR ANO AUTOMATICAMENTE
                                                                                                                                                                            document.getElementById("ano").textContent =
                                                                                                                                                                                new Date().getFullYear();
                                                                                                                                                                                