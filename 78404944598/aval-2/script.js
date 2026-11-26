
// SISTEMA DE CURTIDAS
document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", () => {

            const icon = button.querySelector("i");
                    const post = button.closest(".post");
                            const count = post.querySelector(".like-count");

                                    let likes = Number(count.textContent.replace(".", ""));

                                            if (button.classList.contains("liked")) {

                                                        button.classList.remove("liked");
                                                                    icon.classList.replace("fa-solid", "fa-regular");

                                                                                likes--;

                                                                                        } else {

                                                                                                    button.classList.add("liked");
                                                                                                                icon.classList.replace("fa-regular", "fa-solid");

                                                                                                                            likes++;
                                                                                                                                    }

                                                                                                                                            count.textContent = likes.toLocaleString("pt-BR");
                                                                                                                                                });

                                                                                                                                                });


                                                                                                                                                // SISTEMA DE SALVAR PUBLICAÇÃO
                                                                                                                                                document.querySelectorAll(".save-btn").forEach(button => {

                                                                                                                                                    button.addEventListener("click", () => {

                                                                                                                                                            const icon = button.querySelector("i");

                                                                                                                                                                    button.classList.toggle("saved");

                                                                                                                                                                            if (button.classList.contains("saved")) {

                                                                                                                                                                                        icon.classList.replace("fa-regular", "fa-solid");

                                                                                                                                                                                                } else {

                                                                                                                                                                                                            icon.classList.replace("fa-solid", "fa-regular");

                                                                                                                                                                                                                    }

                                                                                                                                                                                                                        });

                                                                                                                                                                                                                        });


                                                                                                                                                                                                                        // SISTEMA DE COMENTÁRIOS
                                                                                                                                                                                                                        document.querySelectorAll(".comment-form").forEach(form => {

                                                                                                                                                                                                                            form.addEventListener("submit", event => {

                                                                                                                                                                                                                                    event.preventDefault();

                                                                                                                                                                                                                                            const input = form.querySelector("input");
                                                                                                                                                                                                                                                    const comentario = input.value.trim();

                                                                                                                                                                                                                                                            if (comentario === "") return;

                                                                                                                                                                                                                                                                    const post = form.closest(".post");

                                                                                                                                                                                                                                                                            const novoComentario = document.createElement("p");

                                                                                                                                                                                                                                                                                    novoComentario.className = "caption";
                                                                                                                                                                                                                                                                                            novoComentario.textContent = "Você: " + comentario;

                                                                                                                                                                                                                                                                                                    post.insertBefore(novoComentario, form);

                                                                                                                                                                                                                                                                                                            input.value = "";

                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                                                                                                // CLIQUE NOS STORIES
                                                                                                                                                                                                                                                                                                                document.querySelectorAll(".story").forEach(story => {

                                                                                                                                                                                                                                                                                                                    story.addEventListener("click", () => {

                                                                                                                                                                                                                                                                                                                            const nome = story.querySelector("span").textContent;

                                                                                                                                                                                                                                                                                                                                    alert("Você abriu o story de " + nome);

                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                        