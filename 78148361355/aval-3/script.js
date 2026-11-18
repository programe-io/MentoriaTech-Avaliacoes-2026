
function follow() {
    const button = document.getElementById("followBtn");

        if (button.innerText === "Seguir") {
                button.innerText = "Seguindo";
                        button.style.background = "#29293a";
                            } else {
                                    button.innerText = "Seguir";
                                            button.style.background =
                                                        "linear-gradient(90deg, #8c36e8, #3868ed)";
                                                            }
                                                            }

                                                            // Curtir e descurtir publicações
                                                            document.querySelectorAll(".like").forEach(icon => {
                                                                icon.addEventListener("click", () => {
                                                                        icon.classList.toggle("liked");

                                                                                if (icon.classList.contains("liked")) {
                                                                                            icon.classList.remove("fa-regular");
                                                                                                        icon.classList.add("fa-solid");
                                                                                                                } else {
                                                                                                                            icon.classList.remove("fa-solid");
                                                                                                                                        icon.classList.add("fa-regular");
                                                                                                                                                }
                                                                                                                                                    });
                                                                                                                                                    });

                                                                                                                                                    // Abas do perfil
                                                                                                                                                    document.querySelectorAll(".tabs i").forEach(tab => {
                                                                                                                                                        tab.addEventListener("click", () => {
                                                                                                                                                                document.querySelectorAll(".tabs i").forEach(item => {
                                                                                                                                                                            item.classList.remove("active");
                                                                                                                                                                                    });

                                                                                                                                                                                            tab.classList.add("active");
                                                                                                                                                                                                });
                                                                                                                                                                                                });
                                                                                                                                                                                                