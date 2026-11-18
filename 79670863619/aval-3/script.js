
const followBtn = document.getElementById("followBtn");
const followers = document.getElementById("followers");

let following = false;

followBtn.addEventListener("click", () => {
    following = !following;

        if (following) {
                followBtn.textContent = "Seguindo";
                        followBtn.style.background = "#292940";
                                followers.textContent = "12.501";
                                    } else {
                                            followBtn.textContent = "Seguir";
                                                    followBtn.style.background =
                                                                "linear-gradient(90deg, #ff3d81, #9b5cff)";
                                                                        followers.textContent = "12.5 mil";
                                                                            }
                                                                            });

                                                                            // Sistema de curtidas
                                                                            document.querySelectorAll(".like").forEach(button => {

                                                                                button.addEventListener("click", () => {

                                                                                        button.classList.toggle("liked");

                                                                                                if (button.classList.contains("liked")) {
                                                                                                            button.textContent = "♥";
                                                                                                                    } else {
                                                                                                                                button.textContent = "♡";
                                                                                                                                        }

                                                                                                                                            });

                                                                                                                                            });

                                                                                                                                            // Animação de entrada das publicações
                                                                                                                                            const posts = document.querySelectorAll(".post");

                                                                                                                                            posts.forEach((post, index) => {
                                                                                                                                                post.style.opacity = "0";
                                                                                                                                                    post.style.transform = "translateY(20px)";

                                                                                                                                                        setTimeout(() => {
                                                                                                                                                                post.style.transition = "all .6s ease";
                                                                                                                                                                        post.style.opacity = "1";
                                                                                                                                                                                post.style.transform = "translateY(0)";
                                                                                                                                                                                    }, 150 * index);
                                                                                                                                                                                    });

                                                                                                                                                                                    // Efeito nos stories
                                                                                                                                                                                    document.querySelectorAll(".story").forEach(story => {
                                                                                                                                                                                        story.addEventListener("click", () => {
                                                                                                                                                                                                const title = story.querySelector("p").textContent;
                                                                                                                                                                                                        alert("Você selecionou os stories: " + title);
                                                                                                                                                                                                            });
                                                                                                                                                                                                            });
                                                                                                                                                                                                            