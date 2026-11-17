
// Curtir publicação
function likePost(button) {
    const count = button.querySelector("span");

        let likes = Number(count.textContent);

            if (button.classList.contains("liked")) {
                    likes--;
                            button.classList.remove("liked");
                                } else {
                                        likes++;
                                                button.classList.add("liked");
                                                    }

                                                        count.textContent = likes;
                                                            button.style.color = button.classList.contains("liked")
                                                                    ? "#e11d48"
                                                                            : "#555";
                                                                            }

                                                                            // Criar publicação
                                                                            function createPost() {
                                                                                const text = document.getElementById("postText");
                                                                                    const content = text.value.trim();

                                                                                        if (!content) {
                                                                                                alert("Digite algo antes de publicar!");
                                                                                                        return;
                                                                                                            }

                                                                                                                const post = document.createElement("article");
                                                                                                                    post.className = "post";

                                                                                                                        const header = document.createElement("div");
                                                                                                                            header.className = "post-header";

                                                                                                                                const avatar = document.createElement("div");
                                                                                                                                    avatar.className = "avatar";
                                                                                                                                        avatar.textContent = "👤";

                                                                                                                                            const info = document.createElement("div");
                                                                                                                                                const name = document.createElement("strong");
                                                                                                                                                    name.textContent = "Você";

                                                                                                                                                        const time = document.createElement("small");
                                                                                                                                                            time.textContent = "Agora";

                                                                                                                                                                info.append(name, time);
                                                                                                                                                                    header.append(avatar, info);

                                                                                                                                                                        const paragraph = document.createElement("p");
                                                                                                                                                                            paragraph.textContent = content;

                                                                                                                                                                                const actions = document.createElement("div");
                                                                                                                                                                                    actions.className = "post-actions";

                                                                                                                                                                                        actions.innerHTML = `
                                                                                                                                                                                                <button onclick="likePost(this)">
                                                                                                                                                                                                            ❤️ Curtir <span>0</span>
                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                            <button onclick="commentPost(this)">💬 Comentar</button>
                                                                                                                                                                                                                                    <button onclick="sharePost()">🔗 Compartilhar</button>
                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                            const comments = document.createElement("div");
                                                                                                                                                                                                                                                comments.className = "comments";

                                                                                                                                                                                                                                                    post.append(header, paragraph, actions, comments);

                                                                                                                                                                                                                                                        document.getElementById("posts").prepend(post);

                                                                                                                                                                                                                                                            text.value = "";
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                            // Comentar
                                                                                                                                                                                                                                                            function commentPost(button) {
                                                                                                                                                                                                                                                                const post = button.closest(".post");
                                                                                                                                                                                                                                                                    const comments = post.querySelector(".comments");

                                                                                                                                                                                                                                                                        const comment = prompt("Digite seu comentário:");

                                                                                                                                                                                                                                                                            if (comment && comment.trim()) {
                                                                                                                                                                                                                                                                                    const newComment = document.createElement("div");
                                                                                                                                                                                                                                                                                            newComment.className = "comment";
                                                                                                                                                                                                                                                                                                    newComment.textContent = "👤 Você: " + comment.trim();

                                                                                                                                                                                                                                                                                                            comments.appendChild(newComment);
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                // Compartilhar
                                                                                                                                                                                                                                                                                                                function sharePost() {
                                                                                                                                                                                                                                                                                                                    const url = window.location.href;

                                                                                                                                                                                                                                                                                                                        if (navigator.share) {
                                                                                                                                                                                                                                                                                                                                navigator.share({
                                                                                                                                                                                                                                                                                                                                            title: "Meu Social Feed",
                                                                                                                                                                                                                                                                                                                                                        text: "Confira esta publicação!",
                                                                                                                                                                                                                                                                                                                                                                    url: url
                                                                                                                                                                                                                                                                                                                                                                            }).catch(() => {});
                                                                                                                                                                                                                                                                                                                                                                                } else if (navigator.clipboard) {
                                                                                                                                                                                                                                                                                                                                                                                        navigator.clipboard.writeText(url);
                                                                                                                                                                                                                                                                                                                                                                                                alert("Link copiado!");
                                                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                                                            alert("Compartilhamento não disponível neste navegador.");
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                