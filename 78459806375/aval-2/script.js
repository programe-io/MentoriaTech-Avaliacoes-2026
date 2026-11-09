
function explorar() {
    document.getElementById("esportes").scrollIntoView({
            behavior: "smooth"
                });

                    alert("Escolha seu esporte favorito e entre em ação! 🏆");
                    }

                    // Animação dos cards ao passar o mouse
                    const cards = document.querySelectorAll(".card");

                    cards.forEach(card => {
                        card.addEventListener("click", () => {
                                const esporte = card.querySelector("h3").textContent;

                                        alert("Você escolheu: " + esporte + "! 🏅");
                                            });
                                            });
                                            