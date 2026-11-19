function curtir(botao) {
    const contador = botao.querySelector(".contador");
    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;
}

function comentar(botao) {
    const post = botao.closest(".post");
    const campo = post.querySelector(".campo-comentario");
    const lista = post.querySelector(".lista-comentarios");

    const texto = campo.value.trim();

    if (texto === "") {
        alert("Digite um comentário!");
        return;
    }

    const comentario = document.createElement("p");
    comentario.textContent = texto;

    lista.appendChild(comentario);
    campo.value = "";
}

function resolver(botao) {
    const post = botao.closest(".post");

    post.classList.toggle("resolvido");

    if (post.classList.contains("resolvido")) {
        botao.textContent = "Resolvida";
    } else {
        botao.textContent = "Marcar como resolvida";
    }
}

function aplicarFiltro(tipo) {
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        if (tipo === "todos" || post.dataset.tipo === tipo) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
}

function publicar() {
    alert("Função de publicação: mantenha aqui o código original do seu mural.");
}