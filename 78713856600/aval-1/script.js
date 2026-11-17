
function explorar() {
    document.getElementById("series").scrollIntoView({
            behavior: "smooth"
                });
                }

                function detalhes(nome) {
                    alert("Você selecionou a série: " + nome);
                    }

                    function filtrarSeries() {

                        let pesquisa = document.getElementById("pesquisa")
                                .value.toLowerCase();

                                    let cards = document.querySelectorAll(".card");

                                        cards.forEach(card => {

                                                let nome = card.querySelector("h3")
                                                            .innerText.toLowerCase();

                                                                    if (nome.includes(pesquisa)) {
                                                                                card.style.display = "block";
                                                                                        } else {
                                                                                                    card.style.display = "none";
                                                                                                            }

                                                                                                                });
                                                                                                                }
                                                                                                                