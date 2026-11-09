
// Mensagem de boas-vindas
function boasVindas() {
    alert("Olá! Seja bem-vindo(a) ao meu site! 💜");
    }

    // Mudar a cor de fundo
    function mudarCor() {
        document.body.style.backgroundColor = "#ffc0cb";
        }

        // Mostrar mensagem na página
        function mostrarMensagem() {
            document.getElementById("mensagem").innerHTML =
                    "Você clicou no botão! ✨";
                    }

                    // Contador de cliques
                    let contador = 0;

                    function contarCliques() {
                        contador++;
                            document.getElementById("contador").innerHTML =
                                    "Cliques: " + contador;
                                    }
                                    