
// Sistema de curtidas
document.querySelectorAll(".curtir").forEach(botao => {

    botao.addEventListener("click", function() {

        const post = this.closest(".post");
        const contador = post.querySelector(".likes");

        let curtidas = Number(
            contador.dataset.curtidas || 0
        );

        if (this.classList.contains("ativo")) {
            curtidas--;
            this.classList.remove("ativo");
        } else {
            curtidas++;
            this.classList.add("ativo");
        }

        contador.dataset.curtidas = curtidas;
        contador.textContent = curtidas + " curtidas";
    });

});


// Sistema de comentários
function comentar(botao) {

    const post = botao.closest(".post");
    const input = post.querySelector(
        ".novo-comentario input"
    );

    const area = post.querySelector(".comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("p");

    novoComentario.textContent = "👤 Você: " + texto;

    area.appendChild(novoComentario);

    input.value = "";
}


// Focar no campo de comentário
function focarComentario(botao) {

    const post = botao.closest(".post");

    post.querySelector(
        ".novo-comentario input"
    ).focus();
}


// Compartilhar publicação
function compartilhar() {

    if (navigator.share) {

        navigator.share({
            title: "GameGram",
            text: "Confira essa publicação gamer!"
        });

    } else {

        alert("Compartilhamento não disponível neste navegador.");

    }
}


// Sistema de pesquisa
document.getElementById("pesquisa")
.addEventListener("input", function() {

    const texto = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {

        const conteudo = post.textContent.toLowerCase();

        post.style.display =
            conteudo.includes(texto) ? "block" : "none";

    });

});
