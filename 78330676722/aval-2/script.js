// Tema: Meio Ambiente e Clima

const dicas = [
    "🌱 Plante árvores para ajudar na absorção de CO₂.",
        "💧 Economize água em atividades do dia a dia.",
            "♻️ Separe corretamente os resíduos recicláveis.",
                "🚲 Prefira bicicleta, caminhada ou transporte público.",
                    "🔋 Desligue aparelhos eletrônicos quando não estiver usando.",
                        "🌍 Pequenas atitudes fazem grande diferença para o planeta."
                        ];

                        function gerarDica() {
                            const indice = Math.floor(Math.random() * dicas.length);
                                document.getElementById("mensagem").textContent = dicas[indice];
                                }

                                // Simulação de dados climáticos
                                function atualizarClima() {
                                    const temperatura = Math.floor(Math.random() * 15) + 20; // 20°C a 34°C

                                        let qualidadeAr;
                                            const nivel = Math.floor(Math.random() * 3);

                                                if (nivel === 0) {
                                                        qualidadeAr = "Boa 🌿";
                                                            } else if (nivel === 1) {
                                                                    qualidadeAr = "Moderada 🌤";
                                                                        } else {
                                                                                qualidadeAr = "Ruim ⚠️";
                                                                                    }

                                                                                        document.getElementById("temp").textContent = temperatura + "°C";
                                                                                            document.getElementById("ar").textContent = qualidadeAr;
                                                                                            }

                                                                                            // Atualiza ao carregar a página
                                                                                            atualizarClima();

                                                                                            // Atualiza automaticamente a cada 10 segundos
                                                                                            setInterval(atualizarClima, 10000);