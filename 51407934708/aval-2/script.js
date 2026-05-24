// ALERTA
alert("💖 Bem-vinda ao meu vlog!");

// BOTÃO
const botao = document.getElementById("botao");

botao.addEventListener("click", () => {

    alert("✨ Obrigada por visitar meu vlog!");

    });

    // ANIMAÇÃO DOS CARDS
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

                card.style.transform = "scale(1.05)";
                        card.style.transition = "0.3s";

                            });

                                card.addEventListener("mouseleave", () => {

                                        card.style.transform = "scale(1)";

                                            });

                                            });