function mostrar(personagem) {

        const info = document.getElementById("info");

            const dados = {

                    Hinata:
                                "🧡 Hinata Shoyo — Um jogador determinado que nunca desiste de alcançar seus objetivos.",

                                        Kageyama:
                                                    "💙 Kageyama Tobio — Um levantador extremamente habilidoso e preciso.",

                                                            Oikawa:
                                                                        "💚 Oikawa Tooru — Um levantador talentoso que acredita no esforço e na evolução.",

                                                                                Kenma:
                                                                                            "💛 Kenma Kozume — O estrategista do Nekoma, conhecido por sua inteligência."

                                                                                                };

                                                                                                    info.style.opacity = "0";

                                                                                                        setTimeout(function() {

                                                                                                                info.innerHTML = dados[personagem];

                                                                                                                        info.style.opacity = "1";

                                                                                                                            }, 200);

                                                                                                                            }
}