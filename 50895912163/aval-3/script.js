// Scroll suave no menu
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
            e.preventDefault();

                    const target = document.querySelector(this.getAttribute("href"));

                            if (target) {
                                        target.scrollIntoView({
                                                        behavior: "smooth"
                                                                    });
                                                                            }
                                                                                });
                                                                                });

                                                                                // Formulário com mensagem de confirmação
                                                                                const form = document.querySelector("form");

                                                                                if (form) {
                                                                                    form.addEventListener("submit", function (e) {
                                                                                            e.preventDefault();

                                                                                                    const nome = document.getElementById("nome").value;

                                                                                                            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso 📩`);

                                                                                                                    form.reset();
                                                                                                                        });
                                                                                                                        }

                                                                                                                        // Animação ao rolar (fade-in nos elementos)
                                                                                                                        const elements = document.querySelectorAll("section, .card");

                                                                                                                        function animarAoRolar() {
                                                                                                                            const alturaTela = window.innerHeight;

                                                                                                                                elements.forEach(el => {
                                                                                                                                        const topo = el.getBoundingClientRect().top;

                                                                                                                                                if (topo < alturaTela - 80) {
                                                                                                                                                            el.style.opacity = "1";
                                                                                                                                                                        el.style.transform = "translateY(0)";
                                                                                                                                                                                    el.style.transition = "0.6s ease";
                                                                                                                                                                                            } else {
                                                                                                                                                                                                        el.style.opacity = "0.3";
                                                                                                                                                                                                                    el.style.transform = "translateY(30px)";
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                window.addEventListener("scroll", animarAoRolar);

                                                                                                                                                                                                                                // Executa ao carregar a página
                                                                                                                                                                                                                                window.addEventListener("load", animarAoRolar);

                                                                                                                                                                                                                                // Efeito simples nos cards ao passar o mouse (extra JS)
                                                                                                                                                                                                                                document.querySelectorAll(".card").forEach(card => {
                                                                                                                                                                                                                                    card.addEventListener("mouseenter", () => {
                                                                                                                                                                                                                                            card.style.transform = "scale(1.05)";
                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                    card.addEventListener("mouseleave", () => {
                                                                                                                                                                                                                                                            card.style.transform = "scale(1)";
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                });