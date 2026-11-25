function mostrarCuriosidade() {

        const curiosidades = [
                "O Instagram foi criado por Kevin Systrom e Mike Krieger! 📱",

                        "O nome Instagram mistura as palavras instantâneo e telegrama! 💜",

                                "O Instagram pertence à empresa Meta! 🌎",

                                        "A plataforma permite compartilhar fotos, vídeos e mensagens! 📸"
                                            ];

                                                const numero = Math.floor(
                                                        Math.random() * curiosidades.length
                                                            );

                                                                document.getElementById("resultado").textContent =
                                                                        curiosidades[numero];
                                                                        }
}