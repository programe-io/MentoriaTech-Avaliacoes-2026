// Botão Publicar
const publishBtn = document.getElementById("publishBtn");

publishBtn.addEventListener("click", function () {
    alert("Sua publicação foi enviada!");
});


// Botões Curtir
const likeButtons = document.querySelectorAll(".likeBtn");

likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "Curtido";
        } else {
            button.textContent = "Curtir";
        }

    });

});


// Botões Comentar
const commentButtons = document.querySelectorAll(".commentBtn");

commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {
        const comentario = prompt("Digite seu comentário:");

        if (comentario !== null && comentario.trim() !== "") {
            alert("Comentário enviado: " + comentario);
        }
    });

});
