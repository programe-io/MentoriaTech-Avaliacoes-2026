
const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

        cards.forEach(card => {

                const conteudo = card.innerText.toLowerCase();

                        if (conteudo.includes(texto)) {
                                    card.style.display = "block";
                                            } else {
                                                        card.style.display = "none";
                                                                }

                                                                    });

                                                                    });

                                                                    function lerMais(jogo) {
                                                                        alert("Você selecionou a notícia sobre " + jogo + "!");
                                                                        }
                                                                        