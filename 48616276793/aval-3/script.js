
document.addEventListener("DOMContentLoaded", () => {

    // Curtir e descurtir publicações
    document.querySelectorAll(".post").forEach(post => {

        const likeButton = post.querySelector(".like-btn");
        const likesText = post.querySelector(".likes");
        const saveButton = post.querySelector(".save-btn");

        let liked = false;
        let saved = false;

        let likes = parseInt(
            likesText.textContent.replace(/\D/g, "")
        );

        likeButton.addEventListener("click", () => {
            liked = !liked;

            if (liked) {
                likes++;
                likeButton.classList.add("liked");
                likeButton.innerHTML = '<i class="bx bxs-heart"></i>';
            } else {
                likes--;
                likeButton.classList.remove("liked");
                likeButton.innerHTML = '<i class="bx bx-heart"></i>';
            }

            likesText.textContent =
                likes.toLocaleString("pt-BR") + " curtidas";
        });

        // Salvar publicação
        saveButton.addEventListener("click", () => {
            saved = !saved;

            if (saved) {
                saveButton.classList.add("saved");
                saveButton.innerHTML =
                    '<i class="bx bxs-bookmark"></i>';
            } else {
                saveButton.classList.remove("saved");
                saveButton.innerHTML =
                    '<i class="bx bx-bookmark"></i>';
            }
        });

        // Comentários
        const form = post.querySelector(".comment-form");

        form.addEventListener("submit", event => {
            event.preventDefault();

            const input = form.querySelector("input");
            const message = input.value.trim();

            if (!message) return;

            const comment = document.createElement("p");
            comment.className = "description";
            
            const username = document.createElement("strong");
            username.textContent = "frojo_dev ";

            comment.appendChild(username);
            comment.appendChild(
                document.createTextNode(message)
            );

            form.before(comment);
            input.value = "";
        });

    });

    // Botão seguir
    document.querySelectorAll(".suggestion button").forEach(button => {
        button.addEventListener("click", () => {
            const following = button.textContent === "Seguindo";

            button.textContent = following ? "Seguir" : "Seguindo";
            button.style.color = following ? "#0095f6" : "#8e8e8e";
        });
    });

    // Pesquisa de usuários e publicações
    const searchInput = document.querySelector(".search input");

    searchInput.addEventListener("input", () => {
        const search = searchInput.value.toLowerCase();

        document.querySelectorAll(".post").forEach(post => {
            const username = post.querySelector(
                ".user-info strong"
            ).textContent.toLowerCase();

            const description = post.querySelector(
                ".description"
            ).textContent.toLowerCase();

            post.style.display =
                username.includes(search) ||
                description.includes(search)
                    ? "block"
                    : "none";
        });
    });

    // Botões de navegação
    document.querySelectorAll(".mobile-nav i, .desktop-nav i")
        .forEach(icon => {
            icon.addEventListener("click", () => {
                const name = icon.className;

                if (name.includes("heart")) {
                    alert("Área de curtidas!");
                } else if (name.includes("plus")) {
                    alert("Área de nova publicação!");
                } else if (name.includes("send")) {
                    alert("Área de mensagens!");
                } else if (name.includes("search")) {
                    document.querySelector(".search input")?.focus();
                } else if (name.includes("home")) {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }
            });
        });

});
