
// ===================================
// SKYLINE R34 - JAVASCRIPT
// ===================================

// BOTÃO VOLTAR AO TOPO

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
            topButton.style.display = "block";
                } else {
                        topButton.style.display = "none";
                            }
                            });

                            topButton.addEventListener("click", () => {
                                window.scrollTo({
                                        top: 0,
                                                behavior: "smooth"
                                                    });
                                                    });


                                                    // ANIMAÇÃO DAS SEÇÕES

                                                    const observer = new IntersectionObserver((entries) => {

                                                        entries.forEach(entry => {

                                                                if (entry.isIntersecting) {
                                                                            entry.target.classList.add("show");

                                                                                        observer.unobserve(entry.target);
                                                                                                }

                                                                                                    });

                                                                                                    }, {
                                                                                                        threshold: 0.1
                                                                                                        });

                                                                                                        document.querySelectorAll("section").forEach(section => {
                                                                                                            observer.observe(section);
                                                                                                            });


                                                                                                            // ANIMAÇÃO CSS AUTOMÁTICA

                                                                                                            const style = document.createElement("style");

                                                                                                            style.textContent = `
                                                                                                            section {
                                                                                                                opacity: 0;
                                                                                                                    transform: translateY(35px);
                                                                                                                        transition: opacity 0.8s ease,
                                                                                                                                        transform 0.8s ease;
                                                                                                                                        }

                                                                                                                                        section.show {
                                                                                                                                            opacity: 1;
                                                                                                                                                transform: translateY(0);
                                                                                                                                                }
                                                                                                                                                `;

                                                                                                                                                document.head.appendChild(style);


                                                                                                                                                // EFEITO NA GALERIA

                                                                                                                                                const images = document.querySelectorAll(".gallery-grid img");

                                                                                                                                                images.forEach(image => {

                                                                                                                                                    image.addEventListener("click", () => {

                                                                                                                                                            window.open(image.src, "_blank");

                                                                                                                                                                });

                                                                                                                                                                });


                                                                                                                                                                // EFEITO NO MENU

                                                                                                                                                                const menuLinks = document.querySelectorAll("nav a");

                                                                                                                                                                menuLinks.forEach(link => {

                                                                                                                                                                    link.addEventListener("click", () => {

                                                                                                                                                                            menuLinks.forEach(item => {
                                                                                                                                                                                        item.classList.remove("active");
                                                                                                                                                                                                });

                                                                                                                                                                                                        link.classList.add("active");

                                                                                                                                                                                                            });

                                                                                                                                                                                                            });


                                                                                                                                                                                                            // MENSAGEM NO CONSOLE

                                                                                                                                                                                                            console.log("SKYLINE R34 BLOG CARREGADO!");
                                                                                                                                                                                                            console.log("Bem-vindo ao mundo JDM!");
                                                                                                                                                                                                            WebGLVertexArrayObject