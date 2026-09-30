/* ========================================
   FEED LITERÁRIO
   JAVASCRIPT
======================================== */


/* ========================================
   1. BOTÃO CURTIR
======================================== */

const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {

            button.textContent = "❤️ Curtido";

        } else {

            button.textContent = "❤️ Curtir";

        }

    });

});


/* ========================================
   2. ABRIR E FECHAR COMENTÁRIOS
======================================== */

const commentButtons = document.querySelectorAll(".comment-button");

commentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const post = button.closest(".post");

        const comments = post.querySelector(".comments");

        comments.classList.toggle("active");

    });

});


/* ========================================
   3. ENVIAR COMENTÁRIO
======================================== */

const sendButtons = document.querySelectorAll(".send-comment");

sendButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const comments = button.closest(".comments");

        const input = comments.querySelector(".comment-input");

        const commentList = comments.querySelector(".comment-list");

        const text = input.value.trim();


        // Não permite comentário vazio

        if (text === "") {

            alert("Digite um comentário antes de enviar.");

            return;

        }


        // Cria o elemento do comentário

        const comment = document.createElement("p");

        comment.textContent = "📖 Leitor: " + text;


        // Adiciona o comentário na lista

        commentList.appendChild(comment);


        // Limpa o campo

        input.value = "";

    });

});


/* ========================================
   4. PUBLICAR NOVA INDICAÇÃO
======================================== */

const publishButton = document.querySelector("#publishButton");

publishButton.addEventListener("click", function () {

    alert("Sua indicação de livro foi publicada! 📚");

});


/* ========================================
   5. PERMITIR ENTER PARA ENVIAR COMENTÁRIO
======================================== */

const commentInputs = document.querySelectorAll(".comment-input");

commentInputs.forEach(function (input) {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            const comments = input.closest(".comments");

            const sendButton = comments.querySelector(".send-comment");

            sendButton.click();

        }

    });

});


/* ========================================
   6. EFEITO NO MENU
======================================== */

const menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const pageName = link.textContent;

        alert("Você selecionou: " + pageName);

    });

});


/* ========================================
   7. MENSAGEM INICIAL NO CONSOLE
======================================== */

console.log("📚 Feed Literário carregado com sucesso!");

console.log("Bem-vindo ao espaço para quem ama livros.");
