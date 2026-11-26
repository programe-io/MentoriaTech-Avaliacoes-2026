
const dicas = [
    "Observe os números que aparecem nas pontas da mesa antes de escolher sua peça.",

        "Tente jogar primeiro as peças que possuem números difíceis de combinar.",

            "Preste atenção nas peças que seus adversários estão colocando.",

                "As peças duplas podem ser importantes para sua estratégia.",

                    "Planeje suas jogadas para não ficar com muitas peças na mão."
                    ];

                    let indiceDica = 0;

                    function mostrarDica() {
                        indiceDica++;

                            if (indiceDica >= dicas.length) {
                                    indiceDica = 0;
                                        }

                                            document.getElementById("texto-dica").textContent =
                                                    dicas[indiceDica];
                                                    }
                                                    