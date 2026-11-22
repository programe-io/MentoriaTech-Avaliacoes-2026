
function curtir(botao) {
    let post = botao.closest(".post");
        let likes = post.querySelector(".likes");

            let quantidade = parseInt(likes.textContent);

                if (botao.textContent === "♡") {
                        botao.textContent = "❤️";
                                quantidade++;
                                    } else {
                                            botao.textContent = "♡";
                                                    quantidade--;
                                                        }

                                                            likes.textContent = quantidade + " curtidas";
                                                            }

                                                            function comentar(botao) {
                                                                let post = botao.closest(".post");
                                                                    let comentarios = post.querySelector(".comentarios");

                                                                        let texto = prompt("Digite seu comentário:");

                                                                            if (texto && texto.trim()) {
                                                                                    let p = document.createElement("p");
                                                                                            p.textContent = "Você: " + texto;
                                                                                                    comentarios.appendChild(p);
                                                                                                        }
                                                                                                        }

                                                                                                        function novaPostagem() {
                                                                                                            let texto = prompt("Digite a legenda da publicação:");

                                                                                                                if (texto) {
                                                                                                                        let post = document.createElement("article");
                                                                                                                                post.className = "post";

                                                                                                                                        post.innerHTML = `
                                                                                                                                                    <h3>👤 voce</h3>
                                                                                                                                                                <p>${texto}</p>
                                                                                                                                                                            <div class="acoes">
                                                                                                                                                                                            <button onclick="curtir(this)">♡</button>
                                                                                                                                                                                                            <button onclick="comentar(this)">💬</button>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                    <p><b class="likes">0 curtidas</b></p>
                                                                                                                                                                                                                                                <div class="comentarios"></div>
                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                document.getElementById("publicacoes")
                                                                                                                                                                                                                                                                            .prepend(post);
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                