
// Funcionalidade de curtir publicações
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(botao => {
    let curtidas = 0;

        botao.addEventListener("click", () => {
                curtidas++;
                        botao.querySelector("span").textContent = curtidas;
                            });
                            });

                            // Funcionalidade de comentários
                            const botoesComentar = document.querySelectorAll(".comentar");

                            botoesComentar.forEach(botao => {
                                botao.addEventListener("click", () => {

                                        const area = botao.parentElement;
                                                const campo = area.querySelector("input");
                                                        const lista = area.querySelector(".lista-comentarios");

                                                                const texto = campo.value.trim();

                                                                        if (texto === "") {
                                                                                    alert("Digite um comentário!");
                                                                                                return;
                                                                                                        }

                                                                                                                const comentario = document.createElement("p");
                                                                                                                        comentario.textContent = "💬 " + texto;

                                                                                                                                lista.appendChild(comentario);

                                                                                                                                        campo.value = "";
                                                                                                                                            });
                                                                                                                                            });

                                                                                                                                            // Pesquisa de publicações
                                                                                                                                            const campoPesquisa = document.getElementById("campoPesquisa");

                                                                                                                                            campoPesquisa.addEventListener("input", () => {

                                                                                                                                                const pesquisa = campoPesquisa.value.toLowerCase();

                                                                                                                                                    const posts = document.querySelectorAll(".post");

                                                                                                                                                        posts.forEach(post => {

                                                                                                                                                                const conteudo = post.textContent.toLowerCase();

                                                                                                                                                                        if (conteudo.includes(pesquisa)) {
                                                                                                                                                                                    post.style.display = "block";
                                                                                                                                                                                            } else {
                                                                                                                                                                                                        post.style.display = "none";
                                                                                                                                                                                                                }

                                                                                                                                                                                                                    });
                                                                                                                                                                                                                    });
                                                                                                                                                                                                                    