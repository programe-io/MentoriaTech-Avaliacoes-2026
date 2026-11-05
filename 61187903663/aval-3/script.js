
// CURTIR PUBLICAÇÕES
const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

    });

});


// ADICIONAR STORY
const addStory = document.querySelector(".add-story");

addStory.addEventListener("click", () => {

    alert("Você clicou para adicionar um novo story!");

});


// SALVAR PUBLICAÇÕES
const saveButtons = document.querySelectorAll(".bx-bookmark");

saveButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        if (button.classList.contains("saved")) {

            button.classList.remove("bx-bookmark");
            button.classList.add("bxs-bookmark");

        } else {

            button.classList.remove("bxs-bookmark");
            button.classList.add("bx-bookmark");

        }

    });

});


// MENU
const menuButton = document.querySelector(".bx-menu");

menuButton.addEventListener("click", () => {

    alert("Menu do Instagram!");

});
