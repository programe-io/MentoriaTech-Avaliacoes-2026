
// Função de curtir publicação
function curtir(botao) {

    const artigo = botao.closest("article");
    const curtidas = artigo.querySelector(".likes");

    let quantidade = parseInt(curtidas.textContent);

    if (botao.classList.contains("liked")) {

        botao.classList.remove("liked");
        botao.textContent = "♡";

        quantidade--;

    } else {

        botao.classList.add("liked");
        botao.textContent = "♥";

        quantidade++;

    }

    curtidas.textContent = quantidade + " curtidas";
}

// Função de comentar
function comentar() {

    let comentario = prompt("Escreva seu comentário 💗");

    if (comentario !== null && comentario.trim() !== "") {

        alert("Seu comentário foi adicionado! 🐱💕");

    }

}
