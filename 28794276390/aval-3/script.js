
/* SISTEMA DE CURTIDAS */

document.querySelectorAll(".like").forEach(button => {

    button.addEventListener("click", function() {

            const post = this.closest(".post");
                    const likes = post.querySelector(".likes");

                            let total = Number(likes.dataset.total);

                                    if (this.classList.contains("liked")) {

                                                total--;
                                                            this.classList.remove("liked");
                                                                        this.textContent = "♡";

                                                                                } else {

                                                                                            total++;
                                                                                                        this.classList.add("liked");
                                                                                                                    this.textContent = "♥";

                                                                                                                            }

                                                                                                                                    likes.dataset.total = total;
                                                                                                                                            likes.textContent = total.toLocaleString("pt-BR") + " curtidas";

                                                                                                                                                });

                                                                                                                                                });


                                                                                                                                                /* ADICIONAR COMENTÁRIOS */

                                                                                                                                                document.querySelectorAll(".publish").forEach(button => {

                                                                                                                                                    button.addEventListener("click", function() {

                                                                                                                                                            const post = this.closest(".post");
                                                                                                                                                                    const input = post.querySelector("input");
                                                                                                                                                                            const comments = post.querySelector(".comments");

                                                                                                                                                                                    const text = input.value.trim();

                                                                                                                                                                                            if (text === "") {
                                                                                                                                                                                                        alert("Digite um comentário!");
                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                    const comment = document.createElement("p");
                                                                                                                                                                                                                                            const username = document.createElement("strong");

                                                                                                                                                                                                                                                    username.textContent = "voce ";
                                                                                                                                                                                                                                                            comment.appendChild(username);
                                                                                                                                                                                                                                                                    comment.appendChild(document.createTextNode(text));

                                                                                                                                                                                                                                                                            comments.appendChild(comment);

                                                                                                                                                                                                                                                                                    input.value = "";

                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                        });


                                                                                                                                                                                                                                                                                        /* ABRIR CAMPO DE COMENTÁRIO */

                                                                                                                                                                                                                                                                                        document.querySelectorAll(".comment-focus").forEach(button => {

                                                                                                                                                                                                                                                                                            button.addEventListener("click", function() {

                                                                                                                                                                                                                                                                                                    const post = this.closest(".post");
                                                                                                                                                                                                                                                                                                            post.querySelector("input").focus();

                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                                