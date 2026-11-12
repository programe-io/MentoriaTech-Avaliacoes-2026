
// Função para criar uma publicação
function publicarPost() {

    const texto = document.getElementById("textoPost").value;
        const imagem = document.getElementById("imagemPost").value;

            if (texto.trim() === "") {
                    alert("Digite alguma coisa antes de publicar!");
                            return;
                                }

                                    // Criar postagem
                                        const post = document.createElement("article");
                                            post.className = "post";

                                                const nome = document.createElement("h3");
                                                    nome.textContent = "Minha publicação";

                                                        const horario = document.createElement("small");
                                                            horario.textContent = "Agora";

                                                                const conteudo = document.createElement("p");
                                                                    conteudo.textContent = texto;

                                                                        post.append(nome, horario, conteudo);

                                                                            // Adicionar imagem, se existir
                                                                                if (imagem.trim() !== "") {
                                                                                        const foto = document.createElement("img");
                                                                                                foto.src = imagem;
                                                                                                        foto.alt = "Imagem da publicação";

                                                                                                                post.appendChild(foto);
                                                                                                                    }

                                                                                                                        // Criar botões
                                                                                                                            const acoes = document.createElement("div");
                                                                                                                                acoes.className = "acoes";

                                                                                                                                    acoes.innerHTML = `
                                                                                                                                            <button onclick="curtir(this)">♡ Curtir</button>
                                                                                                                                                    <button onclick="comentar()">💬 Comentar</button>
                                                                                                                                                            <button onclick="compartilhar(this)">↗ Compartilhar</button>
                                                                                                                                                                `;

                                                                                                                                                                    post.appendChild(acoes);

                                                                                                                                                                        // Colocar postagem no início do feed
                                                                                                                                                                            const lista = document.getElementById("listaPosts");
                                                                                                                                                                                lista.prepend(post);

                                                                                                                                                                                    // Limpar campos
                                                                                                                                                                                        document.getElementById("textoPost").value = "";
                                                                                                                                                                                            document.getElementById("imagemPost").value = "";

                                                                                                                                                                                                alert("Publicação realizada com sucesso!");
                                                                                                                                                                                                }

                                                                                                                                                                                                // Função de curtir
                                                                                                                                                                                                function curtir(botao) {

                                                                                                                                                                                                    if (botao.textContent.includes("Curtir")) {
                                                                                                                                                                                                            botao.textContent = "♥ Curtido";
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                        botao.textContent = "♡ Curtir";
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                            // Função de comentar
                                                                                                                                                                                                                            function comentar() {
                                                                                                                                                                                                                                const comentario = prompt("Digite seu comentário:");

                                                                                                                                                                                                                                    if (comentario && comentario.trim() !== "") {
                                                                                                                                                                                                                                            alert("Comentário registrado!");
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                // Função de compartilhar
                                                                                                                                                                                                                                                function compartilhar(botao) {
                                                                                                                                                                                                                                                    const post = botao.closest(".post");
                                                                                                                                                                                                                                                        const texto = post.querySelector("p").textContent;

                                                                                                                                                                                                                                                            if (navigator.clipboard) {
                                                                                                                                                                                                                                                                    navigator.clipboard.writeText(texto)
                                                                                                                                                                                                                                                                                .then(() => alert("Texto copiado para compartilhar!"))
                                                                                                                                                                                                                                                                                            .catch(() => alert("Não foi possível copiar o texto."));
                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                        alert("Compartilhe esta publicação: " + texto);
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                            