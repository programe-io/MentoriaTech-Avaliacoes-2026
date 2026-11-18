
function adicionarPost() {
    const texto = document.getElementById("textoPost");
    const lista = document.getElementById("listaPosts");

    if (texto.value.trim() === "") {
        alert("Digite alguma coisa antes de publicar!");
        return;
    }

    const post = document.createElement("article");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "Novo post ❤️🖤";

    const conteudo = document.createElement("p");
    conteudo.textContent = texto.value.trim();

    const autor = document.createElement("span");
    autor.textContent = "Publicado por: Torcedor";

    const botao = document.createElement("button");
    botao.innerHTML = '❤️ Curtir <span>0</span>';
    botao.onclick = function() {
        curtir(botao);
    };

    post.appendChild(titulo);
    post.appendChild(conteudo);
    post.appendChild(autor);
    post.appendChild(botao);

    lista.prepend(post);

    texto.value = "";
}

function curtir(botao) {
    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    contador.textContent = curtidas + 1;
}
