function mostrarPersonagem(personagem) {

        const info = document.getElementById("info");

            const personagens = {

                    Hinata:
                                "🧡 Hinata Shoyo — Pequeno Gigante, extremamente determinado e apaixonado por vôlei.",

                                        Kageyama:
                                                    "💙 Kageyama Tobio — Um levantador talentoso conhecido por sua precisão e dedicação.",

                                                            Oikawa:
                                                                        "💚 Oikawa Tooru — Um levantador habilidoso que acredita que talento pode ser desenvolvido com esforço.",

                                                                                Kenma:
                                                                                            "💛 Kenma Kozume — O estrategista do Nekoma, conhecido por sua inteligência e observação."
                                                                                                };

                                                                                                    info.style.opacity = "0";

                                                                                                        setTimeout(() => {

                                                                                                                info.textContent = personagens[personagem];

                                                                                                                        info.style.opacity = "1";

                                                                                                                            }, 200);

                                                                                                                            }
}