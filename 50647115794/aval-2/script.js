// script.js

// Mensagem ao abrir o site
alert("Bem-vindo ao site do José Lucas!");

// Efeito ao clicar nos cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
      card.style.transform = "scale(1.05)";
          card.style.transition = "0.3s";

              setTimeout(() => {
                    card.style.transform = "scale(1)";
                        }, 300);
                          });
                          });

                          // Troca de cor no título
                          const titulo = document.querySelector(".titulo");

                          titulo.addEventListener("mouseover", () => {
                            titulo.style.color = "#ff0000";
                            });

                            titulo.addEventListener("mouseout", () => {
                              titulo.style.color = "#a10000";
                              });