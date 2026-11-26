
/* Sistema de curtidas */
document.querySelectorAll(".like-btn").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const post = botao.closest(".post");
        const contador = post.querySelector(".like-count");
        const icone = botao.querySelector("i");

        let quantidade = parseInt(contador.textContent.replace(".", ""));

        if (botao.classList.contains("liked")) {
            botao.classList.remove("liked");
            icone.classList.replace("bx-heart", "bx-heart");
            quantidade--;
        } else {
            botao.classList.add("liked");
            icone.classList.replace("bx-heart", "bxs-heart");
            quantidade++;
        }

        contador.textContent = quantidade.toLocaleString("pt-BR");
    });

});

/* Sistema de comentários */
document.querySelectorAll(".comment-submit").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const post = botao.closest(".post");
        const input = post.querySelector(".comment-input");
        const lista = post.querySelector(".comments-list");

        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentario = document.createElement("p");
        comentario.classList.add("comment");

        const nome = document.createElement("strong");
        nome.textContent = "frojo_dev ";

        comentario.appendChild(nome);
        comentario.appendChild(document.createTextNode(texto));

        lista.appendChild(comentario);

        input.value = "";
    });

});

/* Seguir sugestões */
document.querySelectorAll(".suggestion button").forEach(function(botao) {

    botao.addEventListener("click", function() {

        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "#777";
        } else {
            botao.textContent = "Seguir";
            botao.style.color = "#1877f2";
        }

    });

});

/* Mostrar comentários */
document.querySelectorAll(".comments-btn").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const post = botao.closest(".post");
        const lista = post.querySelector(".comments-list");
        const input = post.querySelector(".comment-input");

        input.focus();

        if (lista.children.length === 0) {
            alert("Escreva um comentário no campo abaixo da postagem!");
        } else {
            lista.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

    });

});

/* Menu de opções */
document.querySelectorAll(".options").forEach(function(botao) {

    botao.addEventListener("click", function() {
        alert("Opções da publicação!");
    });

});

/* Botões de navegação */
document.querySelectorAll(".mobile-nav button").forEach(function(botao, index) {

    botao.addEventListener("click", function() {

        const mensagens = [
            "Você está na página inicial!",
            "Área de pesquisa!",
            "Área de nova publicação!",
            "Área de curtidas!",
            "Área do perfil!"
        ];

        alert(mensagens[index]);
    });

});
