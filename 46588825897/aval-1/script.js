document.addEventListener("DOMContentLoaded", () => {
      // 1. Criação dinâmica da Barra de Progresso de Leitura
        const progressBar = document.createElement("div");
          progressBar.style.cssText = `
              position: fixed;
                  top: 0;
                      left: 0;
                          height: 4px;
                              background-color: var(--accent-color, #38bdf8);
                                  width: 0%;
                                      z-index: 9999;
                                          transition: width 0.1s ease-out;
                                            `;
                                              document.body.appendChild(progressBar);

                                                window.addEventListener("scroll", () => {
                                                    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                                                        const currentScroll = window.scrollY;
                                                            const progress = (currentScroll / totalHeight) * 100;
                                                                progressBar.style.width = `${progress}%`;
                                                                  });

                                                                    // 2. Adicionando um Botão de Curtir Interativo no final do artigo
                                                                      const article = document.querySelector("article");
                                                                        if (article) {
                                                                            const likeContainer = document.createElement("div");
                                                                                likeContainer.style.cssText = `
                                                                                      margin-top: 3rem;
                                                                                            padding-top: 1.5rem;
                                                                                                  border-top: 1px solid var(--border-color, #334155);
                                                                                                        display: flex;
                                                                                                              align-items: center;
                                                                                                                    gap: 1rem;
                                                                                                                        `;

                                                                                                                            const likeButton = document.createElement("button");
                                                                                                                                likeButton.innerHTML = "❤️ Curtir Artigo";
                                                                                                                                    likeButton.style.cssText = `
                                                                                                                                          background-color: var(--btn-color, #6366f1);
                                                                                                                                                color: #fff;
                                                                                                                                                      border: none;
                                                                                                                                                            padding: 0.6rem 1.2rem;
                                                                                                                                                                  border-radius: 8px;
                                                                                                                                                                        font-weight: 600;
                                                                                                                                                                              cursor: pointer;
                                                                                                                                                                                    transition: opacity 0.2s;
                                                                                                                                                                                        `;
                                                                                                                                                                                            
                                                                                                                                                                                                likeButton.onmouseover = () => likeButton.style.opacity = "0.9";
                                                                                                                                                                                                    likeButton.onmouseout = () => likeButton.style.opacity = "1";

                                                                                                                                                                                                        const likeCountSpan = document.createElement("span");
                                                                                                                                                                                                            let likes = localStorage.getItem("techpulse_likes") || 142;
                                                                                                                                                                                                                likeCountSpan.textContent = `${likes} curtidas`;
                                                                                                                                                                                                                    likeCountSpan.style.color = "var(--text-muted, #94a3b8)";
                                                                                                                                                                                                                        likeCountSpan.style.fontSize = "0.95rem";

                                                                                                                                                                                                                            let hasLiked = localStorage.getItem("techpulse_has_liked") === "true";
                                                                                                                                                                                                                                if (hasLiked) {
                                                                                                                                                                                                                                      likeButton.style.backgroundColor = "#10b981"; // Verde indicando curtido
                                                                                                                                                                                                                                            likeButton.innerHTML = "✔️ Curtido";
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                    likeButton.addEventListener("click", () => {
                                                                                                                                                                                                                                                          if (!hasLiked) {
                                                                                                                                                                                                                                                                  likes++;
                                                                                                                                                                                                                                                                          hasLiked = true;
                                                                                                                                                                                                                                                                                  localStorage.setItem("techpulse_likes", likes);
                                                                                                                                                                                                                                                                                          localStorage.setItem("techpulse_has_liked", "true");
                                                                                                                                                                                                                                                                                                  likeCountSpan.textContent = `${likes} curtidas`;
                                                                                                                                                                                                                                                                                                          likeButton.style.backgroundColor = "#10b981";
                                                                                                                                                                                                                                                                                                                  likeButton.innerHTML = "✔️ Curtido";
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                                                likeContainer.appendChild(likeButton);
                                                                                                                                                                                                                                                                                                                                    likeContainer.appendChild(likeCountSpan);
                                                                                                                                                                                                                                                                                                                                        article.appendChild(likeContainer);
                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                                          
})