
// Botão de seguir
const botaoSeguir = document.getElementById("seguir");

let seguindo = false;

botaoSeguir.addEventListener("click", function() {
    if (seguindo === false) {
            botaoSeguir.textContent = "Seguindo";
                    botaoSeguir.style.backgroundColor = "#555";
                            seguindo = true;
                                } else {
                                        botaoSeguir.textContent = "Seguir";
                                                botaoSeguir.style.backgroundColor = "#0095f6";
                                                        seguindo = false;
                                                            }
                                                            });

                                                            // Curtidas nas publicações
                                                            const publicacoes = document.querySelectorAll(".publicacoes img");

                                                            publicacoes.forEach(function(foto) {
                                                                let curtidas = 0;

                                                                    foto.style.cursor = "pointer";

                                                                        foto.addEventListener("click", function() {
                                                                                curtidas++;

                                                                                        alert("Você curtiu esta publicação! Curtidas nesta sessão: " + curtidas);
                                                                                            });
                                                                                            });

                                                                                            // Mensagem de boas-vindas
                                                                                            window.addEventListener("load", function() {
                                                                                                console.log("Bem-vindo ao seu perfil!");
                                                                                                });
                                                                                                