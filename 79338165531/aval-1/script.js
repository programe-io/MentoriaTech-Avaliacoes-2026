
// Sistema de curtidas
const botoes = document.querySelectorAll(".curtir");

botoes.forEach(botao => {
    let curtidas = 0;

        botao.addEventListener("click", () => {
                curtidas++;

                        botao.querySelector("span").textContent = curtidas;
                            });
                            });

                            // Pesquisa de jogos
                            const pesquisa = document.getElementById("pesquisa");
                            const cards = document.querySelectorAll(".card");

                            pesquisa.addEventListener("input", () => {
                                const texto = pesquisa.value.toLowerCase();

                                    cards.forEach(card => {
                                            const nome = card.dataset.nome;

                                                    if (nome.includes(texto)) {
                                                                card.style.display = "block";
                                                                        } else {
                                                                                    card.style.display = "none";
                                                                                            }
                                                                                                });
                                                                                                });
                                                                                                