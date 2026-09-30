// Curtir publicação

function curtir(botao) {

    if (botao.innerHTML === "♡") {

        botao.innerHTML = "❤️";

        botao.style.color = "red";

    } else {

        botao.innerHTML = "♡";

        botao.style.color = "black";
    }
}


// Botões de seguir

const botoesSeguir = document.querySelectorAll(".seguir");

botoesSeguir.forEach(function(botao) {

    botao.addEventListener("click", function() {

        if (botao.innerText === "Seguir") {

            botao.innerText = "Seguindo";

            botao.style.color = "#555";

        } else {

            botao.innerText = "Seguir";

            botao.style.color = "#0095f6";
        }

    });

});


// Clique nos stories

const stories = document.querySelectorAll(".story");

stories.forEach(function(story) {

    story.addEventListener("click", function() {

        const nome = story.querySelector("p").innerText;

        alert("Você abriu o story de " + nome + "!");

    });

});