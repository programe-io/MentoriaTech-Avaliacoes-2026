// script.js

// BOTÃO CURTIR

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(button => {

    button.addEventListener("click", () => {

        if(button.innerHTML === "❤️ Curtir"){

            button.innerHTML = "💖 Curtido";
            button.style.background = "#ff4fd8";
            button.style.color = "white";

        }else{

            button.innerHTML = "❤️ Curtir";
            button.style.background = "#f1f1f1";
            button.style.color = "black";

        }

    });

});

// PESQUISA

const searchButton = document.querySelector(".search-box button");

searchButton.addEventListener("click", () => {

    const input = document.querySelector(".search-box input");

    if(input.value.trim() !== ""){

        alert("Você pesquisou por: " + input.value);

    }else{

        alert("Digite algo para pesquisar!");

    }

});