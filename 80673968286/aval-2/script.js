
const input = document.getElementById("postInput");
const publishBtn = document.getElementById("publishBtn");
const feed = document.getElementById("feed");

publishBtn.addEventListener("click", function() {
    const text = input.value.trim();

        if (text === "") {
                alert("Escreva alguma coisa primeiro!");
                        return;
                            }

                                const post = document.createElement("article");
                                    post.classList.add("post");

                                        const user = document.createElement("div");
                                            user.classList.add("user");

                                                user.innerHTML = `
                                                        <div class="avatar">G</div>
                                                                <div>
                                                                            <strong>goober123</strong>
                                                                                        <small>Agora mesmo</small>
                                                                                                </div>
                                                                                                    `;

                                                                                                        const paragraph = document.createElement("p");
                                                                                                            paragraph.textContent = text;

                                                                                                                const actions = document.createElement("div");
                                                                                                                    actions.classList.add("post-actions");

                                                                                                                        const like = document.createElement("button");
                                                                                                                            like.textContent = "♡ Curtir";
                                                                                                                                like.classList.add("like-btn");

                                                                                                                                    like.addEventListener("click", function() {
                                                                                                                                            like.classList.toggle("liked");

                                                                                                                                                    like.textContent = like.classList.contains("liked")
                                                                                                                                                                ? "♥ Curtido"
                                                                                                                                                                            : "♡ Curtir";
                                                                                                                                                                                });

                                                                                                                                                                                    actions.appendChild(like);

                                                                                                                                                                                        post.appendChild(user);
                                                                                                                                                                                            post.appendChild(paragraph);
                                                                                                                                                                                                post.appendChild(actions);

                                                                                                                                                                                                    feed.prepend(post);

                                                                                                                                                                                                        input.value = "";
                                                                                                                                                                                                        });

                                                                                                                                                                                                        // Curtidas dos posts iniciais
                                                                                                                                                                                                        document.querySelectorAll(".like-btn").forEach(button => {
                                                                                                                                                                                                            button.addEventListener("click", function() {
                                                                                                                                                                                                                    button.classList.toggle("liked");

                                                                                                                                                                                                                            button.textContent = button.classList.contains("liked")
                                                                                                                                                                                                                                        ? "♥ Curtido"
                                                                                                                                                                                                                                                    : "♡ Curtir";
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                        