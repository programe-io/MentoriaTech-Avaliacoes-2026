
// MENSAGEM DE BOAS-VINDAS
alert("Bem-vindo ao site do Lionel Messi! ⚽");

// FUNÇÃO DE CURIOSIDADES
function mostrarCuriosidade() {

    const curiosidades = [
            "Messi nasceu em Rosário, na Argentina.",
                    "Messi conquistou a Copa do Mundo de 2022.",
                            "Messi possui 8 Bolas de Ouro.",
                                    "Messi começou sua carreira profissional no Barcelona.",
                                            "Seu apelido é La Pulga."
                                                ];

                                                    let numero = Math.floor(
                                                            Math.random() * curiosidades.length
                                                                );

                                                                    document.getElementById("resultado").innerHTML =
                                                                            curiosidades[numero];
                                                                            }

                                                                            // MENSAGEM NO CONSOLE
                                                                            console.log("Site do Messi carregado com sucesso!");
                                                                            