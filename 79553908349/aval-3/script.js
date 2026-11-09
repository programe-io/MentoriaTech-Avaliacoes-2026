
// Sistema de curtidas
document.querySelectorAll(".like").forEach(button => {

    button.addEventListener("click", () => {

            button.classList.toggle("active");

                    if (button.classList.contains("active")) {
                                button.textContent = "♥";
                                        } else {
                                                    button.textContent = "♡";
                                                            }

                                                                });

                                                                });

                                                                // Sistema de comentários
                                                                document.querySelectorAll(".comment-form").forEach(form => {

                                                                    form.addEventListener("submit", event => {

                                                                            event.preventDefault();

                                                                                    const input = form.querySelector("input");
                                                                                            const text = input.value.trim();

                                                                                                    if (text === "") return;

                                                                                                            const comments = form.previousElementSibling;

                                                                                                                    const comment = document.createElement("p");

                                                                                                                            const username = document.createElement("strong");
                                                                                                                                    username.textContent = "Você ";

                                                                                                                                            comment.appendChild(username);
                                                                                                                                                    comment.appendChild(document.createTextNode(text));

                                                                                                                                                            comments.appendChild(comment);

                                                                                                                                                                    input.value = "";

                                                                                                                                                                        });

                                                                                                                                                                        });

                                                                                                                                                                        // Criar publicação
                                                                                                                                                                        document.getElementById("createBtn").addEventListener("click", event => {

                                                                                                                                                                            event.preventDefault();

                                                                                                                                                                                const caption = prompt("Digite a legenda da publicação:");

                                                                                                                                                                                    if (caption === null || caption.trim() === "") return;

                                                                                                                                                                                        const post = document.createElement("article");

                                                                                                                                                                                            post.className = "post";

                                                                                                                                                                                                const header = document.createElement("div");
                                                                                                                                                                                                    header.className = "post-header";

                                                                                                                                                                                                        const name = document.createElement("strong");
                                                                                                                                                                                                            name.textContent = "Você";

                                                                                                                                                                                                                header.appendChild(name);

                                                                                                                                                                                                                    const description = document.createElement("p");
                                                                                                                                                                                                                        description.textContent = caption;

                                                                                                                                                                                                                            post.appendChild(header);
                                                                                                                                                                                                                                post.appendChild(description);

                                                                                                                                                                                                                                    document.getElementById("feed").prepend(post);

                                                                                                                                                                                                                                        alert("Publicação criada!");

                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        