
// CURTIR PUBLICAÇÕES

function curtir(botao) {
    const post = botao.closest(".post");
    const quantidade = post.querySelector(".quantidade");

    let curtidas = Number(quantidade.dataset.count || 1248);

    if (botao.classList.contains("liked")) {
        botao.classList.remove("liked");
        botao.textContent = "♡";
        curtidas--;
    } else {
        botao.classList.add("liked");
        botao.textContent = "♥";
        curtidas++;
    }

    quantidade.dataset.count = curtidas;
    quantidade.textContent =
        curtidas.toLocaleString("pt-BR") + " curtidas";
}

// SEGUIR PERFIS

function seguir(botao) {
    if (botao.textContent === "Seguir") {
        botao.textContent = "Seguindo";
        botao.style.color = "#8e8e8e";
    } else {
        botao.textContent = "Seguir";
        botao.style.color = "#0095f6";
    }
}

// FOCAR COMENTÁRIO

function focarComentario(botao) {
    const post = botao.closest(".post");
    post.querySelector(".comentario input").focus();
}

// PUBLICAR COMENTÁRIO

function publicarComentario(botao) {
    const post = botao.closest(".post");
    const input = post.querySelector(".comentario input");
    const legenda = post.querySelector(".legenda");

    if (input.value.trim() === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");

    const usuario = document.createElement("strong");
    usuario.textContent = "meu_perfil ";

    novoComentario.appendChild(usuario);
    novoComentario.appendChild(
        document.createTextNode(input.value)
    );

    legenda.appendChild(novoComentario);
    input.value = "";
}

// COMPARTILHAR

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "Mundo dos Vaqueiros",
            text: "Confira esta publicação!"
        }).catch(() => {});
    } else {
        alert("Compartilhe esta publicação com seus amigos!");
    }
}

// PESQUISAR PERFIS

document.getElementById("pesquisa").addEventListener("input", function() {

    const pesquisa = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const usuario = post.querySelector(".post-header strong")
            .textContent.toLowerCase();

        post.style.display = usuario.includes(pesquisa)
            ? "block"
            : "none";
    });

});
