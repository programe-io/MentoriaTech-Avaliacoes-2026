// Mini Feed: interações de publicação, curtidas e comentários.

// Adiciona uma publicação nova ao início do feed.
const postForm = document.querySelector("#post-form");
const postInput = document.querySelector("#post-content");
const feed = document.querySelector("#feed");

postForm.addEventListener("submit", (event) => {
  event.preventDefault();

    const text = postInput.value.trim();
      if (!text) return;

        const post = document.createElement("article");
          post.className = "card post";

            const header = document.createElement("div");
              header.className = "post-header";

                const avatar = document.createElement("div");
                  avatar.className = "avatar";
                    avatar.textContent = "V";
                      avatar.setAttribute("aria-hidden", "true");

                        const userInfo = document.createElement("div");
                          userInfo.className = "user-info";

                            const name = document.createElement("strong");
                              name.textContent = "Visitante";

                                const time = document.createElement("span");
                                  time.textContent = "agora";

                                    userInfo.append(name, time);
                                      header.append(avatar, userInfo);

                                        const postText = document.createElement("p");
                                          postText.className = "post-text";
                                            postText.textContent = text;

                                              const actions = document.createElement("div");
                                                actions.className = "post-actions";
                                                  actions.innerHTML = `
                                                      <button class="like-button" type="button" aria-pressed="false">
                                                            Curtir <span class="like-count">0</span>
                                                                </button>
                                                                    <button class="comment-button" type="button">Comentar</button>
                                                                      `;

                                                                        const commentForm = document.createElement("form");
                                                                          commentForm.className = "comment-form";
                                                                            commentForm.hidden = true;
                                                                              commentForm.innerHTML = `
                                                                                  <label class="sr-only">Escreva um comentário</label>
                                                                                      <input type="text" placeholder="Escreva um comentário..." required>
                                                                                          <button type="submit">Enviar</button>
                                                                                            `;

                                                                                              const comments = document.createElement("ul");
                                                                                                comments.className = "comments";
                                                                                                  comments.setAttribute("aria-label", "Comentários");

                                                                                                    post.append(header, postText, actions, commentForm, comments);
                                                                                                      feed.prepend(post);
                                                                                                        postForm.reset();
                                                                                                          postInput.focus();
                                                                                                          });

                                                                                                          // Usa delegação de eventos para funcionar também nas publicações criadas pelo JavaScript.
                                                                                                          feed.addEventListener("click", (event) => {
                                                                                                            const likeButton = event.target.closest(".like-button");
                                                                                                              if (likeButton) {
                                                                                                                  const liked = likeButton.getAttribute("aria-pressed") === "true";
                                                                                                                      const count = likeButton.querySelector(".like-count");
                                                                                                                          const nextLiked = !liked;

                                                                                                                              likeButton.setAttribute("aria-pressed", String(nextLiked));
                                                                                                                                  likeButton.classList.toggle("liked", nextLiked);
                                                                                                                                      count.textContent = String(Number(count.textContent) + (nextLiked ? 1 : -1));
                                                                                                                                          likeButton.firstChild.textContent = nextLiked ? "Curtido " : "Curtir ";
                                                                                                                                              return;
                                                                                                                                                }

                                                                                                                                                  const commentButton = event.target.closest(".comment-button");
                                                                                                                                                    if (commentButton) {
                                                                                                                                                        const form = commentButton.closest(".post").querySelector(".comment-form");
                                                                                                                                                            form.hidden = !form.hidden;
                                                                                                                                                                if (!form.hidden) form.querySelector("input").focus();
                                                                                                                                                                  }
                                                                                                                                                                  });

                                                                                                                                                                  // Adiciona comentários sem inserir o texto do usuário como HTML.
                                                                                                                                                                  feed.addEventListener("submit", (event) => {
                                                                                                                                                                    if (!event.target.matches(".comment-form")) return;

                                                                                                                                                                      event.preventDefault();
                                                                                                                                                                        const form = event.target;
                                                                                                                                                                          const input = form.querySelector("input");
                                                                                                                                                                            const commentText = input.value.trim();
                                                                                                                                                                              if (!commentText) return;

                                                                                                                                                                                const item = document.createElement("li");
                                                                                                                                                                                  item.textContent = commentText;

                                                                                                                                                                                    form.closest(".post").querySelector(".comments").append(item);
                                                                                                                                                                                      form.reset();
                                                                                                                                                                                        form.hidden = true;
                                                                                                                                                                                        });
                                                                                                                                                                                        