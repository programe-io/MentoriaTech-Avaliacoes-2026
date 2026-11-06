
function curtir(botao) {
    const post = botao.closest(".post");
        const contador = post.querySelector(".likes");

            let numero = parseInt(contador.textContent);

                if (botao.classList.contains("liked")) {
                        botao.classList.remove("liked");
                                botao.textContent = "♡";
                                        numero--;
                                            } else {
                                                    botao.classList.add("liked");
                                                            botao.textContent = "♥";
                                                                    numero++;
                                                                        }

                                                                            contador.textContent = numero + " curtidas";
                                                                            }

                                                                            function comentar(botao) {
                                                                                const post = botao.closest(".post");

                                                                                    const texto = prompt("Digite seu comentário:");

                                                                                        if (texto && texto.trim() !== "") {
                                                                                                const comentarios = post.querySelector(".comentarios");

                                                                                                        const novo = document.createElement("p");
                                                                                                                novo.className = "comentario";

                                                                                                                        const nome = document.createElement("strong");
                                                                                                                                nome.textContent = "luisgustavo ";

                                                                                                                                        novo.appendChild(nome);
                                                                                                                                                novo.appendChild(document.createTextNode(texto));

                                                                                                                                                        comentarios.appendChild(novo);
                                                                                                                                                            }
                                                                                                                                                            }

                                                                                                                                                            function salvar(botao) {
                                                                                                                                                                if (botao.textContent === "▢") {
                                                                                                                                                                        botao.textContent = "▣";
                                                                                                                                                                                botao.classList.add("liked");
                                                                                                                                                                                    } else {
                                                                                                                                                                                            botao.textContent = "▢";
                                                                                                                                                                                                    botao.classList.remove("liked");
                                                                                                                                                                                                        }
                                                                                                                                                                                                        }

                                                                                                                                                                                                        function novaPublicacao() {
                                                                                                                                                                                                            const legenda = prompt("Digite a legenda da publicação:");

                                                                                                                                                                                                                if (!legenda || !legenda.trim()) return;

                                                                                                                                                                                                                    const post = document.createElement("article");
                                                                                                                                                                                                                        post.className = "post";

                                                                                                                                                                                                                            post.innerHTML = `
                                                                                                                                                                                                                                    <div class="post-header">
                                                                                                                                                                                                                                                <div class="avatar">LG</div>
                                                                                                                                                                                                                                                            <strong>luisgustavo</strong>
                                                                                                                                                                                                                                                                        <span>•••</span>
                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                        <div class="foto foto1">
                                                                                                                                                                                                                                                                                                    LUIS GUSTAVO
                                                                                                                                                                                                                                                                                                                <small>NOVA PUBLICAÇÃO</small>
                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                <div class="acoes">
                                                                                                                                                                                                                                                                                                                                            <button onclick="curtir(this)">♡</button>
                                                                                                                                                                                                                                                                                                                                                        <button onclick="comentar(this)">♧</button>
                                                                                                                                                                                                                                                                                                                                                                    <button>➤</button>
                                                                                                                                                                                                                                                                                                                                                                                <button class="salvar" onclick="salvar(this)">▢</button>
                                                                                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                                                                                <div class="descricao">
                                                                                                                                                                                                                                                                                                                                                                                                            <strong class="likes">0 curtidas</strong>
                                                                                                                                                                                                                                                                                                                                                                                                                        <p><b>luisgustavo</b> ${legenda.replace(/[&<>"']/g, c => ({
                                                                                                                                                                                                                                                                                                                                                                                                                                        '&':'&amp;', '<':'&lt;', '>':'&gt;',
                                                                                                                                                                                                                                                                                                                                                                                                                                                        '"':'&quot;', "'":'&#39;'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    })[c])}</p>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <div class="comentarios"></div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            `;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                document.getElementById("feed").prepend(post);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                