// Função para curtir um post
function curtir(botao) {
    let numero = botao.querySelector("span");
    numero.innerHTML = Number(numero.innerHTML) + 1;
}

// Mostrar ou esconder a área de comentários
function mostrarComentario(botao) {
    let comentarios = botao.parentElement.nextElementSibling;

    if (comentarios.style.display === "none" || comentarios.style.display === "") {
        comentarios.style.display = "block";
    } else {
        comentarios.style.display = "none";
    }
}

// Adicionar comentário
function comentar(botao) {
    let area = botao.parentElement;
    let texto = area.querySelector("input");
    let lista = area.querySelector(".listaComentarios");

    if (texto.value.trim() !== "") {
        let comentario = document.createElement("p");
        comentario.textContent = texto.value;

        lista.appendChild(comentario);

        texto.value = "";
    } else {
        alert("Digite um comentário antes de enviar.");
    }
}