// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

            event.preventDefault();

                    const destino = document.querySelector(
                                this.getAttribute("href")
                                        );

                                                if (destino) {
                                                            destino.scrollIntoView({
                                                                            behavior: "smooth"
                                                                                        });
                                                                                                }

                                                                                                    });

                                                                                                    });


                                                                                                    // Efeito no cabeçalho
                                                                                                    window.addEventListener("scroll", function() {

                                                                                                        const header = document.querySelector("header");

                                                                                                            if (window.scrollY > 50) {

                                                                                                                    header.style.boxShadow =
                                                                                                                                "0 10px 40px rgba(0, 100, 255, 0.25)";

                                                                                                                                    } else {

                                                                                                                                            header.style.boxShadow = "none";

                                                                                                                                                }

                                                                                                                                                });


                                                                                                                                                // Animação dos cards
                                                                                                                                                const elementos = document.querySelectorAll(
                                                                                                                                                    ".card, .sonho, .musica-card"
                                                                                                                                                    );

                                                                                                                                                    const observador = new IntersectionObserver(
                                                                                                                                                        function(entradas) {

                                                                                                                                                                entradas.forEach(function(entrada) {

                                                                                                                                                                            if (entrada.isIntersecting) {

                                                                                                                                                                                            entrada.target.style.opacity = "1";
                                                                                                                                                                                                            entrada.target.style.transform =
                                                                                                                                                                                                                                "translateY(0)";

                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                                    threshold: 0.15
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        );


                                                                                                                                                                                                                                                                        elementos.forEach(function(elemento) {

                                                                                                                                                                                                                                                                            elemento.style.opacity = "0";

                                                                                                                                                                                                                                                                                elemento.style.transform =
                                                                                                                                                                                                                                                                                        "translateY(30px)";

                                                                                                                                                                                                                                                                                            elemento.style.transition =
                                                                                                                                                                                                                                                                                                    "all 0.7s ease";

                                                                                                                                                                                                                                                                                                        observador.observe(elemento);

                                                                                                                                                                                                                                                                                                        });