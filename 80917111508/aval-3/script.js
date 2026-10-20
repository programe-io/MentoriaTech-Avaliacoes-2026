
document.querySelectorAll(".curtir").forEach(function(botao) {
    let curtidas = 0;
        const numero = botao.querySelector("span");

            botao.addEventListener("click", function() {
                    if (botao.classList.contains("curtido")) {
                                curtidas--;
                                            botao.classList.remove("curtido");
                                                    } else {
                                                                curtidas++;
                                                                            botao.classList.add("curtido");
                                                                                    }

                                                                                            numero.textContent = curtidas;
                                                                                                });
                                                                                                });

                                                                                                document.querySelectorAll(".comentar").forEach(function(botao) {
                                                                                                    botao.addEventListener("click", function() {
                                                                                                            const post = botao.closest(".post");
                                                                                                                    const area = post.querySelector(".comentarios");
                                                                                                                            const texto = prompt("Digite seu comentário:");

                                                                                                                                    if (texto && texto.trim() !== "") {
                                                                                                                                                const comentario = document.createElement("p");
                                                                                                                                                            comentario.className = "comentario";
                                                                                                                                                                        comentario.textContent = "💬 " + texto.trim();
                                                                                                                                                                                    area.appendChild(comentario);
                                                                                                                                                                                            }
                                                                                                                                                                                                });
                                                                                                                                                                                                });

                                                                                                                                                                                                const tema = document.getElementById("tema");

                                                                                                                                                                                                tema.addEventListener("click", function() {
                                                                                                                                                                                                    document.body.classList.toggle("escuro");

                                                                                                                                                                                                        if (document.body.classList.contains("escuro")) {
                                                                                                                                                                                                                tema.textContent = "☀️ Modo claro";
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                            tema.textContent = "🌙 Modo escuro";
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                