
// SELECIONAR PUBLICAÇÕES
const posts = document.querySelectorAll(".post");

// CURTIR PUBLICAÇÕES
posts.forEach(post => {

    const likeButton = post.querySelector(".like");

        likeButton.addEventListener("click", function() {

                this.classList.toggle("liked");

                        if (this.classList.contains("liked")) {
                                    this.textContent = "♥";
                                            } else {
                                                        this.textContent = "♡";
                                                                }

                                                                    });

                                                                        // SALVAR PUBLICAÇÃO
                                                                            const saveButton = post.querySelector(".save");

                                                                                saveButton.addEventListener("click", function() {

                                                                                        this.classList.toggle("saved");

                                                                                                if (this.classList.contains("saved")) {
                                                                                                            this.textContent = "▣";
                                                                                                                        alert("Publicação salva!");
                                                                                                                                } else {
                                                                                                                                            this.textContent = "▢";
                                                                                                                                                        alert("Publicação removida dos salvos!");
                                                                                                                                                                }

                                                                                                                                                                    });

                                                                                                                                                                    });
                                                                                                                                                                    