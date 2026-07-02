// Animação ao carregar a página
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    });

    // Efeito nos cards
    const secoes = document.querySelectorAll("section");

    secoes.forEach(secao => {

        secao.addEventListener("mouseenter", () => {
                secao.style.transform = "translateY(-8px) scale(1.01)";
                        secao.style.boxShadow = "0 15px 35px rgba(0,0,0,0.4)";
                            });

                                secao.addEventListener("mouseleave", () => {
                                        secao.style.transform = "translateY(0) scale(1)";
                                                secao.style.boxShadow = "";
                                                    });

                                                    });

                                                    // Animação ao rolar a página
                                                    const observer = new IntersectionObserver((entradas) => {

                                                        entradas.forEach((entrada) => {

                                                                if (entrada.isIntersecting) {
                                                                            entrada.target.classList.add("mostrar");
                                                                                    }

                                                                                        });

                                                                                        }, {
                                                                                            threshold: 0.15
                                                                                            });

                                                                                            secoes.forEach(secao => observer.observe(secao));

                                                                                            // Efeito no título principal
                                                                                            const titulo = document.querySelector("header h1");

                                                                                            titulo.addEventListener("mouseenter", () => {
                                                                                                titulo.style.transform = "scale(1.05)";
                                                                                                    titulo.style.transition = "0.4s";
                                                                                                    });

                                                                                                    titulo.addEventListener("mouseleave", () => {
                                                                                                        titulo.style.transform = "scale(1)";
                                                                                                        });

                                                                                                        // Atualiza automaticamente o ano do rodapé
                                                                                                        const ano = new Date().getFullYear();
                                                                                                        const rodape = document.querySelector("footer p:last-child");

                                                                                                        if (rodape) {
                                                                                                            rodape.innerHTML = `© ${ano} - Todos os direitos reservados.`;
                                                                                                            }