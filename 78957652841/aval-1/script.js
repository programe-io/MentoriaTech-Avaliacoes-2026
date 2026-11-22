
const curiosidades = [
    "O CPM 22 foi formado em 1995, na cidade de Barueri, em São Paulo!",

        "Charlie Brown Jr. surgiu em Santos, no litoral paulista, em 1992!",

            "A Legião Urbana foi formada em Brasília, em 1982!",

                "Os Titãs começaram sua trajetória musical em São Paulo, em 1982!",

                    "Os Raimundos surgiram em Brasília, em 1987!",

                        "O Capital Inicial também surgiu em Brasília, em 1982!"
                        ];

                        let numero = 0;

                        function curiosidade() {

                            document.getElementById("texto-curiosidade").innerText =
                                curiosidades[numero];

                                    numero++;

                                        if (numero >= curiosidades.length) {
                                                numero = 0;
                                                    }
                                                    }
                                                    