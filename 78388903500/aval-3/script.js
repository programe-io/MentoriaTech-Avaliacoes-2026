
function likePost(button) {
  const icon = button.querySelector("i");

    if (icon.classList.contains("fa-regular")) {
        icon.classList.replace("fa-regular", "fa-solid");
            icon.style.color = "#ff3040";
              } else {
                  icon.classList.replace("fa-solid", "fa-regular");
                      icon.style.color = "white";
                        }
                        }

                        function addComment(event, input) {
                          if (event.key === "Enter" && input.value.trim()) {
                              const comment = document.createElement("p");

                                  comment.className = "text-sm mt-2";
                                      comment.textContent = "Você: " + input.value;

                                          input.parentElement.appendChild(comment);
                                              input.value = "";
                                                }
                                                }

                                                function createPost() {
                                                  const image = prompt("Digite a URL da imagem:");

                                                    if (!image) return;

                                                      const post = document.createElement("article");
                                                        post.className = "post";

                                                          const img = document.createElement("img");
                                                            img.className = "post-image";
                                                              img.src = image;
                                                                img.alt = "Nova publicação";

                                                                  const title = document.createElement("p");
                                                                    title.className = "my-3 font-bold";
                                                                      title.textContent = "Sua publicação";

                                                                        post.appendChild(title);
                                                                          post.appendChild(img);

                                                                            document.getElementById("feed").prepend(post);
                                                                            }
                                                                            