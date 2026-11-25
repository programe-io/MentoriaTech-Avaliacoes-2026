
// MENSAGEM DE BOAS-VINDAS
alert("Bem-vindo ao Mundo do Futebol! ⚽");

// BOTÃO DE CURIOSIDADES
function mostrarCuriosidade() {

    const curiosidades = [
            "O Brasil possui 5 títulos de Copa do Mundo!",
                    "Uma partida normal dura 90 minutos.",
                            "O futebol moderno surgiu na Inglaterra.",
                                    "Cada equipe começa a partida com 11 jogadores."
                                        ];

                                            const sorteio = Math.floor(
                                                    Math.random() * curiosidades.length
                                                        );

                                                            document.getElementById("resultado").innerHTML =
                                                                    curiosidades[sorteio];
                                                                    }

                                                                    // MENSAGEM NO CONSOLE
                                                                    console.log("Site Mundo do Futebol carregado!");
                                                                    