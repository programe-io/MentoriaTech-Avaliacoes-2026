
// CURTIR PUBLICAÇÃO
function curtir(botao) {

    botao.classList.toggle("active");

        const artigo = botao.closest(".post");
            const contador = artigo.querySelector(".likes");

                let likes = Number(contador.innerText);

                    if (botao.classList.contains("active")) {
                            likes++;
                                    botao.classList.remove("fa-regular");
                                            botao.classList.add("fa-solid");
                                                } else {
                                                        likes--;
                                                                botao.classList.remove("fa-solid");
                                                                        botao.classList.add("fa-regular");
                                                                            }

                                                                                contador.innerText = likes.toLocaleString("pt-BR");
                                                                                }

                                                                                // ABRIR MODAL
                                                                                function abrirModal() {
                                                                                    document.getElementById("modal")
                                                                                        .classList.remove("hidden");
                                                                                        }

                                                                                        // FECHAR MODAL
                                                                                        function fecharModal() {
                                                                                            document.getElementById("modal")
                                                                                                .classList.add("hidden");
                                                                                                }

                                                                                                // CRIAR PUBLICAÇÃO
                                                                                                function publicar() {

                                                                                                    const texto = document.getElementById("postText").value;

                                                                                                        if (texto.trim() === "") {
                                                                                                                alert("Digite uma legenda!");
                                                                                                                        return;
                                                                                                                            }

                                                                                                                                const feed = document.querySelector(".feed");

                                                                                                                                    const novoPost = document.createElement("article");

                                                                                                                                        novoPost.className = "post mt-8";

                                                                                                                                            const cabecalho = document.createElement("div");
                                                                                                                                                cabecalho.className = "flex items-center gap-3 p-3";

                                                                                                                                                    const avatar = document.createElement("img");
                                                                                                                                                        avatar.src = "https://i.pravatar.cc/100?img=12";
                                                                                                                                                            avatar.className = "avatar";

                                                                                                                                                                const nome = document.createElement("strong");
                                                                                                                                                                    nome.textContent = "seu_perfil";

                                                                                                                                                                        cabecalho.append(avatar, nome);

                                                                                                                                                                            const conteudo = document.createElement("div");
                                                                                                                                                                                conteudo.className = "p-3";

                                                                                                                                                                                    const legenda = document.createElement("p");
                                                                                                                                                                                        legenda.textContent = texto;

                                                                                                                                                                                            conteudo.appendChild(legenda);

                                                                                                                                                                                                novoPost.append(cabecalho, conteudo);

                                                                                                                                                                                                    feed.appendChild(novoPost);

                                                                                                                                                                                                        document.getElementById("postText").value = "";

                                                                                                                                                                                                            fecharModal();

                                                                                                                                                                                                                alert("Publicação criada!");
                                                                                                                                                                                                                }

                                                                                                                                                                                                                // SUGESTÕES
                                                                                                                                                                                                                const usuarios = [
                                                                                                                                                                                                                    "joao.silva",
                                                                                                                                                                                                                        "maria_oficial",
                                                                                                                                                                                                                            "pedro123",
                                                                                                                                                                                                                                "ana.costa"
                                                                                                                                                                                                                                ];

                                                                                                                                                                                                                                const lista = document.getElementById("suggestions-list");

                                                                                                                                                                                                                                usuarios.forEach((usuario, index) => {

                                                                                                                                                                                                                                    const item = document.createElement("div");

                                                                                                                                                                                                                                        item.className =
                                                                                                                                                                                                                                            "flex items-center gap-3 mb-5";

                                                                                                                                                                                                                                                item.innerHTML = `
                                                                                                                                                                                                                                                        <img src="https://i.pravatar.cc/100?img=${index + 30}"
                                                                                                                                                                                                                                                                class="avatar">

                                                                                                                                                                                                                                                                        <strong class="text-sm">${usuario}</strong>

                                                                                                                                                                                                                                                                                <button class="text-blue-400 text-sm ml-auto">
                                                                                                                                                                                                                                                                                            Seguir
                                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                                                            lista.appendChild(item);

                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                            