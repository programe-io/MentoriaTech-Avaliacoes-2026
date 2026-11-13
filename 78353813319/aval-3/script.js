
const form = document.getElementById("postForm");
const posts = document.getElementById("posts");

form.addEventListener("submit", function(event) {
  event.preventDefault();

    const text = document.getElementById("postText").value.trim();
      const image = document.getElementById("postImage").value.trim();

        if (!text) return;

          const post = document.createElement("article");
            post.className = "post";

              const header = document.createElement("div");
                header.className = "post-header";

                  const avatar = document.createElement("span");
                    avatar.textContent = "👤";

                      const username = document.createElement("strong");
                        username.textContent = "seu_perfil";

                          header.append(avatar, username);

                            post.appendChild(header);

                              if (image) {
                                  const photo = document.createElement("img");
                                      photo.className = "post-image";
                                          photo.src = image;
                                              photo.alt = "Imagem da publicação";
                                                  post.appendChild(photo);
                                                    }

                                                      const actions = document.createElement("div");
                                                        actions.className = "post-actions";

                                                          const like = document.createElement("button");
                                                            like.className = "like";
                                                              like.textContent = "♡";

                                                                const comment = document.createElement("button");
                                                                  comment.textContent = "💬";

                                                                    const share = document.createElement("button");
                                                                      share.textContent = "↗";

                                                                        const save = document.createElement("button");
                                                                          save.className = "save";
                                                                            save.textContent = "♧";

                                                                              actions.append(like, comment, share, save);
                                                                                post.appendChild(actions);

                                                                                  const likes = document.createElement("p");
                                                                                    likes.className = "likes";
                                                                                      likes.textContent = "❤️ 0 curtidas";
                                                                                        post.appendChild(likes);

                                                                                          const caption = document.createElement("p");
                                                                                            const bold = document.createElement("strong");
                                                                                              bold.textContent = "seu_perfil ";
                                                                                                caption.append(bold, document.createTextNode(text));
                                                                                                  post.appendChild(caption);

                                                                                                    const time = document.createElement("small");
                                                                                                      time.textContent = "Agora";
                                                                                                        post.appendChild(time);

                                                                                                          posts.prepend(post);

                                                                                                            document.getElementById("postText").value = "";
                                                                                                              document.getElementById("postImage").value = "";
                                                                                                              });

                                                                                                              posts.addEventListener("click", function(event) {
                                                                                                                const button = event.target.closest("button");

                                                                                                                  if (!button) return;

                                                                                                                    if (button.classList.contains("like")) {
                                                                                                                        button.classList.toggle("active");
                                                                                                                            button.textContent =
                                                                                                                                  button.classList.contains("active") ? "♥" : "♡";

                                                                                                                                      const post = button.closest(".post");
                                                                                                                                          const counter = post.querySelector(".likes");

                                                                                                                                              counter.textContent = button.classList.contains("active")
                                                                                                                                                    ? "❤️ 1 curtida"
                                                                                                                                                          : "❤️ 0 curtidas";
                                                                                                                                                            }

                                                                                                                                                              if (button.classList.contains("save")) {
                                                                                                                                                                  button.textContent =
                                                                                                                                                                        button.textContent === "♧" ? "🔖" : "♧";
                                                                                                                                                                          }
                                                                                                                                                                          });
                                                                                                                                                                          