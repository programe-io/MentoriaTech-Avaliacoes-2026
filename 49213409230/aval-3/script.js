
// SISTEMA DE CURTIDAS
function curtir(botao) {
    if (botao.innerHTML === "🤍") {
        botao.innerHTML = "❤️";
        botao.style.color = "red";
    } else {
        botao.innerHTML = "🤍";
        botao.style.color = "black";
    }
}

// SISTEMA DE SEGUIR
function seguir(botao) {
    if (botao.innerHTML === "Seguir") {
        botao.innerHTML = "Seguindo";
        botao.style.background = "#ddd";
        botao.style.color = "#000";
    } else {
        botao.innerHTML = "Seguir";
        botao.style.background = "#0095f6";
        botao.style.color = "#fff";
    }
}

// SISTEMA DE COMENTÁRIOS
function comentar() {
    let comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
        let lista = document.getElementById("comentarios");

        let novoComentario = document.createElement("p");

        novoComentario.innerHTML =
            "<strong>Você:</strong> " +
            comentario.replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;");

        lista.appendChild(novoComentario);
    }
}

// PUBLICAR FOTO
function publicar() {
    let legenda = document.getElementById("legenda").value;
    let foto = document.getElementById("foto").files[0];

    if (!foto) {
        alert("Escolha uma foto!");
        return;
    }

    let imagem = URL.createObjectURL(foto);

    let postagem = document.createElement("div");
    postagem.className = "post";

    let img = document.createElement("img");
    img.src = imagem;
    img.alt = "Minha publicação";

    let texto = document.createElement("p");
    texto.textContent = "👤 @meuperfil - " + legenda;

    postagem.appendChild(texto);
    postagem.appendChild(img);

    document.getElementById("feed").prepend(postagem);

    document.getElementById("legenda").value = "";
    document.getElementById("foto").value = "";

    alert("Foto publicada com sucesso!");
}
