
const pesquisa = document.getElementById("pesquisa");

const posts = document.querySelectorAll(".post");

const mensagemVazia = document.getElementById("mensagemVazia");

// Função de pesquisa
pesquisa.addEventListener("input", function () {
    const textoPesquisa = pesquisa.value.toLowerCase();

        let encontrados = 0;

            posts.forEach(function (post) {
                    const textoPost = post.textContent.toLowerCase();

                            if (textoPost.includes(textoPesquisa)) {
                                        post.style.display = "block";
                                                    encontrados++;
                                                            } else {
                                                                        post.style.display = "none";
                                                                                }
                                                                                    });

                                                                                        // Mostrar mensagem se não encontrar posts
                                                                                            if (encontrados === 0) {
                                                                                                    mensagemVazia.style.display = "block";
                                                                                                        } else {
                                                                                                                mensagemVazia.style.display = "none";
                                                                                                                    }
                                                                                                                    });

                                                                                                                    // Botão de ler mais
                                                                                                                    const botoes = document.querySelectorAll(".ler-mais");

                                                                                                                    botoes.forEach(function (botao) {
                                                                                                                        botao.addEventListener("click", function () {
                                                                                                                                const post = botao.closest(".post");

                                                                                                                                        post.classList.toggle("aberto");

                                                                                                                                                if (post.classList.contains("aberto")) {
                                                                                                                                                            botao.textContent = "Ler menos ↑";
                                                                                                                                                                    } else {
                                                                                                                                                                                botao.textContent = "Ler mais →";
                                                                                                                                                                                        }
                                                                                                                                                                                            });
                                                                                                                                                                                            });
                                                                                                                                                                                            