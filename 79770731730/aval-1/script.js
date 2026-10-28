document.addEventListener("DOMContentLoaded", () => {
        // Alternar ícone de curtida (Heart)
            const likeButtons = document.querySelectorAll(".btn-like");
                likeButtons.forEach((btn) => {
                    
                        btn.addEventListener("click", () => {
                                    const icon = btn.querySelector("i");
                                                if (icon.classList.contains("bx-heart")) {
                                                                icon.classList.remove("bx-heart");
                                                                                icon.classList.add("bxs-heart", "text-red-500");
                                                                                            } else {
                                                                                                            icon.classList.remove("bxs-heart", "text-red-500");
                                                                                                                            icon.classList.add("bx-heart");
                                                                                                                                        }
                                                                                                                                                });
                                                                                                                                                    });

                                                                                                                                                        // Alternar ícone de salvar (Bookmark)
                                                                                                                                                            const bookmarkButtons = document.querySelectorAll(".btn-bookmark");
                                                                                                                                                                bookmarkButtons.forEach((btn) => {
                                                                                                                                                                        btn.addEventListener("click", () => {
                                                                                                                                                                                    const icon = btn.querySelector("i");
                                                                                                                                                                                                if (icon.classList.contains("bx-bookmark")) {
                                                                                                                                                                                                                icon.classList.remove("bx-bookmark");
                                                                                                                                                                                                                                icon.classList.add("bxs-bookmark");
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                            icon.classList.remove("bxs-bookmark");
                                                                                                                                                                                                                                                                            icon.classList.add("bx-bookmark");
                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                    });

})