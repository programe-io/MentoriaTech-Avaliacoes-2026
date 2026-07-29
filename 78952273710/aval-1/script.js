function mostrarDica() {

        const dicas = [
                "Sempre leve tochas para explorar cavernas.",
                        "Construa sua casa antes da primeira noite.",
                                "Diamantes aparecem com mais frequência nas camadas profundas.",
                                        "Leve comida para recuperar sua vida.",
                                                "Use um escudo para se proteger dos ataques."
                                                    ];

                                                        const numero = Math.floor(Math.random() * dicas.length);

                                                            document.getElementById("dica").innerHTML = dicas[numero];
                                                            }
}