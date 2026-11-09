
// CURTIR PUBLICAÇÕES
document.querySelectorAll(".like").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const icon = button.querySelector("i");

        if (button.classList.contains("liked")) {
            icon.className = "bx bxs-heart";
        } else {
            icon.className = "bx bx-heart";
        }

    });

});

// SALVAR PUBLICAÇÃO
document.querySelectorAll(".save").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        const icon = button.querySelector("i");

        if (button.classList.contains("saved")) {
            icon.className = "bx bxs-bookmark";
            alert("Publicação salva!");
        } else {
            icon.className = "bx bx-bookmark";
            alert("Publicação removida dos salvos!");
        }

    });

});

// SEGUIR USUÁRIOS
document.querySelectorAll(".follow").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
        } else {
            button.textContent = "Seguir";
        }

    });

});

// COMENTÁRIOS
document.querySelectorAll(".comment-form").forEach(form => {

    form.addEventListener("submit", event => {

        event.preventDefault();

        const input = form.querySelector("input");

        if (input.value.trim() !== "") {

            alert("Comentário publicado: " + input.value);

            input.value = "";

        }

    });

});

// NOVA PUBLICAÇÃO
function criarPublicacao() {

    const legenda = prompt("Digite a legenda da publicação:");

    if (legenda && legenda.trim() !== "") {
        alert("Publicação criada com sucesso!\n\n" + legenda);
    }

}

document.getElementById("newPost").addEventListener("click", criarPublicacao);

document.getElementById("newPostMobile").addEventListener("click", criarPublicacao);

// BOTÕES DE COMENTÁRIO
document.querySelectorAll(".actions button:nth-child(2)").forEach(button => {

    button.addEventListener("click", () => {

        const input = button.closest(".post").querySelector(".comment-form input");

        input.focus();

    });

});
