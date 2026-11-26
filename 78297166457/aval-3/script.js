
// SISTEMA DE CURTIDAS

document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", () => {

            const icon = button.querySelector("i");
                    const post = button.closest(".post");
                            const likes = post.querySelector(".likes");

                                    let quantidade = Number(
                                                likes.textContent.replace(/\D/g, "")
                                                        );

                                                                if (icon.classList.contains("fa-regular")) {

                                                                            icon.classList.replace("fa-regular", "fa-solid");
                                                                                        button.classList.add("liked");

                                                                                                    quantidade++;

                                                                                                            } else {

                                                                                                                        icon.classList.replace("fa-solid", "fa-regular");
                                                                                                                                    button.classList.remove("liked");

                                                                                                                                                quantidade--;
                                                                                                                                                        }

                                                                                                                                                                likes.textContent = quantidade.toLocaleString("pt-BR") + " curtidas";

                                                                                                                                                                    });

                                                                                                                                                                    });


                                                                                                                                                                    // SISTEMA DE SALVAR PUBLICAÇÃO

                                                                                                                                                                    document.querySelectorAll(".save-btn").forEach(button => {

                                                                                                                                                                        button.addEventListener("click", () => {

                                                                                                                                                                                const icon = button.querySelector("i");

                                                                                                                                                                                        if (icon.classList.contains("fa-regular")) {

                                                                                                                                                                                                    icon.classList.replace("fa-regular", "fa-solid");
                                                                                                                                                                                                                button.classList.add("saved");

                                                                                                                                                                                                                        } else {

                                                                                                                                                                                                                                    icon.classList.replace("fa-solid", "fa-regular");
                                                                                                                                                                                                                                                button.classList.remove("saved");

                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                            });


                                                                                                                                                                                                                                                            // SISTEMA DE COMENTÁRIOS

                                                                                                                                                                                                                                                            document.querySelectorAll(".publish-comment").forEach(button => {

                                                                                                                                                                                                                                                                button.addEventListener("click", () => {

                                                                                                                                                                                                                                                                        const post = button.closest(".post");
                                                                                                                                                                                                                                                                                const input = post.querySelector("input");
                                                                                                                                                                                                                                                                                        const texto = input.value.trim();

                                                                                                                                                                                                                                                                                                if (texto === "") {
                                                                                                                                                                                                                                                                                                            alert("Digite um comentário!");
                                                                                                                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                        const novoComentario = document.createElement("p");

                                                                                                                                                                                                                                                                                                                                                novoComentario.innerHTML = `<strong>Você:</strong> `;
                                                                                                                                                                                                                                                                                                                                                        novoComentario.appendChild(
                                                                                                                                                                                                                                                                                                                                                                    document.createTextNode(texto)
                                                                                                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                                                                                                                    post.querySelector(".post-info").appendChild(novoComentario);

                                                                                                                                                                                                                                                                                                                                                                                            input.value = "";

                                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                                });


                                                                                                                                                                                                                                                                                                                                                                                                // BOTÃO SEGUIR

                                                                                                                                                                                                                                                                                                                                                                                                document.querySelectorAll(".suggestion button").forEach(button => {

                                                                                                                                                                                                                                                                                                                                                                                                    button.addEventListener("click", () => {

                                                                                                                                                                                                                                                                                                                                                                                                            if (button.textContent === "Seguir") {
                                                                                                                                                                                                                                                                                                                                                                                                                        button.textContent = "Seguindo";
                                                                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                            button.textContent = "Seguir";
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                                                                        