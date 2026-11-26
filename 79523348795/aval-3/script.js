
// BOTÃO DE MENU

const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", () => {

    alert("Menu do Instagram!");

});


// BOTÃO DE CURTIDA

const likeButtons = document.querySelectorAll(".likeButton");

likeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        // Verifica se já está curtido
        const liked = icon.classList.contains("bxs-heart");

        if (liked) {

            icon.classList.remove("bxs-heart");
            icon.classList.add("bx-heart");

            icon.style.color = "";

        } else {

            icon.classList.remove("bx-heart");
            icon.classList.add("bxs-heart");

            icon.style.color = "#ef4444";

        }

    });

});
