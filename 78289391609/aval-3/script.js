
/* Curtidas */
document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
            button.classList.toggle("liked");

                    if (button.classList.contains("liked")) {
                                button.textContent = "♥";
                                        } else {
                                                    button.textContent = "♡";
                                                            }
                                                                });
                                                                });

                                                                /* Comentários */
                                                                document.querySelectorAll(".comment-btn").forEach(button => {
                                                                    button.addEventListener("click", () => {
                                                                            const box = button.parentElement;
                                                                                    const input = box.querySelector("input");
                                                                                            const post = button.closest(".post");
                                                                                                    const text = input.value.trim();

                                                                                                            if (text === "") {
                                                                                                                        return;
                                                                                                                                }

                                                                                                                                        const comment = document.createElement("p");

                                                                                                                                                comment.innerHTML = "<strong>seu_perfil</strong> ";
                                                                                                                                                        comment.appendChild(document.createTextNode(text));

                                                                                                                                                                post.insertBefore(comment, box);

                                                                                                                                                                        input.value = "";
                                                                                                                                                                            });
                                                                                                                                                                            });

                                                                                                                                                                            /* Salvar publicação */
                                                                                                                                                                            document.querySelectorAll(".save").forEach(button => {
                                                                                                                                                                                button.addEventListener("click", () => {
                                                                                                                                                                                        button.textContent =
                                                                                                                                                                                                    button.textContent === "♧" ? "▣" : "♧";
                                                                                                                                                                                                        });
                                                                                                                                                                                                        });
                                                                                                                                                                                                        