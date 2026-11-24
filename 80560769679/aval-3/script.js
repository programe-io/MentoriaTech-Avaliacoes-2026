
// Mensagem de boas-vindas
window.addEventListener("load", () => {
    console.log("NEXUS iniciado com sucesso!");

        document.querySelector(".hero").classList.add("show");
        });

        // Botão começar agora
        document.querySelector(".primary").addEventListener("click", () => {
            alert("🚀 Seja bem-vindo ao universo NEXUS!");

                document.querySelector(".cards").scrollIntoView({
                        behavior: "smooth"
                            });
                            });

                            // Botão saiba mais
                            document.querySelector(".secondary").addEventListener("click", () => {
                                alert("NEXUS: criatividade, tecnologia e inovação!");
                                });

                                // Efeito nos cards
                                const cards = document.querySelectorAll(".card");

                                cards.forEach((card) => {
                                    card.addEventListener("click", () => {
                                            card.classList.toggle("selected");
                                                });
                                                });

                                                // Efeito de digitação no título
                                                const titulo = document.querySelector(".hero h1");

                                                titulo.addEventListener("mouseenter", () => {
                                                    titulo.style.transform = "scale(1.03)";
                                                    });

                                                    titulo.addEventListener("mouseleave", () => {
                                                        titulo.style.transform = "scale(1)";
                                                        });

                                                        // Relógio no console
                                                        setInterval(() => {
                                                            const agora = new Date();

                                                                console.log(
                                                                        agora.toLocaleTimeString("pt-BR")
                                                                            );
                                                                            }, 10000);
                                                                            