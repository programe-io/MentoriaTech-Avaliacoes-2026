
const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((button) => {

    button.addEventListener("click", function() {

        const post = button.closest(".post");
        const counter = post.querySelector(".like-count");

        let likes = Number(counter.textContent);

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");
            button.textContent = "♡";

            likes--;

        } else {

            button.classList.add("liked");
            button.textContent = "♥";

            likes++;
        }

        counter.textContent = likes;

    });

});


// BOTÃO DE COMENTÁRIOS

const commentButtons = document.querySelectorAll(".comment-btn");

commentButtons.forEach((button) => {

    button.addEventListener("click", function() {

        const comment = prompt("Digite seu comentário:");

        if (comment && comment.trim() !== "") {

            alert("Comentário registrado: " + comment);

        }

    });

});


// BOTÃO DE COMPARTILHAMENTO

const shareButtons = document.querySelectorAll(".share-btn");

shareButtons.forEach((button) => {

    button.addEventListener("click", async function() {

        const post = button.closest(".post");
        const caption = post.querySelector(".caption").innerText;

        try {

            if (navigator.share) {

                await navigator.share({
                    title: "Meu Feed",
                    text: caption,
                    url: window.location.href
                });

            } else {

                await navigator.clipboard.writeText(
                    caption + "\n" + window.location.href
                );

                alert("Publicação copiada!");

            }

        } catch (error) {

            console.log("Compartilhamento cancelado ou indisponível.");

        }

    });

});
