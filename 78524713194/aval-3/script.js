
function mostrarMensagem() {
    alert(
            "🌳 Cuide das florestas!\n\n" +
                    "Evite desperdícios, recicle materiais " +
                            "e ajude a proteger a natureza. " +
                                    "Cada atitude consciente faz diferença!"
                                        );
                                        }

                                        function mudarFundo() {
                                            document.body.classList.toggle("noite");

                                                const ativado =
                                                        document.body.classList.contains("noite");

                                                            if (ativado) {
                                                                    alert("🌙 Modo noturno ativado!");
                                                                        } else {
                                                                                alert("☀️ Modo claro ativado!");
                                                                                    }
                                                                                    }
                                                                                    