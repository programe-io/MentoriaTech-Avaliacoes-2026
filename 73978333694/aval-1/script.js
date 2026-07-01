function mostrarCuriosidade(){

        const curiosidades = [
                "🏆 O Brasil é o maior campeão da Copa do Mundo, com 5 títulos.",
                        "⚽ A primeira Copa do Mundo aconteceu em 1930, no Uruguai.",
                                "🌎 A Copa do Mundo é realizada a cada quatro anos.",
                                        "🥇 A taça atual chama-se Taça da Copa do Mundo FIFA.",
                                                "🇧🇷 Pelé é o único jogador tricampeão mundial."
                                                    ];

                                                        let numero = Math.floor(Math.random() * curiosidades.length);

                                                            document.getElementById("texto").innerHTML = curiosidades[numero];
                                                            }

                                                            
}