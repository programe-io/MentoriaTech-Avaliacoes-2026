
function like(button) {
  const post = button.closest(".post");
    const likes = post.querySelector(".likes");
      const liked = button.classList.toggle("liked");

        let count = Number(likes.dataset.count || 
            likes.textContent.match(/\d+/)?.[0] || 0);

              count += liked ? 1 : -1;

                likes.dataset.count = count;
                  likes.textContent = count + " curtidas";
                    button.textContent = liked ? "♥" : "♡";
                    }

                    function savePost(button) {
                      button.classList.toggle("saved");
                        button.textContent =
                            button.classList.contains("saved") ? "▣" : "♧";
                            }

                            function comment(button) {
                              const post = button.closest(".post");
                                const comments = post.querySelector(".comments");
                                  const message = prompt("Escreva seu comentário:");

                                    if (message && message.trim()) {
                                        const comment = document.createElement("p");
                                            comment.className = "caption";
                                                comment.textContent = "Você: " + message;

                                                    comments.before(comment);
                                                        comments.textContent = "Ver comentários";
                                                          }
                                                          }

                                                          function publish() {
                                                            const input = document.getElementById("postText");
                                                              const author = document.getElementById("author").value;
                                                                const text = input.value.trim();

                                                                  if (!text) {
                                                                      alert("Escreva alguma coisa!");
                                                                          return;
                                                                            }

                                                                              const post = document.createElement("article");
                                                                                post.className = "post";

                                                                                  const avatar = author.charAt(0).toUpperCase();

                                                                                    const header = document.createElement("div");
                                                                                      header.className = "post-header";

                                                                                        const circle = document.createElement("div");
                                                                                          circle.className = "avatar c1";
                                                                                            circle.textContent = avatar;

                                                                                              const info = document.createElement("div");
                                                                                                info.className = "user-info";

                                                                                                  const name = document.createElement("b");
                                                                                                    name.textContent = author;

                                                                                                      const time = document.createElement("small");
                                                                                                        time.textContent = "Agora mesmo";

                                                                                                          info.append(name, time);

                                                                                                            const dots = document.createElement("button");
                                                                                                              dots.className = "dots";
                                                                                                                dots.textContent = "•••";

                                                                                                                  header.append(circle, info, dots);

                                                                                                                    const content = document.createElement("div");
                                                                                                                      content.className = "text-post purple";

                                                                                                                        const title = document.createElement("span");
                                                                                                                          title.textContent = "NOVA PUBLICAÇÃO";

                                                                                                                            const message = document.createElement("h2");
                                                                                                                              message.textContent = text;

                                                                                                                                const footer = document.createElement("small");
                                                                                                                                  footer.textContent = "Compartilhado agora ✨";

                                                                                                                                    content.append(title, message, footer);

                                                                                                                                      const actions = document.createElement("div");
                                                                                                                                        actions.className = "post-actions";
                                                                                                                                          actions.innerHTML = `
                                                                                                                                              <button class="like" onclick="like(this)">♡</button>
                                                                                                                                                  <button onclick="comment(this)">♧</button>
                                                                                                                                                      <button>↗</button>
                                                                                                                                                          <button class="save" onclick="savePost(this)">♧</button>
                                                                                                                                                            `;

                                                                                                                                                              const likes = document.createElement("p");
                                                                                                                                                                likes.className = "likes";
                                                                                                                                                                  likes.textContent = "0 curtidas";
                                                                                                                                                                    likes.dataset.count = "0";

                                                                                                                                                                      const caption = document.createElement("p");
                                                                                                                                                                        caption.className = "caption";
                                                                                                                                                                          caption.textContent = author + " " + text;

                                                                                                                                                                            const comments = document.createElement("p");
                                                                                                                                                                              comments.className = "comments";
                                                                                                                                                                                comments.textContent = "Seja o primeiro a comentar";

                                                                                                                                                                                  post.append(header, content, actions, likes, caption, comments);

                                                                                                                                                                                    document.getElementById("feed").prepend(post);
                                                                                                                                                                                      input.value = "";
                                                                                                                                                                                        post.scrollIntoView({behavior: "smooth"});
                                                                                                                                                                                        }

                                                                                                                                                                                        function searchPosts() {
                                                                                                                                                                                          const value = document.getElementById("search").value.toLowerCase();

                                                                                                                                                                                            document.querySelectorAll(".post").forEach(post => {
                                                                                                                                                                                                post.style.display = post.textContent.toLowerCase().includes(value)
                                                                                                                                                                                                      ? "block"
                                                                                                                                                                                                            : "none";
                                                                                                                                                                                                              });
                                                                                                                                                                                                              }
                                                                                                                                                                                                              