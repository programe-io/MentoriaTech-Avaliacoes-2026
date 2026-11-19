
// Botão de publicar
const botaoPublicar = document.querySelector(".new-post button");

botaoPublicar.addEventListener("click", function() {
    alert("Publicação realizada com sucesso!");
    });

    // Botão de curtir
    const botoesCurtir = document.querySelectorAll(".post-actions button:first-child");

    botoesCurtir.forEach(function(botao) {
        botao.addEventListener("click", function() {
                if (botao.textContent === "Curtir") {
                            botao.textContent = "Curtido ❤️";
                                    } else {
                                                botao.textContent = "Curtir";
                                                        }
                                                            });
                                                            });

                                                            // Botão de comentar
                                                            const botoesComentar = document.querySelectorAll(".post-actions button:last-child");

                                                            botoesComentar.forEach(function(botao) {
                                                                botao.addEventListener("click", function() {
                                                                        const comentario = prompt("Digite seu comentário:");

                                                                                if (comentario) {
                                                                                            alert("Comentário enviado: " + comentario);
                                                                                                    }
                                                                                                        });
                                                                                                        });
                                                                                                        