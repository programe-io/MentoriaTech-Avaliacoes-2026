
// Curtir publicações
document.querySelectorAll(".like").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");

        button.textContent =
            button.classList.contains("active") ? "♥" : "♡";
    });
});

// Comentar
document.querySelectorAll(".comment-input").forEach(input => {
    input.addEventListener("keypress", event => {
        if (event.key === "Enter" && input.value.trim() !== "") {
            const comment = document.createElement("p");

            comment.innerHTML = `<strong>Você</strong> ${
                input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }`;

            input.parentElement.appendChild(comment);
            input.value = "";
        }
    });
});

// Salvar publicação
document.querySelectorAll(".save").forEach(button => {
    button.addEventListener("click", () => {
        button.textContent =
            button.textContent === "♧" ? "🔖" : "♧";
    });
});
