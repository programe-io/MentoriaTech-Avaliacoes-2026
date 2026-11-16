
function adicionarPost() {
    const titulo = document.getElementById("titulo").value.trim();
    const categoria = document.getElementById("categoria").value;
    const descricao = document.getElementById("descricao").value.trim();

    if (titulo === "" || categoria === "" || descricao === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const novoPost = document.createElement("article");
    novoPost.className = "post";

    const conteudo = document.createElement("div");
    conteudo.className = "post-conteudo";

    const nomeCategoria = document.createElement("span");
    nomeCategoria.className = "categoria";
    nomeCategoria.textContent = categoria;

    const tituloPost = document.createElement("h3");
    tituloPost.textContent = titulo;

    const textoPost = document.createElement("p");
    textoPost.textContent = descricao;

    const data = document.createElement("small");
    data.textContent = "Publicado em " +
        new Date().toLocaleDateString("pt-BR");

    conteudo.append(nomeCategoria, tituloPost, textoPost, data);
    novoPost.appendChild(conteudo);

    document.getElementById("listaPosts").prepend(novoPost);

    document.getElementById("titulo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("descricao").value = "";

    document.getElementById("mensagemVazia").hidden = true;

    alert("Publicação adicionada com sucesso!");
}

function pesquisarPosts() {
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase().trim();

    const posts = document.querySelectorAll("#listaPosts .post");
    let encontrados = 0;

    posts.forEach(post => {
        const texto = post.textContent.toLowerCase();

        if (texto.includes(pesquisa)) {
            post.style.display = "";
            encontrados++;
        } else {
            post.style.display = "none";
        }
    });

    document.getElementById("mensagemVazia").hidden =
        encontrados > 0;
}
