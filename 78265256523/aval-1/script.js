let sobreviventes = 12;
let comida = 35;
let energia = 80;

const acontecimentos = [
    "Você encontrou uma casa abandonada. Há alguns suprimentos dentro.",
        "Um grupo de sobreviventes apareceu e pediu ajuda.",
            "A cidade parece silenciosa... talvez seja melhor voltar ao abrigo.",
                "Você encontrou uma pequena loja com algumas latas de comida.",
                    "Uma tempestade começou. É melhor permanecer no abrigo.",
                        "Você encontrou uma mochila com equipamentos úteis."
                        ];

                        function explorar() {
                            if (energia <= 0) {
                                    document.getElementById("mensagem").textContent =
                                                "⚠️ Sua energia acabou. Volte ao abrigo!";
                                                        return;
                                                            }

                                                                energia -= 10;

                                                                    const evento =
                                                                            acontecimentos[Math.floor(Math.random() * acontecimentos.length)];

                                                                                if (Math.random() > 0.5) {
                                                                                        comida += 5;
                                                                                            }

                                                                                                document.getElementById("energia").textContent = energia;
                                                                                                    document.getElementById("comida").textContent = comida;
                                                                                                        document.getElementById("sobreviventes").textContent = sobreviventes;

                                                                                                            document.getElementById("mensagem").textContent = evento;
                                                                                                            }