
// Menu para celular
function toggleMenu() {
    const menu = document.querySelector("nav");
        menu.classList.toggle("active");
        }

        // Botão de compra
        function comprar(produto) {
            alert(
                    "Você selecionou: " + produto +
                            "\nEntre em contato para finalizar sua compra!"
                                );
                                }

                                // Fechar menu ao clicar em um link
                                document.querySelectorAll("nav a").forEach(link => {
                                    link.addEventListener("click", () => {
                                            document.querySelector("nav").classList.remove("active");
                                                });
                                                });
                                                