
/* CURTIR PUBLICAÇÕES */
document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const count = post.querySelector(".likes span");

        let likes = Number(count.textContent);

        if (button.classList.contains("liked")) {
            button.classList.remove("liked");
            button.textContent = "♡";
            likes--;
        } else {
            button.classList.add("liked");
            button.textContent = "♥";
            likes++;
        }

        count.textContent = likes;
    });

});

/* COMENTAR */
document.querySelectorAll(".send-comment").forEach(button => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const input = post.querySelector("input");
        const text = input.value.trim();

        if (text === "") {
            alert("Digite um comentário primeiro!");
            return;
        }

        const comment = document.createElement("p");

        comment.className = "new-comment";
        comment.innerHTML = "<strong>jacy.jpg</strong> ";

        comment.appendChild(
            document.createTextNode(text)
        );

        post.insertBefore(
            comment,
            post.querySelector(".comment-box")
        );

        input.value = "";
    });

});

/* BOTÃO DE COMENTAR */
document.querySelectorAll(".comment-btn").forEach(button => {

    button.addEventListener("click", () => {

        const post = button.closest(".post");
        const input = post.querySelector("input");

        input.focus();

    });

});

/* SALVAR PUBLICAÇÃO */
document.querySelectorAll(".save-btn").forEach(button => {

    button.addEventListener("click", () => {

        if (button.classList.contains("saved")) {
            button.classList.remove("saved");
            button.textContent = "♧";
        } else {
            button.classList.add("saved");
            button.textContent = "🔖";
        }

    });

});

/* SEGUIR PESSOAS */
document.querySelectorAll(".follow").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
            button.style.color = "#888";
        } else {
            button.textContent = "Seguir";
            button.style.color = "#3897f0";
        }

    });

});
