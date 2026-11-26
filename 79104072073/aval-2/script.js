
const textoPost = document.getElementById("textoPost");
const publicar = document.getElementById("publicar");
const feed = document.getElementById("feed");

// Criar publicação
publicar.addEventListener("click", function () {
    const texto = textoPost.value.trim();

        if (texto === "") {
                alert("Escreva algo antes de publicar!");
                        return;
                            }

                                const post = document.createElement("article");
                                    post.classList.add("post");

                                        post.innerHTML = `
                                                <div class="post-header">
                                                            <img src="https://i.pravatar.cc/150?img=47" alt="Foto de perfil">
                                                                        <div>
                                                                                        <h3>Seu Nome</h3>
                                                                                                        <span>@seuusuario · agora</span>
                                                                                                                    </div>
                                                                                                                            </div>

                                                                                                                                    <p class="texto-post"></p>

                                                                                                                                            <div class="acoes">
                                                                                                                                                        <button class="curtir">♡ Curtir <span>0</span></button>
                                                                                                                                                                    <button class="comentar">💬 Comentar</button>
                                                                                                                                                                            </div>

                                                                                                                                                                                    <div class="comentarios"></div>
                                                                                                                                                                                        `;

                                                                                                                                                                                            post.querySelector(".texto-post").textContent = texto;

                                                                                                                                                                                                feed.prepend(post);
                                                                                                                                                                                                    textoPost.value = "";
                                                                                                                                                                                                    });

                                                                                                                                                                                                    // Curtir publicações
                                                                                                                                                                                                    document.addEventListener("click", function (event) {
                                                                                                                                                                                                        const botao = event.target.closest(".curtir");

                                                                                                                                                                                                            if (!botao) return;

                                                                                                                                                                                                                const contador = botao.querySelector("span");
                                                                                                                                                                                                                    let quantidade = Number(contador.textContent);

                                                                                                                                                                                                                        if (botao.classList.contains("curtido")) {
                                                                                                                                                                                                                                quantidade--;
                                                                                                                                                                                                                                        botao.classList.remove("curtido");
                                                                                                                                                                                                                                                botao.innerHTML = `♡ Curtir <span>${quantidade}</span>`;
                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                            quantidade++;
                                                                                                                                                                                                                                                                    botao.classList.add("curtido");
                                                                                                                                                                                                                                                                            botao.innerHTML = `♥ Curtido <span>${quantidade}</span>`;
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                // Comentar publicações
                                                                                                                                                                                                                                                                                document.addEventListener("click", function (event) {
                                                                                                                                                                                                                                                                                    const botao = event.target.closest(".comentar");

                                                                                                                                                                                                                                                                                        if (!botao) return;

                                                                                                                                                                                                                                                                                            const post = botao.closest(".post");
                                                                                                                                                                                                                                                                                                const comentarios = post.querySelector(".comentarios");

                                                                                                                                                                                                                                                                                                    const texto = prompt("Escreva seu comentário:");

                                                                                                                                                                                                                                                                                                        if (texto && texto.trim() !== "") {
                                                                                                                                                                                                                                                                                                                const comentario = document.createElement("p");

                                                                                                                                                                                                                                                                                                                        comentario.textContent = "Você: " + texto.trim();
                                                                                                                                                                                                                                                                                                                                comentario.style.marginTop = "12px";

                                                                                                                                                                                                                                                                                                                                        comentarios.appendChild(comentario);
                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                            