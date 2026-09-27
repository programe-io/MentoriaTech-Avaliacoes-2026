// Curiosidades sobre Oceanos e Aquários

function mostrarCuriosidade() {
    const curiosidades = [
            "🐋 A baleia-azul é o maior animal do planeta.",
                    "🦑 Os polvos possuem três corações.",
                            "🐠 Existem mais de 30 mil espécies de peixes conhecidas.",
                                    "🌊 Os oceanos cobrem cerca de 71% da superfície da Terra.",
                                            "🪸 Os recifes de coral são chamados de florestas tropicais do mar.",
                                                    "🐢 Algumas tartarugas marinhas podem viver mais de 100 anos.",
                                                            "🦈 Os tubarões existem há mais de 400 milhões de anos."
                                                                ];

                                                                    const indice = Math.floor(Math.random() * curiosidades.length);

                                                                        document.getElementById("curiosidade").textContent =
                                                                                curiosidades[indice];
                                                                                }

                                                                                // Mensagem de boas-vindas
                                                                                window.onload = function () {
                                                                                    console.log("🌊 Bem-vindo ao mundo dos Oceanos e Aquários!");
                                                                                    };