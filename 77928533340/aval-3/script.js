
let posts = JSON.parse(
  localStorage.getItem("instaPosts") || "[]"
  );

  const defaultPosts = [
    {
        id: 1,
            user: "Lucas",
                image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
                    caption: "Que lugar incrível! 🌎",
                        likes: 120,
                            liked: false,
                                comments: []
                                  },
                                    {
                                        id: 2,
                                            user: "Maria",
                                                image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900",
                                                    caption: "A natureza é maravilhosa! ❤️",
                                                        likes: 85,
                                                            liked: false,
                                                                comments: []
                                                                  }
                                                                  ];

                                                                  if (posts.length === 0) {
                                                                    posts = defaultPosts;
                                                                      save();
                                                                      }

                                                                      function save() {
                                                                        localStorage.setItem("instaPosts", JSON.stringify(posts));
                                                                        }

                                                                        function createPost() {
                                                                          const user = document.getElementById("username").value.trim();
                                                                            const image = document.getElementById("imageUrl").value.trim();
                                                                              const caption = document.getElementById("caption").value.trim();

                                                                                if (!user || (!image && !caption)) {
                                                                                    alert("Informe seu nome e uma imagem ou legenda!");
                                                                                        return;
                                                                                          }

                                                                                            posts.unshift({
                                                                                                id: Date.now(),
                                                                                                    user,
                                                                                                        image,
                                                                                                            caption,
                                                                                                                likes: 0,
                                                                                                                    liked: false,
                                                                                                                        comments: []
                                                                                                                          });

                                                                                                                            document.getElementById("imageUrl").value = "";
                                                                                                                              document.getElementById("caption").value = "";

                                                                                                                                save();
                                                                                                                                  render();
                                                                                                                                  }

                                                                                                                                  function likePost(id) {
                                                                                                                                    const post = posts.find(p => p.id === id);

                                                                                                                                      post.liked = !post.liked;
                                                                                                                                        post.likes += post.liked ? 1 : -1;

                                                                                                                                          save();
                                                                                                                                            render();
                                                                                                                                            }

                                                                                                                                            function addComment(id) {
                                                                                                                                              const input = document.getElementById("comment-" + id);
                                                                                                                                                const text = input.value.trim();

                                                                                                                                                  if (!text) return;

                                                                                                                                                    const post = posts.find(p => p.id === id);
                                                                                                                                                      post.comments.push(text);

                                                                                                                                                        save();
                                                                                                                                                          render();
                                                                                                                                                          }

                                                                                                                                                          function deletePost(id) {
                                                                                                                                                            if (!confirm("Deseja excluir esta publicação?")) return;

                                                                                                                                                              posts = posts.filter(p => p.id !== id);

                                                                                                                                                                save();
                                                                                                                                                                  render();
                                                                                                                                                                  }

                                                                                                                                                                  function render() {
                                                                                                                                                                    const container = document.getElementById("posts");
                                                                                                                                                                      container.innerHTML = "";

                                                                                                                                                                        posts.forEach(post => {
                                                                                                                                                                            const article = document.createElement("article");
                                                                                                                                                                                article.className = "post";

                                                                                                                                                                                    const header = document.createElement("div");
                                                                                                                                                                                        header.className = "post-header";

                                                                                                                                                                                            const avatar = document.createElement("img");
                                                                                                                                                                                                avatar.src = "https://i.pravatar.cc/100?u=" + encodeURIComponent(post.user);
                                                                                                                                                                                                    avatar.alt = "Foto de perfil";

                                                                                                                                                                                                        const name = document.createElement("strong");
                                                                                                                                                                                                            name.textContent = post.user;

                                                                                                                                                                                                                header.append(avatar, name);
                                                                                                                                                                                                                    article.appendChild(header);

                                                                                                                                                                                                                        if (post.image) {
                                                                                                                                                                                                                              const img = document.createElement("img");
                                                                                                                                                                                                                                    img.className = "post-image";
                                                                                                                                                                                                                                          img.src = post.image;
                                                                                                                                                                                                                                                img.alt = "Imagem publicada";
                                                                                                                                                                                                                                                      article.appendChild(img);
                                                                                                                                                                                                                                                          }

                                                                                                                                                                                                                                                              const actions = document.createElement("div");
                                                                                                                                                                                                                                                                  actions.className = "post-actions";

                                                                                                                                                                                                                                                                      const like = document.createElement("button");
                                                                                                                                                                                                                                                                          like.textContent = post.liked ? "❤️" : "🤍";
                                                                                                                                                                                                                                                                              like.onclick = () => likePost(post.id);

                                                                                                                                                                                                                                                                                  const commentIcon = document.createElement("button");
                                                                                                                                                                                                                                                                                      commentIcon.textContent = "💬";

                                                                                                                                                                                                                                                                                          const remove = document.createElement("button");
                                                                                                                                                                                                                                                                                              remove.textContent = "🗑️";
                                                                                                                                                                                                                                                                                                  remove.onclick = () => deletePost(post.id);

                                                                                                                                                                                                                                                                                                      actions.append(like, commentIcon, remove);
                                                                                                                                                                                                                                                                                                          article.appendChild(actions);

                                                                                                                                                                                                                                                                                                              const count = document.createElement("strong");
                                                                                                                                                                                                                                                                                                                  count.textContent = post.likes + " curtidas";
                                                                                                                                                                                                                                                                                                                      article.appendChild(count);

                                                                                                                                                                                                                                                                                                                          const caption = document.createElement("p");
                                                                                                                                                                                                                                                                                                                              caption.className = "caption";
                                                                                                                                                                                                                                                                                                                                  caption.textContent = post.user + ": " + post.caption;
                                                                                                                                                                                                                                                                                                                                      article.appendChild(caption);

                                                                                                                                                                                                                                                                                                                                          post.comments.forEach(text => {
                                                                                                                                                                                                                                                                                                                                                const comment = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                                      comment.className = "comment";
                                                                                                                                                                                                                                                                                                                                                            comment.textContent = text;
                                                                                                                                                                                                                                                                                                                                                                  article.appendChild(comment);
                                                                                                                                                                                                                                                                                                                                                                      });

                                                                                                                                                                                                                                                                                                                                                                          const form = document.createElement("div");
                                                                                                                                                                                                                                                                                                                                                                              form.className = "comment-form";

                                                                                                                                                                                                                                                                                                                                                                                  const input = document.createElement("input");
                                                                                                                                                                                                                                                                                                                                                                                      input.id = "comment-" + post.id;
                                                                                                                                                                                                                                                                                                                                                                                          input.placeholder = "Adicione um comentário...";

                                                                                                                                                                                                                                                                                                                                                                                              const send = document.createElement("button");
                                                                                                                                                                                                                                                                                                                                                                                                  send.textContent = "Enviar";
                                                                                                                                                                                                                                                                                                                                                                                                      send.onclick = () => addComment(post.id);

                                                                                                                                                                                                                                                                                                                                                                                                          form.append(input, send);
                                                                                                                                                                                                                                                                                                                                                                                                              article.appendChild(form);

                                                                                                                                                                                                                                                                                                                                                                                                                  container.appendChild(article);
                                                                                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                    render();
                                                                                                                                                                                                                                                                                                                                                                                                                    