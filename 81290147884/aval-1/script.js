
const menuButton = document.getElementById("menu-btn");
const navigation = document.querySelector("nav");

// Abrir e fechar menu
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
                navigation.classList.remove("active");
                    });
                    });

                    // Animação de entrada das seções
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                            entry.target.classList.add("visible");
                                                    }
                                                        });
                                                        }, {
                                                            threshold: 0.12
                                                            });

                                                            document.querySelectorAll(
                                                                ".section-heading, .about-card, .like-card, .music-card"
                                                                ).forEach(element => {
                                                                    element.classList.add("reveal");
                                                                        observer.observe(element);
                                                                        });

                                                                        // Apenas uma música toca por vez
                                                                        const players = document.querySelectorAll("audio");

                                                                        players.forEach(player => {
                                                                            player.addEventListener("play", () => {
                                                                                    players.forEach(otherPlayer => {
                                                                                                if (otherPlayer !== player) {
                                                                                                                otherPlayer.pause();
                                                                                                                            }
                                                                                                                                    });
                                                                                                                                        });
                                                                                                                                        });

                                                                                                                                        // Ano automático no rodapé
                                                                                                                                        const footerText = document.querySelector("footer p");

                                                                                                                                        if (footerText) {
                                                                                                                                            footerText.textContent =
                                                                                                                                                    `© ${new Date().getFullYear()} Victor. Feito por mim.`;
                                                                                                                                                    }
                                                                                                                                                    