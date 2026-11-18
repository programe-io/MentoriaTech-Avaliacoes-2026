
function createPost() {
    const input = document.getElementById("postText");
        const text = input.value.trim();

            if (text === "") {
                    alert("Escreva alguma coisa!");
                            return;
                                }

                                    const post = document.createElement("article");
                                        post.className = "post";

                                            post.innerHTML = `
                                                    <h3>Marlos</h3>
                                                            <p></p>
                                                                    <div class="actions">
                                                                                <button onclick="likePost(this)">👍 Curtir</button>
                                                                                            <button onclick="commentPost(this)">💬 Comentar</button>
                                                                                                    </div>
                                                                                                            <p class="likes">0 curtidas</p>
                                                                                                                    <div class="comments"></div>
                                                                                                                        `;

                                                                                                                            post.querySelector("p").textContent = text;

                                                                                                                                document.getElementById("posts")
                                                                                                                                        .prepend(post);

                                                                                                                                            input.value = "";
                                                                                                                                            }

                                                                                                                                            function likePost(button) {
                                                                                                                                                const post = button.closest(".post");
                                                                                                                                                    const likes = post.querySelector(".likes");

                                                                                                                                                        let count = Number(
                                                                                                                                                                likes.dataset.count || 0
                                                                                                                                                                    );

                                                                                                                                                                        if (button.dataset.liked === "true") {
                                                                                                                                                                                count--;
                                                                                                                                                                                        button.dataset.liked = "false";
                                                                                                                                                                                                button.textContent = "👍 Curtir";
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                            count++;
                                                                                                                                                                                                                    button.dataset.liked = "true";
                                                                                                                                                                                                                            button.textContent = "❤️ Curtido";
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                    likes.dataset.count = count;
                                                                                                                                                                                                                                        likes.textContent = count + " curtidas";
                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                        function commentPost(button) {
                                                                                                                                                                                                                                            const post = button.closest(".post");

                                                                                                                                                                                                                                                const comment = prompt("Digite seu comentário:");

                                                                                                                                                                                                                                                    if (!comment || !comment.trim()) return;

                                                                                                                                                                                                                                                        const area = post.querySelector(".comments");

                                                                                                                                                                                                                                                            const newComment = document.createElement("p");
                                                                                                                                                                                                                                                                newComment.textContent = "Marlos: " + comment;

                                                                                                                                                                                                                                                                    area.appendChild(newComment);
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                    