
function likePost(button) {
    const icon = button.querySelector("i");
        const post = button.closest(".post");
            const likes = post.querySelector(".likes");

                if (icon.classList.contains("fa-regular")) {
                        icon.classList.replace("fa-regular", "fa-solid");
                                icon.style.color = "red";

                                        likes.textContent =
                                                    Number(likes.textContent) + 1;

                                                        } else {
                                                                icon.classList.replace("fa-solid", "fa-regular");
                                                                        icon.style.color = "";

                                                                                likes.textContent =
                                                                                            Number(likes.textContent) - 1;
                                                                                                }
                                                                                                }

                                                                                                function savePost(button) {
                                                                                                    const icon = button.querySelector("i");

                                                                                                        if (icon.classList.contains("fa-regular")) {
                                                                                                                icon.classList.replace(
                                                                                                                            "fa-regular",
                                                                                                                                        "fa-solid"
                                                                                                                                                );

                                                                                                                                                        alert("Publicação salva!");
                                                                                                                                                            } else {
                                                                                                                                                                    icon.classList.replace(
                                                                                                                                                                                "fa-solid",
                                                                                                                                                                                            "fa-regular"
                                                                                                                                                                                                    );

                                                                                                                                                                                                            alert("Publicação removida dos salvos!");
                                                                                                                                                                                                                }
                                                                                                                                                                                                                }

                                                                                                                                                                                                                function commentPost() {
                                                                                                                                                                                                                    const inputs = document.querySelectorAll(
                                                                                                                                                                                                                            ".comment-input"
                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                    if (inputs.length > 0) {
                                                                                                                                                                                                                                            inputs[0].focus();
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                document.querySelectorAll(".comment-input").forEach(input => {
                                                                                                                                                                                                                                                    input.addEventListener("keydown", function(event) {
                                                                                                                                                                                                                                                            if (event.key === "Enter" && this.value.trim()) {
                                                                                                                                                                                                                                                                        const comment = document.createElement("p");

                                                                                                                                                                                                                                                                                    comment.innerHTML =
                                                                                                                                                                                                                                                                                                    "<strong>Você:</strong> " +
                                                                                                                                                                                                                                                                                                                    escapeHTML(this.value.trim());

                                                                                                                                                                                                                                                                                                                                this.closest(".post").querySelector(".p-3")
                                                                                                                                                                                                                                                                                                                                                .appendChild(comment);

                                                                                                                                                                                                                                                                                                                                                            this.value = "";
                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                        function escapeHTML(text) {
                                                                                                                                                                                                                                                                                                                                                                            const element = document.createElement("span");
                                                                                                                                                                                                                                                                                                                                                                                element.textContent = text;
                                                                                                                                                                                                                                                                                                                                                                                    return element.innerHTML;
                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                    