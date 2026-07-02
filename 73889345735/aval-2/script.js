// Mensagem de boas-vindas
function boasVindas() {
    alert("💄 Bem-vinda à Beauty Glam!\n\nEncontre as melhores maquiagens para realçar sua beleza.");
    }

    // Botão Comprar
    function comprar(produto) {
        alert("🛍️ Você adicionou \"" + produto + "\" ao carrinho!");
        }

        // Formulário de contato
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

                                                // Animação dos cards
                                                window.addEventListener("load", function() {

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

                                                                                                                                // Rolagem suave do menu
                                                                                                                                document.querySelectorAll('nav a').forEach(link => {

                                                                                                                                    link.addEventListener('click', function(e) {

                                                                                                                                            e.preventDefault();

                                                                                                                                                    const destino = document.querySelector(this.getAttribute('href'));

                                                                                                                                                            destino.scrollIntoView({
                                                                                                                                                                        behavior: 'smooth'
                                                                                                                                                                                });

                                                                                                                                                                                    });

                                                                                                                                                                                    });

                                                                                                                                                                                    // Mensagem no console
                                                                                                                                                                                    console.log("Beauty Glam carregado com sucesso!");