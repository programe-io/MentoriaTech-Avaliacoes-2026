// ALERTA
alert("💚 Bem-vinda ao meu vlog Python!");

// BOTÃO
const botao = document.getElementById("botao");

botao.addEventListener("click", () => {

    alert("🐍 Python é incrível!");

    });

    // CARDS
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