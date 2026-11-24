
// CURTIR PUBLICAÇÃO
function curtir(botao) {
    const post = botao.closest(".post");
        const likes = post.querySelector(".likes");

            let numero = parseInt(
                    likes.textContent.replace(/\D/g, "")
                        );

                            if (botao.classList.contains("liked")) {
                                    numero--;
                                            botao.classList.remove("liked");
                                                    botao.innerHTML = "♡";
                                                        } else {
                                                                numero++;
                                                                        botao.classList.add("liked");
                                                                                botao.innerHTML = "♥";
                                                                                    }

                                                                                        likes.textContent =
                                                                                                numero.toLocaleString("pt-BR") + " curtidas";
                                                                                                }

                                                                                                // ABRIR CAMPO DE COMENTÁRIO
                                                                                                function comentar(botao) {
                                                                                                    const post = botao.closest(".post");

                                                                                                        post.querySelector(
                                                                                                                ".comment-area input"
                                                                                                                    ).focus();
                                                                                                                    }

                                                                                                                    // PUBLICAR COMENTÁRIO
                                                                                                                    function publicarComentario(botao) {
                                                                                                                        const area = botao.parentElement;
                                                                                                                            const input = area.querySelector("input");
                                                                                                                                const texto = input.value.trim();

                                                                                                                                    if (texto === "") {
                                                                                                                                            alert("Digite um comentário!");
                                                                                                                                                    return;
                                                                                                                                                        }

                                                                                                                                                            const comentario = document.createElement("p");

                                                                                                                                                                comentario.style.padding = "8px 12px";
                                                                                                                                                                    comentario.textContent = "Você: " + texto;

                                                                                                                                                                        area.parentElement
                                                                                                                                                                                .querySelector(".post-info")
                                                                                                                                                                                        .appendChild(comentario);

                                                                                                                                                                                            input.value = "";
                                                                                                                                                                                            }

                                                                                                                                                                                            // COMPARTILHAR PUBLICAÇÃO
                                                                                                                                                                                            function compartilhar() {
                                                                                                                                                                                                if (navigator.share) {
                                                                                                                                                                                                        navigator.share({
                                                                                                                                                                                                                    title: "InstaClone",
                                                                                                                                                                                                                                text: "Veja esta publicação!"
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                    alert("Compartilhamento não disponível.");
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                        // CRIAR PUBLICAÇÃO
                                                                                                                                                                                                                                                        function criarPost() {
                                                                                                                                                                                                                                                            const legenda = prompt(
                                                                                                                                                                                                                                                                    "Digite a legenda da publicação:"
                                                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                                                            if (legenda === null) return;

                                                                                                                                                                                                                                                                                const url = prompt(
                                                                                                                                                                                                                                                                                        "Cole o endereço de uma imagem:"
                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                                if (!url) return;

                                                                                                                                                                                                                                                                                                    const post = document.createElement("article");
                                                                                                                                                                                                                                                                                                        post.className = "post";

                                                                                                                                                                                                                                                                                                            const header = document.createElement("div");
                                                                                                                                                                                                                                                                                                                header.className = "post-header";

                                                                                                                                                                                                                                                                                                                    const nome = document.createElement("strong");
                                                                                                                                                                                                                                                                                                                        nome.textContent = "seu_perfil";

                                                                                                                                                                                                                                                                                                                            header.appendChild(nome);

                                                                                                                                                                                                                                                                                                                                const imagem = document.createElement("img");
                                                                                                                                                                                                                                                                                                                                    imagem.className = "post-image";
                                                                                                                                                                                                                                                                                                                                        imagem.src = url;

                                                                                                                                                                                                                                                                                                                                            const texto = document.createElement("p");
                                                                                                                                                                                                                                                                                                                                                texto.style.padding = "12px";
                                                                                                                                                                                                                                                                                                                                                    texto.textContent = "Você: " + legenda;

                                                                                                                                                                                                                                                                                                                                                        post.append(header, imagem, texto);

                                                                                                                                                                                                                                                                                                                                                            document.getElementById("feed").prepend(post);

                                                                                                                                                                                                                                                                                                                                                                post.scrollIntoView({
                                                                                                                                                                                                                                                                                                                                                                        behavior: "smooth"
                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                            