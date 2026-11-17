// =================================
// NEVVA - JAVASCRIPT
// =================================


// FILTRO DE CATEGORIAS

const categoryButtons = document.querySelectorAll(".category-chip");

const postCards = document.querySelectorAll(".post-card");

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

            const selectedCategory = button.dataset.category;

                    // Remove seleção anterior
                            categoryButtons.forEach((item) => {
                                        item.classList.remove("selected");
                                                });

                                                        // Seleciona categoria atual
                                                                button.classList.add("selected");

                                                                        // Filtra os artigos
                                                                                postCards.forEach((card) => {

                                                                                            const postCategory = card.dataset.category;

                                                                                                        if (
                                                                                                                        selectedCategory === "Todos" ||
                                                                                                                                        selectedCategory === postCategory
                                                                                                                                                    ) {
                                                                                                                                                                    card.style.display = "block";
                                                                                                                                                                                } else {
                                                                                                                                                                                                card.style.display = "none";
                                                                                                                                                                                                            }

                                                                                                                                                                                                                    });

                                                                                                                                                                                                                        });

                                                                                                                                                                                                                        });


                                                                                                                                                                                                                        // ANIMAÇÃO AO ROLAR A PÁGINA

                                                                                                                                                                                                                        const observer = new IntersectionObserver((entries) => {

                                                                                                                                                                                                                            entries.forEach((entry) => {

                                                                                                                                                                                                                                    if (entry.isIntersecting) {

                                                                                                                                                                                                                                                entry.target.classList.add("visible");

                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                            }, {
                                                                                                                                                                                                                                                                threshold: 0.15
                                                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                                                // Elementos que receberão animação
                                                                                                                                                                                                                                                                document.querySelectorAll(
                                                                                                                                                                                                                                                                    ".post-card, .about-section, .hero-copy"
                                                                                                                                                                                                                                                                    ).forEach((element) => {

                                                                                                                                                                                                                                                                        observer.observe(element);

                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                        // ATUALIZAÇÃO AUTOMÁTICA DO ANO

                                                                                                                                                                                                                                                                        const year = document.getElementById("year");

                                                                                                                                                                                                                                                                        if (year) {
                                                                                                                                                                                                                                                                            year.textContent = new Date().getFullYear();
                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                            // EFEITO DE CLIQUE NOS LINKS

                                                                                                                                                                                                                                                                            document.querySelectorAll('a[href^="#"]').forEach((link) => {

                                                                                                                                                                                                                                                                                link.addEventListener("click", () => {

                                                                                                                                                                                                                                                                                        const target = document.querySelector(
                                                                                                                                                                                                                                                                                                    link.getAttribute("href")
                                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                                                    if (target) {
                                                                                                                                                                                                                                                                                                                                target.scrollIntoView({
                                                                                                                                                                                                                                                                                                                                                behavior: "smooth"
                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                                                                                                                        // CONSOLE NEVVA

                                                                                                                                                                                                                                                                                                                                                                        console.log(
                                                                                                                                                                                                                                                                                                                                                                            "%c NEVVA ",
                                                                                                                                                                                                                                                                                                                                                                                "background: #c7ff4a; color: #090909; font-size: 25px; font-weight: bold;"
                                                                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                                                                console.log("Bem-vindo ao universo NEVVA.");