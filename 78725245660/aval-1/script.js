
// 1. MENU RESPONSIVO

const menuBtn = document.getElementById("menu-btn");
const menuLinks = document.getElementById("menu-links");

menuBtn.addEventListener("click", function() {

    menuLinks.classList.toggle("active");

});


// 2. BOTÃO DE CURTIR

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");
            button.textContent = "♡ Curtir";

        } else {

            button.classList.add("liked");
            button.textContent = "♥ Curtido";

        }

    });

});


// 3. BOTÃO DE MENSAGEM

const messageBtn = document.getElementById("message-btn");

messageBtn.addEventListener("click", function() {

    alert("Obrigado por visitar o Meu Blog!");

});


// 4. MENSAGEM NO CONSOLE

console.log("Meu Blog carregado com sucesso!");
