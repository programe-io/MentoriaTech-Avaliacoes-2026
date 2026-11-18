
// Botões de curtir
const botoesCurtir = document.querySelectorAll(
    ".post-actions button:first-child"
    );

    botoesCurtir.forEach(botao => {
        botao.addEventListener("click", () => {
                if (botao.textContent === "Curtir") {
                            botao.textContent = "Curtido ❤️";
                                    } else {
                                                botao.textContent = "Curtir";
                                                        }
                                                            });
                                                            });

                                                            // Botões de comentar
                                                            const botoesComentar = document.querySelectorAll(
                                                                ".post-actions button:last-child"
                                                                );

                                                                botoesComentar.forEach(botao => {
                                                                    botao.addEventListener("click", () => {
                                                                            const comentario = prompt("Digite seu comentário:");

                                                                                    if (comentario && comentario.trim() !== "") {
                                                                                                alert("Comentário adicionado: " + comentario);
                                                                                                        }
                                                                                                            });
                                                                                                            });

                                                                                                            // Criar publicação
                                                                                                            const botaoPublicar = document.querySelector(".new-post button");

                                                                                                            botaoPublicar.addEventListener("click", () => {
                                                                                                                const texto = prompt("O que você deseja publicar?");

                                                                                                                    if (texto && texto.trim() !== "") {
                                                                                                                            const postagem = document.createElement("article");

                                                                                                                                    postagem.classList.add("card", "post");

                                                                                                                                            postagem.innerHTML = `
                                                                                                                                                        <header class="post-header">
                                                                                                                                                                        <div class="avatar">A</div>
                                                                                                                                                                                        <div>
                                                                                                                                                                                                            <strong>Alex</strong>
                                                                                                                                                                                                                                <span>Agora</span>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                            </header>

                                                                                                                                                                                                                                                                        <p class="post-text"></p>

                                                                                                                                                                                                                                                                                    <div class="post-actions">
                                                                                                                                                                                                                                                                                                    <button type="button">Curtir</button>
                                                                                                                                                                                                                                                                                                                    <button type="button">Comentar</button>
                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                                                                                                postagem.querySelector(".post-text").textContent = texto;

                                                                                                                                                                                                                                                                                                                                                        document.querySelector("main").appendChild(postagem);
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                            