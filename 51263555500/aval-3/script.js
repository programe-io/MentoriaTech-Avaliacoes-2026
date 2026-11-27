
const publishBtn = document.getElementById("publishBtn");
const postText = document.getElementById("postText");
const feed = document.getElementById("feed");

// Criar publicação
publishBtn.addEventListener("click", () => {
  const text = postText.value.trim();

    if (!text) {
        alert("Escreva alguma coisa antes de publicar!");
            return;
              }

                const post = document.createElement("article");
                  post.className = "post card";

                    const header = document.createElement("div");
                      header.className = "post-header";

                        header.innerHTML = `
                            <div class="user-line">
                                  <div class="avatar main-avatar">J</div>
                                        <div>
                                                <strong>Jamile</strong>
                                                        <span>Agora mesmo · Brasil</span>
                                                              </div>
                                                                  </div>
                                                                      <button class="more-btn">•••</button>
                                                                        `;

                                                                          const paragraph = document.createElement("p");
                                                                            paragraph.className = "post-text";
                                                                              paragraph.textContent = text;

                                                                                const actions = document.createElement("div");
                                                                                  actions.className = "post-actions";

                                                                                    actions.innerHTML = `
                                                                                        <div>
                                                                                              <button class="icon-btn like-btn">♡</button>
                                                                                                    <button class="icon-btn comment-btn">♧</button>
                                                                                                          <button class="icon-btn share-btn">➤</button>
                                                                                                              </div>
                                                                                                                  <button class="icon-btn save-btn">♧</button>
                                                                                                                    `;

                                                                                                                      const likes = document.createElement("strong");
                                                                                                                        likes.className = "likes";
                                                                                                                          likes.textContent = "0 curtidas";

                                                                                                                            const description = document.createElement("p");
                                                                                                                              description.className = "description";

                                                                                                                                const name = document.createElement("strong");
                                                                                                                                  name.textContent = "Jamile ";

                                                                                                                                    description.append(name, document.createTextNode(text));

                                                                                                                                      const time = document.createElement("span");
                                                                                                                                        time.className = "post-time";
                                                                                                                                          time.textContent = "AGORA MESMO";

                                                                                                                                            const comments = document.createElement("div");
                                                                                                                                              comments.className = "comments";

                                                                                                                                                post.append(
                                                                                                                                                    header,
                                                                                                                                                        paragraph,
                                                                                                                                                            actions,
                                                                                                                                                                likes,
                                                                                                                                                                    description,
                                                                                                                                                                        time,
                                                                                                                                                                            comments
                                                                                                                                                                              );

                                                                                                                                                                                feed.prepend(post);
                                                                                                                                                                                  postText.value = "";
                                                                                                                                                                                  });

                                                                                                                                                                                  // Curtidas, comentários e outras ações
                                                                                                                                                                                  feed.addEventListener("click", (event) => {
                                                                                                                                                                                    const like = event.target.closest(".like-btn");
                                                                                                                                                                                      const comment = event.target.closest(".comment-btn");
                                                                                                                                                                                        const save = event.target.closest(".save-btn");
                                                                                                                                                                                          const share = event.target.closest(".share-btn");

                                                                                                                                                                                            const post = event.target.closest(".post");

                                                                                                                                                                                              if (!post) return;

                                                                                                                                                                                                if (like) {
                                                                                                                                                                                                    const liked = like.classList.toggle("liked");
                                                                                                                                                                                                        const likes = post.querySelector(".likes");

                                                                                                                                                                                                            let count = Number(
                                                                                                                                                                                                                  likes.textContent.replace(/\D/g, "")
                                                                                                                                                                                                                      );

                                                                                                                                                                                                                          count += liked ? 1 : -1;

                                                                                                                                                                                                                              likes.textContent = count + " curtidas";
                                                                                                                                                                                                                                  like.textContent = liked ? "♥" : "♡";
                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                      if (save) {
                                                                                                                                                                                                                                          save.classList.toggle("saved");
                                                                                                                                                                                                                                              save.textContent =
                                                                                                                                                                                                                                                    save.classList.contains("saved") ? "▣" : "♧";
                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                        if (comment) {
                                                                                                                                                                                                                                                            const area = post.querySelector(".comments");

                                                                                                                                                                                                                                                                if (area.querySelector(".comment-form")) return;

                                                                                                                                                                                                                                                                    const form = document.createElement("form");
                                                                                                                                                                                                                                                                        form.className = "comment-form";

                                                                                                                                                                                                                                                                            form.innerHTML = `
                                                                                                                                                                                                                                                                                  <input type="text"
                                                                                                                                                                                                                                                                                          placeholder="Escreva um comentário..."
                                                                                                                                                                                                                                                                                                  maxlength="180"
                                                                                                                                                                                                                                                                                                          required>
                                                                                                                                                                                                                                                                                                                <button type="submit">Enviar</button>
                                                                                                                                                                                                                                                                                                                    `;

                                                                                                                                                                                                                                                                                                                        area.appendChild(form);
                                                                                                                                                                                                                                                                                                                            form.querySelector("input").focus();
                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                if (share) {
                                                                                                                                                                                                                                                                                                                                    const description = post.querySelector(".post-text");

                                                                                                                                                                                                                                                                                                                                        if (navigator.share) {
                                                                                                                                                                                                                                                                                                                                              navigator.share({
                                                                                                                                                                                                                                                                                                                                                      title: "MiniFeed Festas",
                                                                                                                                                                                                                                                                                                                                                              text: description.textContent
                                                                                                                                                                                                                                                                                                                                                                    }).catch(() => {});
                                                                                                                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                                                                                                                              alert("Compartilhamento não disponível neste navegador.");
                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                                                                                                                                                    // Enviar comentários
                                                                                                                                                                                                                                                                                                                                                                                    feed.addEventListener("submit", (event) => {
                                                                                                                                                                                                                                                                                                                                                                                      if (!event.target.matches(".comment-form")) return;

                                                                                                                                                                                                                                                                                                                                                                                        event.preventDefault();

                                                                                                                                                                                                                                                                                                                                                                                          const input = event.target.querySelector("input");
                                                                                                                                                                                                                                                                                                                                                                                            const text = input.value.trim();

                                                                                                                                                                                                                                                                                                                                                                                              if (!text) return;

                                                                                                                                                                                                                                                                                                                                                                                                const item = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                                                                                  item.className = "comment-item";

                                                                                                                                                                                                                                                                                                                                                                                                    const name = document.createElement("strong");
                                                                                                                                                                                                                                                                                                                                                                                                      name.textContent = "Você: ";

                                                                                                                                                                                                                                                                                                                                                                                                        item.append(name, document.createTextNode(text));

                                                                                                                                                                                                                                                                                                                                                                                                          const area = event.target.parentElement;
                                                                                                                                                                                                                                                                                                                                                                                                            area.appendChild(item);
                                                                                                                                                                                                                                                                                                                                                                                                              event.target.remove();
                                                                                                                                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                                                                                                                                              // Botões de seguir
                                                                                                                                                                                                                                                                                                                                                                                                              document.querySelectorAll(".follow-btn").forEach(button => {
                                                                                                                                                                                                                                                                                                                                                                                                                button.addEventListener("click", () => {
                                                                                                                                                                                                                                                                                                                                                                                                                    const following = button.textContent === "Seguindo";

                                                                                                                                                                                                                                                                                                                                                                                                                        button.textContent = following ? "Seguir" : "Seguindo";
                                                                                                                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                                                                                                                          