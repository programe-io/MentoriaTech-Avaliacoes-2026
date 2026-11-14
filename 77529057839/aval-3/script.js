
// CURTIR PUBLICAÇÃO
const curtidas = document.querySelectorAll(".like");

curtidas.forEach((icone) => {
    icone.addEventListener("click", () => {
        const post = icone.closest(".post");
        const contador = post.querySelector(".curtidas");

        icone.classList.toggle("ativo");

        let quantidade = parseInt(
            contador.textContent.replace(/\D/g, "")
        );

        if (icone.classList.contains("ativo")) {
            quantidade++;
            icone.classList.replace("bx-heart", "bxs-heart");
        } else {
            quantidade--;
            icone.classList.replace("bxs-heart", "bx-heart");
        }

        contador.textContent = quantidade.toLocaleString("pt-BR") + " curtidas";
    });
});


// SALVAR PUBLICAÇÃO
const salvar = document.querySelectorAll(".save");

salvar.forEach((icone) => {
    icone.addEventListener("click", () => {
        icone.classList.toggle("ativo");

        if (icone.classList.contains("ativo")) {
            icone.classList.replace("bx-bookmark", "bxs-bookmark");
        } else {
            icone.classList.replace("bxs-bookmark", "bx-bookmark");
        }
    });
});


// PUBLICAR COMENTÁRIO
const botoesPublicar = document.querySelectorAll(".publicar");

botoesPublicar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const post = botao.closest(".post");
        const input = post.querySelector(".comentario input");
        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário primeiro!");
            return;
        }

        const novoComentario = document.createElement("p");
        novoComentario.classList.add("legenda");

        const nome = document.createElement("strong");
        nome.textContent = "lucas ";

        novoComentario.appendChild(nome);
        novoComentario.appendChild(document.createTextNode(texto));

        const legenda = post.querySelector(".comentarios");
        legenda.insertAdjacentElement("afterend", novoComentario);

        input.value = "";
    });
});


// SEGUIR E DEIXAR DE SEGUIR
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


// PESQUISAR
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
