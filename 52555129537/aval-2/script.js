
function adicionarPost() {

    const titulo = document.getElementById("titulo").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (titulo === "" || categoria === "" || descricao === "") {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const lista = document.getElementById("lista-posts");

    const post = document.createElement("article");
    post.className = "post";

    const foto = document.createElement("img");

    foto.src = imagem || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
    foto.alt = "Imagem da publicação";

    const conteudo = document.createElement("div");
    conteudo.className = "post-conteudo";

    const categoriaElemento = document.createElement("span");
    categoriaElemento.className = "categoria";
    categoriaElemento.textContent = categoria;

    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = titulo;

    const descricaoElemento = document.createElement("p");
    descricaoElemento.textContent = descricao;

    const data = document.createElement("small");
    data.textContent = "Publicado em " +
        new Date().toLocaleDateString("pt-BR");

    conteudo.appendChild(categoriaElemento);
    conteudo.appendChild(tituloElemento);
    conteudo.appendChild(descricaoElemento);
    conteudo.appendChild(data);

    post.appendChild(foto);
    post.appendChild(conteudo);

    lista.prepend(post);

    document.getElementById("titulo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("descricao").value = "";

    alert("Publicação adicionada com sucesso!");
}
