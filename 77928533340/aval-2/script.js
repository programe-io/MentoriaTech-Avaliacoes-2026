
let posts = JSON.parse(
  localStorage.getItem("miniPosts") || "[]"
  );

  function savePosts() {
    localStorage.setItem("miniPosts", JSON.stringify(posts));
    }

    function createPost() {
      const username = document.getElementById("username").value.trim();
        const text = document.getElementById("postText").value.trim();

          if (!username || !text) {
              alert("Preencha seu nome e sua publicação!");
                  return;
                    }

                      posts.unshift({
                          id: Date.now(),
                              username,
                                  text,
                                      likes: 0,
                                          liked: false,
                                              comments: []
                                                });

                                                  document.getElementById("postText").value = "";
                                                    savePosts();
                                                      renderPosts();
                                                      }

                                                      function likePost(id) {
                                                        const post = posts.find(p => p.id === id);

                                                          post.liked = !post.liked;
                                                            post.likes += post.liked ? 1 : -1;

                                                              savePosts();
                                                                renderPosts();
                                                                }

                                                                function deletePost(id) {
                                                                  posts = posts.filter(p => p.id !== id);
                                                                    savePosts();
                                                                      renderPosts();
                                                                      }

                                                                      function addComment(id) {
                                                                        const input = document.getElementById(`comment-${id}`);
                                                                          const text = input.value.trim();

                                                                            if (!text) return;

                                                                              const post = posts.find(p => p.id === id);
                                                                                post.comments.push(text);

                                                                                  savePosts();
                                                                                    renderPosts();
                                                                                    }

                                                                                    function renderPosts() {
                                                                                      const container = document.getElementById("posts");

                                                                                        container.innerHTML = "";

                                                                                          posts.forEach(post => {
                                                                                              const article = document.createElement("article");
                                                                                                  article.className = "post";

                                                                                                      const header = document.createElement("div");
                                                                                                          header.className = "post-header";

                                                                                                              const author = document.createElement("strong");
                                                                                                                  author.textContent = "👤 " + post.username;

                                                                                                                      const date = document.createElement("small");
                                                                                                                          date.textContent = new Date(post.id).toLocaleDateString("pt-BR");

                                                                                                                              header.append(author, date);

                                                                                                                                  const content = document.createElement("p");
                                                                                                                                      content.textContent = post.text;

                                                                                                                                          const actions = document.createElement("div");
                                                                                                                                              actions.className = "actions";

                                                                                                                                                  const like = document.createElement("button");
                                                                                                                                                      like.textContent = `${post.liked ? "❤️" : "🤍"} Curtir (${post.likes})`;
                                                                                                                                                          like.onclick = () => likePost(post.id);

                                                                                                                                                              const remove = document.createElement("button");
                                                                                                                                                                  remove.textContent = "🗑 Excluir";
                                                                                                                                                                      remove.onclick = () => deletePost(post.id);

                                                                                                                                                                          actions.append(like, remove);

                                                                                                                                                                              const comments = document.createElement("div");
                                                                                                                                                                                  comments.className = "comments";

                                                                                                                                                                                      const title = document.createElement("strong");
                                                                                                                                                                                          title.textContent = "Comentários";
                                                                                                                                                                                              comments.appendChild(title);

                                                                                                                                                                                                  post.comments.forEach(comment => {
                                                                                                                                                                                                        const item = document.createElement("div");
                                                                                                                                                                                                              item.className = "comment";
                                                                                                                                                                                                                    item.textContent = comment;
                                                                                                                                                                                                                          comments.appendChild(item);
                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                  const form = document.createElement("div");
                                                                                                                                                                                                                                      form.className = "comment-form";

                                                                                                                                                                                                                                          const input = document.createElement("input");
                                                                                                                                                                                                                                              input.id = `comment-${post.id}`;
                                                                                                                                                                                                                                                  input.placeholder = "Escreva um comentário...";

                                                                                                                                                                                                                                                      const send = document.createElement("button");
                                                                                                                                                                                                                                                          send.textContent = "Enviar";
                                                                                                                                                                                                                                                              send.onclick = () => addComment(post.id);

                                                                                                                                                                                                                                                                  form.append(input, send);
                                                                                                                                                                                                                                                                      comments.appendChild(form);

                                                                                                                                                                                                                                                                          article.append(header, content, actions, comments);
                                                                                                                                                                                                                                                                              container.appendChild(article);
                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                renderPosts();
                                                                                                                                                                                                                                                                                