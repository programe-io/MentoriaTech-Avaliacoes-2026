// ==========================================
// CURTIDAS
// ==========================================

const likeButtons =
    document.querySelectorAll(".like-button");


likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const countElement =
            button.querySelector(".like-count");

        const likeText =
            button.querySelector(".like-text");

        let count =
            Number(countElement.textContent);


        // SE JÁ ESTIVER CURTIDO

        if (button.classList.contains("liked")) {

            count--;

            button.classList.remove("liked");

            likeText.textContent = "Curtir";

        }

        // SE AINDA NÃO ESTIVER CURTIDO

        else {

            count++;

            button.classList.add("liked");

            likeText.textContent = "Curtido";
        }


        countElement.textContent = count;

    });

});



// ==========================================
// COMENTÁRIOS
// ==========================================

const commentButtons =
    document.querySelectorAll(".comment-button");


commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const post =
            button.closest(".post");


        // VERIFICAR SE JÁ EXISTE CAIXA

        let commentBox =
            post.querySelector(".comment-box");


        if (commentBox) {

            commentBox.querySelector("input").focus();

            return;
        }


        // CRIAR CAIXA

        commentBox =
            document.createElement("div");


        commentBox.classList.add(
            "comment-box"
        );


        commentBox.innerHTML = `

            <input
                type="text"
                placeholder="Digite seu comentário..."
            >

            <button class="send-comment">
                Enviar
            </button>

        `;


        post.appendChild(commentBox);


        const input =
            commentBox.querySelector("input");


        const sendButton =
            commentBox.querySelector(".send-comment");


        input.focus();



        // ==========================================
        // ENVIAR COMENTÁRIO
        // ==========================================

        function sendComment() {

            const text =
                input.value.trim();


            if (text === "") {

                alert(
                    "Digite um comentário antes de enviar."
                );

                return;
            }


            const comment =
                document.createElement("div");


            comment.classList.add(
                "new-comment"
            );


            comment.innerHTML = `
                <strong>Você:</strong>
                ${text}
            `;


            commentBox.insertAdjacentElement(
                "afterend",
                comment
            );


            input.value = "";

            input.focus();
        }


        sendButton.addEventListener(
            "click",
            sendComment
        );


        // ENTER PARA ENVIAR

        input.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    sendComment();

                }

            }
        );

    });

});



// ==========================================
// COMPARTILHAR
// ==========================================

const shareButtons =
    document.querySelectorAll(".share-button");


shareButtons.forEach(function (button) {

    button.addEventListener("click", async function () {

        const post =
            button.closest(".post");


        const postName =
            post.querySelector(".user-info strong")
                .textContent;


        const shareText =
            `Confira esta publicação de ${postName} no StyleHub!`;


        // API NATIVA DO NAVEGADOR

        if (navigator.share) {

            try {

                await navigator.share({

                    title: "StyleHub",

                    text: shareText,

                    url: window.location.href

                });

            }

            catch (error) {

                console.log(
                    "Compartilhamento cancelado."
                );

            }

        }

        // CASO O NAVEGADOR NÃO TENHA SHARE

        else {

            try {

                await navigator.clipboard.writeText(
                    window.location.href
                );


                alert(
                    "Link copiado para a área de transferência!"
                );

            }

            catch (error) {

                alert(
                    "Copie o endereço desta página para compartilhar."
                );

            }

        }

    });

});



// ==========================================
// BOTÃO PUBLICAR
// ==========================================

const publishButton =
    document.getElementById("publishButton");


publishButton.addEventListener(
    "click",
    function () {

        alert(
            "✨ A área de publicação está pronta!\n\n" +
            "Em uma próxima versão você poderá criar " +
            "um formulário para publicar seus próprios looks."
        );

    }
);



// ==========================================
// FILTRO / DESTAQUES
// ==========================================

const filterButton =
    document.getElementById("filterButton");


let highlighted =
    false;


filterButton.addEventListener(
    "click",
    function () {

        const posts =
            document.querySelectorAll(".post");


        highlighted =
            !highlighted;


        posts.forEach(function (post, index) {

            if (highlighted) {

                if (index === 0) {

                    post.style.border =
                        "2px solid #b89555";

                    post.style.boxShadow =
                        "0 10px 30px rgba(184,149,85,0.15)";

                }

                else {

                    post.style.opacity =
                        "0.55";

                }

            }

            else {

                post.style.border =
                    "1px solid #e5e2dd";

                post.style.boxShadow =
                    "0 5px 20px rgba(0,0,0,0.04)";

                post.style.opacity =
                    "1";

            }

        });


        if (highlighted) {

            filterButton.textContent =
                "✓ Destaque ativo";

        }

        else {

            filterButton.textContent =
                "✨ Destaques";

        }

    }
);