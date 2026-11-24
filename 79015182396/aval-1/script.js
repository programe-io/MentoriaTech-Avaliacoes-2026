
// Modo escuro
const modo = document.getElementById("modo");

modo.addEventListener("click", () => {
    document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
                modo.textContent = "☀️";
                    } else {
                            modo.textContent = "🌙";
                                }
                                });

                                // Pesquisa de artigos
                                const pesquisa = document.getElementById("pesquisa");
                                const cards = document.querySelectorAll(".card");

                                pesquisa.addEventListener("input", () => {
                                    const texto = pesquisa.value.toLowerCase();

                                        cards.forEach(card => {
                                                const conteudo = card.textContent.toLowerCase();

                                                        card.style.display =
                                                                    conteudo.includes(texto) ? "block" : "none";
                                                                        });
                                                                        });

                                                                        // Curtir artigos
                                                                        document.querySelectorAll(".curtir").forEach(botao => {
                                                                            botao.addEventListener("click", () => {

                                                                                    if (botao.dataset.curtido === "sim") {
                                                                                                botao.textContent = "❤️ Curtir";
                                                                                                            botao.dataset.curtido = "nao";
                                                                                                                    } else {
                                                                                                                                botao.textContent = "💖 Curtido!";
                                                                                                                                            botao.dataset.curtido = "sim";
                                                                                                                                                    }

                                                                                                                                                        });
                                                                                                                                                        });
                                                                                                                                                        