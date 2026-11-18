// Mensagem de boas-vindas
window.onload = function() {
    alert("Bem-vindo ao meu Blog Pessoal!");
    };

    // Alterar o título do blog
    function mudarTitulo() {
        document.querySelector("header h1").textContent =
                "Blog do Maurício";
                }

                // Adicionar uma mensagem
                function adicionarMensagem() {
                    const mensagem = document.createElement("p");

                        mensagem.textContent =
                                "Obrigado por visitar meu blog!";

                                    mensagem.style.textAlign = "center";
                                        mensagem.style.padding = "20px";

                                            document.body.appendChild(mensagem);
                                            }

                                            // Mostrar data atual
                                            function mostrarData() {
                                                const data = new Date();

                                                    alert("Data de hoje: " + data.toLocaleDateString("pt-BR"));
                                                    }