// MENU ATIVO

const links = document.querySelectorAll(".nav a");

links.forEach(link => {

  link.addEventListener("click", () => {

      links.forEach(item => {
            item.classList.remove("active");
                });

                    link.classList.add("active");

                      });

                      });

                      // ANIMAÇÃO NOS CARDS

                      const cards = document.querySelectorAll(".card");

                      window.addEventListener("scroll", () => {

                        cards.forEach(card => {

                            const top = card.getBoundingClientRect().top;

                                if(top < window.innerHeight - 100){
                                      card.style.opacity = "1";
                                            card.style.transform = "translateY(0)";
                                                }

                                                  });

                                                  });

                                                  // ESTILO INICIAL

                                                  cards.forEach(card => {
                                                    card.style.opacity = "0";
                                                      card.style.transform = "translateY(40px)";
                                                        card.style.transition = "0.6s";
                                                        });