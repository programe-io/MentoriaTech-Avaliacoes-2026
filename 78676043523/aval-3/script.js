
const likes = document.querySelectorAll(".like");

likes.forEach((like) => {
    like.addEventListener("click", () => {
            like.classList.toggle("active");

                    if (like.classList.contains("active")) {
                                like.classList.remove("fa-regular");
                                            like.classList.add("fa-solid");
                                                    } else {
                                                                like.classList.remove("fa-solid");
                                                                            like.classList.add("fa-regular");
                                                                                    }
                                                                                        });
                                                                                        });

                                                                                        const saves = document.querySelectorAll(".save");

                                                                                        saves.forEach((save) => {
                                                                                            save.addEventListener("click", () => {
                                                                                                    save.classList.toggle("fa-solid");
                                                                                                            save.classList.toggle("fa-regular");
                                                                                                                });
                                                                                                                });
                                                                                                                