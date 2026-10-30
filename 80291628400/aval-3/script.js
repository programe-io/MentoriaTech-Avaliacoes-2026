const auth = document.getElementById("auth");
const app = document.getElementById("app");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const switchAuth = document.getElementById("switch-auth");
const description = document.getElementById("auth-description");

let isLogin = true;
let currentUser = "";

// Alternar entre login e cadastro
switchAuth.addEventListener("click", function(event) {
  event.preventDefault();

    isLogin = !isLogin;

      loginForm.classList.toggle("hidden", !isLogin);
        signupForm.classList.toggle("hidden", isLogin);

          description.textContent = isLogin
              ? "Entre para continuar"
                  : "Crie sua conta no InstaPlus";

                    switchAuth.textContent = isLogin
                        ? "Cadastre-se"
                            : "Entrar";
                            });

                            // Entrar
                            loginForm.addEventListener("submit", function(event) {
                              event.preventDefault();

                                const email = document.getElementById("email").value;

                                  currentUser = email.split("@")[0];

                                    openApp();
                                    });

                                    // Cadastro demonstrativo
                                    signupForm.addEventListener("submit", function(event) {
                                      event.preventDefault();

                                        currentUser = document.getElementById("new-name").value;

                                          openApp();
                                          });

                                          // Abrir aplicativo
                                          function openApp() {
                                            auth.classList.add("hidden");
                                              app.classList.remove("hidden");

                                                document.getElementById("profile-name").textContent =
                                                    currentUser;
                                                    }

                                                    // Sair
                                                    document.getElementById("logout").addEventListener("click", function() {
                                                      app.classList.add("hidden");
                                                        auth.classList.remove("hidden");

                                                          loginForm.reset();
                                                            signupForm.reset();
                                                            });

                                                            // Curtidas
                                                            document.addEventListener("click", function(event) {
                                                              if (!event.target.classList.contains("like-button")) return;

                                                                const button = event.target;
                                                                  const post = button.closest(".post");
                                                                    const likes = post.querySelector(".likes");

                                                                      let count = Number(likes.dataset.count || 0);

                                                                        if (button.classList.contains("liked")) {
                                                                            count--;
                                                                                button.classList.remove("liked");
                                                                                    button.textContent = "♡ Curtir";
                                                                                      } else {
                                                                                          count++;
                                                                                              button.classList.add("liked");
                                                                                                  button.textContent = "♥ Curtido";
                                                                                                    }

                                                                                                      likes.dataset.count = count;
                                                                                                        likes.textContent = count + (count === 1 ? " curtida" : " curtidas");
                                                                                                        });

                                                                                                        // Comentários
                                                                                                        document.addEventListener("submit", function(event) {
                                                                                                          if (!event.target.classList.contains("comment-form")) return;

                                                                                                            event.preventDefault();

                                                                                                              const form = event.target;
                                                                                                                const input = form.querySelector("input");
                                                                                                                  const post = form.closest(".post");
                                                                                                                    const comments = post.querySelector(".comments");

                                                                                                                      const comment = input.value.trim();

                                                                                                                        if (!comment) return;

                                                                                                                          const paragraph = document.createElement("p");
                                                                                                                            const author = document.createElement("strong");

                                                                                                                              author.textContent = currentUser + ": ";
                                                                                                                                paragraph.appendChild(author);
                                                                                                                                  paragraph.appendChild(document.createTextNode(comment));

                                                                                                                                    comments.appendChild(paragraph);

                                                                                                                                      form.reset();
                                                                                                                                      });

                                                                                                                                      // Publicar
                                                                                                                                      document.getElementById("post-form").addEventListener("submit", function(event) {
                                                                                                                                        event.preventDefault();

                                                                                                                                          const text = document.getElementById("post-text").value.trim();
                                                                                                                                            const imageUrl = document.getElementById("post-image").value.trim();

                                                                                                                                              if (!text) return;

                                                                                                                                                // Aceitar somente links HTTP ou HTTPS
                                                                                                                                                  let safeImage = "";

                                                                                                                                                    if (imageUrl) {
                                                                                                                                                        try {
                                                                                                                                                              const url = new URL(imageUrl);

                                                                                                                                                                    if (url.protocol === "https:" || url.protocol === "http:") {
                                                                                                                                                                            safeImage = url.href;
                                                                                                                                                                                  } else {
                                                                                                                                                                                          alert("Use um link de imagem válido.");
                                                                                                                                                                                                  return;
                                                                                                                                                                                                        }
                                                                                                                                                                                                            } catch {
                                                                                                                                                                                                                  alert("O link da imagem não é válido.");
                                                                                                                                                                                                                        return;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                const post = document.createElement("article");
                                                                                                                                                                                                                                  post.className = "post";

                                                                                                                                                                                                                                    const header = document.createElement("div");
                                                                                                                                                                                                                                      header.className = "post-header";

                                                                                                                                                                                                                                        const avatar = document.createElement("img");
                                                                                                                                                                                                                                          avatar.src = "https://i.pravatar.cc/100?img=12";
                                                                                                                                                                                                                                            avatar.alt = "Foto de perfil";

                                                                                                                                                                                                                                              const username = document.createElement("strong");
                                                                                                                                                                                                                                                username.textContent = currentUser;

                                                                                                                                                                                                                                                  header.appendChild(avatar);
                                                                                                                                                                                                                                                    header.appendChild(username);

                                                                                                                                                                                                                                                      post.appendChild(header);

                                                                                                                                                                                                                                                        if (safeImage) {
                                                                                                                                                                                                                                                            const image = document.createElement("img");
                                                                                                                                                                                                                                                                image.className = "post-image";
                                                                                                                                                                                                                                                                    image.src = safeImage;
                                                                                                                                                                                                                                                                        image.alt = "Imagem da publicação";
                                                                                                                                                                                                                                                                            image.onerror = function() {
                                                                                                                                                                                                                                                                                  image.alt = "Não foi possível carregar a imagem";
                                                                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                                                          post.appendChild(image);
                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                              const content = document.createElement("div");
                                                                                                                                                                                                                                                                                                content.className = "post-content";

                                                                                                                                                                                                                                                                                                  const likeButton = document.createElement("button");
                                                                                                                                                                                                                                                                                                    likeButton.className = "like-button";
                                                                                                                                                                                                                                                                                                      likeButton.textContent = "♡ Curtir";

                                                                                                                                                                                                                                                                                                        const likes = document.createElement("p");
                                                                                                                                                                                                                                                                                                          likes.className = "likes";
                                                                                                                                                                                                                                                                                                            likes.dataset.count = "0";
                                                                                                                                                                                                                                                                                                              likes.textContent = "0 curtidas";

                                                                                                                                                                                                                                                                                                                const caption = document.createElement("p");
                                                                                                                                                                                                                                                                                                                  const author = document.createElement("strong");
                                                                                                                                                                                                                                                                                                                    author.textContent = currentUser + " ";
                                                                                                                                                                                                                                                                                                                      caption.appendChild(author);
                                                                                                                                                                                                                                                                                                                        caption.appendChild(document.createTextNode(text));

                                                                                                                                                                                                                                                                                                                          const comments = document.createElement("div");
                                                                                                                                                                                                                                                                                                                            comments.className = "comments";

                                                                                                                                                                                                                                                                                                                              const commentForm = document.createElement("form");
                                                                                                                                                                                                                                                                                                                                commentForm.className = "comment-form";

                                                                                                                                                                                                                                                                                                                                  const commentInput = document.createElement("input");
                                                                                                                                                                                                                                                                                                                                    commentInput.type = "text";
                                                                                                                                                                                                                                                                                                                                      commentInput.placeholder = "Escreva um comentário...";
                                                                                                                                                                                                                                                                                                                                        commentInput.required = true;

                                                                                                                                                                                                                                                                                                                                          const commentButton = document.createElement("button");
                                                                                                                                                                                                                                                                                                                                            commentButton.textContent = "Enviar";

                                                                                                                                                                                                                                                                                                                                              commentForm.appendChild(commentInput);
                                                                                                                                                                                                                                                                                                                                                commentForm.appendChild(commentButton);

                                                                                                                                                                                                                                                                                                                                                  content.appendChild(likeButton);
                                                                                                                                                                                                                                                                                                                                                    content.appendChild(likes);
                                                                                                                                                                                                                                                                                                                                                      content.appendChild(caption);
                                                                                                                                                                                                                                                                                                                                                        content.appendChild(comments);
                                                                                                                                                                                                                                                                                                                                                          content.appendChild(commentForm);

                                                                                                                                                                                                                                                                                                                                                            post.appendChild(content);

                                                                                                                                                                                                                                                                                                                                                              document.getElementById("feed").prepend(post);

                                                                                                                                                                                                                                                                                                                                                                document.getElementById("post-form").reset();
                                                                                                                                                                                                                                                                                                                                                                });