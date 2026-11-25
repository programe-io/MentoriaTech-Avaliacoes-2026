
const pesquisa = document.getElementById("pesquisa");
const cards = document.querySelectorAll(".card");
const semResultado = document.getElementById("semResultado");

pesquisa.addEventListener("input", function() {
    const texto = pesquisa.value.toLowerCase();
        let encontrados = 0;

            cards.forEach(function(card) {
                    const conteudo = card.textContent.toLowerCase();

                            if (conteudo.includes(texto)) {
                                        card.style.display = "block";
                                                    encontrados++;
                                                            } else {
                                                                        card.style.display = "none";
                                                                                }
                                                                                    });

                                                                                        if (encontrados === 0) {
                                                                                                semResultado.style.display = "block";
                                                                                                    } else {
                                                                                                            semResultado.style.display = "none";
                                                                                                                }
                                                                                                                });

                                                                                                                function lerMais(filme) {
                                                                                                                    alert(
                                                                                                                            "Você escolheu: " + filme +
                                                                                                                                    "\n\nEm breve teremos uma resenha completa!"
                                                                                                                                        );
                                                                                                                                        }
                                                                                                                                        