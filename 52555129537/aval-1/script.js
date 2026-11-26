
function adicionarPost() {

    const titulo = document.getElementById("titulo").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (titulo === "" || categoria === "" || descricao === "") {
        alert("Preencha o título, a categoria e a descrição!");
        return;
    }

    const lista = document.getElementById("lista-posts");

    const novoPost = document.createElement("article");
    novoPost.className = "post";

    const foto = document.createElement("img");

    foto.src = imagem || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800";
    foto.alt = "Imagem da publicação";

    const informacoes = document.createElement("div");
    informacoes.className = "post-info";

    const categoriaPost = document.createElement("span");
    categoriaPost.textContent = categoria;

    const tituloPost = document.createElement("h3");
    tituloPost.textContent = titulo;

    const descricaoPost = document.createElement("p");
    descricaoPost.textContent = descricao;

    const dataPost = document.createElement("small");
    dataPost.textContent = "Publicado em " + new Date().toLocaleDateString("pt-BR");

    informacoes.appendChild(categoriaPost);
    informacoes.appendChild(tituloPost);
    informacoes.appendChild(descricaoPost);
    informacoes.appendChild(dataPost);

    novoPost.appendChild(foto);
    novoPost.appendChild(informacoes);

    lista.prepend(novoPost);

    document.getElementById("titulo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("descricao").value = "";

    alert("Publicação adicionada com sucesso!");
}
