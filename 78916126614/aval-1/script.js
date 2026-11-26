
const tema = document.getElementById("tema");

tema.addEventListener("click", function() {
    document.body.classList.toggle("escuro");

        if (document.body.classList.contains("escuro")) {
                tema.textContent = "☀️ Modo claro";
                    } else {
                            tema.textContent = "🌙 Modo escuro";
                                }
                                });

                                // Pesquisa de publicações

                                const pesquisa = document.getElementById("pesquisa");
                                const cards = document.querySelectorAll(".card");

                                pesquisa.addEventListener("input", function() {
                                    const texto = pesquisa.value.toLowerCase();

                                        cards.forEach(function(card) {
                                                const conteudo = card.textContent.toLowerCase();

                                                        if (conteudo.includes(texto)) {
                                                                    card.style.display = "block";
                                                                            } else {
                                                                                        card.style.display = "none";
                                                                                                }
                                                                                                    });
                                                                                                    });
                                                                                                    