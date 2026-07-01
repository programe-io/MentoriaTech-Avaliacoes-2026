// Mensagem de boas-vindas
window.onload = function () {
    alert("Bem-vindo(a) ao Blog da Ana Cristina! 👗✨");
    };

    // Destacar o menu ao passar o mouse
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {
        link.addEventListener("mouseover", function () {
                this.style.transform = "scale(1.1)";
                    });

                        link.addEventListener("mouseout", function () {
                                this.style.transform = "scale(1)";
                                    });
                                    });

                                    // Botão voltar ao topo
                                    const botaoTopo = document.createElement("button");
                                    botaoTopo.innerHTML = "⬆";
                                    botaoTopo.id = "topo";

                                    document.body.appendChild(botaoTopo);

                                    botaoTopo.style.position = "fixed";
                                    botaoTopo.style.bottom = "20px";
                                    botaoTopo.style.right = "20px";
                                    botaoTopo.style.padding = "12px 15px";
                                    botaoTopo.style.fontSize = "18px";
                                    botaoTopo.style.border = "none";
                                    botaoTopo.style.borderRadius = "50%";
                                    botaoTopo.style.backgroundColor = "#d88ca3";
                                    botaoTopo.style.color = "#fff";
                                    botaoTopo.style.cursor = "pointer";
                                    botaoTopo.style.display = "none";

                                    window.addEventListener("scroll", function () {
                                        if (window.scrollY > 200) {
                                                botaoTopo.style.display = "block";
                                                    } else {
                                                            botaoTopo.style.display = "none";
                                                                }
                                                                });

                                                                botaoTopo.addEventListener("click", function () {
                                                                    window.scrollTo({
                                                                            top: 0,
                                                                                    behavior: "smooth"
                                                                                        });
                                                                                        });