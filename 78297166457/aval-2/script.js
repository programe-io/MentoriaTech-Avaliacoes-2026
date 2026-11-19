
// Selecionar os elementos
const botaoPublicar = document.querySelector(".new-post button");
const areaPublicacao = document.querySelector(".new-post span");
const feed = document.querySelector("main");

// Publicar uma nova postagem
botaoPublicar.addEventListener("click", function() {

    const texto = prompt("O que você deseja publicar?");

        if (texto && texto.trim() !== "") {

                const novaPublicacao = document.createElement("article");

                        novaPublicacao.classList.add("post");

                                novaPublicacao.innerHTML = `
                                            <div class="post-header">
                                                            <div class="avatar">S</div>
                                                                            <div>
                                                                                                <strong>Sophia</strong>
                                                                                                                    <span>Agora mesmo</span>
                                                                                                                                    </div>
                                                                                                                                                </div>

                                                                                                                                                            <div class="post-text">
                                                                                                                                                                            ${texto}
                                                                                                                                                                                        </div>

                                                                                                                                                                                                    <div class="post-actions">
                                                                                                                                                                                                                    <button class="curtir">Curtir</button>
                                                                                                                                                                                                                                    <button class="comentar">Comentar</button>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                feed.appendChild(novaPublicacao);
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                    // Curtir e comentar
                                                                                                                                                                                                                                                                    feed.addEventListener("click", function(event) {

                                                                                                                                                                                                                                                                        // Botão curtir
                                                                                                                                                                                                                                                                            if (event.target.classList.contains("curtir")) {

                                                                                                                                                                                                                                                                                    if (event.target.textContent === "Curtir") {
                                                                                                                                                                                                                                                                                                event.target.textContent = "Curtido ❤️";
                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                    event.target.textContent = "Curtir";
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                    // Botão comentar
                                                                                                                                                                                                                                                                                                                                        if (event.target.classList.contains("comentar")) {

                                                                                                                                                                                                                                                                                                                                                const comentario = prompt("Digite seu comentário:");

                                                                                                                                                                                                                                                                                                                                                        if (comentario && comentario.trim() !== "") {
                                                                                                                                                                                                                                                                                                                                                                    alert("Comentário publicado: " + comentario);
                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                