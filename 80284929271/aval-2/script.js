
// Sistema de curtidas
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach((botao) => {
    botao.addEventListener("click", function() {

            const post = botao.closest(".post");
                    const likes = post.querySelector(".likes");

                            let quantidade = parseInt(likes.textContent);

                                    if (botao.classList.contains("ativo")) {
                                                botao.classList.remove("ativo");
                                                            botao.textContent = "♡";
                                                                        quantidade--;
                                                                                } else {
                                                                                            botao.classList.add("ativo");
                                                                                                        botao.textContent = "♥";
                                                                                                                    quantidade++;
                                                                                                                            }

                                                                                                                                    likes.textContent = quantidade + " curtidas";
                                                                                                                                        });
                                                                                                                                        });

                                                                                                                                        // Sistema de seguir
                                                                                                                                        const botaoSeguir = document.getElementById("seguir");

                                                                                                                                        botaoSeguir.addEventListener("click", function() {

                                                                                                                                            if (botaoSeguir.classList.contains("seguindo")) {
                                                                                                                                                    botaoSeguir.textContent = "Seguir";
                                                                                                                                                            botaoSeguir.classList.remove("seguindo");
                                                                                                                                                                } else {
                                                                                                                                                                        botaoSeguir.textContent = "Seguindo";
                                                                                                                                                                                botaoSeguir.classList.add("seguindo");
                                                                                                                                                                                    }

                                                                                                                                                                                    });
                                                                                                                                                                                    