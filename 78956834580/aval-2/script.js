// FILTRAR NOTÍCIAS

function filtrar(categoria) {

    const posts = document.querySelectorAll(".post");

        posts.forEach(function(post) {

                if (
                            categoria === "todas" ||
                                        post.dataset.categoria === categoria
                                                ) {

                                                            post.style.display = "flex";

                                                                    } else {

                                                                                post.style.display = "none";

                                                                                        }

                                                                                            });
                                                                                            }


                                                                                            // PESQUISAR

                                                                                            function pesquisar() {

                                                                                                const campo = document
                                                                                                        .getElementById("campoPesquisa")
                                                                                                                .value
                                                                                                                        .toLowerCase();

                                                                                                                            const posts = document.querySelectorAll(".post");

                                                                                                                                posts.forEach(function(post) {

                                                                                                                                        const texto = post.innerText.toLowerCase();

                                                                                                                                                if (texto.includes(campo)) {

                                                                                                                                                            post.style.display = "flex";

                                                                                                                                                                    } else {

                                                                                                                                                                                post.style.display = "none";

                                                                                                                                                                                        }

                                                                                                                                                                                            });

                                                                                                                                                                                            }


                                                                                                                                                                                            // CURTIR

                                                                                                                                                                                            function curtir(botao) {

                                                                                                                                                                                                let numero = parseInt(
                                                                                                                                                                                                        botao.innerText.replace("♡", "")
                                                                                                                                                                                                            );

                                                                                                                                                                                                                numero++;

                                                                                                                                                                                                                    botao.innerText = "♥ " + numero;

                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    