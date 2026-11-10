const posts = document.querySelectorAll(".post");

posts.forEach((post) => {
    const likeButton = post.querySelector(".like-button");
        const likeCount = post.querySelector(".like-count");
            const originalCount = Number(likeCount.textContent.match(/[\d.]+/)[0].replaceAll(".", ""));
                let liked = false;

                    likeButton.addEventListener("click", () => {
                            liked = !liked;
                                    likeButton.classList.toggle("liked", liked);
                                            likeButton.textContent = liked ? "♥" : "♡";
                                                    likeButton.setAttribute("aria-pressed", String(liked));
                                                            likeCount.textContent = `${(originalCount + (liked ? 1 : 0)).toLocaleString("pt-BR")} curtidas`;
                                                                });

                                                                    const saveButton = post.querySelector(".save-button");
                                                                        saveButton.addEventListener("click", () => {
                                                                                const saved = saveButton.getAttribute("aria-pressed") !== "true";
                                                                                        saveButton.setAttribute("aria-pressed", String(saved));
                                                                                                saveButton.classList.toggle("saved", saved);
                                                                                                        saveButton.textContent = saved ? "▣" : "♧";
                                                                                                                saveButton.setAttribute("aria-label", saved ? "Remover publicação dos salvos" : "Salvar publicação");
                                                                                                                    });

                                                                                                                        const commentForm = post.querySelector(".comment-form");
                                                                                                                            const commentInput = commentForm.querySelector("input");
                                                                                                                                const publishButton = commentForm.querySelector("button");
                                                                                                                                    commentInput.addEventListener("input", () => {
                                                                                                                                            publishButton.disabled = !commentInput.value.trim();
                                                                                                                                                });
                                                                                                                                                    commentForm.addEventListener("submit", (event) => {
                                                                                                                                                            event.preventDefault();
                                                                                                                                                                    const comment = commentInput.value.trim();
                                                                                                                                                                            if (!comment) return;

                                                                                                                                                                                    const commentText = document.createElement("p");
                                                                                                                                                                                            const username = document.createElement("strong");
                                                                                                                                                                                                    username.textContent = "meu.perfil";
                                                                                                                                                                                                            commentText.append(username, document.createTextNode(` ${comment}`));
                                                                                                                                                                                                                    post.querySelector(".post-copy").insertBefore(commentText, post.querySelector(".comments"));
                                                                                                                                                                                                                            commentInput.value = "";
                                                                                                                                                                                                                                    publishButton.disabled = true;
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        document.querySelectorAll(".story").forEach((story) => {
                                                                                                                                                                                                                                            story.addEventListener("click", () => {
                                                                                                                                                                                                                                                    const username = story.getAttribute("aria-label").replace("Ver story de ", "");
                                                                                                                                                                                                                                                            window.alert(username === "você" ? "Crie seu primeiro story!" : `Story de ${username}`);
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                document.querySelectorAll(".follow-button").forEach((button) => {
                                                                                                                                                                                                                                                                    if (button.textContent.trim() === "Seguir") {
                                                                                                                                                                                                                                                                            button.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                        const following = button.textContent.trim() === "Seguir";
                                                                                                                                                                                                                                                                                                    button.textContent = following ? "Seguindo" : "Seguir";
                                                                                                                                                                                                                                                                                                                button.style.color = following ? "#8e8e8e" : "#0095f6";
                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                            