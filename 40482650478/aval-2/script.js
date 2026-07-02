let contador = 0;

// Função para adicionar ao carrinho
function comprar() {
    contador++;

        document.getElementById("contador").textContent = contador;

            alert("🍦 Sorvete adicionado ao carrinho com sucesso!");
            }

            // Botão "Ver Cardápio"
            document.addEventListener("DOMContentLoaded", function () {

                const botao = document.querySelector(".banner button");

                    botao.addEventListener("click", function () {
                            document.querySelector(".produtos").scrollIntoView({
                                        behavior: "smooth"
                                                });
                                                    });

                                                    });

                                                    // Mensagem de boas-vindas
                                                    window.onload = function () {
                                                        console.log("Bem-vindo à Ice Dream!");
                                                        };