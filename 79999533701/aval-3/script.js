
// Curtir publicações
document.querySelectorAll(".like-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        const icon = button.querySelector("i");

        if (button.classList.contains("liked")) {
            icon.classList.replace("bx-heart", "bxs-heart");
        } else {
            icon.classList.replace("bxs-heart", "bx-heart");
        }

    });

});

// Salvar publicações
document.querySelectorAll(".save-btn").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        const icon = button.querySelector("i");

        if (button.classList.contains("saved")) {
            icon.classList.replace("bx-bookmark", "bxs-bookmark");
        } else {
            icon.classList.replace("bxs-bookmark", "bx-bookmark");
        }

    });

});

// Comentar publicações
document.querySelectorAll(".comments-btn").forEach(button => {

    button.addEventListener("click", () => {

        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            alert("Comentário enviado: " + comentario);
        }

    });

});

// Seguir usuários
document.querySelectorAll(".suggestion button").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "Seguir") {
            button.textContent = "Seguindo";
        } else {
            button.textContent = "Seguir";
        }

    });

});

// Adicionar story
document.querySelector(".add-story").addEventListener("click", () => {

    alert("Área para adicionar um novo story!");

});

// Botão de pesquisa
const pesquisa = document.querySelector(".desktop-menu input");

pesquisa.addEventListener("input", () => {

    console.log("Pesquisando:", pesquisa.value);

});
