
let publicacoes = [];

function publicar() {
    const nome = document.getElementById("nome").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !mensagem) {
                    alert("Preencha seu nome e sua publicação!");
                            return;
                                }

                                    publicacoes.unshift({
                                            id: Date.now(),
                                                    nome: nome,
                                                            mensagem: mensagem,
                                                                    curtidas: 0,
                                                                            comentarios: []
                                                                                });

                                                                                    document.getElementById("mensagem").value = "";
                                                                                        mostrarFeed();
                                                                                        }

                                                                                        function curtir(id) {
                                                                                            const post = publicacoes.find(p => p.id === id);
                                                                                                post.curtidas++;
                                                                                                    mostrarFeed();
                                                                                                    }

                                                                                                    function comentar(id) {
                                                                                                        const texto = prompt("Digite seu comentário:");

                                                                                                            if (!texto || !texto.trim()) return;

                                                                                                                const post = publicacoes.find(p => p.id === id);
                                                                                                                    post.comentarios.push(texto.trim());

                                                                                                                        mostrarFeed();
                                                                                                                        }

                                                                                                                        function excluir(id) {
                                                                                                                            publicacoes = publicacoes.filter(p => p.id !== id);
                                                                                                                                mostrarFeed();
                                                                                                                                }

                                                                                                                                function mostrarFeed() {
                                                                                                                                    const feed = document.getElementById("feed");

                                                                                                                                        feed.innerHTML = "";

                                                                                                                                            publicacoes.forEach(post => {
                                                                                                                                                    const div = document.createElement("article");
                                                                                                                                                            div.className = "post";

                                                                                                                                                                    const titulo = document.createElement("h3");
                                                                                                                                                                            titulo.textContent = "👤 " + post.nome;

                                                                                                                                                                                    const texto = document.createElement("p");
                                                                                                                                                                                            texto.textContent = post.mensagem;

                                                                                                                                                                                                    const acoes = document.createElement("div");
                                                                                                                                                                                                            acoes.className = "acoes";

                                                                                                                                                                                                                    const curtirBtn = document.createElement("button");
                                                                                                                                                                                                                            curtirBtn.textContent = "❤️ Curtir (" + post.curtidas + ")";
                                                                                                                                                                                                                                    curtirBtn.onclick = () => curtir(post.id);

                                                                                                                                                                                                                                            const comentarBtn = document.createElement("button");
                                                                                                                                                                                                                                                    comentarBtn.textContent = "💬 Comentar";
                                                                                                                                                                                                                                                            comentarBtn.onclick = () => comentar(post.id);

                                                                                                                                                                                                                                                                    const excluirBtn = document.createElement("button");
                                                                                                                                                                                                                                                                            excluirBtn.textContent = "🗑️ Excluir";
                                                                                                                                                                                                                                                                                    excluirBtn.onclick = () => excluir(post.id);

                                                                                                                                                                                                                                                                                            acoes.append(curtirBtn, comentarBtn, excluirBtn);

                                                                                                                                                                                                                                                                                                    div.append(titulo, texto, acoes);

                                                                                                                                                                                                                                                                                                            post.comentarios.forEach(comentario => {
                                                                                                                                                                                                                                                                                                                        const p = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                    p.className = "comentario";
                                                                                                                                                                                                                                                                                                                                                p.textContent = "💬 " + comentario;
                                                                                                                                                                                                                                                                                                                                                            div.appendChild(p);
                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                            feed.appendChild(div);
                                                                                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                