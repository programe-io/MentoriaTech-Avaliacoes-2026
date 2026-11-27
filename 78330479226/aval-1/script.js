
// MENSAGENS DO SITE

function mostrarMensagem() {

    const mensagens = [
            "Algumas pessoas deixam marcas eternas em nossos corações. ❤️",

                    "A vida é feita de momentos que merecem ser vividos. 🌸",

                            "O amor pode transformar a maneira como enxergamos o mundo. 💗",

                                    "Nunca deixe de descobrir a beleza da vida. ✨"
                                        ];

                                            const sorteio = Math.floor(
                                                    Math.random() * mensagens.length
                                                        );

                                                            document.getElementById("frase").innerHTML =
                                                                    mensagens[sorteio];

                                                                    }
                                                                    