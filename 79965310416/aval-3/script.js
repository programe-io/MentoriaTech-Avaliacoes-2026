
// CURTIR PUBLICAÇÕES

document.querySelectorAll(".like-btn").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const postagem = botao.closest(".post");
        const curtidas = postagem.querySelector(".likes");

        let total = Number(
            curtidas.textContent.replace(/\D/g, "")
        );

        if (botao.classList.contains("liked")) {
            botao.classList.remove("liked");
            botao.innerHTML = '<i class="bx bx-heart text-2xl"></i>';
            total--;
        } else {
            botao.classList.add("liked");
            botao.innerHTML = '<i class="bx bxs-heart text-2xl"></i>';
            total++;
        }

        curtidas.textContent = total.toLocaleString("pt-BR") + " curtidas";

    });

});


// SALVAR PUBLICAÇÕES

document.querySelectorAll(".bookmark-btn").forEach(function(botao) {

    botao.addEventListener("click", function() {

        botao.classList.toggle("saved");

        if (botao.classList.contains("saved")) {
            botao.innerHTML = '<i class="bx bxs-bookmark text-2xl"></i>';
        } else {
            botao.innerHTML = '<i class="bx bx-bookmark text-2xl"></i>';
        }

    });

});


// COMENTÁRIOS

document.querySelectorAll(".comment-btn").forEach(function(botao) {

    botao.addEventListener("click", function() {

        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {

            const postagem = botao.closest(".post");
            const area = postagem.querySelector(".comments");

            const novoComentario = document.createElement("p");

            novoComentario.className = "text-sm text-gray-600 mt-2";
            novoComentario.textContent = "Você: " + comentario.trim();

            area.appendChild(novoComentario);

        }

    });

});


// SEGUIR USUÁRIOS

document.querySelectorAll(".follow-btn").forEach(function(botao) {

    botao.addEventListener("click", function() {

        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "gray";
        } else {
            botao.textContent = "Seguir";
            botao.style.color = "#2563eb";
        }

    });

});


// PESQUISAR PUBLICAÇÕES

const pesquisa = document.getElementById("search");

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    document.querySelectorAll(".post").forEach(function(postagem) {

        const conteudo = postagem.textContent.toLowerCase();

        postagem.style.display = conteudo.includes(texto)
            ? "block"
            : "none";

    });

});
