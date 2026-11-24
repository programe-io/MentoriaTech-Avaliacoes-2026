
function curtir(elemento) {
    elemento.classList.toggle("liked");

    if (elemento.classList.contains("liked")) {
        elemento.classList.replace("far", "fas");
    } else {
        elemento.classList.replace("fas", "far");
    }
}

function comentar(botao) {
    const input = botao.parentElement.querySelector("input");

    if (input.value.trim() === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.innerHTML = "<strong>Você:</strong> " +
        input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    comentario.style.padding = "10px 13px";

    botao.parentElement.before(comentario);
    input.value = "";
}

function criarPost() {
    const legenda = prompt("Digite a legenda da publicação:");
    const imagem = prompt("Cole o link da imagem:");

    if (!legenda || !imagem) return;

    const post = document.createElement("article");
    post.className = "post";

    const foto = document.createElement("img");
    foto.className = "post-image";
    foto.src = imagem;

    const texto = document.createElement("p");
    texto.style.padding = "15px";
    texto.textContent = legenda;

    const cabecalho = document.createElement("div");
    cabecalho.className = "post-header";
    cabecalho.innerHTML = "<strong>seu_perfil</strong>";

    post.append(cabecalho, foto, texto);

    document.getElementById("feed").prepend(post);
}
