
// CURTIR PUBLICAÇÃO
const curtidas = document.querySelectorAll(".like");

curtidas.forEach((icone) => {
    icone.addEventListener("click", () => {
        const post = icone.closest(".post");
        const contador = post.querySelector(".curtidas");

        let quantidade = parseInt(
            contador.textContent.replace(/\D/g, ""),
            10
        );

        if (icone.classList.contains("ativo")) {
            icone.classList.remove("ativo");
            icone.classList.replace("bxs-heart", "bx-heart");
            quantidade--;
        } else {
            icone.classList.add("ativo");
            icone.classList.replace("bx-heart", "bxs-heart");
            quantidade++;
        }

        contador.textContent =
            quantidade.toLocaleString("pt-BR") + " curtidas";
    });
});


// SALVAR PUBLICAÇÃO
const salvar = document.querySelectorAll(".save");

salvar.forEach((icone) => {
    icone.addEventListener("click", () => {

        if (icone.classList.contains("ativo")) {
            icone.classList.remove("ativo");
            icone.classList.replace("bxs-bookmark", "bx-bookmark");
        } else {
            icone.classList.add("ativo");
            icone.classList.replace("bx-bookmark", "bxs-bookmark");
        }

    });
});


// ADICIONAR COMENTÁRIO
const botoesPublicar = document.querySelectorAll(".publicar");

botoesPublicar.forEach((botao) => {
    botao.addEventListener("click", () => {

        const post = botao.closest(".post");
        const input = post.querySelector(".comentario input");
        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const novoComentario = document.createElement("p");
        novoComentario.classList.add("legenda");

        const nome = document.createElement("strong");
        nome.textContent = "pedro ";

        novoComentario.appendChild(nome);
        novoComentario.appendChild(
            document.createTextNode(texto)
        );

        const comentarios = post.querySelector(".comentarios");

        comentarios.insertAdjacentElement(
            "afterend",
            novoComentario
        );

        input.value = "";

    });
});


// SEGUIR PERFIS
const botoesSeguir = document.querySelectorAll(".seguir");

botoesSeguir.forEach((botao) => {
    botao.addEventListener("click", () => {

        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.color = "#8e8e8e";
        } else {
            botao.textContent = "Seguir";
            botao.style.color = "#0095f6";
        }

    });
});


// PESQUISAR PUBLICAÇÕES
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", () => {

    const termo = pesquisa.value.toLowerCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {

        const conteudo = post.textContent.toLowerCase();

        if (conteudo.includes(termo)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }

    });
});


// COMPARTILHAR PUBLICAÇÃO
const compartilhar = document.querySelectorAll(".bx-send");

compartilhar.forEach((icone) => {

    icone.addEventListener("click", async () => {

        try {

            if (navigator.share) {

                await navigator.share({
                    title: "Instagram Clone",
                    text: "Confira esta publicação!"
                });

            } else {

                alert("Compartilhamento não disponível neste navegador.");

            }

        } catch (erro) {

            console.log("Compartilhamento cancelado.");

        }

    });

});
