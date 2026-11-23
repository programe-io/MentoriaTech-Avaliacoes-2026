
const escritora = {
    nome: "Minha Eu Escritora",
        personalidade: "Delicada, sonhadora e criativa",

            paixoes: [
                    "Livros",
                            "Escrita",
                                    "Romance gótico",
                                            "Dark romance",
                                                    "Mundos medievais"
                                                        ],

                                                            lema: "Transformo sentimentos em palavras e pensamentos em histórias.",

                                                                projetos: [
                                                                        "Obcecado por Ela",
                                                                                "Ternura Sombria",
                                                                                        "Obsessão e Cativeiro"
                                                                                            ]
                                                                                            };

                                                                                            const frases = [
                                                                                                "Toda grande história começa com uma pequena ideia.",
                                                                                                    "Escrever é dar vida àquilo que só existia na imaginação.",
                                                                                                        "Que nunca me faltem palavras para criar novos mundos.",
                                                                                                            "Sou feita de histórias que ainda não foram contadas."
                                                                                                            ];

                                                                                                            console.log("♡ " + escritora.nome + " ♡");

                                                                                                            console.log("\nSobre mim:");
                                                                                                            console.log(escritora.personalidade);

                                                                                                            console.log("\nMinhas paixões:");
                                                                                                            escritora.paixoes.forEach((paixao) => {
                                                                                                                console.log("✧ " + paixao);
                                                                                                                });

                                                                                                                console.log("\nMeus projetos literários:");
                                                                                                                escritora.projetos.forEach((livro, indice) => {
                                                                                                                    console.log((indice + 1) + ". " + livro);
                                                                                                                    });

                                                                                                                    function revelarFrase() {
                                                                                                                        const sorteio = Math.floor(Math.random() * frases.length);

                                                                                                                            console.log("\n♡ Uma mensagem para mim:");
                                                                                                                                console.log(frases[sorteio]);
                                                                                                                                }

                                                                                                                                revelarFrase();
                                                                                                                                