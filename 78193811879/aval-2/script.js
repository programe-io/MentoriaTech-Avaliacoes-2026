
// Selecionar elementos
const form = document.getElementById("post-form");
const input = document.getElementById("post-input");
const feed = document.getElementById("feed");

// Criar nova publicação
form.addEventListener("submit", function(event) {
    event.preventDefault();

        const texto = input.value.trim();

            if (texto === "") {
                    alert("Digite alguma coisa antes de publicar!");
                            return;
                                }

                                    const post = document.createElement("article");
                                        post.className = "post";

                                            post.innerHTML = `
                                                    <div class="post-header">
                                                                <div class="avatar">G</div>
                                                                            <div>
                                                                                            <strong>Guilherme</strong>
                                                                                                            <span>Agora mesmo</span>
                                                                                                                        </div>
                                                                                                                                </div>

                                                                                                                                        <p class="post-text"></p>

                                                                                                                                                <div class="post-actions">
                                                                                                                                                            <button class="like-button">Curtir</button>
                                                                                                                                                                        <button class="comment-button">Comentar</button>
                                                                                                                                                                                </div>

                                                                                                                                                                                        <div class="comments"></div>
                                                                                                                                                                                            `;

                                                                                                                                                                                                // Inserir texto com segurança
                                                                                                                                                                                                    post.querySelector(".post-text").textContent = texto;

                                                                                                                                                                                                        feed.prepend(post);

                                                                                                                                                                                                            input.value = "";
                                                                                                                                                                                                            });

                                                                                                                                                                                                            // Curtir e comentar
                                                                                                                                                                                                            feed.addEventListener("click", function(event) {

                                                                                                                                                                                                                // Curtir publicação
                                                                                                                                                                                                                    if (event.target.classList.contains("like-button")) {

                                                                                                                                                                                                                            const botao = event.target;

                                                                                                                                                                                                                                    botao.classList.toggle("liked");

                                                                                                                                                                                                                                            if (botao.classList.contains("liked")) {
                                                                                                                                                                                                                                                        botao.textContent = "Curtido ❤️";
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                            botao.textContent = "Curtir";
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                            // Comentar publicação
                                                                                                                                                                                                                                                                                                if (event.target.classList.contains("comment-button")) {

                                                                                                                                                                                                                                                                                                        const comentario = prompt("Digite seu comentário:");

                                                                                                                                                                                                                                                                                                                if (comentario && comentario.trim() !== "") {

                                                                                                                                                                                                                                                                                                                            const areaComentarios =
                                                                                                                                                                                                                                                                                                                                            event.target.closest(".post")
                                                                                                                                                                                                                                                                                                                                                            .querySelector(".comments");

                                                                                                                                                                                                                                                                                                                                                                        const novoComentario =
                                                                                                                                                                                                                                                                                                                                                                                        document.createElement("div");

                                                                                                                                                                                                                                                                                                                                                                                                    novoComentario.className = "comment";

                                                                                                                                                                                                                                                                                                                                                                                                                novoComentario.textContent =
                                                                                                                                                                                                                                                                                                                                                                                                                                "Você: " + comentario.trim();

                                                                                                                                                                                                                                                                                                                                                                                                                                            areaComentarios.appendChild(novoComentario);
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                        