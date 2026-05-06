// Scroll suave ao clicar no menu
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
            e.preventDefault();

                    const targetId = this.getAttribute("href");
                            const targetSection = document.querySelector(targetId);

                                    targetSection.scrollIntoView({
                                                behavior: "smooth"
                                                        });
                                                            });
                                                            });

                                                            // Envio de formulário (simulado)
                                                            const form = document.querySelector("form");

                                                            if (form) {
                                                                form.addEventListener("submit", function (e) {
                                                                        e.preventDefault();

                                                                                const nome = document.getElementById("nome").value;

                                                                                        alert(`Obrigado, ${nome}! Sua mensagem foi enviada 📩`);

                                                                                                form.reset();
                                                                                                    });
                                                                                                    }

                                                                                                    // Efeito de animação ao rolar a página
                                                                                                    const sections = document.querySelectorAll("section");

                                                                                                    function animarScroll() {
                                                                                                        const alturaTela = window.innerHeight;

                                                                                                            sections.forEach(sec => {
                                                                                                                    const topo = sec.getBoundingClientRect().top;

                                                                                                                            if (topo < alturaTela - 100) {
                                                                                                                                        sec.style.opacity = "1";
                                                                                                                                                    sec.style.transform = "translateY(0)";
                                                                                                                                                                sec.style.transition = "0.6s";
                                                                                                                                                                        } else {
                                                                                                                                                                                    sec.style.opacity = "0.5";
                                                                                                                                                                                                sec.style.transform = "translateY(30px)";
                                                                                                                                                                                                        }
                                                                                                                                                                                                            });
                                                                                                                                                                                                            }

                                                                                                                                                                                                            window.addEventListener("scroll", animarScroll);

                                                                                                                                                                                                            // Executa ao carregar a página
                                                                                                                                                                                                            window.addEventListener("load", () => {
                                                                                                                                                                                                                animarScroll();
                                                                                                                                                                                                                });