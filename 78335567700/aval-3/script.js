
// Inicializar ícones Lucide
lucide.createIcons();

// Sistema de curtidas
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {

  button.addEventListener("click", () => {

      button.classList.toggle("liked");

          const post = button.closest(".post");
              const likesText = post.querySelector(".font-semibold.mt-3");

                  if (button.classList.contains("liked")) {
                        button.querySelector("svg").style.fill = "#ff3040";
                              button.querySelector("svg").style.color = "#ff3040";
                                  } else {
                                        button.querySelector("svg").style.fill = "none";
                                              button.querySelector("svg").style.color = "white";
                                                  }

                                                    });

                                                    });

                                                    // Sistema de seguir usuários
                                                    const followButtons = document.querySelectorAll(
                                                      "#suggestions-list button"
                                                      );

                                                      followButtons.forEach(button => {

                                                        button.addEventListener("click", () => {

                                                            if (button.textContent.trim() === "Seguir") {
                                                                  button.textContent = "Seguindo";
                                                                        button.style.color = "#aaa";
                                                                            } else {
                                                                                  button.textContent = "Seguir";
                                                                                        button.style.color = "#0095f6";
                                                                                            }

                                                                                              });

                                                                                              });

                                                                                              // Sistema de comentários
                                                                                              const commentInputs = document.querySelectorAll(".comment-input");

                                                                                              commentInputs.forEach(input => {

                                                                                                input.addEventListener("keypress", event => {

                                                                                                    if (event.key === "Enter") {

                                                                                                          const comment = input.value.trim();

                                                                                                                if (comment !== "") {

                                                                                                                        const post = input.closest(".post");

                                                                                                                                const newComment = document.createElement("p");

                                                                                                                                        newComment.className = "text-sm mt-2";

                                                                                                                                                newComment.textContent = comment;

                                                                                                                                                        post.insertBefore(newComment, input);

                                                                                                                                                                input.value = "";

                                                                                                                                                                      }

                                                                                                                                                                          }

                                                                                                                                                                            });

                                                                                                                                                                            });
                                                                                                                                                                            