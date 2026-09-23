// Mensagem do botão "Saiba mais"

function mostrarMensagem() {
    alert(
            "O Piauí possui diversos destinos incríveis! " +
                    "Explore nossas paisagens, nossa cultura e nossa história."
                        );
                        }


                        // Formulário

                        const formulario = document.getElementById("formulario");

                        formulario.addEventListener("submit", function(event) {

                            event.preventDefault();

                                const nome = document.getElementById("nome").value;

                                    alert(
                                            "Obrigado pela mensagem, " + nome + "!"
                                                );

                                                    formulario.reset();
                                                    });