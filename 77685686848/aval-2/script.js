// ================================
// CURTIR PUBLICAÇÃO
// ================================

function curtir(botao) {

    const post = botao.closest(".post");

    const numero = post.querySelector(".numero-curtidas");

    let curtidas = Number(numero.textContent);

    if (botao.classList.contains("liked")) {

        // Tirar curtida
        curtidas--;

        botao.classList.remove("liked");

        botao.innerHTML = "♡";

    } else {

        // Adicionar curtida
        curtidas++;

        botao.classList.add("liked");

        botao.innerHTML = "♥";
    }

    numero.textContent = curtidas;
}


// ================================
// ADICIONAR COMENTÁRIO
// ================================

function adicionarComentario(botao) {

    const post = botao.closest(".post");

    const input = post.querySelector(".input-comentario");

    const comentarios = post.querySelector(".comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const novoComentario = document.createElement("div");

    novoComentario.classList.add("comentario");

    novoComentario.innerHTML = `
        <strong>Artur</strong>
        ${texto}
    `;

    comentarios.appendChild(novoComentario);

    input.value = "";
}


// ================================
// ABRIR CAMPO DE COMENTÁRIO
// ================================

function focarComentario(botao) {

    const post = botao.closest(".post");

    const input = post.querySelector(".input-comentario");

    input.focus();
}


// ================================
// COMPARTILHAR
// ================================

function compartilhar() {

    alert("Publicação compartilhada! 🚀");

}


// ================================
// SALVAR PUBLICAÇÃO
// ================================

function salvar(botao) {

    if (botao.classList.contains("salvo")) {

        botao.classList.remove("salvo");

        botao.innerHTML = "♧";

        alert("Publicação removida dos salvos.");

    } else {

        botao.classList.add("salvo");

        botao.innerHTML = "★";

        alert("Publicação salva!");

    }

}


// ================================
// ABRIR FOTO GRANDE
// ================================

function abrirFoto(imagem) {

    const modal = document.getElementById("modalFoto");

    const fotoGrande = document.getElementById("fotoGrande");

    fotoGrande.src = imagem.src;

    modal.style.display = "flex";
}


// ================================
// FECHAR FOTO
// ================================

function fecharFoto() {

    document.getElementById("modalFoto").style.display = "none";

}