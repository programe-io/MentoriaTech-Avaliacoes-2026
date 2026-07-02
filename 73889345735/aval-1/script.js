// Mensagem do botão principal
function mostrarMensagem() {
    alert("🍰 Seja bem-vindo(a) à Doce Encanto!\n\nEntre em contato e faça seu pedido.");
    }

    // Botões de compra
    function comprar(produto) {
        alert("✅ Você escolheu: " + produto + ".\n\nObrigado pela preferência!");
        }

        // Envio do formulário
        const formulario = document.querySelector("form");

        formulario.addEventListener("submit", function(event) {
            event.preventDefault();

                const nome = document.querySelector('input[type="text"]').value;

                    if (nome.trim() === "") {
                            alert("Digite seu nome.");
                                    return;
                                        }

                                            alert("Obrigado, " + nome + "! Sua mensagem foi enviada com sucesso.");

                                                formulario.reset();
                                                });

                                                // Animação dos cards ao carregar a página
                                                window.addEventListener("load", () => {
                                                    const cards = document.querySelectorAll(".card");

                                                        cards.forEach((card, index) => {
                                                                card.style.opacity = "0";
                                                                        card.style.transform = "translateY(30px)";

                                                                                setTimeout(() => {
                                                                                            card.style.transition = "0.6s";
                                                                                                        card.style.opacity = "1";
                                                                                                                    card.style.transform = "translateY(0)";
                                                                                                                            }, index * 200);
                                                                                                                                });
                                                                                                                                });

                                                                                                                                // Mensagem de boas-vindas após alguns segundos
                                                                                                                                setTimeout(() => {
                                                                                                                                    console.log("Bem-vindo à Doce Encanto Confeitaria!");
                                                                                                                                    }, 1000);