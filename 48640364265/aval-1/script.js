// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao meu blog!");

        alert("Seja bem-vindo(a) ao meu blog! 💗");
        });

        // Botão para mudar a cor do fundo
        function mudarCor() {
            document.body.style.backgroundColor = "#ffe4ec";
            }

            // Mensagem ao clicar em uma publicação
            function curtir() {
                alert("Você curtiu esta publicação! 💕");
                }

                // Mostrar a data atual
                function mostrarData() {
                    const data = new Date();

                        document.getElementById("data").textContent =
                                "Data de hoje: " + data.toLocaleDateString("pt-BR");
                                }