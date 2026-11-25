const postInput = document.getElementById("postInput");
const charCount = document.getElementById("charCount");
const publishBtn = document.getElementById("publishBtn");
const feedList = document.getElementById("feedList");

// Postagens iniciais
let posts = [
  {
      id: 1,
          author: "Camila Rocha",
              handle: "@camilarocha",
                  time: "há 15 min",
                      text: "Acabei de finalizar meu primeiro projeto usando apenas HTML, CSS e JavaScript puro!",
                          likes: 12,
                              liked: false
                                },
                                  {
                                      id: 2,
                                          author: "Pedro Alves",
                                              handle: "@pedrodev",
                                                  time: "há 1 h",
                                                      text: "Qual jogo vocês estão jogando neste fim de semana? Preciso de recomendações.",
                                                          likes: 5,
                                                              liked: true
                                                                }
                                                                ];

                                                                // Atualiza contador de caracteres e estado do botão
                                                                postInput.addEventListener("input", () => {
                                                                  const remaining = 280 - postInput.value.length;
                                                                    charCount.textContent = remaining;
                                                                      publishBtn.disabled = postInput.value.trim().length === 0;
                                                                      });

                                                                      // Publica novo post
                                                                      publishBtn.addEventListener("click", () => {
                                                                        const text = postInput.value.trim();
                                                                          if (!text) return;

                                                                            const newPost = {
                                                                                id: Date.now(),
                                                                                    author: "Você",
                                                                                        handle: "@usuario",
                                                                                            time: "agora mesmo",
                                                                                                text: text,
                                                                                                    likes: 0,
                                                                                                        liked: false
                                                                                                          };

                                                                                                            posts.unshift(newPost);
                                                                                                              postInput.value = "";
                                                                                                                charCount.textContent = "280";
                                                                                                                  publishBtn.disabled = true;
                                                                                                                    renderFeed();
                                                                                                                    });

                                                                                                                    // Alterna curtida
                                                                                                                    function toggleLike(id) {
                                                                                                                      const post = posts.find(p => p.id === id);
                                                                                                                        if (!post) return;

                                                                                                                          post.liked = !post.liked;
                                                                                                                            post.likes += post.liked ? 1 : -1;
                                                                                                                              renderFeed();
                                                                                                                              }

                                                                                                                              // Exclui postagem
                                                                                                                              function deletePost(id) {
                                                                                                                                posts = posts.filter(p => p.id !== id);
                                                                                                                                  renderFeed();
                                                                                                                                  }

                                                                                                                                  // Escapa HTML para evitar injeção de código no texto digitado
                                                                                                                                  function escapeHTML(str) {
                                                                                                                                    const div = document.createElement("div");
                                                                                                                                      div.textContent = str;
                                                                                                                                        return div.innerHTML;
                                                                                                                                        }

                                                                                                                                        // Renderiza o feed na tela
                                                                                                                                        function renderFeed() {
                                                                                                                                          feedList.innerHTML = "";

                                                                                                                                            if (posts.length === 0) {
                                                                                                                                                feedList.innerHTML = `<p style="text-align:center; color:#65676b;">Nenhuma publicação ainda.</p>`;
                                                                                                                                                    return;
                                                                                                                                                      }

                                                                                                                                                        posts.forEach(post => {
                                                                                                                                                            const article = document.createElement("article");
                                                                                                                                                                article.className = "post-card";
                                                                                                                                                                    article.innerHTML = `
                                                                                                                                                                          <div class="post-header">
                                                                                                                                                                                  <div>
                                                                                                                                                                                            <span class="post-author">${post.author}</span>
                                                                                                                                                                                                      <span class="post-time">${post.handle} • ${post.time}</span>
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                      <button class="action-btn delete-btn" onclick="deletePost(${post.id})">Excluir</button>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                  <p class="post-text">${escapeHTML(post.text)}</p>
                                                                                                                                                                                                                                        <div class="post-actions">
                                                                                                                                                                                                                                                <button class="action-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">
                                                                                                                                                                                                                                                          ${post.liked ? "♥" : "♡"} Curtir (${post.likes})
                                                                                                                                                                                                                                                                  </button>
                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                            `;
                                                                                                                                                                                                                                                                                feedList.appendChild(article);
                                                                                                                                                                                                                                                                                  });
                                                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                                                  // Inicializa o feed
                                                                                                                                                                                                                                                                                  renderFeed();