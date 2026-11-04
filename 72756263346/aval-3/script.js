
/* Menu */

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
    menu.classList.toggle("hidden");
    });


    /* Curtidas */

    const likeButtons = document.querySelectorAll(".likeButton");

    likeButtons.forEach(function (button) {

        let liked = false;

            button.addEventListener("click", function () {

                    const icon = button.querySelector("i");
                            const likesElement = button.closest("article").querySelector(".likes");

                                    let likes = parseInt(likesElement.textContent.replace(".", ""));

                                            if (!liked) {

                                                        icon.classList.remove("bx-heart");
                                                                    icon.classList.add("bxs-heart");

                                                                                icon.style.color = "red";

                                                                                            likes++;
                                                                                                        liked = true;

                                                                                                                } else {

                                                                                                                            icon.classList.remove("bxs-heart");
                                                                                                                                        icon.classList.add("bx-heart");

                                                                                                                                                    icon.style.color = "";

                                                                                                                                                                likes--;
                                                                                                                                                                            liked = false;

                                                                                                                                                                                    }

                                                                                                                                                                                            likesElement.textContent = likes.toLocaleString("pt-BR");

                                                                                                                                                                                                });

                                                                                                                                                                                                });
                                                                                                                                                                                                