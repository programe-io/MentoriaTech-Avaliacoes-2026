
// FUNÇÃO DE CURTIR
function curtir(botao) {

    if (botao.innerHTML === "♡") {
            botao.innerHTML = "♥";
                    botao.classList.add("like");
                        } else {
                                botao.innerHTML = "♡";
                                        botao.classList.remove("like");
                                            }

                                            }

                                            // FUNÇÃO DE SEGUIR
                                            function seguir(botao) {

                                                if (botao.innerHTML === "Seguir") {
                                                        botao.innerHTML = "Seguindo";
                                                                botao.classList.remove("text-blue-500");
                                                                        botao.classList.add("text-gray-500");
                                                                            } else {
                                                                                    botao.innerHTML = "Seguir";
                                                                                            botao.classList.add("text-blue-500");
                                                                                                    botao.classList.remove("text-gray-500");
                                                                                                        }

                                                                                                        }

                                                                                                        // FUNÇÃO DE COMENTAR
                                                                                                        function comentar() {
                                                                                                            alert("Área de comentários!");
                                                                                                            }

                                                                                                            // ABRIR STORIES
                                                                                                            function abrirStory(nome) {

                                                                                                                document.getElementById("storyName").innerText =
                                                                                                                        "Story de " + nome;

                                                                                                                            document.getElementById("storyModal")
                                                                                                                                    .classList.remove("hidden");

                                                                                                                                    }

                                                                                                                                    // FECHAR STORIES
                                                                                                                                    function fecharStory() {

                                                                                                                                        document.getElementById("storyModal")
                                                                                                                                                .classList.add("hidden");

                                                                                                                                                }
                                                                                                                                                