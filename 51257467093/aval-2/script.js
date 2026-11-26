
const publishBtn = document.getElementById("publishBtn");
const postText = document.getElementById("postText");
const feed = document.getElementById("feed");

publishBtn.addEventListener("click", () => {
  const text = postText.value.trim();

    if (!text) {
        alert("Escreva alguma coisa antes de publicar!");
            postText.focus();
                return;
                  }

                    const post = document.createElement("article");

                      post.className = "post card";

                        post.innerHTML = `
                            <div class="post-header">
                                  <div class="user">
                                          <div class="avatar antonny-avatar">A</div>
                                                  <div>
                                                            <strong>Antonny Gabriel</strong>
                                                                      <span>Agora mesmo</span>
                                                                              </div>
                                                                                    </div>
                                                                                          <span class="tag">Games</span>
                                                                                              </div>

                                                                                                  <p class="post-text"></p>

                                                                                                      <div class="post-actions">
                                                                                                            <button class="like-btn">♡ Curtir <span>0</span></button>
                                                                                                                  <button class="comment-btn">Comentar</button>
                                                                                                                      </div>

                                                                                                                          <div class="comments"></div>
                                                                                                                            `;

                                                                                                                              post.querySelector(".post-text").textContent = text;

                                                                                                                                feed.prepend(post);
                                                                                                                                  postText.value = "";
                                                                                                                                  });

                                                                                                                                  feed.addEventListener("click", (event) => {
                                                                                                                                    const like = event.target.closest(".like-btn");
                                                                                                                                      const comment = event.target.closest(".comment-btn");

                                                                                                                                        if (like) {
                                                                                                                                            const count = like.querySelector("span");
                                                                                                                                                const liked = like.classList.toggle("liked");

                                                                                                                                                    count.textContent =
                                                                                                                                                          Number(count.textContent) + (liked ? 1 : -1);

                                                                                                                                                              like.firstChild.textContent =
                                                                                                                                                                    liked ? "♥ Curtido " : "♡ Curtir ";
                                                                                                                                                                      }

                                                                                                                                                                        if (comment) {
                                                                                                                                                                            const area = comment.closest(".post").querySelector(".comments");

                                                                                                                                                                                if (area.querySelector(".comment-form")) return;

                                                                                                                                                                                    const form = document.createElement("form");

                                                                                                                                                                                        form.className = "comment-form";

                                                                                                                                                                                            form.innerHTML = `
                                                                                                                                                                                                  <input type="text"
                                                                                                                                                                                                          maxlength="180"
                                                                                                                                                                                                                  placeholder="Escreva um comentário..."
                                                                                                                                                                                                                          required>

                                                                                                                                                                                                                                <button type="submit">Enviar</button>
                                                                                                                                                                                                                                    `;

                                                                                                                                                                                                                                        area.appendChild(form);
                                                                                                                                                                                                                                            form.querySelector("input").focus();
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                              feed.addEventListener("submit", (event) => {
                                                                                                                                                                                                                                                if (!event.target.matches(".comment-form")) return;

                                                                                                                                                                                                                                                  event.preventDefault();

                                                                                                                                                                                                                                                    const input = event.target.querySelector("input");
                                                                                                                                                                                                                                                      const value = input.value.trim();

                                                                                                                                                                                                                                                        if (!value) return;

                                                                                                                                                                                                                                                          const item = document.createElement("div");

                                                                                                                                                                                                                                                            item.className = "comment-item";
                                                                                                                                                                                                                                                              item.textContent = "Você: " + value;

                                                                                                                                                                                                                                                                event.target.parentElement.appendChild(item);
                                                                                                                                                                                                                                                                  event.target.remove();
                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                  